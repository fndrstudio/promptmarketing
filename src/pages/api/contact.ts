import type { APIRoute } from 'astro'

const PIPEDRIVE_API_TOKEN = import.meta.env.PIPEDRIVE_API_TOKEN
const PIPEDRIVE_DOMAIN = import.meta.env.PIPEDRIVE_COMPANY_DOMAIN

const pipedriveUrl = (path: string) =>
  `https://${PIPEDRIVE_DOMAIN}.pipedrive.com${path}?api_token=${PIPEDRIVE_API_TOKEN}`

const pipedriveV2Url = (path: string, params = '') =>
  `https://${PIPEDRIVE_DOMAIN}.pipedrive.com${path}?api_token=${PIPEDRIVE_API_TOKEN}${params}`

async function findPersonByEmail(email: string): Promise<number | null> {
  const res = await fetch(
    pipedriveV2Url('/api/v2/itemSearch', `&term=${encodeURIComponent(email)}&item_types=person&fields=email&exact_match=true`)
  )
  const data = await res.json()
  const items = data?.data?.items
  if (items?.length > 0) {
    return items[0].item.id
  }
  return null
}

async function findOrCreateOrg(company: string): Promise<number> {
  const searchRes = await fetch(
    pipedriveV2Url('/api/v2/itemSearch', `&term=${encodeURIComponent(company)}&item_types=organization&exact_match=true`)
  )
  const searchData = await searchRes.json()
  const existing = searchData?.data?.items
  if (existing?.length > 0) {
    return existing[0].item.id
  }

  const res = await fetch(pipedriveV2Url('/api/v2/organizations'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: company }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to create organization: ${res.status} ${text}`)
  }
  const data = await res.json()
  return data.data?.id ?? data.id
}

async function createPerson(
  name: string,
  email: string,
  phone?: string,
  orgId?: number
): Promise<number> {
  const res = await fetch(pipedriveV2Url('/api/v2/persons'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      emails: [{ value: email, primary: true, label: 'work' }],
      ...(phone && { phones: [{ value: phone, primary: true, label: 'work' }] }),
      ...(orgId && { org_id: orgId }),
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to create person: ${res.status} ${text}`)
  }
  const data = await res.json()
  return data.data?.id ?? data.id
}

async function updatePerson(
  personId: number,
  updates: { phone?: string; orgId?: number }
): Promise<void> {
  const body: Record<string, unknown> = {}
  if (updates.phone) {
    body.phones = [{ value: updates.phone, primary: true, label: 'work' }]
  }
  if (updates.orgId) {
    body.org_id = updates.orgId
  }
  if (Object.keys(body).length > 0) {
    await fetch(pipedriveV2Url(`/api/v2/persons/${personId}`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  }
}

async function createLead(personId: number, name: string): Promise<string> {
  const res = await fetch(pipedriveUrl('/v1/leads'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: `Contact Form - ${name}`,
      person_id: personId,
      ...(import.meta.env.PIPEDRIVE_CONTACT_LABEL_ID && {
        label_ids: [import.meta.env.PIPEDRIVE_CONTACT_LABEL_ID],
      }),
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to create lead: ${res.status} ${text}`)
  }
  const data = await res.json()
  return data.data?.id ?? data.id
}

async function createNote(leadId: string, message: string, name: string): Promise<void> {
  const html = `<p><strong>Message from ${name}:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`
  const res = await fetch(pipedriveUrl('/v1/notes'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: html,
      lead_id: leadId,
      pinned_to_lead_flag: 1,
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to create note: ${res.status} ${text}`)
  }
}

export const POST: APIRoute = async ({ request }) => {
  if (!PIPEDRIVE_API_TOKEN || !PIPEDRIVE_DOMAIN) {
    return new Response(
      JSON.stringify({ success: false, message: 'Server configuration error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  try {
    const body = await request.json()
    const name = body.name?.trim()
    const email = body.email?.trim().toLowerCase()
    const company = body.company?.trim() || ''
    const phone = body.phone?.trim() || ''
    const message = body.message?.trim() || ''

    if (!name) {
      return new Response(
        JSON.stringify({ success: false, message: 'Name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Valid email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    let orgId: number | undefined
    if (company) {
      orgId = await findOrCreateOrg(company)
    }

    let personId = await findPersonByEmail(email)

    if (personId) {
      await updatePerson(personId, { phone: phone || undefined, orgId })
    } else {
      personId = await createPerson(name, email, phone || undefined, orgId)
    }

    const leadId = await createLead(personId, name)

    if (message) {
      await createNote(leadId, message, name)
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Contact form error:', message, error)
    return new Response(
      JSON.stringify({ success: false, message: 'Something went wrong. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

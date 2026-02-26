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

async function createPerson(email: string): Promise<number> {
  const res = await fetch(pipedriveV2Url('/api/v2/persons'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: email,
      emails: [{ value: email, primary: true, label: 'work' }],
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to create person: ${res.status} ${text}`)
  }
  const data = await res.json()
  return data.data?.id ?? data.id
}

async function createLead(personId: number): Promise<void> {
  const res = await fetch(pipedriveUrl('/v1/leads'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Newsletter Signup',
      person_id: personId,
      ...(import.meta.env.PIPEDRIVE_NEWSLETTER_LABEL_ID && {
        label_ids: [import.meta.env.PIPEDRIVE_NEWSLETTER_LABEL_ID],
      }),
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to create lead: ${res.status} ${text}`)
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
    const email = body.email?.trim().toLowerCase()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Valid email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    let personId = await findPersonByEmail(email)

    if (!personId) {
      personId = await createPerson(email)
    }

    await createLead(personId)

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Newsletter signup error:', message, error)
    return new Response(
      JSON.stringify({ success: false, message: 'Something went wrong. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

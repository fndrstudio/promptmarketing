import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'pbui2f8s',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

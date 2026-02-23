import { createImageUrlBuilder } from '@sanity/image-url'

const builder = createImageUrlBuilder({
  projectId: 'pbui2f8s',
  dataset: 'production',
})

export const urlFor = (source: any) => builder.image(source)

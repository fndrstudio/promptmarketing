export const getAllPostsQuery = `*[_type == "blogPost"] | order(pubDate desc) {
  _id,
  title,
  slug,
  author,
  pubDate,
  category,
  seoDescription,
  featuredImage,
}`

export const getPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  author,
  pubDate,
  category,
  seoDescription,
  featuredImage,
  content,
}`

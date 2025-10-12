export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  
  try {
    // Try to read the markdown file directly
    const fs = await import('fs/promises')
    const path = await import('path')
    
    const filePath = path.join(process.cwd(), 'content', 'conditions', `${slug}.md`)
    const content = await fs.readFile(filePath, 'utf-8')
    
    // Parse frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (!frontmatterMatch) {
      throw createError({ statusCode: 404, statusMessage: 'Content not found' })
    }
    
    const frontmatter = frontmatterMatch[1]
    const body = frontmatterMatch[2]
    
    // Parse YAML frontmatter
    const yaml = await import('yaml')
    const parsed = yaml.parse(frontmatter)
    
    // Parse markdown content
    const { marked } = await import('marked')
    const parsedBody = marked(body)
    
    return {
      title: parsed.title,
      description: parsed.description,
      system: parsed.system,
      icon: parsed.icon,
      category: parsed.category,
      body: parsedBody,
      _path: `/conditions/${slug}`,
      _id: `content:conditions:${slug}.md`,
      _type: 'markdown',
      _source: 'content',
      _file: `conditions/${slug}.md`,
      _extension: 'md'
    }
  } catch (err) {
    throw createError({ statusCode: 404, statusMessage: 'Content not found' })
  }
})





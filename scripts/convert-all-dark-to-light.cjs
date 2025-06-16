const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

// Hardcode the project ID from what we saw in the env file
const client = createClient({
  projectId: 'fovvfda4', // From the env file
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-02-21'
})

async function fetchAllPosts() {
  try {
    console.log('🔍 Fetching all posts...')
    const query = `*[_type == "posts"] {
      _id,
      _rev,
      "title": block[0].heading,
      block[] {
        _key,
        _type,
        layout,
        content[] {
          _key,
          _type,
          className,
          marks[] {
            _key,
            _type,
            theme
          },
          children[] {
            _key,
            text,
            marks[] {
              _key,
              _type,
              theme
            }
          }
        }
      }
    }`
    
    const posts = await client.fetch(query)
    console.log(`📝 Found ${posts.length} posts`)
    
    // Show current themes/layouts for each post
    posts.forEach((post, i) => {
      console.log(`\n📄 Post ${i + 1}: ${post.title || 'Untitled'} (${post._id})`)
      console.log(`   Blocks: ${post.block?.length || 0}`)
      
      post.block?.forEach((block, j) => {
        console.log(`     Block ${j}: ${block._type} (layout: ${block.layout || 'none'})`)
        if (block.content) {
          block.content.forEach((content, k) => {
            if (content.className) {
              console.log(`       Content ${k}: className = ${content.className}`)
            }
            if (content.marks) {
              content.marks.forEach((mark, l) => {
                if (mark.theme) {
                  console.log(`         Mark ${l}: theme = ${mark.theme}`)
                }
              })
            }
          })
        }
      })
    })
    
    return posts
  } catch (error) {
    console.error('❌ Error fetching posts:', error.message)
    return null
  }
}

async function convertDarkToLight(postId, postTitle) {
  try {
    console.log(`\n🔄 Converting dark themes to light for: ${postTitle}`)
    
    // First fetch the complete post
    const post = await client.getDocument(postId)
    
    let conversions = 0
    
    // Function to recursively convert themes
    function convertThemes(obj) {
      if (Array.isArray(obj)) {
        return obj.map(convertThemes)
      }
      
      if (obj && typeof obj === 'object') {
        const converted = {}
        
        for (const [key, value] of Object.entries(obj)) {
          if (key === 'layout' && value === 'dark') {
            converted[key] = 'light'
            conversions++
            console.log(`  ✓ Converting layout: dark -> light`)
          } else if (key === 'theme' && value === 'dark') {
            converted[key] = 'light'
            conversions++
            console.log(`  ✓ Converting theme: dark -> light`)
          } else if (key === 'className') {
            // Convert specific class names
            if (value === 'dark') {
              converted[key] = 'light'
              conversions++
              console.log(`  ✓ Converting className: dark -> light`)
            } else if (value === 'image-standard-dark') {
              converted[key] = 'image-standard'
              conversions++
              console.log(`  ✓ Converting className: image-standard-dark -> image-standard`)
            } else if (value === 'img-dark') {
              converted[key] = 'img-light'
              conversions++
              console.log(`  ✓ Converting className: img-dark -> img-light`)
            } else {
              converted[key] = value
            }
          } else {
            converted[key] = convertThemes(value)
          }
        }
        
        return converted
      }
      
      return obj
    }
    
    const convertedPost = convertThemes(post)
    
    if (conversions === 0) {
      console.log(`  ℹ️  No dark themes found to convert in this post`)
      return { conversions: 0 }
    }
    
    // Update the document
    const result = await client
      .patch(postId)
      .set(convertedPost)
      .commit()
    
    console.log(`  ✅ Successfully converted ${conversions} dark themes to light!`)
    return { conversions, result }
    
  } catch (error) {
    console.error(`  ❌ Error converting themes for ${postTitle}:`, error.message)
    return null
  }
}

async function main() {
  console.log('🎨 MASS Theme Converter Script: Dark → Light')
  console.log('===========================================')
  
  const allPosts = await fetchAllPosts()
  
  if (!allPosts || allPosts.length === 0) {
    console.log('❌ No posts found')
    return
  }
  
  console.log(`\n🚀 Starting conversion for ${allPosts.length} posts...`)
  
  let totalConversions = 0
  let processedPosts = 0
  let errorPosts = 0
  
  for (const post of allPosts) {
    const result = await convertDarkToLight(post._id, post.title || 'Untitled')
    
    if (result) {
      totalConversions += result.conversions
      processedPosts++
    } else {
      errorPosts++
    }
    
    // Small delay to avoid overwhelming the API
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  console.log('\n🎉 CONVERSION COMPLETE!')
  console.log('=======================')
  console.log(`📊 Posts processed: ${processedPosts}/${allPosts.length}`)
  console.log(`🔄 Total conversions: ${totalConversions}`)
  console.log(`❌ Errors: ${errorPosts}`)
  
  if (totalConversions > 0) {
    console.log('✨ All dark themes have been converted to light!')
  } else {
    console.log('ℹ️  No dark themes found to convert')
  }
}

main().catch(console.error) 
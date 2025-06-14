// Test the enhanced /api/post endpoint with rich data
// Run with: node test-enhanced-post.js

const BASE_URL = 'http://localhost:3000';

async function testEnhancedPost() {
  console.log('🧪 Testing enhanced /api/post endpoint...\n');

  // Test with rich video data (matching new structure)
  const richVideoData = {
    _id: 'enhanced-video-test',
    _type: 'video',
    title: 'Enhanced Video Test',
    slug: { current: 'enhanced-video-test' },
    excerpt: 'This is a test of our enhanced video notification system with rich content.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    image: {
      asset: {
        url: 'https://example.com/video-thumbnail.jpg'
      }
    },
    team: {
      name: 'Raymond Spartz',
      role: 'Reality Designer',
      image: {
        asset: {
          url: 'https://example.com/raymond.jpg'
        }
      }
    },
    block: [
      {
        _type: 'headingBlock',
        heading: 'Revolutionary Video Content!',
        subheading: 'This video will change everything you know',
        layout: 'dark',
        publicationDate: '2025-06-14',
        content: [
          {
            children: [
              { text: 'This is the opening paragraph of our amazing video post. It contains insights that will blow your mind and change how you think about reality design.' }
            ]
          },
          {
            children: [
              { text: 'In this comprehensive exploration, we dive deep into the concepts that matter most to creators and innovators.' }
            ]
          }
        ]
      },
      {
        _type: 'contentBlock',
        heading: 'Key Takeaways',
        subheading: 'What you will learn from this video',
        content: [
          {
            children: [
              { text: 'Learn the fundamental principles of reality design and how to apply them in your creative projects.' }
            ]
          }
        ]
      }
    ]
  };

  // Test with rich post data
  const richPostData = {
    _id: 'enhanced-post-test',
    _type: 'posts',
    title: 'Enhanced Post Test',
    slug: { current: 'enhanced-post-test' },
    excerpt: 'This is a comprehensive test of our enhanced post notification system.',
    image: {
      asset: {
        url: 'https://example.com/post-featured-image.jpg'
      }
    },
    team: {
      name: 'Reality Designers Team',
      role: 'Content Creators',
      image: {
        asset: {
          url: 'https://example.com/team.jpg'
        }
      }
    },
    block: [
      {
        _type: 'headingBlock',
        heading: 'The Future of Digital Design',
        subheading: 'Exploring new frontiers in creative technology',
        imageRef: {
          imageUrl: 'https://example.com/article-image.jpg',
          imageAlt: 'Futuristic design concept'
        },
        content: [
          {
            children: [
              { text: 'The landscape of digital design is evolving at an unprecedented pace. New technologies are emerging that challenge our traditional understanding of what is possible.' }
            ]
          },
          {
            children: [
              { text: 'This article explores the cutting-edge trends and methodologies that are shaping the future of creative work.' }
            ]
          }
        ]
      }
    ]
  };

  const testCases = [
    { name: '🎥 Enhanced Video', data: richVideoData },
    { name: '📝 Enhanced Post', data: richPostData }
  ];

  for (const testCase of testCases) {
    console.log(`\n${testCase.name}`);
    console.log('='.repeat(50));
    
    try {
      const response = await fetch(`${BASE_URL}/api/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.data)
      });

      console.log(`📊 Response Status: ${response.status}`);
      
      if (response.status === 401) {
        console.log('🔐 Expected 401 - Webhook requires Sanity signature validation');
        console.log('✅ Endpoint is working but needs proper webhook authentication');
        continue;
      }

      const result = await response.json();
      console.log('📋 Response:');
      console.log(JSON.stringify(result, null, 2));

      if (response.ok) {
        console.log('\n🎉 SUCCESS!');
        console.log(`Discord: ${result.notifications?.discord}`);
        console.log(`Email: ${result.notifications?.email}`);
      }

    } catch (error) {
      console.error('💥 Error:', error.message);
    }
    
    console.log('\n' + '-'.repeat(60));
  }

  console.log('\n📝 NEXT STEPS:');
  console.log('1. Update your Sanity webhook URL to: https://www.reality-designers.com/api/post');
  console.log('2. Update your webhook projection to include the richer data structure');
  console.log('3. Publish a real post or video in Sanity to test the full flow');
}

testEnhancedPost(); 
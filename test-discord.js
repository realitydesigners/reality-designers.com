// Test Discord API endpoint
// Run with: node test-discord.js

const BASE_URL = 'http://localhost:3000';
const ENDPOINT = '/api/discord';

async function testDiscordEndpoint() {
  console.log('Testing Discord API endpoint...\n');

  // Test data
  const testCases = [
    {
      name: 'Blog Post',
      data: {
        _id: 'test-post-123',
        _type: 'posts',
        title: 'Test Blog Post',
        slug: 'test-blog-post',
        heading: 'This is a Test Blog Post',
        excerpt: 'Testing the Discord webhook integration'
      }
    },
    {
      name: 'Video Post',
      data: {
        _id: 'test-video-123',
        _type: 'video',
        title: 'Test Video',
        slug: 'test-video',
        heading: 'This is a Test Video',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
    },
    {
      name: 'Invalid Data (should fail)',
      data: {
        _id: 'test-invalid-123',
        _type: 'invalid',
        title: 'Invalid Type'
      }
    }
  ];

  for (const testCase of testCases) {
    console.log(`\n🧪 Testing: ${testCase.name}`);
    console.log('Data:', JSON.stringify(testCase.data, null, 2));
    
    try {
      const response = await fetch(`${BASE_URL}${ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.data)
      });

      const result = await response.json();
      
      console.log(`Status: ${response.status}`);
      console.log('Response:', result);
      
      if (response.ok) {
        console.log('✅ Success - Check Discord for the message!');
      } else {
        console.log('❌ Failed as expected or error occurred');
      }
      
    } catch (error) {
      console.error('❌ Error making request:', error.message);
    }
    
    console.log('-'.repeat(50));
  }
}

// Run the tests
testDiscordEndpoint().catch(console.error); 
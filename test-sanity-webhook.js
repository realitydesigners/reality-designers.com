// Test what Sanity webhook would send
// Run with: node test-sanity-webhook.js

const WEBHOOK_URL = 'https://www.reality-designers.com/api/discord';
// const WEBHOOK_URL = 'http://localhost:3000/api/discord'; // Use this for local testing

async function testSanityWebhook() {
  console.log('Testing Sanity webhook simulation...\n');

  // This matches your Sanity webhook projection exactly
  const sanityWebhookData = {
    _id: 'test-video-123',
    _type: 'video',
    title: 'Test Video from Sanity',
    slug: 'test-video-slug',
    heading: 'This is a test video heading',
    excerpt: 'This is a test excerpt',
    imageUrl: 'https://example.com/test-image.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  };

  console.log('📤 Sending data (as Sanity would):');
  console.log(JSON.stringify(sanityWebhookData, null, 2));

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanityWebhookData)
    });

    console.log(`\nResponse Status: ${response.status}`);
    
    const result = await response.text();
    console.log('Response Body:', result);

    if (response.ok) {
      console.log('\n✅ Success! Check Discord for the message.');
    } else {
      console.log('\n❌ Failed. Check the error above.');
    }

  } catch (error) {
    console.error('\n❌ Network error:', error.message);
  }
}

testSanityWebhook(); 
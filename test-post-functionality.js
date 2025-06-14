// Test the functionality using the test endpoint
const BASE_URL = 'http://localhost:3000';

async function testFunctionality() {
  console.log('🧪 Testing /api/post-test endpoint functionality...\n');

  const testData = {
    _id: 'test-video-functionality',
    _type: 'video',
    title: 'Functionality Test Video',
    slug: { current: 'functionality-test-video' },
    block: [{
      heading: 'Testing Discord & Email Integration!',
      subheading: 'This tests our complete notification system'
    }],
    excerpt: 'Testing our consolidated notification system',
    imageUrl: 'https://example.com/test-image.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  };

  console.log('📤 Testing with video data:');
  console.log(JSON.stringify(testData, null, 2));

  try {
    const response = await fetch(`${BASE_URL}/api/post-test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log(`\n📊 Response Status: ${response.status}`);
    
    const result = await response.json();
    console.log('\n📋 Response:');
    console.log(JSON.stringify(result, null, 2));

    if (response.ok) {
      console.log('\n🎉 SUCCESS!');
      console.log(`Discord: ${result.notifications.discord}`);
      console.log(`Email: ${result.notifications.email}`);
      console.log(`Content URL: ${result.content.url}`);
      console.log('\n📢 Check Discord and your email inbox!');
    } else {
      console.log('\n❌ FAILED');
    }

  } catch (error) {
    console.error('\n💥 Error:', error.message);
  }
}

testFunctionality(); 
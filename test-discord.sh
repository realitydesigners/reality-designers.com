#!/bin/bash

# Test Discord API endpoint
# Make sure your Next.js app is running first (npm run dev)

BASE_URL="http://localhost:3000"
ENDPOINT="/api/discord"

echo "Testing Discord API endpoint..."

# Test 1: Test with a blog post
echo -e "\n1. Testing with blog post data:"
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "test-post-123",
    "_type": "posts",
    "title": "Test Blog Post",
    "slug": "test-blog-post",
    "heading": "This is a Test Blog Post",
    "excerpt": "Testing the Discord webhook integration"
  }' \
  ${BASE_URL}${ENDPOINT}

echo -e "\n\n2. Testing with video data:"
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "test-video-123",
    "_type": "video",
    "title": "Test Video",
    "slug": "test-video",
    "heading": "This is a Test Video",
    "videoUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }' \
  ${BASE_URL}${ENDPOINT}

echo -e "\n\n3. Testing with invalid data (should return 400):"
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "_id": "test-invalid-123",
    "_type": "invalid",
    "title": "Invalid Type"
  }' \
  ${BASE_URL}${ENDPOINT}

echo -e "\n\nTests completed!" 
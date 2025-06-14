// Setup Discord webhook in Sanity
// Run with: node setup-discord-webhook.js

const { createClient } = require('@sanity/client');

// You'll need to get your management token from Sanity
const SANITY_MANAGEMENT_TOKEN = process.env.SANITY_MANAGEMENT_TOKEN;
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;

// Your Discord API endpoint
const WEBHOOK_URL = 'https://your-domain.com/api/discord'; // Change this to your actual domain

async function setupDiscordWebhook() {
  if (!SANITY_MANAGEMENT_TOKEN) {
    console.error('❌ Please set SANITY_MANAGEMENT_TOKEN environment variable');
    console.log('Get it from: https://www.sanity.io/manage/personal/tokens');
    return;
  }

  const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: '2024-02-21',
    token: SANITY_MANAGEMENT_TOKEN,
    useCdn: false
  });

  try {
    const webhook = await client.request({
      method: 'POST',
      uri: `/projects/${PROJECT_ID}/hooks`,
      body: {
        name: 'Discord Notifications',
        url: WEBHOOK_URL,
        httpMethod: 'POST',
        apiVersion: '2024-02-21',
        includeDrafts: false,
        headers: {
          'Content-Type': 'application/json'
        },
        trigger: 'transition',
        filter: '_type == "posts" || _type == "video"',
        description: 'Send notifications to Discord when posts or videos are published'
      }
    });

    console.log('✅ Discord webhook created successfully!');
    console.log('Webhook ID:', webhook.id);
    console.log('Webhook URL:', webhook.url);
  } catch (error) {
    console.error('❌ Error creating webhook:', error);
  }
}

setupDiscordWebhook(); 
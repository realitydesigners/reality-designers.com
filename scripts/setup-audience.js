#!/usr/bin/env node

/**
 * Reality Designers - Audience Setup Script
 * 
 * This script helps you set up your email audience for notifications
 * Run with: node scripts/setup-audience.js
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function setupAudience() {
  console.log('\n🎬 Reality Designers - Email Audience Setup\n');
  
  const baseUrl = await question('Enter your website URL (e.g., http://localhost:3000): ');
  
  console.log('\n📋 First, let\'s create your audience...\n');
  
  try {
    // Create audience
    const createResponse = await fetch(`${baseUrl}/api/audience`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create-audience',
        name: 'Reality Designers Newsletter'
      })
    });
    
    const createResult = await createResponse.json();
    
    if (createResult.success) {
      console.log('✅ Audience created successfully!');
      console.log(`📧 Audience ID: ${createResult.audience.id}`);
      console.log(`📧 Audience Name: ${createResult.audience.name}`);
      
      console.log('\n📝 Add this to your .env.local file:');
      console.log(`RESEND_AUDIENCE_ID=${createResult.audience.id}`);
      
      const addContacts = await question('\nWould you like to add some test contacts? (y/n): ');
      
      if (addContacts.toLowerCase() === 'y') {
        let addAnother = true;
        
        while (addAnother) {
          const email = await question('Enter email address: ');
          const firstName = await question('Enter first name (optional): ');
          const lastName = await question('Enter last name (optional): ');
          
          try {
            const contactResponse = await fetch(`${baseUrl}/api/audience`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                action: 'add-contact',
                email,
                firstName: firstName || undefined,
                lastName: lastName || undefined,
                audienceId: createResult.audience.id
              })
            });
            
            const contactResult = await contactResponse.json();
            
            if (contactResult.success) {
              console.log(`✅ Added ${email} to audience`);
            } else {
              console.log(`❌ Failed to add ${email}: ${contactResult.error}`);
            }
          } catch (error) {
            console.log(`❌ Error adding contact: ${error.message}`);
          }
          
          const another = await question('Add another contact? (y/n): ');
          addAnother = another.toLowerCase() === 'y';
        }
      }
      
      console.log('\n🎉 Setup complete!');
      console.log('\n📋 Next steps:');
      console.log('1. Add RESEND_AUDIENCE_ID to your .env.local file');
      console.log('2. Set EMAIL_TEST_MODE=false in .env.local to enable production mode');
      console.log('3. Deploy your changes to production');
      console.log('4. Test by publishing content in Sanity!');
      
    } else {
      console.log('❌ Failed to create audience:', createResult.error);
    }
    
  } catch (error) {
    console.log('❌ Setup error:', error.message);
    console.log('\n💡 Make sure your server is running and the API endpoints are accessible');
  }
  
  rl.close();
}

async function listAudiences() {
  const baseUrl = await question('Enter your website URL (e.g., http://localhost:3000): ');
  
  try {
    const response = await fetch(`${baseUrl}/api/audience?action=list-audiences`);
    const result = await response.json();
    
    if (result.success) {
      console.log('\n📋 Your current audiences:');
      result.audiences.data.forEach((audience, index) => {
        console.log(`${index + 1}. ${audience.name} (ID: ${audience.id})`);
      });
    } else {
      console.log('❌ Failed to list audiences:', result.error);
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
  
  rl.close();
}

async function main() {
  const action = await question('What would you like to do?\n1. Create new audience\n2. List existing audiences\nEnter choice (1/2): ');
  
  if (action === '1') {
    await setupAudience();
  } else if (action === '2') {
    await listAudiences();
  } else {
    console.log('Invalid choice');
    rl.close();
  }
}

main().catch(console.error); 
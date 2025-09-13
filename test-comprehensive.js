// 🧪 COMPREHENSIVE AI SYSTEM TEST
const fetch = require('node-fetch');

const API_URL = 'http://localhost:3006/api/ai';

async function testAI(message, description) {
    try {
        console.log(`\n🧪 Testing: ${description}`);
        console.log(`📤 Message: "${message}"`);
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userMessage: message,
                userRole: 'victim',
                userLocation: 'Test Location'
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log(`✅ Response Type: ${data.agentType}`);
        console.log(`📥 Message Preview: ${data.message.substring(0, 100)}...`);
        
        return data;
    } catch (error) {
        console.log(`❌ Test failed: ${error.message}`);
        return null;
    }
}

async function runTests() {
    console.log('🚀 Starting AI System Tests...\n');
    
    // Test 1: Normal chat - fire safety question
    await testAI('help with fire', 'Normal fire safety question');
    
    // Test 2: Normal chat - medical question  
    await testAI('first aid tips', 'Normal medical question');
    
    // Test 3: Normal chat - building/window question
    await testAI('there is window', 'Building safety question');
    
    // Test 4: Emergency number mention
    await testAI('should I call 911', 'Emergency number mention');
    
    // Test 5: Fire emergency command (should activate agent)
    await testAI('/fire', 'Fire emergency activation');
    
    // Test 6: Medical emergency command (should activate agent)
    await testAI('/medical', 'Medical emergency activation');
    
    // Test 7: General help
    await testAI('help', 'General help request');
    
    // Test 8: Greeting
    await testAI('hello', 'Greeting message');
    
    console.log('\n🎉 All tests completed!');
}

runTests().catch(console.error);
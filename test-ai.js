// Quick AI Test Script
const fetch = require('node-fetch');

async function testAI() {
    try {
        console.log('🧪 Testing AI API...');
        
        // Test 1: Normal greeting
        console.log('\n1. Testing normal greeting...');
        const response1 = await fetch('http://localhost:3006/api/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: { name: 'Test User', role: 'member' },
                message: 'hello AI',
                isEmergency: false
            })
        });
        
        if (response1.ok) {
            const result1 = await response1.json();
            console.log('✅ Normal response:', result1.response);
        } else {
            console.log('❌ Normal test failed:', response1.status);
        }
        
        // Test 2: Emergency detection
        console.log('\n2. Testing emergency detection...');
        const response2 = await fetch('http://localhost:3006/api/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: { name: 'Test User', role: 'member' },
                message: 'help there is a fire emergency',
                isEmergency: true
            })
        });
        
        if (response2.ok) {
            const result2 = await response2.json();
            console.log('✅ Emergency response:', result2.response);
        } else {
            console.log('❌ Emergency test failed:', response2.status);
        }
        
        console.log('\n🎉 AI Testing completed!');
        
    } catch (error) {
        console.error('❌ Test error:', error.message);
    }
}

testAI();

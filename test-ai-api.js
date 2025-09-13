// 🧪 SIMPLE AI API TEST - Check if /api/ai works
const fs = require('fs');

async function testAIAPI() {
    console.log('🧪 Testing AI API endpoints...\n');
    
    try {
        // Test 1: Fire Emergency
        console.log('🔥 TEST 1: Fire Emergency');
        const fireResponse = await fetch('http://localhost:3006/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userMessage: '/fire',
                emergencyActive: true,
                emergencyType: 'fire',
                userRole: 'victim'
            })
        });
        
        if (fireResponse.ok) {
            const fireData = await fireResponse.json();
            console.log('✅ Fire test successful!');
            console.log('📄 Response:', fireData.message?.substring(0, 100) + '...');
            console.log('🏷️ Agent:', fireData.agentName);
        } else {
            console.log('❌ Fire test failed:', fireResponse.status);
        }
        
        console.log('\n');
        
        // Test 2: Normal Chat
        console.log('💬 TEST 2: Normal Chat');
        const normalResponse = await fetch('http://localhost:3006/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userMessage: 'hello',
                emergencyActive: false,
                userRole: 'victim'
            })
        });
        
        if (normalResponse.ok) {
            const normalData = await normalResponse.json();
            console.log('✅ Normal chat test successful!');
            console.log('📄 Response:', normalData.message?.substring(0, 100) + '...');
            console.log('🏷️ Agent:', normalData.agentName);
        } else {
            console.log('❌ Normal chat test failed:', normalResponse.status);
        }
        
        console.log('\n');
        
        // Test 3: Health Check
        console.log('🏥 TEST 3: Health Check');
        const healthResponse = await fetch('http://localhost:3006/api/ai/health');
        
        if (healthResponse.ok) {
            const healthData = await healthResponse.json();
            console.log('✅ Health check successful!');
            console.log('📊 Status:', healthData.status);
            console.log('🛠️ Features:', Object.keys(healthData.features || {}));
        } else {
            console.log('❌ Health check failed:', healthResponse.status);
        }
        
        console.log('\n✅ ALL TESTS COMPLETED!');
        
    } catch (error) {
        console.error('❌ Test error:', error.message);
    }
}

// Run the test
testAIAPI();

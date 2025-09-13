// 🧪 QUICK AI TEST - Test Fixed System
const fetch = require('node-fetch');

async function quickTest() {
    console.log('🧪 TESTING FIXED AI SYSTEM...\n');
    
    try {
        // Test 1: Normal conversation
        console.log('1. Testing normal chat...');
        const response1 = await fetch('http://localhost:3006/api/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userMessage: 'hello how are you',
                userRole: 'member'
            })
        });
        
        if (response1.ok) {
            const result1 = await response1.json();
            console.log('✅ Normal chat works!');
            console.log('   Response:', result1.response.substring(0, 50) + '...');
            console.log('   Processing time:', result1.processingTime + 'ms');
        } else {
            console.log('❌ Normal chat failed:', response1.status);
        }
        
        // Test 2: Window/building question
        console.log('\n2. Testing building safety...');
        const response2 = await fetch('http://localhost:3006/api/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userMessage: 'window is open at ground floor',
                userRole: 'member'
            })
        });
        
        if (response2.ok) {
            const result2 = await response2.json();
            console.log('✅ Building safety works!');
            console.log('   Agent type:', result2.agentType);
            console.log('   Processing time:', result2.processingTime + 'ms');
        } else {
            console.log('❌ Building safety failed:', response2.status);
        }
        
        // Test 3: Fire emergency
        console.log('\n3. Testing fire emergency...');
        const response3 = await fetch('http://localhost:3006/api/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userMessage: '/fire help me there is a fire',
                userRole: 'victim'
            })
        });
        
        if (response3.ok) {
            const result3 = await response3.json();
            console.log('✅ Fire emergency works!');
            console.log('   Agent type:', result3.agentType);
            console.log('   Emergency detected:', result3.emergencyDetected);
            console.log('   Processing time:', result3.processingTime + 'ms');
        } else {
            console.log('❌ Fire emergency failed:', response3.status);
        }
        
        console.log('\n🎉 FIXED AI SYSTEM TESTING COMPLETE!');
        
    } catch (error) {
        console.error('❌ Test error:', error.message);
    }
}

quickTest();
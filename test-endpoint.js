// 🧪 QUICK API ENDPOINT TEST
// Tests the coordinator endpoint directly

console.log('🧪 TESTING COORDINATOR ENDPOINT');
console.log('='.repeat(40));

async function testCoordinatorEndpoint() {
    try {
        const testData = {
            userMessage: "hello how are you",
            userID: "test_user",
            location: "Test Location",
            details: {
                userRole: "member",
                userName: "Test User"
            }
        };

        console.log('📤 Sending test request to /api/coordinator...');
        console.log('Request data:', testData);

        const response = await fetch('http://localhost:3006/api/coordinator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });

        console.log('📡 Response status:', response.status);
        console.log('📡 Response statusText:', response.statusText);

        if (response.ok) {
            const data = await response.json();
            console.log('✅ SUCCESS! Coordinator endpoint working');
            console.log('📥 Response data:', data);
            console.log('🤖 Agent Type:', data.agentType);
            console.log('🚨 Emergency Active:', data.emergencyActive);
            console.log('📊 Source:', data.source);
            console.log('💬 Response Preview:', data.response.substring(0, 100) + '...');
        } else {
            const errorText = await response.text();
            console.log('❌ FAILED! Response not OK');
            console.log('Error:', errorText);
        }

    } catch (error) {
        console.error('❌ Network error:', error.message);
    }
}

async function testFireEmergency() {
    try {
        console.log('\n🔥 TESTING FIRE EMERGENCY ENDPOINT');
        console.log('='.repeat(40));

        const fireTestData = {
            userMessage: "/fire help me",
            userID: "test_fire_user",
            location: "Building Floor 9",
            details: {
                userRole: "member",
                userName: "Test Fire User"
            }
        };

        console.log('📤 Sending fire emergency request...');
        
        const response = await fetch('http://localhost:3006/api/coordinator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fireTestData)
        });

        console.log('📡 Response status:', response.status);

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Fire emergency endpoint working!');
            console.log('🔥 Agent Type:', data.agentType);
            console.log('🚨 Emergency Active:', data.emergencyActive);
            console.log('🆔 Emergency ID:', data.emergencyID);
            console.log('📊 Source:', data.source);
            console.log('💬 Fire Response:', data.response.substring(0, 200) + '...');
        } else {
            const errorText = await response.text();
            console.log('❌ Fire emergency test failed');
            console.log('Error:', errorText);
        }

    } catch (error) {
        console.error('❌ Fire emergency test error:', error.message);
    }
}

// Run tests
testCoordinatorEndpoint().then(() => {
    return testFireEmergency();
}).then(() => {
    console.log('\n🏁 All tests completed!');
}).catch(error => {
    console.error('Test suite error:', error);
});
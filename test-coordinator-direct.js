// 🧪 DIRECT COORDINATOR TEST
// Test the coordinator without server HTTP layer

const coordinator = require('./coordinator');

async function testCoordinator() {
    console.log('🧪 Testing Coordinator directly...\n');
    
    try {
        // Test 1: Fire emergency with contextual details
        console.log('🔥 TEST 1: Fire Emergency with locked door');
        const fireResponse = await coordinator.handleRequest(
            '/fire Help! There is a fire on the 9th floor and the door is locked',
            {
                userID: 'test_user_123',
                location: 'Building A, 9th floor',
                details: { situation: 'locked_door' }
            }
        );
        
        console.log('Fire Response:', JSON.stringify(fireResponse, null, 2));
        console.log('\n');
        
        // Test 2: Regular chat
        console.log('💬 TEST 2: Normal Chat');
        const chatResponse = await coordinator.handleRequest(
            'Hello, how are you?',
            { userID: 'test_user_456' }
        );
        
        console.log('Chat Response:', JSON.stringify(chatResponse, null, 2));
        console.log('\n');
        
        // Test 3: Medical emergency
        console.log('🏥 TEST 3: Medical Emergency');
        const medicalResponse = await coordinator.handleRequest(
            '/medical My friend collapsed and is not breathing',
            {
                userID: 'test_user_789',
                location: 'Office lobby',
                details: { situation: 'unconscious' }
            }
        );
        
        console.log('Medical Response:', JSON.stringify(medicalResponse, null, 2));
        
        console.log('\n✅ All direct coordinator tests completed!');
        
    } catch (error) {
        console.error('❌ Coordinator test error:', error);
        console.error('Stack:', error.stack);
    }
}

testCoordinator();
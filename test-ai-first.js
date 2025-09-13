// 🧪 TEST UPDATED AI-FIRST SYSTEM
const coordinator = require('./coordinator');

async function testAIFirst() {
    console.log('🧪 Testing UPDATED AI-First System...\n');
    
    try {
        // Test 1: Fire emergency with AI response
        console.log('🔥 TEST 1: Fire Emergency (should be AI-first now)');
        const fireResponse = await coordinator.handleRequest(
            '/fire Help! There is a fire on the 9th floor and the door is locked',
            {
                userID: 'test_user_123',
                location: 'Building A, 9th floor',
                details: { situation: 'locked_door' }
            }
        );
        
        console.log('Fire Response Source:', fireResponse.source);
        console.log('Fire Response Preview:', fireResponse.response.substring(0, 100) + '...');
        console.log('\n');
        
        // Test 2: Normal chat (should be AI now)
        console.log('💬 TEST 2: Normal Chat (should be AI-first now)');
        const chatResponse = await coordinator.handleRequest(
            'Hello, how are you doing today?',
            { userID: 'test_user_456', location: 'Downtown' }
        );
        
        console.log('Chat Response Source:', chatResponse.source);
        console.log('Chat Response Preview:', chatResponse.response.substring(0, 100) + '...');
        console.log('\n');
        
        // Test 3: Medical emergency (should be AI now)
        console.log('🏥 TEST 3: Medical Emergency (should be AI-first now)');
        const medicalResponse = await coordinator.handleRequest(
            '/medical My friend collapsed and is not breathing properly',
            {
                userID: 'test_user_789',
                location: 'Office lobby',
                details: { situation: 'unconscious' }
            }
        );
        
        console.log('Medical Response Source:', medicalResponse.source);
        console.log('Medical Response Preview:', medicalResponse.response.substring(0, 100) + '...');
        console.log('\n');
        
        // Test 4: Contextual question
        console.log('🤔 TEST 4: Contextual Question (should be AI-first now)');
        const contextResponse = await coordinator.handleRequest(
            'What should I do if I smell gas in my apartment?',
            { userID: 'test_user_999', location: 'Apartment 4B' }
        );
        
        console.log('Context Response Source:', contextResponse.source);
        console.log('Context Response Preview:', contextResponse.response.substring(0, 100) + '...');
        
        console.log('\n✅ All AI-first tests completed!');
        console.log('\n📊 SUMMARY:');
        console.log('- Fire Emergency Source:', fireResponse.source);
        console.log('- Normal Chat Source:', chatResponse.source);
        console.log('- Medical Emergency Source:', medicalResponse.source);
        console.log('- Contextual Question Source:', contextResponse.source);
        
        // Check if we're getting AI responses
        const aiSources = [fireResponse.source, chatResponse.source, medicalResponse.source, contextResponse.source]
            .filter(source => source && source.includes('openai'));
        
        console.log(`\n🎯 AI Sources Found: ${aiSources.length}/4`);
        if (aiSources.length >= 3) {
            console.log('🎉 SUCCESS: System is now AI-first!');
        } else {
            console.log('⚠️  Some responses still using fallbacks');
        }
        
    } catch (error) {
        console.error('❌ Test error:', error);
        console.error('Stack:', error.stack);
    }
}

testAIFirst();
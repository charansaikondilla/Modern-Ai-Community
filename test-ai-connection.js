// 🧪 TEST AI API CONNECTION
const aiAgent = require('./agents/ai-agent');

async function testAI() {
    console.log('🧪 Testing AI API Connection...\n');
    
    // Check status
    const status = aiAgent.getStatus();
    console.log('📊 AI Agent Status:', status);
    
    // Test connection
    const connectionTest = await aiAgent.testConnection();
    console.log('🔗 Connection Test:', connectionTest);
    
    if (connectionTest.success) {
        console.log('\n✅ AI API is working! Testing emergency response...');
        
        // Test emergency response
        const emergencyResponse = await aiAgent.callOpenAI(
            'You are a fire emergency specialist. Provide immediate, specific fire safety advice.',
            'Help! There is a fire on the 9th floor and the door is locked!',
            { max_tokens: 200 }
        );
        
        console.log('\n🔥 Emergency AI Response:');
        console.log(emergencyResponse);
        
        // Test normal chat
        const chatResponse = await aiAgent.callOpenAI(
            'You are a helpful emergency preparedness assistant.',
            'Hello, how are you?',
            { max_tokens: 100 }
        );
        
        console.log('\n💬 Normal Chat AI Response:');
        console.log(chatResponse);
        
    } else {
        console.log('\n❌ AI API not working:', connectionTest.error);
    }
}

testAI().catch(console.error);
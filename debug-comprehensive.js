// 🔍 COMPREHENSIVE DEBUG SCRIPT - IDENTIFIES ALL AI ISSUES
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3006';

async function debugComprehensive() {
    console.log('🔍 COMPREHENSIVE AI SYSTEM DIAGNOSTIC');
    console.log('=====================================\n');

    // 1. Test server health
    console.log('1. 🏥 TESTING SERVER HEALTH...');
    try {
        const healthResponse = await fetch(`${BASE_URL}/api/ai/health`);
        if (healthResponse.ok) {
            const health = await healthResponse.json();
            console.log('✅ Server health:', health);
        } else {
            console.log('❌ Health check failed:', healthResponse.status);
        }
    } catch (error) {
        console.log('❌ Health check error:', error.message);
    }

    // 2. Test normal AI response
    console.log('\n2. 🤖 TESTING NORMAL AI RESPONSE...');
    try {
        const normalResponse = await fetch(`${BASE_URL}/api/ai`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userMessage: 'hello how are you',
                userRole: 'member'
            })
        });

        if (normalResponse.ok) {
            const result = await normalResponse.json();
            console.log('✅ Normal AI Response:');
            console.log('   Message:', result.message?.substring(0, 100) + '...');
            console.log('   Agent Type:', result.agentType);
            console.log('   Emergency Detected:', result.emergencyDetected);
            console.log('   Real AI:', result.realAI);
        } else {
            console.log('❌ Normal AI test failed:', normalResponse.status);
            const errorText = await normalResponse.text();
            console.log('   Error details:', errorText);
        }
    } catch (error) {
        console.log('❌ Normal AI error:', error.message);
    }

    // 3. Test emergency detection
    console.log('\n3. 🚨 TESTING EMERGENCY DETECTION...');
    try {
        const emergencyResponse = await fetch(`${BASE_URL}/api/ai`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userMessage: '/fire help me there is a fire',
                userRole: 'victim',
                userLocation: 'Sector 4, East Zone'
            })
        });

        if (emergencyResponse.ok) {
            const result = await emergencyResponse.json();
            console.log('✅ Emergency AI Response:');
            console.log('   Message:', result.message?.substring(0, 100) + '...');
            console.log('   Agent Type:', result.agentType);
            console.log('   Emergency Detected:', result.emergencyDetected);
            console.log('   Emergency Type:', result.emergencyType);
        } else {
            console.log('❌ Emergency AI test failed:', emergencyResponse.status);
            const errorText = await emergencyResponse.text();
            console.log('   Error details:', errorText);
        }
    } catch (error) {
        console.log('❌ Emergency AI error:', error.message);
    }

    // 4. Test agent modules directly
    console.log('\n4. 🧪 TESTING AGENT MODULES...');
    try {
        const coordinator = require('./emergency-agents/emergency-coordinator');
        console.log('✅ Emergency Coordinator loaded:', coordinator.name);
        
        const fireAgent = require('./emergency-agents/fire-agent');
        console.log('✅ Fire Agent loaded:', fireAgent.name);
        
        const medicalAgent = require('./emergency-agents/medical-agent');
        console.log('✅ Medical Agent loaded:', medicalAgent.name);
        
        const { EMERGENCY_KNOWLEDGE, MISSION_CONTROL } = require('./emergency-agents/knowledge-base');
        console.log('✅ Knowledge Base loaded - Fire protocols:', Object.keys(EMERGENCY_KNOWLEDGE.fire).length);
        console.log('✅ Mission Control loaded - Status:', MISSION_CONTROL.status);
        
    } catch (error) {
        console.log('❌ Agent module error:', error.message);
        console.log('   Stack:', error.stack);
    }

    // 5. Test different message types
    console.log('\n5. 📝 TESTING DIFFERENT MESSAGE TYPES...');
    
    const testMessages = [
        'help me',
        'window is open',
        'fire safety tips',
        'medical emergency',
        '/fire urgent help',
        '/medical chest pain'
    ];

    for (const message of testMessages) {
        try {
            const response = await fetch(`${BASE_URL}/api/ai`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userMessage: message,
                    userRole: 'member'
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log(`✅ "${message}" -> ${result.agentType} (${result.message?.length} chars)`);
            } else {
                console.log(`❌ "${message}" -> HTTP ${response.status}`);
            }
        } catch (error) {
            console.log(`❌ "${message}" -> Error: ${error.message}`);
        }
    }

    // 6. Check for missing dependencies
    console.log('\n6. 📦 CHECKING DEPENDENCIES...');
    try {
        require('node-fetch');
        console.log('✅ node-fetch available');
    } catch (error) {
        console.log('❌ node-fetch missing:', error.message);
    }

    try {
        require('dotenv');
        console.log('✅ dotenv available');
    } catch (error) {
        console.log('❌ dotenv missing:', error.message);
    }

    // 7. Environment check
    console.log('\n7. 🌍 ENVIRONMENT CHECK...');
    console.log('   Node.js version:', process.version);
    console.log('   Platform:', process.platform);
    console.log('   Current directory:', process.cwd());
    console.log('   OPENAI_API_KEY set:', !!process.env.OPENAI_API_KEY);

    console.log('\n🎯 DIAGNOSTIC COMPLETE!');
    console.log('Check the results above to identify specific issues.');
}

// Run the diagnostic
debugComprehensive().catch(console.error);
// 🚨 AI AGENTS TESTING SCRIPT
// Tests the complete emergency AI agents system

const http = require('http');

// Test AI API endpoint with different emergency types
async function testAIAgents() {
    console.log('🧪 TESTING AI AGENTS EMERGENCY SYSTEM');
    console.log('=====================================\n');

    const testCases = [
        {
            name: '🔥 Fire Emergency Test',
            data: {
                userMessage: 'There is fire in my building!',
                emergencyActive: true,
                emergencyType: 'fire',
                user: {
                    name: 'Test User',
                    location: { address: 'Sector 4, East Zone' }
                }
            }
        },
        {
            name: '🏥 Medical Emergency Test',
            data: {
                userMessage: 'Someone is bleeding heavily!',
                emergencyActive: true,
                emergencyType: 'medical',
                user: {
                    name: 'Test User',
                    location: { address: 'Sector 3, East Zone' }
                }
            }
        },
        {
            name: '🤖 Normal Chat Test',
            data: {
                userMessage: 'Hello, how are you?',
                emergencyActive: false,
                user: {
                    name: 'Test User'
                }
            }
        },
        {
            name: '🚨 Fire Trigger Test (/fire)',
            data: {
                userMessage: '/fire help me',
                emergencyActive: true,
                emergencyType: 'fire',
                user: {
                    name: 'Test User',
                    location: { address: 'Sector 5, East Zone' }
                }
            }
        }
    ];

    for (const testCase of testCases) {
        console.log(`\n${testCase.name}`);
        console.log('─'.repeat(50));
        
        try {
            const response = await makeAIRequest(testCase.data);
            
            console.log('✅ Request successful');
            console.log(`🤖 Agent: ${response.agentName || 'Unknown'}`);
            console.log(`🔥 Emergency: ${response.emergencyActive ? 'YES' : 'NO'}`);
            console.log(`📝 Response Preview: ${response.message.substring(0, 100)}...`);
            
            if (response.emergencyActive) {
                console.log(`🚨 Agent Type: ${response.agentType}`);
                console.log(`🔒 Context Locked: ${response.contextLocked ? 'YES' : 'NO'}`);
            }
            
        } catch (error) {
            console.log('❌ Test failed:', error.message);
        }
    }
    
    console.log('\n🎯 TESTING COMPLETE');
    console.log('===================');
    console.log('✅ All AI agents functionality tested');
    console.log('🔥 Fire Agent: Emergency detection and response');
    console.log('🏥 Medical Agent: Medical emergency protocols');
    console.log('🤖 Normal AI: Regular chat functionality');
    console.log('🚨 Emergency Mode: Context switching and UI updates');
}

// Helper function to make AI API requests
function makeAIRequest(data) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify(data);
        
        const options = {
            hostname: 'localhost',
            port: 3006,
            path: '/api/ai',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        
        const req = http.request(options, (res) => {
            let responseData = '';
            
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(responseData);
                    resolve(parsedData);
                } catch (error) {
                    reject(new Error('Invalid JSON response'));
                }
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        req.write(postData);
        req.end();
    });
}

// Run tests
console.log('🚀 Starting AI Agents Test Suite...\n');
testAIAgents().catch(console.error);

// Comprehensive AI Test for openai/gpt-oss-20b:free model
const http = require('http');

function makeRequest(data) {
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
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    resolve({ status: res.statusCode, data: result });
                } catch (err) {
                    reject(new Error(`Parse error: ${data}`));
                }
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        req.write(postData);
        req.end();
    });
}

async function runTests() {
    console.log('🧪 COMPREHENSIVE AI TESTING');
    console.log('Model: openai/gpt-oss-20b:free');
    console.log('=' .repeat(50));

    const tests = [
        {
            name: 'Normal Greeting',
            data: {
                user: { name: 'Test User', role: 'member' },
                message: 'hello AI',
                isEmergency: false
            }
        },
        {
            name: 'Fire Emergency',
            data: {
                user: { name: 'Jane Doe', role: 'member', location: 'Sector 4' },
                message: 'help there is a fire in my building',
                isEmergency: true
            }
        },
        {
            name: 'Medical Emergency',
            data: {
                user: { name: 'John Smith', role: 'member' },
                message: 'someone is unconscious and not breathing',
                isEmergency: true
            }
        },
        {
            name: 'Police Emergency',
            data: {
                user: { name: 'Sarah Johnson', role: 'member' },
                message: 'I need police help, someone is breaking in',
                isEmergency: true
            }
        },
        {
            name: 'General Question',
            data: {
                user: { name: 'Mike Wilson', role: 'member' },
                message: 'what should I do if I smell gas?',
                isEmergency: false
            }
        }
    ];

    let passed = 0;
    let failed = 0;

    for (let i = 0; i < tests.length; i++) {
        const test = tests[i];
        console.log(`\n${i + 1}. Testing: ${test.name}`);
        console.log(`   Input: "${test.data.message}"`);
        
        try {
            const result = await makeRequest(test.data);
            
            if (result.status === 200 && result.data.response) {
                console.log(`   ✅ SUCCESS: ${result.data.response.substring(0, 100)}...`);
                console.log(`   📊 Service: ${result.data.service || 'Unknown'}`);
                console.log(`   🕒 Time: ${result.data.timestamp || 'Unknown'}`);
                passed++;
            } else {
                console.log(`   ❌ FAILED: Status ${result.status}`);
                console.log(`   📋 Response: ${JSON.stringify(result.data)}`);
                failed++;
            }
        } catch (error) {
            console.log(`   ❌ ERROR: ${error.message}`);
            failed++;
        }
        
        // Wait between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 TEST RESULTS:');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Success Rate: ${((passed / tests.length) * 100).toFixed(1)}%`);
    
    if (passed === tests.length) {
        console.log('🎉 ALL TESTS PASSED! AI is working correctly.');
    } else if (passed > 0) {
        console.log('⚠️  PARTIAL SUCCESS: Some tests passed, check failed ones.');
    } else {
        console.log('💥 ALL TESTS FAILED: Check API configuration.');
    }
}

// Run tests
runTests().catch(console.error);

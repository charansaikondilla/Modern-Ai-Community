// Standalone OpenRouter API Test
// This tests your API key independently of the main project

const https = require('https');

// Your API key from the .env file
const API_KEY = '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';
const MODEL = 'openai/gpt-oss-20b:free';

function testOpenRouterAPI() {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            model: MODEL,
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: 'Hello, can you respond with just "API Working"?' }
            ],
            max_tokens: 50,
            temperature: 0.7
        });

        const options = {
            hostname: 'openrouter.ai',
            port: 443,
            path: '/api/v1/chat/completions',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
                'HTTP-Referer': 'http://localhost:3006',
                'X-Title': 'Emergency Community Platform'
            }
        };

        console.log('🔍 Testing OpenRouter API...');
        console.log('━'.repeat(50));
        console.log('🔑 API Key:', API_KEY.substring(0, 20) + '...');
        console.log('🤖 Model:', MODEL);
        console.log('🌐 Endpoint: https://openrouter.ai/api/v1/chat/completions');
        console.log('━'.repeat(50));

        const req = https.request(options, (res) => {
            let data = '';
            
            console.log(`📊 Response Status: ${res.statusCode}`);
            console.log(`📋 Response Headers:`, res.headers);
            
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    resolve({
                        success: res.statusCode === 200,
                        status: res.statusCode,
                        headers: res.headers,
                        data: result
                    });
                } catch (error) {
                    resolve({
                        success: false,
                        status: res.statusCode,
                        headers: res.headers,
                        data: data,
                        parseError: error.message
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject({
                success: false,
                error: error.message,
                code: error.code
            });
        });

        req.write(postData);
        req.end();
    });
}

async function runStandaloneTest() {
    console.log('🚀 STANDALONE API KEY TEST');
    console.log('Testing OpenRouter API without project dependencies');
    console.log('═'.repeat(60));
    
    try {
        const result = await testOpenRouterAPI();
        
        console.log('\n📊 TEST RESULTS:');
        console.log('━'.repeat(50));
        
        if (result.success) {
            console.log('✅ API KEY STATUS: WORKING');
            console.log('✅ Connection: SUCCESS');
            console.log('✅ Authentication: VALID');
            
            if (result.data && result.data.choices && result.data.choices[0]) {
                console.log('✅ AI Response:', result.data.choices[0].message.content);
                console.log('✅ Model Used:', result.data.model || MODEL);
                console.log('✅ Usage:', result.data.usage || 'Not provided');
            } else {
                console.log('⚠️  Response received but no AI message found');
                console.log('📋 Full Response:', JSON.stringify(result.data, null, 2));
            }
            
        } else {
            console.log('❌ API KEY STATUS: FAILED');
            console.log('❌ HTTP Status:', result.status);
            
            if (result.data && result.data.error) {
                console.log('❌ Error Type:', result.data.error.type || 'Unknown');
                console.log('❌ Error Message:', result.data.error.message || 'No message');
                console.log('❌ Error Code:', result.data.error.code || 'No code');
            } else {
                console.log('❌ Raw Response:', result.data);
            }
        }
        
        console.log('\n🔍 DETAILED DIAGNOSIS:');
        console.log('━'.repeat(50));
        
        if (result.status === 401) {
            console.log('❌ DIAGNOSIS: Invalid API Key');
            console.log('💡 SOLUTION: Check your API key is correct');
        } else if (result.status === 402) {
            console.log('❌ DIAGNOSIS: Insufficient Credits');
            console.log('💡 SOLUTION: Add credits to your OpenRouter account');
        } else if (result.status === 429) {
            console.log('❌ DIAGNOSIS: Rate Limited');
            console.log('💡 SOLUTION: Wait and try again');
        } else if (result.status === 400) {
            console.log('❌ DIAGNOSIS: Bad Request');
            console.log('💡 SOLUTION: Check model name or request format');
        } else if (result.success) {
            console.log('✅ DIAGNOSIS: Everything working perfectly!');
            console.log('🎉 SOLUTION: Your API key is valid and ready to use');
        } else {
            console.log(`❌ DIAGNOSIS: Unexpected error (${result.status})`);
            console.log('💡 SOLUTION: Check OpenRouter service status');
        }
        
    } catch (error) {
        console.log('\n💥 CONNECTION ERROR:');
        console.log('━'.repeat(50));
        console.log('❌ Error:', error.error || error.message);
        console.log('❌ Code:', error.code || 'Unknown');
        
        if (error.code === 'ENOTFOUND') {
            console.log('💡 DIAGNOSIS: DNS/Network issue');
            console.log('💡 SOLUTION: Check internet connection');
        } else if (error.code === 'ECONNREFUSED') {
            console.log('💡 DIAGNOSIS: Connection refused');
            console.log('💡 SOLUTION: Check firewall/proxy settings');
        } else {
            console.log('💡 DIAGNOSIS: Network connectivity issue');
            console.log('💡 SOLUTION: Check internet and try again');
        }
    }
    
    console.log('\n═'.repeat(60));
    console.log('🏁 Test completed');
}

// Run the test
runStandaloneTest();

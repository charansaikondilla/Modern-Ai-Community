// Simple Health Check Test
const http = require('http');

function testHealth() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3006,
            path: '/api/ai/health',
            method: 'GET',
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
                    resolve({ status: res.statusCode, data: data });
                }
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        req.end();
    });
}

async function runHealthCheck() {
    console.log('🔍 Testing AI Health Check...');
    
    try {
        const result = await testHealth();
        console.log(`Status: ${result.status}`);
        console.log(`Response:`, result.data);
        
        if (result.status === 200) {
            console.log('✅ API is responding!');
        } else {
            console.log('❌ API not responding correctly');
        }
    } catch (error) {
        console.log('❌ Connection failed:', error.message);
    }
}

runHealthCheck();

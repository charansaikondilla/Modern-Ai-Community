#!/usr/bin/env node

const http = require('http');

const testData = JSON.stringify({
    mode: 'personal',
    user: {
        name: 'Test User',
        role: 'member',
        location: 'Test Location'
    },
    message: 'Hello AI, how are you today?',
    isEmergency: false
});

const options = {
    hostname: 'localhost',
    port: 3006,
    path: '/api/ai',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(testData)
    }
};

console.log('🧪 QUICK AI API TEST');
console.log('==================');
console.log('🔍 Testing personal AI chat...');

const req = http.request(options, (res) => {
    console.log(`📊 Status Code: ${res.statusCode}`);
    console.log(`📋 Headers:`, res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('\n📨 Response:');
        console.log('═══════════');
        try {
            const response = JSON.parse(data);
            console.log('✅ SUCCESS!');
            console.log('🤖 AI Response:', response.response);
            console.log('🔧 Service:', response.service);
            console.log('📊 Usage:', response.usage);
        } catch (e) {
            console.log('❌ FAILED - Raw response:');
            console.log(data);
        }
    });
});

req.on('error', (e) => {
    console.error('❌ ERROR:', e.message);
});

req.write(testData);
req.end();

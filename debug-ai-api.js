#!/usr/bin/env node

// Direct AI API Test Script
const http = require('http');

console.log('🔍 DEBUGGING AI API ISSUE');
console.log('============================');

const testData = JSON.stringify({
    mode: 'personal',
    user: {
        name: 'Test User',
        role: 'member',
        location: 'Test Location'
    },
    message: 'give me about emergencies response',
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

console.log('📤 Sending request to AI API...');
console.log('📋 Data:', JSON.parse(testData));

const req = http.request(options, (res) => {
    console.log(`\n📊 Response Status: ${res.statusCode}`);
    console.log(`📋 Response Headers:`, res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('\n📨 Raw Response:');
        console.log('=================');
        console.log(data);
        
        try {
            const response = JSON.parse(data);
            console.log('\n✅ PARSED RESPONSE:');
            console.log('==================');
            console.log('🤖 AI Response:', response.response || 'No response field');
            console.log('🔧 Service:', response.service || 'No service field');
            console.log('📊 Usage:', response.usage || 'No usage data');
            console.log('❌ Error:', response.error || 'No error');
            
            if (response.response) {
                console.log('\n🎉 SUCCESS! AI is working properly!');
            } else {
                console.log('\n❌ ISSUE: AI response is missing or empty');
            }
        } catch (e) {
            console.log('\n❌ JSON Parse Error:', e.message);
            console.log('🔍 This might indicate a server error or non-JSON response');
        }
    });
});

req.on('error', (e) => {
    console.error('\n❌ CONNECTION ERROR:', e.message);
    console.log('🔍 Make sure the server is running on port 3006');
});

req.write(testData);
req.end();

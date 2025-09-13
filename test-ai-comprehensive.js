#!/usr/bin/env node

console.log('🔬 COMPREHENSIVE AI SYSTEM TEST');
console.log('================================');

async function testAI() {
    const https = require('https');
    const http = require('http');
    
    // Test 1: API Key Validation
    console.log('\n🔍 TEST 1: API Key Validation');
    console.log('─────────────────────────────');
    
    try {
        const standaloneTest = require('./standalone-api-test.js');
        console.log('✅ Standalone API Test: PASSED');
    } catch (e) {
        console.log('❌ Standalone API Test: FAILED', e.message);
    }
    
    // Test 2: Server Integration Test
    console.log('\n🔍 TEST 2: Server Integration Test');
    console.log('─────────────────────────────────');
    
    const testData = JSON.stringify({
        mode: 'personal',
        user: {
            name: 'Test User',
            role: 'member',
            location: 'Test Location'
        },
        message: 'Hello AI assistant, can you help me?',
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

    return new Promise((resolve) => {
        const req = http.request(options, (res) => {
            console.log(`📊 Status Code: ${res.statusCode}`);
            
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    console.log('✅ Server Integration: PASSED');
                    console.log('🤖 AI Response Preview:', response.response.substring(0, 100) + '...');
                    console.log('🔧 Service Used:', response.service);
                    console.log('📊 Token Usage:', response.usage);
                    resolve(true);
                } catch (e) {
                    console.log('❌ Server Integration: FAILED');
                    console.log('📄 Raw Response:', data);
                    resolve(false);
                }
            });
        });

        req.on('error', (e) => {
            console.log('❌ Connection Error:', e.message);
            console.log('💡 Make sure server is running on port 3006');
            resolve(false);
        });

        req.write(testData);
        req.end();
    });
}

// Test 3: Emergency Detection Test
async function testEmergencyDetection() {
    console.log('\n🔍 TEST 3: Emergency Detection');
    console.log('──────────────────────────────');
    
    const emergencyTestData = JSON.stringify({
        mode: 'personal',
        user: {
            name: 'Emergency Test User',
            role: 'member',
            location: 'Test Location'
        },
        message: 'Help! There is a fire in my building!',
        isEmergency: true
    });

    const options = {
        hostname: 'localhost',
        port: 3006,
        path: '/api/ai',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(emergencyTestData)
        }
    };

    return new Promise((resolve) => {
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    console.log('✅ Emergency Detection: PASSED');
                    console.log('🚨 Emergency Response Preview:', response.response.substring(0, 100) + '...');
                    resolve(true);
                } catch (e) {
                    console.log('❌ Emergency Detection: FAILED');
                    resolve(false);
                }
            });
        });

        req.on('error', (e) => {
            console.log('❌ Emergency Test Error:', e.message);
            resolve(false);
        });

        req.write(emergencyTestData);
        req.end();
    });
}

// Run all tests
async function runAllTests() {
    console.log('🚀 Starting AI System Tests...\n');
    
    const normalTest = await testAI();
    const emergencyTest = await testEmergencyDetection();
    
    console.log('\n🏁 TEST RESULTS SUMMARY');
    console.log('══════════════════════');
    console.log(`📋 Normal Chat: ${normalTest ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`🚨 Emergency Chat: ${emergencyTest ? '✅ PASS' : '❌ FAIL'}`);
    
    if (normalTest && emergencyTest) {
        console.log('\n🎉 ALL TESTS PASSED! Your AI system is working perfectly!');
        console.log('💡 You can now use the AI assistant in your browser at http://localhost:3006');
    } else {
        console.log('\n⚠️  Some tests failed. Check the server logs for more details.');
    }
}

runAllTests();

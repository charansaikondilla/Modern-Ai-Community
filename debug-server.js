#!/usr/bin/env node

// Test if the AI API is actually receiving requests
const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Debug AI endpoint
app.post('/api/ai', async (req, res) => {
    console.log('\n🔍 AI API ENDPOINT HIT!');
    console.log('=======================');
    console.log('📥 Request Body:', JSON.stringify(req.body, null, 2));
    console.log('📋 Headers:', req.headers);
    
    try {
        // Check if API key exists
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'sk-or-v1-399e0c6e043bc8de78c41b62eb22c7b99eb062b8a6ae19ff68901dc0eba8b4f8b2cd5a4a32e1d87ead37bb3b78a6eb6cf';
        console.log('🔑 API Key exists:', OPENAI_API_KEY ? 'YES' : 'NO');
        console.log('🔑 API Key starts with:', OPENAI_API_KEY.substring(0, 20) + '...');
        
        // Simulate response
        const response = {
            response: 'Emergency Response Guide:\n\n🚨 IMMEDIATE EMERGENCIES:\n• Call 911 for life-threatening situations\n• Fire: GET OUT, call fire department\n• Medical: Assess breathing, bleeding, consciousness\n• Police: Report crimes or threats\n\n🩹 BASIC FIRST AID:\n• Control bleeding with direct pressure\n• CPR if no pulse\n• Clear airways if choking\n\n📞 EMERGENCY NUMBERS:\n• 911 - Police/Fire/Medical\n• Poison Control: 1-800-222-1222\n\nStay calm and provide clear information to responders!',
            service: 'debug-test',
            usage: { tokens: 100 }
        };
        
        console.log('✅ Sending response:', response);
        res.json(response);
        
    } catch (error) {
        console.log('❌ ERROR in AI endpoint:', error);
        res.status(500).json({ error: error.message });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3007; // Different port to avoid conflict
app.listen(PORT, () => {
    console.log(`🧪 DEBUG SERVER running at http://localhost:${PORT}`);
    console.log('🔍 This will help us debug the AI API issue');
});

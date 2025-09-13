// Direct API Test from Server Context
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'your-openai-api-key-here';

async function testServerAPI() {
    console.log('🧪 TESTING SERVER API CALL');
    console.log('============================');
    
    try {
        const fetch = (await import('node-fetch')).default;
        
        const messages = [
            { role: 'system', content: 'You are a helpful AI assistant for emergency situations.' },
            { role: 'user', content: 'what is modern community' }
        ];

        const isOpenRouter = OPENAI_API_KEY.startsWith('sk-or-v1-');
        const apiUrl = isOpenRouter 
            ? 'https://openrouter.ai/api/v1/chat/completions'
            : 'https://api.openai.com/v1/chat/completions';
        
        const model = isOpenRouter ? 'openai/gpt-oss-20b:free' : 'gpt-3.5-turbo';

        console.log('🔍 Configuration:');
        console.log('API URL:', apiUrl);
        console.log('Model:', model);
        console.log('API Key starts with:', OPENAI_API_KEY.substring(0, 20) + '...');

        console.log('\n📤 Making API call...');
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
                ...(isOpenRouter && {
                    'HTTP-Referer': 'http://localhost:3006',
                    'X-Title': 'Emergency Community Platform'
                })
            },
            body: JSON.stringify({
                model: model,
                messages: messages,
                max_tokens: 150,
                temperature: 0.5,
                top_p: 0.9,
                frequency_penalty: 0.1,
                presence_penalty: 0.1,
            }),
        });

        console.log('\n📊 Response Status:', response.status, response.statusText);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.log('❌ Error Response:', errorText);
            throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('\n✅ SUCCESS!');
        console.log('AI Response:', data.choices[0].message.content.trim());
        console.log('Usage:', data.usage);
        
    } catch (error) {
        console.error('\n❌ TEST FAILED:', error.message);
        console.error('Full error:', error);
    }
}

testServerAPI();

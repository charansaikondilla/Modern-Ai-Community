// Environment Test Script
require('dotenv').config();

console.log('🔍 ENVIRONMENT VARIABLE TEST');
console.log('=============================');
console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
console.log('OPENAI_API_KEY length:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0);
console.log('OPENAI_API_KEY starts with sk-or-v1-:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.startsWith('sk-or-v1-') : false);
console.log('OPENAI_API_KEY preview:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 20) + '...' : 'undefined');

// Test the actual condition from ai.js
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'your-openai-api-key-here';
const USE_MOCK_RESPONSES = OPENAI_API_KEY === 'your-openai-api-key-here';
const IS_OPENROUTER = OPENAI_API_KEY.startsWith('sk-or-v1-');

console.log('\n🤖 AI CONFIGURATION:');
console.log('USE_MOCK_RESPONSES:', USE_MOCK_RESPONSES);
console.log('IS_OPENROUTER:', IS_OPENROUTER);
console.log('AI Service Mode:', USE_MOCK_RESPONSES ? 'MOCK' : IS_OPENROUTER ? 'OPENROUTER' : 'OPENAI');

if (USE_MOCK_RESPONSES) {
    console.log('\n❌ ISSUE: API key not loaded - will use mock responses');
} else {
    console.log('\n✅ SUCCESS: API key loaded correctly');
}

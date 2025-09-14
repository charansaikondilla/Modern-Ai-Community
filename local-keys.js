// 🔑 LOCAL API KEYS CONFIGURATION
// This file should be added to .gitignore for security

const API_KEYS = {
    // OpenAI API Configuration (must be provided via environment variables)
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_ORG_ID: process.env.OPENAI_ORG_ID || null, // Optional
    
    // Emergency Services APIs (if available)
    EMERGENCY_SERVICE_API: process.env.EMERGENCY_API_KEY || null,
    
    // Other service keys can be added here
    WEATHER_API_KEY: process.env.WEATHER_API_KEY || null,
    MAPS_API_KEY: process.env.MAPS_API_KEY || null
};

// Validation function
function validateKeys() {
    const warnings = [];
    
    if (!API_KEYS.OPENAI_API_KEY) {
        warnings.push('⚠️ OpenAI API key not configured - AI responses will fail without it.');
    }
    
    if (warnings.length > 0) {
        console.log('🔑 API Key Warnings:');
        warnings.forEach(warning => console.log(warning));
        console.log('📝 To configure: Set environment variables locally in `.env`, or on Render dashboard.');
    } else {
        console.log('✅ API keys configured successfully');
    }
    
    return warnings.length === 0;
}

module.exports = {
    API_KEYS,
    validateKeys
};

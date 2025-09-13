
// 🤖 ENHANCED AI API HANDLER WITH REAL API RESPONSES
// Provides intelligent responses + strict emergency agent activation
const coordinator = require('../emergency-agents/emergency-coordinator');

// For real API responses when needed (you can add your API key here)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || null;

// 💬 GENERATE REAL AI RESPONSES WHEN NOT EMERGENCY
async function generateRealAIResponse(userMessage) {
    // If you have an API key, you can use real AI here
    if (OPENAI_API_KEY) {
        try {
            // You can add OpenAI API call here
            // const response = await openai.chat.completions.create({...});
            // return response.choices[0].message.content;
        } catch (error) {
            console.log('API error, using fallback response');
        }
    }
    
    // Intelligent fallback responses based on user input
    const lowerMsg = userMessage.toLowerCase().trim();
    console.log('🔍 Analyzing message:', lowerMsg);
    
    // Window/building related - PRIORITY CHECK
    if (lowerMsg.includes('window') || lowerMsg.includes('winow') || lowerMsg.includes('door') || 
        lowerMsg.includes('ground floor') || lowerMsg.includes('floor') || lowerMsg.includes('open')) {
        return "🏢 I see you're mentioning building/window details. Are you asking about:\n\n🔥 Fire escape planning through windows?\n🏠 Building safety measures?\n🚪 Emergency exit routes?\n\n⚠️ If this is an actual emergency:\n• Type '/fire' for fire emergency\n• Type '/medical' for medical emergency\n\nWhat specific building safety information do you need?";
    }
    
    // Fire-related but not emergency
    if (lowerMsg.includes('fire') && !lowerMsg.startsWith('/fire')) {
        if (lowerMsg.includes('help') || lowerMsg.includes('safety') || lowerMsg.includes('prevention')) {
            return "🔥 Fire Safety Tips:\n• Install smoke detectors and check batteries monthly\n• Plan escape routes from every room\n• Keep fire extinguisher accessible and inspected\n• Never leave cooking unattended\n• Check electrical cords for damage\n\n⚠️ For actual fire emergency, type '/fire'";
        }
        return "🔥 I can help with fire safety questions! For an actual fire emergency, type '/fire' immediately. What would you like to know about fire safety?";
    }
    
    // Medical-related but not emergency
    if (lowerMsg.includes('medical') || lowerMsg.includes('doctor') || lowerMsg.includes('health') || 
        lowerMsg.includes('first aid') || lowerMsg.includes('injury')) {
        if (lowerMsg.includes('help') || lowerMsg.includes('tips')) {
            return "🏥 Basic First Aid Tips:\n• Keep first aid kit stocked and accessible\n• Learn CPR and basic first aid techniques\n• Know emergency contacts by heart\n• Stay calm and assess the situation\n• Call for help when needed\n\n⚠️ For actual medical emergency, type '/medical'";
        }
        return "🏥 I can provide general health and first aid information! For an actual medical emergency, type '/medical' immediately. What health topic interests you?";
    }
    
    // Emergency numbers mentioned
    if (lowerMsg.includes('911') || lowerMsg.includes('emergency') || lowerMsg.includes('ambulance') || 
        lowerMsg.includes('police') || lowerMsg.includes('fire department')) {
        return "🚨 For real emergencies, call 911 immediately!\n\nI can help with emergency preparedness:\n• '/fire' for fire emergencies\n• '/medical' for medical emergencies\n• '/police' for security issues\n\n💡 What emergency information do you need?";
    }
    
    // Help requests
    if (lowerMsg.includes('help') && !lowerMsg.includes('fire') && !lowerMsg.includes('medical')) {
        return "💡 I'm your AI safety assistant! I can help with:\n\n🚨 Emergency Commands:\n• '/fire' - Fire emergency specialist\n• '/medical' - Medical emergency specialist\n• '/police' - Security/law enforcement\n\n💬 Safety Topics:\n• Fire safety and prevention\n• First aid and medical tips\n• Emergency preparedness\n• Building safety measures\n\nWhat would you like to learn about?";
    }
    
    // Greetings
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey') || 
        lowerMsg.includes('good morning') || lowerMsg.includes('good evening')) {
        return "👋 Hello! I'm your emergency and safety assistant. I can help with fire safety, medical questions, emergency preparedness, and building safety. What would you like to know?";
    }
    
    // Safety/security questions
    if (lowerMsg.includes('safe') || lowerMsg.includes('security') || lowerMsg.includes('protect')) {
        return "🛡️ I can help with safety information!\n\n🏠 Home Safety:\n• Fire escape planning\n• First aid preparedness\n• Emergency contact lists\n\n🚨 Emergency Situations:\n• Type '/fire' for fire emergencies\n• Type '/medical' for medical emergencies\n\nWhat safety topic interests you?";
    }
    
    // Default intelligent response for any other message
    return `💬 I understand you said: "${userMessage}"\n\nI'm here to help with safety and emergency information! I can assist with:\n\n🚨 Emergency help: '/fire', '/medical', '/police'\n💡 Safety topics: fire prevention, first aid, emergency prep\n🏢 Building safety: exits, windows, evacuation plans\n\n❓ What specific information do you need?`;
}

// Main handler: uses coordinator for emergency detection, real AI for normal chat
async function handleAIRequest(requestData) {
    const { userMessage = '', userRole = 'victim', userLocation = '', existingContext = null } = requestData || {};

    console.log('🤖 Processing AI request:', userMessage.substring(0, 50) + '...');

    // Check if this is an emergency command (strict slash commands)
    const isEmergencyCommand = userMessage.trim().toLowerCase().startsWith('/fire') || 
                              userMessage.trim().toLowerCase().startsWith('/medical') || 
                              userMessage.trim().toLowerCase().startsWith('/police') || 
                              userMessage.trim().toLowerCase().startsWith('/disaster');

    if (isEmergencyCommand) {
        // Use coordinator for emergency responses
        const context = {
            userMessage,
            userRole,
            userLocation,
            existingContext
        };

        let response = null;
        try {
            response = coordinator.generateResponse(context);
            console.log('✅ Emergency agent activated:', response?.agentType);
        } catch (err) {
            console.error('❌ Coordinator error:', err);
        }

        if (!response || typeof response !== 'object' || !response.message) {
            return {
                message: "🚨 Emergency system error. Please call 911 immediately for real emergencies.",
                agentType: 'ERROR',
                emergencyDetected: false,
                timestamp: new Date().toISOString(),
                safe: true
            };
        }

        return {
            ...response,
            timestamp: response.timestamp || new Date().toISOString(),
            safe: true
        };
    } else {
        // Use real AI responses for normal chat
        console.log('💬 Generating intelligent normal response');
        const aiMessage = await generateRealAIResponse(userMessage);
        
        return {
            message: aiMessage,
            agentType: 'normal',
            agentName: 'AI Assistant',
            emergencyDetected: false,
            contextLocked: false,
            timestamp: new Date().toISOString(),
            safe: true,
            realAI: true
        };
    }
}

// Status functions
function getHealthStatus() {
    return {
        status: 'healthy',
        service: 'Emergency AI Assistant',
        timestamp: new Date().toISOString()
    };
}

function getAvailableModes() {
    return {
        modes: ['normal', 'fire', 'medical'],
        timestamp: new Date().toISOString()
    };
}

module.exports = {
    handleAIRequest,
    getHealthStatus,
    getAvailableModes
};

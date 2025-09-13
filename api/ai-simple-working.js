// 🤖 SIMPLE WORKING AI API HANDLER
const path = require('path');

// 🔍 EMERGENCY DETECTION
function detectEmergencyInMessage(message) {
    if (!message) return false;
    
    const emergencyKeywords = [
        '/fire', '/medical', '/doctor', 'fire', 'smoke', 'burning', 
        'escape', 'get out', 'bleeding', 'unconscious', 'emergency'
    ];
    
    const lowerMessage = message.toLowerCase();
    return emergencyKeywords.some(keyword => lowerMessage.includes(keyword));
}

function detectEmergencyType(message) {
    if (!message) return 'fire';
    
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('fire') || lowerMessage.includes('smoke') || 
        lowerMessage.includes('burning') || lowerMessage.includes('escape') ||
        lowerMessage.includes('get out') || lowerMessage.includes('/fire')) {
        return 'fire';
    }
    
    if (lowerMessage.includes('medical') || lowerMessage.includes('doctor') || 
        lowerMessage.includes('bleeding') || lowerMessage.includes('unconscious') ||
        lowerMessage.includes('/medical')) {
        return 'medical';
    }
    
    return 'fire';
}

// 🚨 EMERGENCY HANDLER
async function handleEmergencyRequest(emergencyType, userMessage, requestData) {
    try {
        console.log('🚨 Emergency request:', emergencyType);
        
        let agentPath;
        if (emergencyType === 'medical') {
            agentPath = path.join(__dirname, '../emergency-agents/medical-agent-clean.js');
        } else {
            agentPath = path.join(__dirname, '../emergency-agents/fire-agent.js');
        }
        
        const emergencyAgent = require(agentPath);
        
        if (emergencyAgent && emergencyAgent.generateResponse) {
            const context = {
                userRole: 'victim',
                emergencyStage: 'immediate',
                userMessage: userMessage,
                timestamp: new Date().toISOString()
            };
            
            const agentResponse = emergencyAgent.generateResponse(context);
            
            return {
                message: agentResponse.message,
                response: agentResponse.message,
                agentType: agentResponse.agentType,
                agentName: agentResponse.agentName,
                emergencyActive: true,
                timestamp: agentResponse.timestamp,
                success: true
            };
        }
        
    } catch (error) {
        console.error('❌ Emergency agent error:', error.message);
    }
    
    // Fallback response
    const fallbackMessage = emergencyType === 'medical' 
        ? "🏥 MEDICAL EMERGENCY!\n• Call 911 immediately\n• Check breathing\n• Control bleeding\n• Keep person warm\n\n💙 Help is coming!"
        : "🔥 FIRE EMERGENCY!\n• Exit immediately\n• Stay low under smoke\n• Call 911\n• Use stairs only\n\n💙 Help is coming!";
    
    return {
        message: fallbackMessage,
        response: fallbackMessage,
        agentType: emergencyType,
        agentName: 'Emergency Assistant',
        emergencyActive: true,
        timestamp: new Date().toISOString(),
        success: true,
        fallback: true
    };
}

// 💬 NORMAL CHAT
function handleNormalChat(userMessage) {
    const responses = {
        help: "💡 I'm your AI assistant!\n• Type '/fire' for fire emergencies\n• Type '/medical' for medical help\n• Ask me anything else!\n\n🚨 For real emergencies, call 911 first!",
        greeting: "👋 Hello! I'm here to help. What do you need?",
        default: "I'm here to help! Type '/fire' or '/medical' for emergencies. What can I do for you?"
    };

    const lowerMessage = (userMessage || '').toLowerCase();
    
    let response;
    if (lowerMessage.includes('help')) {
        response = responses.help;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        response = responses.greeting;
    } else {
        response = responses.default;
    }

    return {
        message: response,
        response: response,
        agentType: 'normal',
        agentName: 'AI Assistant',
        emergencyActive: false,
        timestamp: new Date().toISOString(),
        success: true
    };
}

// 🤖 MAIN HANDLER
async function handleAIRequest(requestData) {
    const {
        userMessage,
        emergencyActive = false,
        emergencyType
    } = requestData;

    console.log('🤖 AI Request:', userMessage?.substring(0, 30) + '...');

    // Check for emergency
    const isEmergency = emergencyActive || emergencyType || 
                       (userMessage && detectEmergencyInMessage(userMessage));

    if (isEmergency) {
        const detectedType = emergencyType || detectEmergencyType(userMessage);
        return await handleEmergencyRequest(detectedType, userMessage, requestData);
    }

    return handleNormalChat(userMessage);
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

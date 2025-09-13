// 🤖 SIMPLE AI API HANDLER - WORKING VERSION
const path = require('path');

// 🚨 EMERGENCY AGENT LOADER
function loadEmergencyAgent(emergencyType) {
    try {
        console.log('🚨 Loading emergency agent for type:', emergencyType);
        
        let agentPath;
        switch (emergencyType) {
            case 'fire':
                agentPath = path.join(__dirname, '../emergency-agents/fire-agent.js');
                break;
            case 'medical':
                agentPath = path.join(__dirname, '../emergency-agents/medical-agent-clean.js');
                break;
            default:
                agentPath = path.join(__dirname, '../emergency-agents/fire-agent.js');
        }
        
        // Clear require cache to ensure fresh load
        delete require.cache[require.resolve(agentPath)];
        const emergencyAgent = require(agentPath);
        
        console.log('✅ Emergency agent loaded:', emergencyAgent.name || 'Emergency Agent');
        return emergencyAgent;
        
    } catch (error) {
        console.error('❌ Error loading emergency agent:', error.message);
        return null;
    }
}

// 🔍 EMERGENCY DETECTION IN MESSAGE
function detectEmergencyInMessage(message) {
    if (!message) return false;
    
    const emergencyKeywords = [
        '/fire', '/medical', '/doctor', '/blood', '/emergency',
        'fire', 'smoke', 'burning', 'flames',
        'bleeding', 'unconscious', 'heart attack', 'choking',
        'help', 'emergency', '911', 'urgent'
    ];
    
    const lowerMessage = message.toLowerCase();
    return emergencyKeywords.some(keyword => lowerMessage.includes(keyword));
}

// 🔍 EMERGENCY TYPE DETECTION
function detectEmergencyType(message) {
    if (!message) return 'fire';
    
    const lowerMessage = message.toLowerCase();
    
    // Fire emergency keywords
    if (lowerMessage.includes('/fire') || 
        lowerMessage.includes('fire') || 
        lowerMessage.includes('smoke') || 
        lowerMessage.includes('burning') || 
        lowerMessage.includes('flames')) {
        return 'fire';
    }
    
    // Medical emergency keywords
    if (lowerMessage.includes('/medical') || 
        lowerMessage.includes('/doctor') || 
        lowerMessage.includes('bleeding') || 
        lowerMessage.includes('unconscious') || 
        lowerMessage.includes('heart attack') || 
        lowerMessage.includes('choking') ||
        lowerMessage.includes('/blood')) {
        return 'medical';
    }
    
    return 'fire';
}

// 🚨 EMERGENCY REQUEST HANDLER
async function handleEmergencyRequest(emergencyType, userMessage, requestData) {
    try {
        console.log('🚨 Handling emergency request:', emergencyType);
        
        const emergencyAgent = loadEmergencyAgent(emergencyType);
        
        if (emergencyAgent && emergencyAgent.generateResponse) {
            const context = {
                userRole: requestData.userRole || 'victim',
                emergencyStage: 'immediate',
                userMessage: userMessage,
                userLocation: requestData.user?.location?.address || 'Unknown location',
                timestamp: new Date().toISOString()
            };
            
            const agentResponse = emergencyAgent.generateResponse(context);
            
            console.log('✅ Emergency agent response generated');
            
            return {
                message: agentResponse.message,
                response: agentResponse.message,
                agentType: agentResponse.agentType,
                agentName: agentResponse.agentName,
                emergencyActive: true,
                contextLocked: true,
                timestamp: agentResponse.timestamp,
                success: true
            };
        } else {
            throw new Error('Emergency agent not available');
        }
        
    } catch (error) {
        console.error('❌ Emergency agent error:', error.message);
        return getFallbackEmergencyResponse(emergencyType);
    }
}

// 🆘 FALLBACK EMERGENCY RESPONSES
function getFallbackEmergencyResponse(emergencyType) {
    const fallbackResponses = {
        fire: {
            message: `🚨 FIRE EMERGENCY DETECTED

💙 I WILL HELP YOU - Stay calm!

🔥 IMMEDIATE ACTIONS:
• Exit building immediately
• Stay low to avoid smoke  
• Call 911 now: 🚨 CALL 911
• Get to safe meeting point
• Don't use elevators

🚒 Fire team is being dispatched to your location

💙 YOU ARE NOT ALONE - Help is coming!`,
            agentType: 'fire',
            agentName: 'Fire Emergency Agent'
        },
        medical: {
            message: `🚨 MEDICAL EMERGENCY DETECTED

💙 I WILL HELP YOU - Stay calm!

🏥 IMMEDIATE ACTIONS:
• Call 911 immediately: 🚨 CALL 911
• Check if person is breathing
• Apply pressure to bleeding wounds
• Don't move injured person unless unsafe
• Stay with the person

🚑 Medical team is being dispatched

💙 YOU ARE NOT ALONE - Help is coming!`,
            agentType: 'medical',  
            agentName: 'Medical Emergency Agent'
        }
    };
    
    const response = fallbackResponses[emergencyType] || fallbackResponses.fire;
    
    return {
        message: response.message,
        response: response.message,
        agentType: response.agentType,
        agentName: response.agentName,
        emergencyActive: true,
        contextLocked: true,
        timestamp: new Date().toISOString(),
        success: true,
        fallbackUsed: true
    };
}

// 💬 NORMAL CHAT HANDLER
function handleNormalChat(userMessage, requestData) {
    console.log('💬 Handling normal chat request');
    
    const normalResponses = {
        help: "💡 I'm your AI assistant. I can help with questions, provide information, and assist with emergencies. For any real emergency, please call 911 immediately.\n\n🚨 Emergency Commands:\n• Type '/fire' for fire emergencies\n• Type '/medical' for medical emergencies\n• Type '/doctor' for medical help\n\nWhat would you like to know?",
        greeting: "👋 Hello! I'm here to help with questions and provide assistance. How can I help you today?",
        emergency_info: "🚨 For REAL emergencies, always call 911 first!\n\nI can provide guidance for:\n• Fire emergencies (/fire)\n• Medical emergencies (/medical)\n• General safety information\n\nWhat do you need help with?",
        default: "I'm here to help! Feel free to ask me anything or type 'help' for more information.\n\n🚨 For emergencies, type '/fire' or '/medical' or call 911 immediately."
    };

    let response;
    const lowerMessage = (userMessage || '').toLowerCase();
    
    if (lowerMessage.includes('help')) {
        response = normalResponses.help;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        response = normalResponses.greeting;
    } else if (lowerMessage.includes('emergency') || lowerMessage.includes('911')) {
        response = normalResponses.emergency_info;
    } else {
        response = normalResponses.default;
    }

    return {
        message: response,
        response: response,
        agentType: 'normal',
        agentName: 'AI Assistant',
        emergencyActive: false,
        contextLocked: false,
        timestamp: new Date().toISOString(),
        success: true
    };
}

// 🤖 MAIN AI REQUEST HANDLER
async function handleAIRequest(requestData) {
    const {
        mode = 'normal',
        trigger,
        userMessage,
        victimDetails,
        emergencyActive = false,
        emergencyType,
        userRole = 'victim'
    } = requestData;

    console.log('🤖 AI Request received:', { 
        mode, 
        trigger, 
        emergencyActive, 
        emergencyType, 
        userMessage: userMessage?.substring(0, 50) + '...' 
    });

    // 🚨 EMERGENCY DETECTION
    const isEmergencyRequest = emergencyActive || emergencyType || 
                              (userMessage && detectEmergencyInMessage(userMessage));

    if (isEmergencyRequest) {
        const detectedType = emergencyType || detectEmergencyType(userMessage);
        console.log('🚨 Emergency detected, routing to agent:', detectedType);
        return await handleEmergencyRequest(detectedType, userMessage, requestData);
    }

    // 📋 NORMAL CHAT
    return handleNormalChat(userMessage, requestData);
}

// 📊 HEALTH CHECK
function getHealthStatus() {
    return {
        status: 'healthy',
        service: 'AI Emergency Assistant',
        features: {
            emergencyAgents: true,
            fireAgent: true,
            medicalAgent: true,
            normalChat: true
        },
        timestamp: new Date().toISOString(),
        version: '2.0.0'
    };
}

// 📋 AVAILABLE MODES
function getAvailableModes() {
    return {
        modes: [
            {
                type: 'normal',
                name: 'AI Assistant',
                description: 'General chat and information'
            },
            {
                type: 'fire',
                name: 'Fire Emergency Agent',
                description: 'Fire emergency response and guidance'
            },
            {
                type: 'medical',
                name: 'Medical Emergency Agent',
                description: 'Medical emergency response and guidance'
            }
        ],
        emergencyCommands: [
            '/fire - Fire emergency',
            '/medical - Medical emergency', 
            '/doctor - Medical help'
        ],
        timestamp: new Date().toISOString()
    };
}

module.exports = {
    handleAIRequest,
    getHealthStatus,
    getAvailableModes,
    detectEmergencyInMessage,
    detectEmergencyType
};

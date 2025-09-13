// 🤖 AI API HANDLER WITH MCP-STYLE AGENT COORDINATOR
const path = require('path');

// Load the agent coordinator
const agentCoordinator = require('../emergency-agents/agent-coordinator');

// Initialize coordinator on startup
let coordinatorReady = false;
agentCoordinator.initialize().then(success => {
    coordinatorReady = success;
    console.log(coordinatorReady ? '🎯 Agent Coordinator ready!' : '❌ Agent Coordinator failed to initialize');
});

// 🤖 MAIN AI REQUEST HANDLER - Now uses MCP-style coordination
async function handleAIRequest(requestData) {
    const {
        mode = 'normal',
        trigger,
        userMessage,
        victimDetails,
        emergencyActive = false,
        emergencyType,
        userRole = 'victim',
        userId = 'default'
    } = requestData;

    console.log('🤖 AI Request received:', { 
        mode, 
        trigger, 
        emergencyActive, 
        emergencyType, 
        userMessage: userMessage?.substring(0, 50) + '...',
        userId
    });

    // Use agent coordinator if available
    if (coordinatorReady) {
        try {
            const response = await agentCoordinator.processRequest({
                userMessage,
                userId,
                emergencyType,
                userRole
            });
            
            console.log('✅ Agent Coordinator response generated');
            
            return {
                message: response.message,
                response: response.message,
                agentType: response.agentType,
                agentName: response.agentName,
                emergencyActive: response.emergencyActive,
                contextLocked: response.contextLocked,
                timestamp: response.timestamp,
                success: true,
                coordinator: true
            };
        } catch (error) {
            console.error('❌ Agent Coordinator error, falling back:', error.message);
        }
    }

    // Fallback to direct agent handling if coordinator not ready
    console.log('🔄 Using fallback agent handling');
    
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

// 🔍 EMERGENCY DETECTION FUNCTIONS (Fallback)
function detectEmergencyInMessage(message) {
    if (!message) return false;
    
    const emergencyKeywords = [
        '/fire', '/medical', '/doctor', '/blood', '/emergency',
        'fire', 'smoke', 'burning', 'flames', 'escape', 'get out',
        'bleeding', 'unconscious', 'heart attack', 'choking',
        'help', 'emergency', '911', 'urgent'
    ];
    
    const lowerMessage = message.toLowerCase();
    return emergencyKeywords.some(keyword => lowerMessage.includes(keyword));
}

function detectEmergencyType(message) {
    if (!message) return 'fire';
    
    const lowerMessage = message.toLowerCase();
    
    // Fire emergency keywords
    if (lowerMessage.includes('/fire') || 
        lowerMessage.includes('fire') || 
        lowerMessage.includes('smoke') || 
        lowerMessage.includes('burning') || 
        lowerMessage.includes('flames') ||
        lowerMessage.includes('escape') ||
        lowerMessage.includes('get out')) {
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

// 🚨 FALLBACK EMERGENCY REQUEST HANDLER
async function handleEmergencyRequest(emergencyType, userMessage, requestData) {
    try {
        console.log('🚨 Fallback handling emergency request:', emergencyType);
        
        // Try to load agent directly
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
        
        const emergencyAgent = require(agentPath);
        
        if (emergencyAgent && emergencyAgent.generateResponse) {
            const context = {
                userRole: requestData.userRole || 'victim',
                emergencyStage: 'immediate',
                userMessage: userMessage,
                userLocation: requestData.user?.location?.address || 'Unknown location',
                timestamp: new Date().toISOString()
            };
            
            const agentResponse = emergencyAgent.generateResponse(context);
            
            console.log('✅ Fallback emergency agent response generated');
            
            return {
                message: agentResponse.message,
                response: agentResponse.message,
                agentType: agentResponse.agentType,
                agentName: agentResponse.agentName,
                emergencyActive: true,
                contextLocked: true,
                timestamp: agentResponse.timestamp,
                success: true,
                fallback: true
            };
        } else {
            throw new Error('Emergency agent not available');
        }
        
    } catch (error) {
        console.error('❌ Fallback emergency agent error:', error.message);
        return getFallbackEmergencyResponse(emergencyType);
    }
}

// 🆘 LAST RESORT EMERGENCY RESPONSES
function getFallbackEmergencyResponse(emergencyType) {
    const responses = {
        fire: "🔥 FIRE EMERGENCY - GET OUT NOW!\n• Exit immediately\n• Stay low under smoke\n• Call 911\n• Use stairs only\n\n💙 Help is coming!",
        medical: "🏥 MEDICAL EMERGENCY - CALL 911!\n• Check breathing\n• Control bleeding with pressure\n• Keep person warm\n• Don't move if spinal injury\n\n💙 Help is coming!"
    };
    
    return {
        message: responses[emergencyType] || responses.fire,
        response: responses[emergencyType] || responses.fire,
        agentType: emergencyType,
        agentName: 'Emergency Assistant',
        emergencyActive: true,
        contextLocked: true,
        timestamp: new Date().toISOString(),
        success: true,
        lastResort: true
    };
}

// 💬 NORMAL CHAT HANDLER
function handleNormalChat(userMessage, requestData) {
    console.log('💬 Handling normal chat request');
    
    const responses = {
        help: "💡 I'm your AI assistant! I can help with:\n• Fire emergencies (/fire)\n• Medical emergencies (/medical)\n• General questions\n\n🚨 For real emergencies, call 911 first!",
        greeting: "👋 Hello! I'm here to help. What do you need assistance with?",
        default: "I'm here to help! Type '/fire' for fire emergencies or '/medical' for medical help. What can I do for you?"
    };

    let response;
    const lowerMessage = (userMessage || '').toLowerCase();
    
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
        contextLocked: false,
        timestamp: new Date().toISOString(),
        success: true
    };
}

// 📊 HEALTH CHECK
function getHealthStatus() {
    return {
        status: 'healthy',
        service: 'AI Emergency Assistant with Agent Coordinator',
        features: {
            agentCoordinator: coordinatorReady,
            emergencyAgents: true,
            fireAgent: true,
            medicalAgent: true,
            normalChat: true
        },
        timestamp: new Date().toISOString(),
        version: '3.0.0'
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

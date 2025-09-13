// 🎯 EMERGENCY AGENT COORDINATOR V2.0
// Central system with strict trigger commands and intelligent normal chat
// Uses preloaded knowledge base - NO API CALLS, NO HALLUCINATIONS

const fireAgent = require('./fire-agent');
const medicalAgent = require('./medical-agent');
const { EMERGENCY_KNOWLEDGE, MISSION_CONTROL } = require('./knowledge-base');

const EMERGENCY_COORDINATOR = {
    name: "Emergency Agent Coordinator", 
    version: "2.0",
    
    // 🤖 AVAILABLE AGENTS
    agents: {
        FIRE_EMERGENCY: fireAgent,
        MEDICAL_EMERGENCY: medicalAgent,
        // Future agents:
        // POLICE_EMERGENCY: policeAgent,
        // DISASTER_EMERGENCY: disasterAgent,
    },
    
    // 🧠 EMERGENCY SLASH COMMANDS (STRICT ACTIVATION)
    emergencyCommands: {
        '/fire': 'FIRE_EMERGENCY',
        '/medical': 'MEDICAL_EMERGENCY',
        '/police': 'POLICE_EMERGENCY',
        '/disaster': 'DISASTER_EMERGENCY'
    },
    
    // 🎯 DETECT EMERGENCY TYPE (STRICT SLASH COMMANDS ONLY)
    detectEmergencyType(message, existingContext = null) {
        const lowerMessage = message.trim().toLowerCase();
        // If already in emergency context, maintain it
        if (existingContext && existingContext.agentType) {
            return {
                type: existingContext.agentType,
                confidence: 1.0,
                contextLocked: true
            };
        }
        // Only activate if message starts with a known slash command
        for (const [command, agentType] of Object.entries(this.emergencyCommands)) {
            if (lowerMessage.startsWith(command)) {
                return {
                    type: agentType,
                    confidence: 1.0,
                    contextLocked: true
                };
            }
        }
        return {
            type: null,
            confidence: 0,
            contextLocked: false
        };
    },
    
    // 🗺️ MAP EMERGENCY KEYWORDS TO AGENT TYPES
    mapEmergencyToAgent(emergencyKeyword) {
        const mapping = {
            'fire': 'FIRE_EMERGENCY',
            'medical': 'MEDICAL_EMERGENCY',
            'police': 'POLICE_EMERGENCY',
            'disaster': 'DISASTER_EMERGENCY'
        };
        return mapping[emergencyKeyword] || null;
    },
    
    // 🤖 GET SPECIALIZED AGENT
    getAgent(agentType) {
        return this.agents[agentType] || null;
    },
    
    // 🎯 GENERATE AGENT RESPONSE
    generateResponse(context) {
        const { userMessage, userRole, userLocation, existingContext } = context;
        
        // Step 1: Detect emergency type (STRICT SLASH COMMANDS ONLY)
        const detection = this.detectEmergencyType(userMessage, existingContext);

        // If not an emergency, provide intelligent normal chat response
        if (!detection.type) {
            return this.generateNormalChatResponse(userMessage);
        }
        
        // Step 2: Get specialized agent
        const agent = this.getAgent(detection.type);
        if (!agent) {
            return {
                message: `🚨 Emergency detected but specialized agent for ${detection.type} is not available. Please call 911 immediately.`,
                agentType: "COORDINATOR",
                emergencyDetected: true,
                fallback: true
            };
        }
        
        // Step 3: Start emergency in mission control
        MISSION_CONTROL.startEmergency(detection.type, { userLocation, userRole });
        
        // Step 4: Generate agent-specific response using preloaded knowledge
        const agentContext = {
            userRole: this.determineUserRole(userMessage, userRole),
            emergencyStage: this.determineEmergencyStage(userMessage),
            userMessage: userMessage,
            userLocation: userLocation,
            symptoms: this.extractSymptoms(userMessage),
            contextLocked: detection.contextLocked,
            knowledgeBase: EMERGENCY_KNOWLEDGE,
            missionControl: MISSION_CONTROL
        };
        
        const response = agent.generateResponse(agentContext);
        
        // If agent returns null (not activated), return safe default
        if (!response) {
            return {
                message: "No emergency agent activated. Please use a valid emergency command (e.g., /fire, /medical, /police, /disaster).",
                agentType: "COORDINATOR",
                emergencyDetected: false
            };
        }
        
        // Log response in mission control
        MISSION_CONTROL.logResponse(detection.type, response.message);
        
        return {
            ...response,
            emergencyType: detection.type,
            confidence: detection.confidence,
            contextLocked: detection.contextLocked,
            missionControl: MISSION_CONTROL.status
        };
    },

    // 💬 INTELLIGENT NORMAL CHAT RESPONSES
    generateNormalChatResponse(userMessage) {
        const lowerMsg = (userMessage || '').toLowerCase().trim();
        
        // Fire-related questions (but not emergency)
        if (lowerMsg.includes('fire') && !lowerMsg.startsWith('/fire')) {
            if (lowerMsg.includes('help') || lowerMsg.includes('safety') || lowerMsg.includes('prevention')) {
                return {
                    message: "🔥 Fire Safety Tips:\n• Install smoke detectors and check batteries\n• Plan evacuation routes from every room\n• Keep fire extinguisher accessible\n• Never leave cooking unattended\n\n⚠️ For actual fire emergency, type '/fire'",
                    agentType: 'normal',
                    emergencyDetected: false
                };
            }
            return {
                message: "🔥 I can help with fire safety questions! For an actual fire emergency, type '/fire' immediately. What would you like to know about fire safety?",
                agentType: 'normal',
                emergencyDetected: false
            };
        }
        
        // Medical-related questions (but not emergency)
        if (lowerMsg.includes('medical') || lowerMsg.includes('doctor') || lowerMsg.includes('health')) {
            if (lowerMsg.includes('help') || lowerMsg.includes('first aid')) {
                return {
                    message: "🏥 Basic First Aid Tips:\n• Keep first aid kit stocked\n• Learn CPR and basic first aid\n• Know emergency contacts\n• Stay calm in emergencies\n\n⚠️ For actual medical emergency, type '/medical'",
                    agentType: 'normal',
                    emergencyDetected: false
                };
            }
            return {
                message: "🏥 I can provide general health and first aid information! For an actual medical emergency, type '/medical' immediately. What health topic interests you?",
                agentType: 'normal',
                emergencyDetected: false
            };
        }
        
        // Emergency number mentions
        if (lowerMsg.includes('911') || lowerMsg.includes('emergency')) {
            return {
                message: "🚨 For real emergencies, call 911 immediately!\n\nI can help with:\n• Type '/fire' for fire emergencies\n• Type '/medical' for medical emergencies\n• Type '/police' for security issues\n\nWhat information do you need?",
                agentType: 'normal',
                emergencyDetected: false
            };
        }
        
        // Help requests
        if (lowerMsg.includes('help')) {
            return {
                message: "💡 I'm your AI assistant! I can help with:\n\n🚨 Emergencies:\n• '/fire' - Fire emergency guidance\n• '/medical' - Medical emergency help\n• '/police' - Security/law enforcement\n\n💬 General:\n• Fire safety tips\n• First aid information\n• Emergency preparedness\n\nWhat do you need help with?",
                agentType: 'normal',
                emergencyDetected: false
            };
        }
        
        // Greetings
        if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
            return {
                message: "👋 Hello! I'm your emergency and safety assistant. I can help with fire safety, medical questions, and emergency preparedness. What would you like to know?",
                agentType: 'normal',
                emergencyDetected: false
            };
        }
        
        // Window/building related
        if (lowerMsg.includes('window') || lowerMsg.includes('building') || lowerMsg.includes('room')) {
            return {
                message: "🏢 Are you asking about building safety? I can help with:\n• Fire escape planning\n• Window safety measures\n• Emergency evacuation routes\n\n⚠️ For actual emergencies, use '/fire' or '/medical'\n\nWhat specific information do you need?",
                agentType: 'normal',
                emergencyDetected: false
            };
        }
        
        // Default helpful response
        return {
            message: "I'm here to help with safety and emergency information! You can:\n\n🚨 Get emergency help: '/fire', '/medical', '/police'\n💡 Ask about: fire safety, first aid, emergency prep\n❓ Need help? Just ask!\n\nWhat would you like to know?",
            agentType: 'normal',
            emergencyDetected: false
        };
    },
    
    // 👤 DETERMINE USER ROLE
    determineUserRole(message, providedRole) {
        if (providedRole && ['victim', 'responder', 'bystander'].includes(providedRole)) {
            return providedRole;
        }
        
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('i am') || lowerMessage.includes('my') || lowerMessage.includes('help me')) {
            return 'victim';
        }
        
        if (lowerMessage.includes('responding') || lowerMessage.includes('responder') || lowerMessage.includes('authority')) {
            return 'responder';
        }
        
        return 'victim'; // Default to victim for safety
    },
    
    // 📊 DETERMINE EMERGENCY STAGE
    determineEmergencyStage(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('immediate') || lowerMessage.includes('urgent') || lowerMessage.includes('now')) {
            return 'immediate';
        }
        
        if (lowerMessage.includes('trapped') || lowerMessage.includes('can\'t')) {
            return 'critical';
        }
        
        return 'active';
    },
    
    // 🩺 EXTRACT SYMPTOMS (for medical emergencies)
    extractSymptoms(message) {
        const symptoms = [];
        const symptomKeywords = [
            'chest pain', 'shortness of breath', 'bleeding', 'unconscious',
            'dizzy', 'nausea', 'fever', 'headache', 'numbness'
        ];
        
        const lowerMessage = message.toLowerCase();
        for (let symptom of symptomKeywords) {
            if (lowerMessage.includes(symptom)) {
                symptoms.push(symptom);
            }
        }
        
        return symptoms.length > 0 ? symptoms.join(', ') : null;
    },
    
    // 🔄 CHECK IF EMERGENCY RESOLVED
    isEmergencyResolved(message) {
        const resolutionKeywords = [
            'resolved', 'safe', 'okay', 'fine', 'emergency over',
            'all clear', 'situation handled', 'return to normal'
        ];
        
        const lowerMessage = message.toLowerCase();
        return resolutionKeywords.some(keyword => lowerMessage.includes(keyword));
    },
    
    // 📊 GET AGENT STATUS
    getAgentStatus() {
        return {
            availableAgents: Object.keys(this.agents),
            totalAgents: Object.keys(this.agents).length,
            emergencyTypes: Object.keys(this.emergencyCommands),
            version: this.version,
            missionControlStatus: MISSION_CONTROL.status
        };
    }
};

module.exports = EMERGENCY_COORDINATOR;
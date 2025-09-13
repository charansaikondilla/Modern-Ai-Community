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
        
        // Step 1: Detect emergency type
        const detection = this.detectEmergencyType(userMessage, existingContext);

        // If not an emergency, provide a friendly normal chat response
        if (!detection.type) {
            const lowerMsg = (userMessage || '').toLowerCase();
            if (lowerMsg.includes('help')) {
                return {
                    message: "� I'm your AI assistant!\n• Type '/fire' for fire emergencies\n• Type '/medical' for medical help\n• Ask me anything else!\n\n🚨 For real emergencies, call 911 first!",
                    agentType: 'normal',
                    emergencyDetected: false
                };
            } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
                return {
                    message: "👋 Hello! I'm here to help. What do you need?",
                    agentType: 'normal',
                    emergencyDetected: false
                };
            } else {
                return {
                    message: "I'm here to help! Type '/fire' or '/medical' for emergencies. What can I do for you?",
                    agentType: 'normal',
                    emergencyDetected: false
                };
            }
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
        if (typeof MISSION_CONTROL !== 'undefined' && MISSION_CONTROL) {
            try {
                MISSION_CONTROL.startEmergency(detection.type, { userLocation, userRole });
            } catch (err) {
                console.log('Mission control error:', err.message);
            }
        }
        
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
        if (typeof MISSION_CONTROL !== 'undefined' && MISSION_CONTROL && 
            typeof MISSION_CONTROL.logResponse === 'function') {
            try {
                MISSION_CONTROL.logResponse(detection.type, response.message);
            } catch (err) {
                console.log('Mission control logging error:', err.message);
            }
        }
        
        return {
            ...response,
            emergencyType: detection.type,
            confidence: detection.confidence,
            contextLocked: detection.contextLocked,
            missionControl: MISSION_CONTROL ? MISSION_CONTROL.status : 'unavailable'
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
            emergencyTypes: Object.keys(this.emergencyPatterns),
            version: this.version
        };
    }
};

module.exports = EMERGENCY_COORDINATOR;

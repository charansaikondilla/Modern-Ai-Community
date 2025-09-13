// 🎯 COORDINATOR - Central AI Routing System
// Handles triggers, normal chat, active agents, and persistence

const { missionControl, MissionHelpers } = require('./mission-control');
const knowledge = require('./knowledge-base.json');

// Import agents
const fireAgent = require('./agents/fire-agent');
const medicalAgent = require('./agents/medical-agent');
const policeAgent = require('./agents/police-agent');

class Coordinator {
    constructor() {
        this.agents = {
            'FIRE_EMERGENCY': fireAgent,
            'MEDICAL_EMERGENCY': medicalAgent,
            'POLICE_EMERGENCY': policeAgent
        };
        
        this.triggers = {
            '/fire': 'FIRE_EMERGENCY',
            '/medical': 'MEDICAL_EMERGENCY',
            '/doctor': 'MEDICAL_EMERGENCY',
            '/police': 'POLICE_EMERGENCY',
            '/rape': 'POLICE_EMERGENCY'
        };
    }

    // 🎯 MAIN REQUEST HANDLER
    async handleRequest(userMessage, userContext = {}) {
        const { userID = 'default_user', location = '', details = {} } = userContext;
        
        console.log(`🎯 Coordinator processing: "${userMessage.substring(0, 50)}..."`);
        
        // 1. Check for emergency trigger commands
        const triggerResponse = this.checkTriggers(userMessage, userContext);
        if (triggerResponse) {
            return triggerResponse;
        }

        // 2. Check if user has active emergency agent
        if (MissionHelpers.isActive()) {
            const activeAgent = MissionHelpers.getAgent();
            const currentUserID = missionControl.getUserID();
            
            // If same user with active emergency, route to active agent
            if (currentUserID === userID && this.agents[activeAgent]) {
                console.log(`🔄 Routing to active agent: ${activeAgent}`);
                const response = await this.agents[activeAgent].generateResponse(userMessage, userContext);
                this.persistState();
                return response;
            }
        }

        // 3. Normal chat - use general AI
        console.log('💬 Handling as normal chat');
        const generalResponse = await this.handleGeneralChat(userMessage, userContext);
        this.persistState();
        return generalResponse;
    }

    // 🚨 CHECK FOR EMERGENCY TRIGGERS
    checkTriggers(message, userContext) {
        const lowerMsg = message.toLowerCase().trim();
        
        // Check for explicit slash commands
        for (const [trigger, agentType] of Object.entries(this.triggers)) {
            if (lowerMsg.startsWith(trigger)) {
                console.log(`🚨 Emergency trigger detected: ${trigger} -> ${agentType}`);
                return this.activateAgent(agentType, message, userContext);
            }
        }

        return null;
    }

    // 🎯 ACTIVATE EMERGENCY AGENT
    async activateAgent(agentType, message, userContext) {
        const { userID = 'default_user', location = '', details = {} } = userContext;
        
        // Start emergency in mission control
        const emergencyID = MissionHelpers.startEmergency(agentType, userID, { location, ...details });
        console.log(`🚨 Emergency activated: ${emergencyID} - Agent: ${agentType}`);
        
        // Get agent response
        if (this.agents[agentType]) {
            const response = await this.agents[agentType].generateResponse(message, userContext);
            this.persistState();
            return {
                ...response,
                emergencyID: emergencyID,
                emergencyActive: true,
                activeAgent: agentType
            };
        }

        // Fallback if agent not found
        return {
            response: `🚨 Emergency detected but specialist agent not available. Call 911 immediately for ${agentType}.`,
            agentType: 'COORDINATOR',
            emergencyActive: true,
            source: 'fallback'
        };
    }

    // 💬 HANDLE GENERAL CHAT - AI FIRST
    async handleGeneralChat(message, userContext) {
        const lowerMsg = message.toLowerCase();
        
        // 🤖 PRIMARY: Try OpenAI for all general chat
        try {
            const aiAgent = require('./agents/ai-agent');
            const systemPrompt = `You are a helpful emergency preparedness assistant. Provide conversational, helpful responses. 

If the user mentions emergencies or dangerous situations, guide them to use emergency commands:
- '/fire' for fire emergencies  
- '/medical' for medical emergencies
- '/police' for police emergencies

Be friendly, conversational, and contextual to what they're saying. Don't just give generic safety tips unless they ask for them.

User context: Location: ${userContext.location || 'Unknown'}, User ID: ${userContext.userID}`;
            
            const apiResponse = await aiAgent.callOpenAI(systemPrompt, message, { max_tokens: 200 });
            
            if (apiResponse) {
                return {
                    response: apiResponse,
                    agentType: 'general_ai_chat',
                    emergencyActive: false,
                    source: 'openai'
                };
            }
        } catch (error) {
            console.log('OpenAI unavailable for general chat, using contextual fallback');
        }

        // 🛡️ CONTEXTUAL FALLBACK: Smart contextual responses for safety topics
        if (lowerMsg.includes('fire') && !lowerMsg.startsWith('/fire')) {
            return {
                response: "🔥 **Fire Safety Information**\n\nFor fire safety tips and prevention, I can help! For an actual fire emergency, type '/fire' immediately.\n\n🛡️ Quick fire safety tips:\n• Install smoke detectors\n• Plan escape routes\n• Keep fire extinguisher accessible\n\nWhat specific fire safety topic interests you?",
                agentType: 'general_fire_info',
                emergencyActive: false
            };
        }

        if (lowerMsg.includes('medical') || lowerMsg.includes('health')) {
            return {
                response: "🏥 **Medical Information**\n\nFor general health and first aid information, I'm here to help! For a medical emergency, type '/medical' immediately.\n\n🩹 Basic first aid topics:\n• Bleeding control\n• Burns treatment\n• CPR basics\n\nWhat health topic can I help with?",
                agentType: 'general_medical_info',
                emergencyActive: false
            };
        }

        if (lowerMsg.includes('police') || lowerMsg.includes('safety')) {
            return {
                response: "👮 **Safety Information**\n\nFor safety tips and crime prevention, I can assist! For a police emergency, type '/police' immediately.\n\n🛡️ Safety topics:\n• Personal safety tips\n• Home security\n• Emergency preparedness\n\nWhat safety information do you need?",
                agentType: 'general_safety_info',
                emergencyActive: false
            };
        }

        if (lowerMsg.includes('help')) {
            return {
                response: "💡 **AI Emergency Assistant**\n\nI can help with:\n\n🚨 **Emergency Commands:**\n• '/fire' - Fire emergency specialist\n• '/medical' - Medical emergency specialist\n• '/police' - Police emergency specialist\n\n💬 **General Information:**\n• Fire safety and prevention\n• First aid and medical tips\n• Personal safety guidance\n\nWhat can I help you with?",
                agentType: 'help_assistant',
                emergencyActive: false
            };
        }

        // 🛡️ LAST RESORT: Generic fallback
        return {
            response: `I understand you said: "${message}"\n\nI'm here to help with safety and emergency information!\n\n🚨 For emergencies: /fire, /medical, /police\n💬 For safety topics: Ask about fire safety, first aid, or personal safety\n\nWhat would you like to know?`,
            agentType: 'general_assistant',
            emergencyActive: false,
            source: 'fallback'
        };
    }

    // 🔄 DEACTIVATE AGENT (User command)
    deactivateAgent() {
        if (MissionHelpers.isActive()) {
            MissionHelpers.log('SYSTEM', 'Emergency agent deactivated by user');
            missionControl.resolveEmergency();
            this.persistState();
            return {
                response: "✅ Emergency agent deactivated. You're now in normal chat mode. If you need emergency help again, use /fire, /medical, or /police.",
                agentType: 'coordinator',
                emergencyActive: false
            };
        }
        
        return {
            response: "No active emergency agent to deactivate.",
            agentType: 'coordinator',
            emergencyActive: false
        };
    }

    // 💾 PERSIST STATE
    persistState() {
        // Mission control automatically saves to localStorage
        // Additional persistence can be added here
    }

    // 📊 GET STATUS
    getStatus() {
        const missionStatus = MissionHelpers.getStatus();
        return {
            availableAgents: Object.keys(this.agents),
            triggers: Object.keys(this.triggers),
            activeEmergency: missionStatus.status === 'active',
            activeAgent: missionStatus.activeAgent,
            emergencyID: missionStatus.emergencyID,
            missionControl: missionStatus
        };
    }

    // 🧪 RUN ACCEPTANCE TESTS
    async runTests() {
        console.log('🧪 Running Coordinator Tests...\n');
        
        const tests = [
            {
                name: 'Fire Emergency Trigger',
                input: '/fire help me',
                expectAgent: 'FIRE_EMERGENCY'
            },
            {
                name: 'Medical Emergency Trigger', 
                input: '/medical chest pain',
                expectAgent: 'MEDICAL_EMERGENCY'
            },
            {
                name: 'Police Emergency Trigger',
                input: '/police break in',
                expectAgent: 'POLICE_EMERGENCY'
            },
            {
                name: 'Normal Chat',
                input: 'hello how are you',
                expectAgent: null
            },
            {
                name: 'Fire Safety Info',
                input: 'fire safety tips',
                expectAgent: null
            }
        ];

        for (const test of tests) {
            try {
                const response = await this.handleRequest(test.input, { userID: 'test_user' });
                const isEmergency = response.emergencyActive;
                const passed = test.expectAgent ? isEmergency : !isEmergency;
                
                console.log(`${passed ? '✅' : '❌'} ${test.name}: ${response.agentType || 'general'}`);
            } catch (error) {
                console.log(`❌ ${test.name}: Error - ${error.message}`);
            }
        }
        
        // Reset after tests
        missionControl.reset();
    }
}

module.exports = new Coordinator();
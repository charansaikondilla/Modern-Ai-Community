// 🎯 MCP-STYLE EMERGENCY AGENT COORDINATOR
// Manages all emergency AI agents with smart routing and context management

const AGENT_COORDINATOR = {
    name: "Emergency Agent Coordinator",
    version: "1.0",
    
    // Available agents
    agents: {
        fire: null,
        medical: null,
        police: null,
        normal: null
    },
    
    // User session tracking
    sessions: new Map(),
    
    // Initialize all agents
    async initialize() {
        try {
            console.log('🎯 Initializing Emergency Agent Coordinator...');
            
            // Load fire agent
            this.agents.fire = require('./fire-agent.js');
            console.log('✅ Fire agent loaded');
            
            // Load medical agent
            this.agents.medical = require('./medical-agent-clean.js');
            console.log('✅ Medical agent loaded');
            
            // Create simple normal chat agent
            this.agents.normal = {
                name: "AI Assistant",
                type: "normal",
                generateResponse: (context) => ({
                    message: "I'm here to help! For emergencies, type '/fire' or '/medical'. For other questions, just ask!",
                    agentType: "normal",
                    agentName: "AI Assistant",
                    emergencyActive: false,
                    timestamp: new Date().toISOString()
                })
            };
            console.log('✅ Normal chat agent loaded');
            
            console.log('🎯 Agent Coordinator ready!');
            return true;
        } catch (error) {
            console.error('❌ Agent Coordinator initialization failed:', error.message);
            return false;
        }
    },
    
    // Smart emergency detection
    detectEmergencyType(userMessage) {
        if (!userMessage) return 'normal';
        
        const lowerMessage = userMessage.toLowerCase();
        
        // Fire emergency patterns
        const fireKeywords = ['/fire', 'fire', 'smoke', 'burning', 'flames', 'get out', 'escape'];
        if (fireKeywords.some(keyword => lowerMessage.includes(keyword))) {
            return 'fire';
        }
        
        // Medical emergency patterns
        const medicalKeywords = ['/medical', '/doctor', 'bleeding', 'unconscious', 'breathing', 'heart attack', 'choking'];
        if (medicalKeywords.some(keyword => lowerMessage.includes(keyword))) {
            return 'medical';
        }
        
        return 'normal';
    },
    
    // Get user session
    getUserSession(userId) {
        if (!this.sessions.has(userId)) {
            this.sessions.set(userId, {
                currentAgent: 'normal',
                emergencyActive: false,
                conversationHistory: [],
                lastInteraction: new Date()
            });
        }
        return this.sessions.get(userId);
    },
    
    // Process user request with appropriate agent
    async processRequest(requestData) {
        try {
            const { userMessage, userId = 'default', emergencyType } = requestData;
            
            // Get or create user session
            const session = this.getUserSession(userId);
            
            // Detect emergency type
            const detectedType = emergencyType || this.detectEmergencyType(userMessage);
            
            console.log(`🎯 Routing to ${detectedType} agent for: "${userMessage?.substring(0, 30)}..."`);
            
            // Update session if emergency detected
            if (detectedType !== 'normal') {
                session.currentAgent = detectedType;
                session.emergencyActive = true;
            }
            
            // Get appropriate agent
            const agent = this.agents[detectedType] || this.agents.normal;
            
            if (!agent) {
                throw new Error(`Agent ${detectedType} not available`);
            }
            
            // Generate response using agent
            const context = {
                userMessage,
                userRole: 'victim',
                emergencyStage: 'immediate',
                userId,
                session
            };
            
            const response = agent.generateResponse(context);
            
            // Update session history
            session.conversationHistory.push({
                user: userMessage,
                agent: response.message,
                agentType: detectedType,
                timestamp: new Date().toISOString()
            });
            
            session.lastInteraction = new Date();
            
            // Add coordinator metadata
            return {
                ...response,
                coordinatorVersion: this.version,
                sessionId: userId,
                detectedType,
                success: true
            };
            
        } catch (error) {
            console.error('❌ Agent Coordinator error:', error.message);
            
            // Fallback response
            return {
                message: "🚨 I'm here to help! For emergencies, call 911 immediately. What do you need assistance with?",
                agentType: 'fallback',
                agentName: 'Emergency Assistant',
                emergencyActive: false,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    },
    
    // Get system status
    getStatus() {
        return {
            name: this.name,
            version: this.version,
            agents: Object.keys(this.agents).filter(key => this.agents[key] !== null),
            activeSessions: this.sessions.size,
            ready: Object.values(this.agents).some(agent => agent !== null)
        };
    },
    
    // Clean old sessions (call periodically)
    cleanOldSessions() {
        const now = new Date();
        const expireTime = 30 * 60 * 1000; // 30 minutes
        
        for (const [userId, session] of this.sessions.entries()) {
            if (now - session.lastInteraction > expireTime) {
                this.sessions.delete(userId);
                console.log(`🧹 Cleaned expired session for user: ${userId}`);
            }
        }
    }
};

module.exports = AGENT_COORDINATOR;

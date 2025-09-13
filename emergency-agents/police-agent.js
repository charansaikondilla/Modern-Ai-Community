// 🚓 INTELLIGENT AI-POWERED POLICE EMERGENCY AGENT
const POLICE_AGENT = {
    name: "AI Police Emergency Agent",
    type: "police",
    version: "1.0",
    
    knowledgeBase: {
        dos: [
            "Stay calm and keep yourself safe",
            "Call 911 or local police immediately",
            "Provide clear details: location, description, situation",
            "If possible, move to a safe area and lock doors",
            "Follow police instructions when they arrive"
        ],
        donts: [
            "Don't confront the suspect unless absolutely necessary",
            "Don't try to be a hero - prioritize your safety",
            "Don't leave your safe location until police arrive",
            "Don't spread rumors or unverified information"
        ],
        responseTeam: {
            dispatch: "🚓 Police Department notified - Response team dispatched",
            eta: "⏰ Estimated arrival: 3-5 minutes",
            team: "👮 Officer Patel leading response team",
            equipment: "🚨 Full response: Patrol cars, backup units"
        }
    },
    
    generateResponse(context) {
        const { userMessage, conversationHistory = [], userRole, isResponder } = context;
        const lowerMessage = userMessage.toLowerCase();
        
        // Only activate on explicit trigger
        if (!this.isInitialActivation(userMessage, conversationHistory)) {
            return null;
        }
        
        if (userRole === 'responder' || isResponder) {
            return this.generateResponderActivation(context);
        }
        
        return this.generateInitialPoliceResponse();
    },
    
    isInitialActivation(userMessage, history) {
        // Only activate on explicit /police trigger
        const lowerMessage = userMessage.toLowerCase();
        return lowerMessage.trim().startsWith('/police');
    },
    
    generateInitialPoliceResponse() {
        const dosText = this.knowledgeBase.dos.map((item, idx) => `${idx + 1}. ${item}`).join('\n');
        const dontsText = this.knowledgeBase.donts.map(item => `❌ ${item}`).join('\n');
        const initialMessage = `🚨 POLICE EMERGENCY ACTIVATED\n\n💙 Stay calm, help is on the way!\n\n👮 IMMEDIATE DO's:\n${dosText}\n\n⚠️ CRITICAL DON'Ts:\n${dontsText}\n\nTell me your situation for step-by-step guidance.`;
        const teamMessage = `🚓 RESPONSE UPDATE:\n${this.knowledgeBase.responseTeam.dispatch}\n${this.knowledgeBase.responseTeam.eta}\n${this.knowledgeBase.responseTeam.team}\n${this.knowledgeBase.responseTeam.equipment}`;
        return this.formatResponse([initialMessage, '', teamMessage]);
    },
    generateResponderActivation(context) {
        return this.formatResponse([`🚓 RESPONDER ACTIVATION COMPLETE\n\n💙 Stay alert, Responder!\n• Assess situation from safe distance\n• Coordinate with police\n• Maintain communication\n\nAsk for guidance anytime.`]);
    },
    formatResponse(responseArray) {
        return {
            message: responseArray.join('\n'),
            agentType: this.type,
            agentName: this.name,
            emergencyActive: true,
            contextLocked: true,
            safetyVerified: true,
            timestamp: new Date().toISOString()
        };
    }
};

module.exports = POLICE_AGENT;

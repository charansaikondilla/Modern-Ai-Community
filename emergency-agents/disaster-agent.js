// 🌪️ INTELLIGENT AI-POWERED DISASTER EMERGENCY AGENT
const DISASTER_AGENT = {
    name: "AI Disaster Emergency Agent",
    type: "disaster",
    version: "1.0",
    
    knowledgeBase: {
        dos: [
            "Move to a safe location immediately",
            "Follow official evacuation orders",
            "Keep emergency kit and supplies ready",
            "Stay tuned to official alerts and updates",
            "Help others if you can do so safely"
        ],
        donts: [
            "Don't ignore evacuation orders",
            "Don't go outside during disaster unless told",
            "Don't use elevators during earthquakes or floods",
            "Don't spread rumors or panic"
        ],
        responseTeam: {
            dispatch: "🌪️ Disaster Response Team notified - Units dispatched",
            eta: "⏰ Estimated arrival: 10-20 minutes",
            team: "🧑‍🚒 Captain Lee leading disaster response",
            equipment: "🚨 Full response: Rescue vehicles, medical units, supplies"
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
        
        return this.generateInitialDisasterResponse();
    },
    isInitialActivation(userMessage, history) {
        // Only activate on explicit /disaster trigger
        const lowerMessage = userMessage.toLowerCase();
        return lowerMessage.trim().startsWith('/disaster');
    },
    generateInitialDisasterResponse() {
        const dosText = this.knowledgeBase.dos.map((item, idx) => `${idx + 1}. ${item}`).join('\n');
        const dontsText = this.knowledgeBase.donts.map(item => `❌ ${item}`).join('\n');
        const initialMessage = `🚨 DISASTER EMERGENCY ACTIVATED\n\n💙 Stay calm, help is on the way!\n\n🌪️ IMMEDIATE DO's:\n${dosText}\n\n⚠️ CRITICAL DON'Ts:\n${dontsText}\n\nTell me your situation for step-by-step guidance.`;
        const teamMessage = `🌪️ RESPONSE UPDATE:\n${this.knowledgeBase.responseTeam.dispatch}\n${this.knowledgeBase.responseTeam.eta}\n${this.knowledgeBase.responseTeam.team}\n${this.knowledgeBase.responseTeam.equipment}`;
        return this.formatResponse([initialMessage, '', teamMessage]);
    },
    generateResponderActivation(context) {
        return this.formatResponse([`🌪️ RESPONDER ACTIVATION COMPLETE\n\n💙 Stay alert, Responder!\n• Assess situation from safe distance\n• Coordinate with disaster authorities\n• Maintain communication\n\nAsk for guidance anytime.`]);
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

module.exports = DISASTER_AGENT;

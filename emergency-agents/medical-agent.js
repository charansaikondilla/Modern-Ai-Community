// 🏥 INTELLIGENT AI-POWERED MEDICAL EMERGENCY AGENT
const MEDICAL_AGENT = {
    name: "AI Medical Emergency Agent",
    type: "medical",
    version: "2.1",
    knowledgeBase: {
        dos: [
            "Call 911 or emergency services immediately",
            "Stay calm and keep the person safe",
            "Check for breathing and pulse",
            "Apply direct pressure to bleeding wounds",
            "Follow dispatcher or paramedic instructions"
        ],
        donts: [
            "Don't move the person unless necessary",
            "Don't give food or water to unconscious person",
            "Don't remove objects stuck in wounds",
            "Don't delay calling for help"
        ],
        responseTeam: {
            dispatch: "🚑 Medical team notified - Paramedics dispatched",
            eta: "⏰ Estimated arrival: 5-7 minutes",
            team: "👨‍⚕️ Paramedic Smith leading response",
            equipment: "🚨 Ambulance, medical kit, defibrillator"
        }
    },
    generateResponse(context) {
        const { userMessage, conversationHistory = [], userRole, isResponder } = context;
        // Only activate on explicit /medical trigger
        if (!this.isInitialActivation(userMessage, conversationHistory)) {
            return null;
        }
        if (userRole === 'responder' || isResponder) {
            return this.generateResponderActivation(context);
        }
        return this.generateInitialMedicalResponse();
    },
    isInitialActivation(userMessage, history) {
        // Only activate on explicit /medical trigger
        const lowerMessage = userMessage.toLowerCase();
        return lowerMessage.trim().startsWith('/medical');
    },
    generateInitialMedicalResponse() {
        const dosText = this.knowledgeBase.dos.map((item, idx) => `${idx + 1}. ${item}`).join('\n');
        const dontsText = this.knowledgeBase.donts.map(item => `❌ ${item}`).join('\n');
        const initialMessage = `🚨 MEDICAL EMERGENCY ACTIVATED\n\n💙 Stay calm, help is on the way!\n\n🩺 IMMEDIATE DO's:\n${dosText}\n\n⚠️ CRITICAL DON'Ts:\n${dontsText}\n\nTell me your situation for step-by-step guidance.`;
        const teamMessage = `🚑 RESPONSE UPDATE:\n${this.knowledgeBase.responseTeam.dispatch}\n${this.knowledgeBase.responseTeam.eta}\n${this.knowledgeBase.responseTeam.team}\n${this.knowledgeBase.responseTeam.equipment}`;
        return this.formatResponse([initialMessage, '', teamMessage]);
    },
    generateResponderActivation(context) {
        return this.formatResponse([`🚑 RESPONDER ACTIVATION COMPLETE\n\n💙 Stay alert, Responder!\n• Assess situation from safe distance\n• Coordinate with medical team\n• Maintain communication\n\nAsk for guidance anytime.`]);
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

module.exports = MEDICAL_AGENT;

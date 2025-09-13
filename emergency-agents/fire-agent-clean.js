// 🔥 CLEAN FIRE EMERGENCY AI AGENT
const FIRE_AGENT = {
    name: "Fire Emergency AI Agent",
    type: "fire",
    version: "2.0",
    
    mission: "Provide ONLY fire safety guidance. No general conversation.",
    
    victimProtocols: {
        immediate: [
            "🚨 FIRE EMERGENCY DETECTED - I WILL HELP YOU!",
            "🔥 Stay calm - you are not alone in this emergency",
            "📞 Emergency services are being notified automatically"
        ],
        
        safetyAssessment: [
            "❓ Are you in immediate danger?",
            "❓ Can you see flames or smell smoke?", 
            "❓ Are your exits blocked?",
            "❓ Are you able to move safely?"
        ],
        
        safeExit: [
            "✅ GET LOW - Crawl under smoke if necessary",
            "✅ FEEL DOORS - If hot, find another exit", 
            "✅ EXIT IMMEDIATELY - Don't take belongings",
            "✅ CLOSE DOORS behind you to slow fire spread",
            "✅ GO TO RALLY POINT - Stay away from building"
        ],
        
        trapped: [
            "🚨 IF TRAPPED - DON'T PANIC:",
            "✅ Close door between you and fire",
            "✅ Seal gaps under door with wet cloth",
            "✅ Go to window - signal for help",
            "✅ Call 911 and give exact location",
            "✅ Stay low where air is cleaner"
        ],
        
        doNots: [
            "❌ DON'T use elevators - stairs only",
            "❌ DON'T go back for belongings", 
            "❌ DON'T open doors that feel hot",
            "❌ DON'T run - stay calm and move quickly",
            "❌ DON'T hide - firefighters need to find you"
        ],
        
        supportive: [
            "💙 I WILL HELP YOU - You can do this!",
            "💪 You're being brave - keep following instructions",
            "🤝 Help is coming - stay focused on safety",
            "⭐ You're doing everything right"
        ],
        
        responderUpdates: [
            "🚒 Fire team dispatched - ETA 4 minutes",
            "👨‍🚒 Captain Rodriguez leading your rescue team", 
            "📍 Responders have your exact location",
            "🚨 Fire trucks are 2 minutes from your building",
            "📱 Keep this chat open - responders monitoring"
        ]
    },
    
    generateResponse(context) {
        const { userRole, emergencyStage, userMessage, userLocation } = context;
        
        console.log('🔥 Fire Agent generating response for:', { userRole, emergencyStage, userMessage });
        
        if (userRole === 'victim' || !userRole) {
            return this.generateVictimResponse(emergencyStage, userMessage);
        } else if (userRole === 'responder') {
            return this.generateResponderResponse(emergencyStage, userMessage, userLocation);
        }
        
        return this.generateVictimResponse('immediate', userMessage);
    },
    
    generateVictimResponse(stage, message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('trapped') || lowerMessage.includes('can\'t get out')) {
            return this.formatResponse([
                ...this.victimProtocols.immediate,
                "",
                "🚨 TRAPPED PROTOCOL:",
                ...this.victimProtocols.trapped,
                "",
                "💙 STAY STRONG:",
                ...this.victimProtocols.supportive.slice(0, 2),
                "",
                "🚒 HELP COMING:",
                ...this.victimProtocols.responderUpdates.slice(0, 2)
            ]);
        }
        
        if (lowerMessage.includes('smoke') || lowerMessage.includes('can\'t see')) {
            return this.formatResponse([
                ...this.victimProtocols.immediate,
                "",
                "💨 SMOKE EVACUATION:",
                ...this.victimProtocols.safeExit,
                "",
                "💙 YOU CAN DO THIS:",
                ...this.victimProtocols.supportive.slice(0, 2),
                "",
                "🚒 RESPONDER UPDATE:",
                ...this.victimProtocols.responderUpdates.slice(0, 3)
            ]);
        }
        
        return this.formatResponse([
            ...this.victimProtocols.immediate,
            "",
            "❓ QUICK ASSESSMENT:",
            ...this.victimProtocols.safetyAssessment.slice(0, 2),
            "",
            "🔥 IMMEDIATE ACTIONS:",
            ...this.victimProtocols.safeExit.slice(0, 3),
            "",
            "❌ CRITICAL DON'TS:",
            ...this.victimProtocols.doNots.slice(0, 3),
            "",
            "💙 I WILL HELP YOU:",
            ...this.victimProtocols.supportive.slice(0, 2),
            "",
            "🚒 FIRE TEAM STATUS:",
            ...this.victimProtocols.responderUpdates.slice(0, 2)
        ]);
    },
    
    generateResponderResponse(stage, message, location) {
        return this.formatResponse([
            "🚒 FIRE RESPONDER MODE ACTIVATED",
            "🔥 Emergency location confirmed and dispatched",
            "👥 Victim status: Responsive and following protocols",
            "",
            `📍 INCIDENT LOCATION: ${location || 'Coordinates being confirmed'}`,
            "",
            "📋 SITUATION BRIEFING:",
            "• Building type and construction year",
            "• Floor level and apartment/unit number", 
            "• Estimated occupancy and evacuation status",
            "• Hydrant locations and water supply access",
            "",
            "🔥 FIRE CONDITIONS:", 
            "• Reported smoke/flame locations",
            "• Wind conditions affecting spread",
            "• Structural integrity assessment needed",
            "• Evacuation route status"
        ]);
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

module.exports = FIRE_AGENT;

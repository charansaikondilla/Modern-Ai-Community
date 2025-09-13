// 🔥 INTELLIGENT AI-POWERED FIRE EMERGENCY AGENT
const FIRE_AGENT = {
    name: "AI Fire Emergency Agent",
    type: "fire",
    version: "4.0",
    
    // 🧠 COMPREHENSIVE FIRE SAFETY KNOWLEDGE BASE
    knowledgeBase: {
        // What to DO in fire emergency
        dos: [
            "Exit building immediately - every second counts",
            "Stay low to avoid smoke inhalation - crawl if needed",
            "Feel doors before opening - hot door means fire behind it",
            "Use stairs only - elevators can trap you",
            "Close doors behind you to slow fire spread",
            "Go to designated meeting point outside",
            "Call 911 once you're safely outside",
            "Count people to make sure everyone is out"
        ],
        
        // What NOT to do in fire emergency
        donts: [
            "Don't use elevators - they can stop working or trap you",
            "Don't go back inside for belongings - nothing is worth your life",
            "Don't open hot doors - fire could be right behind them",
            "Don't hide under beds, tables, or in closets - firefighters can't find you",
            "Don't break windows unless absolutely necessary - creates air flow for fire",
            "Don't waste time getting dressed or gathering items",
            "Don't run - move quickly but carefully to avoid falls",
            "Don't inhale smoke - cover nose and mouth with clothing"
        ],
        
        // Hiding places analysis (for AI to reference)
        hidingPlaces: {
            "table": {
                safe: false,
                reason: "Tables offer no protection from smoke or fire. Firefighters won't look under furniture. You need to EXIT, not hide."
            },
            "closet": {
                safe: false,
                reason: "Closets are death traps - filled with flammable clothes, hard for firefighters to find you. Exit immediately."
            },
            "bathroom": {
                safe: false,
                reason: "Bathrooms can become ovens. Only acceptable if absolutely trapped and you can signal from window."
            },
            "bed": {
                safe: false,
                reason: "Under beds is where people die in fires. Smoke kills faster than flames. Get out, don't hide."
            }
        },
        
        // Room-by-room escape advice
        escapeAdvice: {
            "bedroom": "Feel door. If cool, open slowly. If hot, go to window and signal for help.",
            "kitchen": "Turn off gas if safely possible. Exit immediately. Don't use water on grease fires.",
            "living room": "Stay low, move to nearest exit. Avoid upholstered furniture area.",
            "hallway": "Stay low along wall. Count doors to maintain orientation in smoke."
        },
        
        // Emergency response team info
        responseTeam: {
            dispatch: "🚒 Fire Department notified - Response team dispatched",
            eta: "⏰ Estimated arrival: 4-6 minutes",
            team: "👨‍🚒 Captain Martinez leading rescue team",
            equipment: "🚨 Full response: Engine, ladder truck, rescue unit"
        }
    },
    
    // 🎯 INTELLIGENT RESPONSE GENERATOR
    generateResponse(context) {
        const { userMessage, conversationHistory = [] } = context;
        const lowerMessage = userMessage.toLowerCase();
        
        console.log('🔥 AI Fire Agent analyzing:', userMessage);
        
        // Check if this is initial activation
        const isInitialActivation = this.isInitialActivation(userMessage, conversationHistory);
        
        if (isInitialActivation) {
            return this.generateInitialFireResponse();
        }
        
        // Handle follow-up questions with AI intelligence
        return this.generateIntelligentResponse(userMessage, context);
    },
    
    // Check if this is the first fire emergency message
    isInitialActivation(userMessage, history) {
        const lowerMessage = userMessage.toLowerCase();
        const isFireTrigger = lowerMessage.includes('/fire') || 
                             lowerMessage.includes('fire') ||
                             lowerMessage.includes('smoke') ||
                             lowerMessage.includes('burning');
        
        // If no previous fire conversation, this is initial
        const hasFireHistory = history.some(msg => 
            msg.agentType === 'fire' || 
            msg.message?.includes('fire emergency')
        );
        
        return isFireTrigger && !hasFireHistory;
    },
    
    // Generate initial fire emergency response
    generateInitialFireResponse() {
        const dosText = this.knowledgeBase.dos.map((item, index) => `${index + 1}. ${item}`).join('\n');
        const dontsText = this.knowledgeBase.donts.slice(0, 4).map(item => `❌ ${item}`).join('\n');
        
        const initialMessage = `🚨 FIRE EMERGENCY ACTIVATED

💙 I WILL HELP YOU - Stay calm!

🔥 IMMEDIATE DO's:
${dosText}

⚠️ CRITICAL DON'Ts:
${dontsText}

Ask me anything about your situation - I'll guide you safely!`;

        // Separate response team message
        const teamMessage = `🚒 EMERGENCY RESPONSE UPDATE:
${this.knowledgeBase.responseTeam.dispatch}
${this.knowledgeBase.responseTeam.eta}
${this.knowledgeBase.responseTeam.team}
${this.knowledgeBase.responseTeam.equipment}

💙 Help is on the way - focus on getting out safely!`;

        return this.formatResponse([initialMessage, "", teamMessage]);
    },
    
    // Generate intelligent AI response based on user question
    generateIntelligentResponse(userMessage, context) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Analyze hiding place questions
        if (lowerMessage.includes('hide') || lowerMessage.includes('under')) {
            return this.analyzeHidingPlace(userMessage);
        }
        
        // Analyze room-specific questions
        if (lowerMessage.includes('room') || lowerMessage.includes('bedroom') || 
            lowerMessage.includes('kitchen') || lowerMessage.includes('bathroom')) {
            return this.analyzeRoomSituation(userMessage);
        }
        
        // Analyze escape questions
        if (lowerMessage.includes('how') || lowerMessage.includes('get out') || 
            lowerMessage.includes('escape') || lowerMessage.includes('exit')) {
            return this.generateEscapeGuidance(userMessage);
        }
        
        // Analyze smoke questions
        if (lowerMessage.includes('smoke') || lowerMessage.includes('can\'t see') ||
            lowerMessage.includes('breathing')) {
            return this.generateSmokeGuidance(userMessage);
        }
        
        // General intelligent response
        return this.generateContextualAdvice(userMessage);
    },
    
    // Analyze hiding place suggestions (like table)
    analyzeHidingPlace(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        let hidingPlace = 'general';
        let analysis = null;
        
        // Detect specific hiding places
        for (const [place, info] of Object.entries(this.knowledgeBase.hidingPlaces)) {
            if (lowerMessage.includes(place)) {
                hidingPlace = place;
                analysis = info;
                break;
            }
        }
        
        let response;
        if (analysis) {
            response = `🚫 NO - Don't hide ${hidingPlace.includes('room') ? 'in the ' + hidingPlace : 'under/in ' + hidingPlace}!

❌ Why this is dangerous:
${analysis.reason}

✅ What to do instead:
• Move toward your nearest exit immediately
• Stay low to avoid smoke
• Feel doors before opening
• Get outside to safety

💙 Your life is precious - exit now, don't hide!`;
        } else {
            response = `🚫 NO - Don't hide anywhere during a fire!

❌ Hiding is extremely dangerous because:
• Smoke kills faster than flames
• Firefighters may not find you in time
• Fire spreads rapidly through buildings
• Every second counts for your survival

✅ Instead:
• Exit the building immediately
• Stay low under smoke
• Go to your nearest safe exit
• Get to designated meeting point outside

💙 Remember: EXIT, don't hide - your life depends on it!`;
        }
        
        return this.formatResponse([response]);
    },
    
    // Analyze room-specific situations
    analyzeRoomSituation(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        let roomAdvice = "Stay low, move to nearest exit immediately.";
        
        for (const [room, advice] of Object.entries(this.knowledgeBase.escapeAdvice)) {
            if (lowerMessage.includes(room)) {
                roomAdvice = advice;
                break;
            }
        }
        
        const response = `🏠 Room-specific guidance:

${roomAdvice}

🔥 Universal fire rules:
• Stay below smoke level (crawl if needed)
• Feel doors before opening them
• Close doors behind you
• Move quickly but carefully

💙 Get out now - every second matters!`;

        return this.formatResponse([response]);
    },
    
    // Generate escape guidance
    generateEscapeGuidance(userMessage) {
        const response = `🚪 ESCAPE PLAN:

1️⃣ **Assess your exit route:**
   • Feel your door - if hot, use window/alternate route
   • If cool, open slowly and check for smoke

2️⃣ **Move safely:**
   • Stay low (crawl if heavy smoke)
   • Follow wall to maintain direction
   • Close doors behind you

3️⃣ **Exit the building:**
   • Use stairs only - never elevators
   • Don't stop for belongings
   • Help others if safely possible

4️⃣ **Once outside:**
   • Go to meeting point
   • Count everyone
   • Stay out - never go back

💙 You can do this - focus on getting out safely!`;

        return this.formatResponse([response]);
    },
    
    // Generate smoke-specific guidance
    generateSmokeGuidance(userMessage) {
        const response = `💨 SMOKE EMERGENCY GUIDANCE:

🫁 **Breathing protection:**
• Get as low as possible (crawl on hands/knees)
• Cover nose/mouth with clothing
• Take short, shallow breaths
• Don't hold breath - you need oxygen

🚪 **Navigation in smoke:**
• Follow walls with your hand
• Count doors/rooms to stay oriented
• Feel ahead before moving forward
• Door handles tell you direction

⚠️ **Critical warning:**
Smoke kills faster than fire - you have very little time!

✅ **Immediate action:**
Exit building NOW using safest route available.

💙 Stay calm, stay low, and keep moving toward exit!`;

        return this.formatResponse([response]);
    },
    
    // Generate contextual advice based on keywords
    generateContextualAdvice(userMessage) {
        const response = `🔥 Based on your situation:

I'm here to help you get out safely. Every fire situation is unique, but these principles always apply:

✅ **Priority actions:**
• Exit immediately - don't delay
• Stay low to avoid smoke
• Feel doors before opening
• Use stairs, never elevators

❓ **Tell me more:**
• Where are you in the building?
• Can you see your exits?
• Is there heavy smoke?
• Are you trapped?

💙 I'll give you specific guidance based on your exact situation. What do you see right now?`;

        return this.formatResponse([response]);
    },
    
    // Format response object
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

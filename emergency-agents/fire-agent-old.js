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
    
    // 🎯 INTELLIGENT RESPONSE GENERATOR WITH RESPONDER SUPPORT
    generateResponse(context) {
        const { userMessage, conversationHistory = [], userRole, isResponder } = context;
        const lowerMessage = userMessage.toLowerCase();
        
        // Only activate on explicit /fire trigger
        if (!this.isInitialActivation(userMessage, conversationHistory)) {
            return null;
        }
        
        // Check if this is responder activation (when someone accepts emergency)
        if (userRole === 'responder' || isResponder) {
            return this.generateResponderActivation(context);
        }
        
        // Initial activation for victim
        return this.generateInitialFireResponse();
    },
    
    // Generate responder activation response
    generateResponderActivation(context) {
        const responderMessage = `🚒 RESPONDER ACTIVATION COMPLETE

💙 Stay calm ${context.userRole === 'responder' ? 'Responder' : 'Helper'} - You've got this!

🎯 **Your Mission:**
• Assess situation from safe distance
• Guide victim to safety
• Coordinate with fire department
• Maintain communication

📞 **Quick Actions:**
• Go to Fire Authority for team chat
• Contact victim directly if needed
• Report status to fire dispatch

💪 Ask me anything - I'll give you quick, clear guidance!`;

        return this.formatResponse([responderMessage]);
    },
    
    // Check if this is the first fire emergency message
    isInitialActivation(userMessage, history) {
        // Only activate on explicit /fire trigger
        const lowerMessage = userMessage.toLowerCase();
        return lowerMessage.trim().startsWith('/fire');
    },
    
    // Generate initial fire emergency response (OPTIMIZED - SHORTER)
    generateInitialFireResponse() {
        const initialMessage = `🚨 FIRE EMERGENCY ACTIVATED

💙 I'm here to help - Stay calm!

🔥 IMMEDIATE DO's:
1. Exit building immediately
2. Stay low to avoid smoke
3. Feel doors before opening
4. Use stairs only - NO elevators
5. Close doors behind you

⚠️ CRITICAL DON'Ts:
❌ Don't use elevators
❌ Don't go back for belongings  
❌ Don't hide under furniture
❌ Don't inhale smoke

� Tell me your situation - I'll guide you step by step!`;

        return this.formatResponse([initialMessage]);
    },
    
    // Generate intelligent AI response based on user question
    generateIntelligentResponse(userMessage, context) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Analyze floor/height specific questions
        if (lowerMessage.includes('floor') || lowerMessage.match(/\d+th|\d+nd|\d+rd|\d+st/)) {
            return this.analyzeFloorSituation(userMessage);
        }
        
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
    
    // Analyze floor-specific situations (like 9th floor)
    analyzeFloorSituation(userMessage) {
        const floorMatch = userMessage.match(/(\d+)(?:th|nd|rd|st)?\s*floor/i);
        const floorNumber = floorMatch ? parseInt(floorMatch[1]) : null;
        
        let floorAdvice = "";
        
        if (floorNumber && floorNumber >= 7) {
            floorAdvice = `🏗️ HIGH FLOOR (${floorNumber}th floor) - CRITICAL SITUATION:

💙 I know this is scary, but you CAN get out safely!

🚨 **HIGH FLOOR ESCAPE PLAN:**
• Find the nearest stairwell - NOT elevators
• Stay low if there's smoke
• Count floors as you go down
• If stairs are blocked, go to highest floor and signal for help

⚠️ **NEVER jump** - Firefighters have ladders for high floors
🚁 **Helicopter rescue possible** from roof if stairs blocked

💪 **You're going to make it** - follow the stairwell down step by step!`;
        } else if (floorNumber && floorNumber >= 3) {
            floorAdvice = `🏢 MID FLOOR (${floorNumber}th floor) - MANAGEABLE:

💙 Good news - you can get down safely!

✅ **MID FLOOR ESCAPE:**
• Use stairs immediately
• Stay on the right side going down
• Help others if you can safely
• Count floors - ${floorNumber} floors to go

🔥 **Every floor down is safer** - keep moving!`;
        } else if (floorNumber && floorNumber <= 2) {
            floorAdvice = `🏠 LOW FLOOR (${floorNumber}th floor) - QUICK EXIT:

💙 You're close to safety!

✅ **FAST EXIT PLAN:**
• You're almost out - just ${floorNumber} floors!
• Use stairs or exit directly
• Watch for falling debris outside
• Move away from building once out

🏃 **You're so close to safety** - get out now!`;
        } else {
            floorAdvice = `🏢 **FLOOR SITUATION ANALYSIS:**

💙 Tell me your exact floor number for specific guidance!

🚨 **General HIGH FLOOR rules:**
• Higher floors: Use stairs, signal if blocked
• Middle floors: Quick stair descent  
• Lower floors: Fast exit, watch for debris

**What floor are you on exactly?**`;
        }
        
        return this.formatResponse([floorAdvice]);
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
    
    // Handle exit requests - only allow after situation is resolved
    handleExitRequest(conversationHistory) {
        // Check if emergency has been resolved based on conversation
        const hasFireDepartmentArrived = conversationHistory.some(msg => 
            msg.content && (
                msg.content.includes('fire department arrived') ||
                msg.content.includes('fire extinguished') ||
                msg.content.includes('situation resolved') ||
                msg.content.includes('emergency solved')
            )
        );
        
        const hasUserConfirmedSafe = conversationHistory.some(msg =>
            msg.content && (
                msg.content.includes('i am safe') ||
                msg.content.includes('out of danger') ||
                msg.content.includes('fire is out')
            )
        );
        
        if (hasFireDepartmentArrived && hasUserConfirmedSafe) {
            const exitResponse = `✅ EMERGENCY RESOLVED - EXIT APPROVED

🎉 Fire emergency has been successfully resolved!
🚒 Fire department confirmed situation under control
✅ You have confirmed you are safe

📋 FINAL SAFETY REMINDERS:
• Stay away from the area until fully cleared
• Follow fire department instructions
• Seek medical attention if you inhaled smoke
• Contact your insurance company if property damage
• Keep emergency contact numbers updated

💙 You handled this emergency well. Stay safe!

🚪 You may now exit the fire emergency chat.`;

            return this.formatResponse([exitResponse], true); // Allow exit
        } else {
            const blockExitResponse = `🚫 CANNOT EXIT YET - EMERGENCY STILL ACTIVE

⚠️ For your safety, you cannot exit the fire emergency chat until:

✅ Fire department confirms arrival and situation control
✅ You confirm you are safe and out of danger
✅ Emergency is officially resolved

🔥 Current status: Emergency still in progress
🚒 Fire department response: In progress
📍 Your safety status: Please confirm when safe

💙 I'm here to help until this emergency is fully resolved.
Ask me: "Shall I exit?" when the situation is completely safe.`;

            return this.formatResponse([blockExitResponse]);
        }
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
        const response = `🔥 **Quick guidance for your situation:**

✅ **Key actions:**
• Exit immediately - don't delay
• Stay low to avoid smoke  
• Feel doors before opening
• Use stairs, never elevators

💬 **Tell me specifically:**
• What floor are you on?
• Can you see exits?
• Is there smoke?
• Are you trapped?

💙 Give me details and I'll help you step by step!`;

        return this.formatResponse([response]);
    },
    
    // Format response object with exit control
    formatResponse(responseArray, allowExit = false) {
        return {
            message: responseArray.join('\n'),
            agentType: this.type,
            agentName: this.name,
            emergencyActive: true,
            contextLocked: !allowExit, // Lock context until emergency resolved
            safetyVerified: allowExit, // Only true when safe to exit
            canExit: allowExit, // Explicit exit permission
            timestamp: new Date().toISOString()
        };
    }
};

module.exports = FIRE_AGENT;

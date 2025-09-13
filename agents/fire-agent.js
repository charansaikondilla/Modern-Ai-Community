// 🔥 FIRE EMERGENCY AGENT - Specialized Fire Response
// Protocol-first approach with OpenAI API backup

const knowledge = require('../knowledge-base.json');
const { MissionHelpers } = require('../mission-control');

class FireAgent {
    constructor() {
        this.agentType = 'FIRE_EMERGENCY';
        this.name = 'Fire Emergency Specialist';
        this.agentSystemPrompt = `You are a FIRE EMERGENCY SPECIALIST. Your role is to provide immediate, life-saving fire emergency guidance.

CRITICAL RULES:
- Always prioritize IMMEDIATE EVACUATION
- Provide specific, actionable steps
- Consider user's exact situation (floor, trapped, etc.)
- Never give general advice - be specific to fire emergencies
- If user mentions being trapped, provide escape guidance
- If user asks about suppression, give fire-type specific advice

RESPONSE FORMAT:
- Start with 🚨 FIRE EMERGENCY
- Provide immediate actions first
- Give specific guidance for their situation
- End with when to expect help`;
    }

    // 🎯 GENERATE RESPONSE - AI FIRST, Protocol Fallback Only
    async generateResponse(userMessage, userContext = {}) {
        const { userID, location, details } = userContext;
        
        // Log interaction
        MissionHelpers.log('USER', userMessage, { agent: 'fire' });
        
        // 🤖 PRIMARY: OpenAI API for ALL responses
        try {
            const aiAgent = require('./ai-agent');
            
            // Enhanced context for AI
            const contextualPrompt = `${this.agentSystemPrompt}

CURRENT SITUATION:
- User Location: ${location || 'Unknown location'}
- User Message: "${userMessage}"
- Additional Details: ${JSON.stringify(details)}

Provide immediate, specific fire emergency guidance based on this exact situation. Be contextual and specific to their circumstances.`;

            const apiResponse = await aiAgent.callOpenAI(
                contextualPrompt,
                userMessage,
                { temperature: 0.1, max_tokens: 400 }
            );
            
            if (apiResponse) {
                const enhancedResponse = `🚨 FIRE EMERGENCY - AI SPECIALIST\n\n${apiResponse}\n\n🚒 Fire department dispatched to your location`;
                MissionHelpers.log('FIRE_AGENT', enhancedResponse);
                return {
                    response: enhancedResponse,
                    agentType: this.agentType,
                    source: 'openai_primary',
                    emergency: true
                };
            }
        } catch (error) {
            console.log('🚨 OpenAI primary failed, trying protocol fallback:', error.message);
        }

        // 🛡️ FALLBACK: Protocol-based only if AI fails
        const protocolResponse = this.getProtocolResponse(userMessage, details);
        if (protocolResponse) {
            MissionHelpers.log('FIRE_AGENT', protocolResponse);
            return {
                response: protocolResponse,
                agentType: this.agentType,
                source: 'protocol_fallback',
                emergency: true
            };
        }

        // 🛡️ LAST RESORT: Generic fallback
        const fallbackResponse = this.getFallbackResponse();
        MissionHelpers.log('FIRE_AGENT', fallbackResponse);
        return {
            response: fallbackResponse,
            agentType: this.agentType,
            source: 'generic_fallback',
            emergency: true
        };
    }

    // 📋 GET PROTOCOL-BASED RESPONSE
    getProtocolResponse(message, details = {}) {
        const lowerMsg = message.toLowerCase();
        const protocols = knowledge.emergency_protocols.fire;

        // 🏢 HIGH FLOOR / TRAPPED SCENARIOS
        if ((lowerMsg.includes('floor') && lowerMsg.match(/\d+/)) || 
            lowerMsg.includes('trapped') || 
            lowerMsg.includes('door') && lowerMsg.includes('lock')) {
            
            const floorMatch = lowerMsg.match(/(\d+)/);
            const floor = floorMatch ? parseInt(floorMatch[1]) : 0;
            
            if (floor > 2) {
                return `🚨 FIRE EMERGENCY - HIGH FLOOR ESCAPE\n\n🏢 YOU'RE ON FLOOR ${floor}:\n• ${protocols.trapped_scenarios.high_floor.join('\n• ')}\n\n🚨 CRITICAL: Do NOT attempt to go down stairs if filled with smoke\n• Signal from window for rescue\n• Seal door cracks with wet cloth\n• Stay low where air is cleaner\n\n🚒 Fire rescue teams dispatched - Signal continuously from window`;
            }
        }

        // 🚪 DOOR/EXIT BLOCKED
        if (lowerMsg.includes('door') && (lowerMsg.includes('lock') || lowerMsg.includes('block') || lowerMsg.includes('stuck'))) {
            return `🚨 FIRE EMERGENCY - BLOCKED EXIT\n\n🚪 DOOR BLOCKED/LOCKED:\n• ${protocols.trapped_scenarios.blocked_exit.join('\n• ')}\n\n⚠️ IF GROUND FLOOR: Break window safely and exit\n⚠️ IF UPPER FLOOR: Signal for rescue, don't jump\n\n🚒 Rescue teams en route - Stay visible at window`;
        }

        // 💧 WATER/SUPPRESSION QUESTIONS
        if (lowerMsg.includes('water') || lowerMsg.includes('extinguish') || lowerMsg.includes('put out')) {
            return `🚨 FIRE SUPPRESSION GUIDANCE\n\n💧 WATER USAGE:\n• Small fires only: ${protocols.suppression.small_fires}\n• Electrical fires: ${protocols.suppression.electrical_fires}\n• Grease fires: ${protocols.suppression.grease_fires}\n\n⚠️ PRIORITY: Your safety first - evacuate if fire is spreading\n\n🚒 Professional firefighters en route for major suppression`;
        }

        // 🌫️ SMOKE RELATED
        if (lowerMsg.includes('smoke')) {
            return `🚨 SMOKE EMERGENCY\n\n🌫️ SMOKE INHALATION PREVENTION:\n• Get below smoke level immediately\n• Crawl on hands and knees to exit\n• Cover nose/mouth with cloth\n• If trapped, seal door cracks\n\n⚠️ SMOKE IS DEADLY: Exit immediately, don't try to save belongings\n\n🚒 Fire department responding - Continue to safe area`;
        }

        return null; // No specific protocol match
    }

    // 🛡️ FALLBACK RESPONSE
    getFallbackResponse() {
        const protocols = knowledge.emergency_protocols.fire;
        return `🚨 FIRE EMERGENCY ACTIVATED\n\n🔥 IMMEDIATE ACTIONS:\n• ${protocols.immediate_actions.join('\n• ')}\n\n⚠️ REMEMBER: Your life is more important than any property\n\n🚒 Fire department dispatched - ETA 5-8 minutes\n📞 Stay on line with 911 if possible`;
    }

    // 📊 GET AGENT STATUS
    getStatus() {
        return {
            type: this.agentType,
            name: this.name,
            protocols: Object.keys(knowledge.emergency_protocols.fire).length,
            ready: true
        };
    }
}

module.exports = new FireAgent();
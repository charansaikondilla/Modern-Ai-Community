// 🏥 MEDICAL EMERGENCY AGENT - Specialized Medical Response
// Protocol-first approach with OpenAI API backup

const knowledge = require('../knowledge-base.json');
const { MissionHelpers } = require('../mission-control');

class MedicalAgent {
    constructor() {
        this.agentType = 'MEDICAL_EMERGENCY';
        this.name = 'Medical Emergency Specialist';
        this.agentSystemPrompt = `You are a MEDICAL EMERGENCY SPECIALIST. Your role is to provide immediate, life-saving medical guidance.

CRITICAL RULES:
- Always assess consciousness and breathing first
- Provide specific, step-by-step medical instructions
- Consider user's exact symptoms and situation
- Never diagnose - provide emergency care guidance only
- If life-threatening, emphasize calling 911 immediately
- Give clear, actionable steps for stabilization

RESPONSE FORMAT:
- Start with 🚨 MEDICAL EMERGENCY
- Assess situation quickly
- Provide immediate stabilization steps
- Emphasize professional medical help`;
    }

    // 🎯 GENERATE RESPONSE - AI FIRST, Protocol Fallback Only
    async generateResponse(userMessage, userContext = {}) {
        const { userID, location, details } = userContext;
        
        // Log interaction
        MissionHelpers.log('USER', userMessage, { agent: 'medical' });
        
        // 🤖 PRIMARY: OpenAI API for ALL responses
        try {
            const aiAgent = require('./ai-agent');
            
            // Enhanced context for AI
            const contextualPrompt = `${this.agentSystemPrompt}

CURRENT MEDICAL SITUATION:
- Patient Location: ${location || 'Unknown location'}
- Reported Symptoms: "${userMessage}"
- Additional Context: ${JSON.stringify(details)}

Provide immediate, specific medical emergency guidance based on this exact situation. Be contextual and specific to their medical circumstances.`;

            const apiResponse = await aiAgent.callOpenAI(
                contextualPrompt,
                userMessage,
                { temperature: 0.1, max_tokens: 400 }
            );
            
            if (apiResponse) {
                const enhancedResponse = `🚨 MEDICAL EMERGENCY - AI SPECIALIST\n\n${apiResponse}\n\n🚑 Paramedics dispatched to your location`;
                MissionHelpers.log('MEDICAL_AGENT', enhancedResponse);
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
            MissionHelpers.log('MEDICAL_AGENT', protocolResponse);
            return {
                response: protocolResponse,
                agentType: this.agentType,
                source: 'protocol_fallback',
                emergency: true
            };
        }

        // 🛡️ LAST RESORT: Generic fallback
        const fallbackResponse = this.getFallbackResponse();
        MissionHelpers.log('MEDICAL_AGENT', fallbackResponse);
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
        const protocols = knowledge.emergency_protocols.medical;

        // 💔 CARDIAC/CHEST PAIN
        if (lowerMsg.includes('chest pain') || lowerMsg.includes('heart') || lowerMsg.includes('cardiac')) {
            return `🚨 MEDICAL EMERGENCY - POSSIBLE CARDIAC EVENT\n\n💔 IMMEDIATE ACTIONS:\n• Call 911 immediately - this could be a heart attack\n• Have person sit upright or in comfortable position\n• Loosen tight clothing around neck/chest\n• If conscious, give aspirin if not allergic\n• Monitor breathing and pulse\n\n⚠️ If person becomes unconscious, prepare for CPR\n\n🚑 Paramedics dispatched - Keep person calm and still`;
        }

        // 🩸 BLEEDING EMERGENCY
        if (lowerMsg.includes('bleeding') || lowerMsg.includes('blood') || lowerMsg.includes('cut')) {
            return `🚨 MEDICAL EMERGENCY - BLEEDING CONTROL\n\n🩸 STOP BLEEDING:\n• ${protocols.bleeding_control.join('\n• ')}\n\n⚠️ SEVERE BLEEDING SIGNS:\n• Blood soaking through bandages\n• Spurting blood\n• Person becoming pale/dizzy\n\n🚑 Medical team en route - Continue pressure until help arrives`;
        }

        // 😵 UNCONSCIOUS PERSON
        if (lowerMsg.includes('unconscious') || lowerMsg.includes('passed out') || lowerMsg.includes('not responding')) {
            return `🚨 MEDICAL EMERGENCY - UNCONSCIOUS PERSON\n\n😵 CRITICAL ASSESSMENT:\n• ${protocols.critical_assessment.join('\n• ')}\n\n🫁 IF NOT BREATHING:\n• ${protocols.cpr_steps.join('\n• ')}\n\n⚠️ Continue CPR until professional help arrives\n\n🚑 Emergency medical team dispatched - Don't stop CPR`;
        }

        // 🫁 BREATHING PROBLEMS
        if (lowerMsg.includes('breathing') || lowerMsg.includes('breath') || lowerMsg.includes('choking')) {
            return `🚨 MEDICAL EMERGENCY - BREATHING DIFFICULTY\n\n🫁 BREATHING SUPPORT:\n• Keep person upright if conscious\n• Loosen tight clothing\n• Check for obstructions in mouth\n• If choking: 5 back blows, 5 abdominal thrusts\n\n⚠️ If person stops breathing, begin rescue breathing\n\n🚑 Paramedics responding - Monitor breathing continuously`;
        }

        // 🔥 BURNS
        if (lowerMsg.includes('burn') || lowerMsg.includes('burnt')) {
            return `🚨 MEDICAL EMERGENCY - BURN TREATMENT\n\n🔥 BURN CARE:\n• ${protocols.burns.join('\n• ')}\n\n⚠️ SEVERE BURNS (call 911):\n• Larger than palm of hand\n• On face, hands, feet, or genitals\n• Deep burns showing white/charred tissue\n\n🚑 Medical team notified - Keep cooling burn until help arrives`;
        }

        return null; // No specific protocol match
    }

    // 🛡️ FALLBACK RESPONSE
    getFallbackResponse() {
        const protocols = knowledge.emergency_protocols.medical;
        return `🚨 MEDICAL EMERGENCY ACTIVATED\n\n🏥 IMMEDIATE ASSESSMENT:\n• ${protocols.critical_assessment.join('\n• ')}\n\n⚠️ CALL 911 IMMEDIATELY if:\n• Person is unconscious\n• Not breathing normally\n• Severe bleeding\n• Chest pain\n\n🚑 Medical team dispatched - Provide first aid and monitor vital signs`;
    }

    // 📊 GET AGENT STATUS
    getStatus() {
        return {
            type: this.agentType,
            name: this.name,
            protocols: Object.keys(knowledge.emergency_protocols.medical).length,
            ready: true
        };
    }
}

module.exports = new MedicalAgent();
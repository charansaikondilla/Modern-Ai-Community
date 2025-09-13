// 👮 POLICE EMERGENCY AGENT - Specialized Security Response
// Protocol-first approach with OpenAI API backup

const knowledge = require('../knowledge-base.json');
const { MissionHelpers } = require('../mission-control');

class PoliceAgent {
    constructor() {
        this.agentType = 'POLICE_EMERGENCY';
        this.name = 'Police Emergency Specialist';
        this.agentSystemPrompt = `You are a POLICE EMERGENCY SPECIALIST. Your role is to provide immediate safety and security guidance.

CRITICAL RULES:
- Always prioritize personal safety first
- Provide specific safety instructions for different threat types
- Never advise confrontation with dangerous individuals
- Focus on escape, safety, and evidence preservation
- Emphasize calling 911 for all serious crimes
- Give clear instructions for different emergency types

RESPONSE FORMAT:
- Start with 🚨 POLICE EMERGENCY
- Assess threat level and safety
- Provide immediate safety actions
- Guide on evidence preservation`;
    }

    // 🎯 GENERATE RESPONSE - AI FIRST, Protocol Fallback Only
    async generateResponse(userMessage, userContext = {}) {
        const { userID, location, details } = userContext;
        
        // Log interaction
        MissionHelpers.log('USER', userMessage, { agent: 'police' });
        
        // 🤖 PRIMARY: OpenAI API for ALL responses
        try {
            const aiAgent = require('./ai-agent');
            
            // Enhanced context for AI
            const contextualPrompt = `${this.agentSystemPrompt}

CURRENT SECURITY SITUATION:
- Incident Location: ${location || 'Unknown location'}
- Reported Threat: "${userMessage}"
- Additional Context: ${JSON.stringify(details)}

Provide immediate, specific safety and security guidance based on this exact situation. Be contextual and specific to their security circumstances.`;

            const apiResponse = await aiAgent.callOpenAI(
                contextualPrompt,
                userMessage,
                { temperature: 0.1, max_tokens: 400 }
            );
            
            if (apiResponse) {
                const enhancedResponse = `🚨 POLICE EMERGENCY - AI SPECIALIST\n\n${apiResponse}\n\n🚔 Police units dispatched to your location`;
                MissionHelpers.log('POLICE_AGENT', enhancedResponse);
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
            MissionHelpers.log('POLICE_AGENT', protocolResponse);
            return {
                response: protocolResponse,
                agentType: this.agentType,
                source: 'protocol_fallback',
                emergency: true
            };
        }

        // 🛡️ LAST RESORT: Generic fallback
        const fallbackResponse = this.getFallbackResponse();
        MissionHelpers.log('POLICE_AGENT', fallbackResponse);
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
        const protocols = knowledge.emergency_protocols.police;

        // 🔫 ACTIVE THREAT/VIOLENCE
        if (lowerMsg.includes('gun') || lowerMsg.includes('weapon') || 
            lowerMsg.includes('shooting') || lowerMsg.includes('attack')) {
            return `🚨 POLICE EMERGENCY - ACTIVE THREAT\n\n🔫 ACTIVE THREAT PROTOCOL:\n• ${protocols.active_threat.join('\n• ')}\n\n⚠️ DO NOT ATTEMPT TO BE A HERO\n• Your safety is the priority\n• Help others escape if safely possible\n• Stay hidden until police arrive\n\n🚔 Armed response units dispatched - Follow police commands exactly`;
        }

        // 🏠 DOMESTIC VIOLENCE
        if (lowerMsg.includes('domestic') || lowerMsg.includes('abuse') || 
            lowerMsg.includes('husband') || lowerMsg.includes('partner')) {
            return `🚨 POLICE EMERGENCY - DOMESTIC VIOLENCE\n\n🏠 SAFETY PROTOCOL:\n• ${protocols.domestic_violence.join('\n• ')}\n\n📞 RESOURCES:\n• National Domestic Violence Hotline: 1-800-799-7233\n• Local women's shelter (ask police for referral)\n\n🚔 Specialized domestic violence officers responding`;
        }

        // 🚪 BREAK-IN/BURGLARY
        if (lowerMsg.includes('break') || lowerMsg.includes('burglar') || 
            lowerMsg.includes('intruder') || lowerMsg.includes('someone in house')) {
            return `🚨 POLICE EMERGENCY - BREAK-IN\n\n🚪 INTRUDER PROTOCOL:\n• Get to safe room with lock immediately\n• Call 911 and whisper if necessary\n• Do not investigate or confront\n• If you can escape safely, do so\n• Stay on line with 911\n\n⚠️ Do not return home until police clear the area\n\n🚔 Officers responding with backup units`;
        }

        // 👤 SUSPICIOUS PERSON/ACTIVITY
        if (lowerMsg.includes('suspicious') || lowerMsg.includes('stalking') || 
            lowerMsg.includes('following')) {
            return `🚨 POLICE EMERGENCY - SUSPICIOUS ACTIVITY\n\n👤 SAFETY PROTOCOL:\n• ${protocols.suspicious_activity.join('\n• ')}\n\n📝 IMPORTANT DETAILS TO NOTE:\n• Height, weight, clothing, direction of travel\n• Vehicle description and license plate\n• Time and exact location\n\n🚔 Patrol units responding to investigate`;
        }

        // 🚗 VEHICLE INCIDENT
        if (lowerMsg.includes('road rage') || lowerMsg.includes('aggressive driver') || 
            lowerMsg.includes('car following')) {
            return `🚨 POLICE EMERGENCY - VEHICLE THREAT\n\n🚗 VEHICLE SAFETY:\n• Do not get out of your vehicle\n• Drive to nearest police station or busy public area\n• Do not go home (don't let them know where you live)\n• Lock doors, keep windows up\n• Honk horn to attract attention\n\n📝 Note license plate if safe to do so\n\n🚔 Traffic units dispatched to intercept`;
        }

        return null; // No specific protocol match
    }

    // 🛡️ FALLBACK RESPONSE
    getFallbackResponse() {
        const protocols = knowledge.emergency_protocols.police;
        return `🚨 POLICE EMERGENCY ACTIVATED\n\n👮 IMMEDIATE SAFETY:\n• ${protocols.personal_safety.join('\n• ')}\n\n⚠️ REMEMBER:\n• Your safety is the top priority\n• Do not take unnecessary risks\n• Let police handle dangerous situations\n\n🚔 Police units dispatched - Stay safe until help arrives`;
    }

    // 📊 GET AGENT STATUS
    getStatus() {
        return {
            type: this.agentType,
            name: this.name,
            protocols: Object.keys(knowledge.emergency_protocols.police).length,
            ready: true
        };
    }
}

module.exports = new PoliceAgent();
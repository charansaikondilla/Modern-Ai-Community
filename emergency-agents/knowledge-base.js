// 🧠 EMERGENCY KNOWLEDGE BASE
// Preloaded context for all emergency agents - NO API CALLS NEEDED

const EMERGENCY_KNOWLEDGE = {
    // 🔥 FIRE EMERGENCY PROTOCOLS
    fire: {
        actions: [
            "Evacuate immediately using nearest exit",
            "Stay low to avoid smoke inhalation", 
            "Do not use elevators - use stairs only",
            "Call 911 immediately",
            "Close doors behind you to slow fire spread",
            "Feel doors before opening - if hot, find alternate route",
            "If trapped, signal for help from window",
            "Never go back inside for belongings"
        ],
        tips: [
            "Cover nose/mouth with cloth if smoke is present",
            "If clothes catch fire: Stop, Drop, and Roll",
            "Meet at designated assembly point",
            "Account for all family members/colleagues",
            "Provide location details to fire department"
        ],
        protocols: {
            immediate: "EVACUATE NOW - Every second counts",
            trapped: "Signal for help, seal door cracks, stay low",
            burns: "Cool with water for 10+ minutes, cover with clean cloth",
            smoke: "Get below smoke level, crawl to exit if needed"
        }
    },

    // 🏥 MEDICAL EMERGENCY PROTOCOLS  
    medical: {
        actions: [
            "Call 911 immediately for serious injuries",
            "Check if person is conscious and breathing",
            "Apply direct pressure to stop bleeding",
            "Do not move person if spinal injury suspected",
            "Keep injured person warm and calm",
            "Clear airway if person is unconscious",
            "Begin CPR if no pulse and trained to do so",
            "Document time of injury and treatments given"
        ],
        tips: [
            "Use clean cloth/bandage for bleeding wounds",
            "Elevate bleeding limb above heart level if possible",
            "Watch for signs of shock: pale, cold, rapid pulse",
            "Never give food/water to unconscious person",
            "Keep detailed notes for emergency responders"
        ],
        protocols: {
            bleeding: "Direct pressure + elevation + pressure points",
            unconscious: "Check breathing, clear airway, recovery position",
            burns: "Cool with water, cover, no ice or ointments",
            choking: "5 back blows, 5 abdominal thrusts, repeat",
            heartAttack: "Call 911, aspirin if not allergic, monitor vitals"
        }
    },

    // 🚔 POLICE/SECURITY EMERGENCY PROTOCOLS
    police: {
        actions: [
            "Call 911 immediately for violent crimes",
            "Get to safe location if possible",
            "Do not confront dangerous individuals",
            "Preserve evidence - don't touch anything",
            "Note descriptions of suspects/vehicles",
            "Provide clear location to dispatchers",
            "Follow police instructions exactly",
            "Stay available for witness statements"
        ],
        tips: [
            "Remember: Height, weight, clothing, direction of travel",
            "License plate numbers are crucial evidence",
            "Time of incident helps with investigations", 
            "Multiple witnesses provide better information",
            "Security cameras may have recorded evidence"
        ],
        protocols: {
            activeShooter: "Run-Hide-Fight protocol, call 911 when safe",
            domestic: "Get to safety, call 911, document injuries",
            theft: "Don't pursue, note details, call police",
            assault: "Ensure safety first, get medical help, report",
            suspicious: "Observe from distance, report to authorities"
        }
    },

    // 🌪️ DISASTER EMERGENCY PROTOCOLS
    disaster: {
        actions: [
            "Follow official evacuation orders immediately",
            "Gather emergency kit and important documents",
            "Turn off utilities if instructed (gas, water, electric)",
            "Secure your property if time allows",
            "Monitor emergency broadcasts for updates",
            "Help neighbors who may need assistance",
            "Report to designated evacuation centers",
            "Register with Red Cross or emergency services"
        ],
        tips: [
            "Keep emergency kit ready: water, food, flashlight, radio",
            "Important docs in waterproof container",
            "Full tank of gas in vehicles during disaster season",
            "Know multiple evacuation routes",
            "Emergency contacts outside the disaster area"
        ],
        protocols: {
            earthquake: "Drop-Cover-Hold On, stay away from glass/falling objects",
            flood: "Get to higher ground, never drive through water",
            tornado: "Lowest floor, interior room, away from windows",
            hurricane: "Board windows, secure outdoor items, evacuate if ordered",
            wildfire: "Close all windows/doors, wet down property, evacuate early"
        }
    }
};

// 🎯 MISSION CONTROL - Shared Context Object
const MISSION_CONTROL = {
    emergencyID: null,
    status: 'normal', // normal, active, monitoring, resolved
    activeAgents: [],
    victimDetails: {
        location: '',
        injuries: [],
        consciousness: 'unknown',
        mobility: 'unknown'
    },
    transcript: [],
    needs: [],
    
    // Methods to update mission control
    startEmergency(type, details = {}) {
        this.emergencyID = `emg_${Date.now()}`;
        this.status = 'active';
        this.activeAgents = [type];
        this.victimDetails = { ...this.victimDetails, ...details };
        this.transcript.push({
            timestamp: new Date().toISOString(),
            event: `Emergency started: ${type}`,
            details
        });
    },
    
    addAgent(agentType) {
        if (!this.activeAgents.includes(agentType)) {
            this.activeAgents.push(agentType);
            this.transcript.push({
                timestamp: new Date().toISOString(),
                event: `Agent activated: ${agentType}`
            });
        }
    },
    
    logResponse(agentType, message) {
        this.transcript.push({
            timestamp: new Date().toISOString(),
            agent: agentType,
            message: message.substring(0, 100) + '...'
        });
    },
    
    addNeed(need) {
        if (!this.needs.includes(need)) {
            this.needs.push(need);
        }
    },
    
    resolveEmergency() {
        this.status = 'resolved';
        this.transcript.push({
            timestamp: new Date().toISOString(),
            event: 'Emergency resolved'
        });
    },
    
    reset() {
        this.emergencyID = null;
        this.status = 'normal';
        this.activeAgents = [];
        this.victimDetails = {
            location: '',
            injuries: [],
            consciousness: 'unknown',
            mobility: 'unknown'
        };
        this.transcript = [];
        this.needs = [];
    }
};

module.exports = {
    EMERGENCY_KNOWLEDGE,
    MISSION_CONTROL
};
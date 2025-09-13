// 🎯 MISSION CONTROL - Central Emergency State Management
// Persistent state tracking for all emergency operations

class MissionControl {
    constructor() {
        this.state = {
            emergencyID: null,
            status: 'normal', // normal, active, monitoring, resolved
            activeAgent: null,
            userID: null,
            emergencyType: null,
            startTime: null,
            transcript: [],
            userDetails: {
                location: '',
                injuries: [],
                consciousness: 'unknown',
                mobility: 'unknown'
            },
            needs: [],
            responders: []
        };
        this.loadState();
    }

    // 🚨 START EMERGENCY
    startEmergency(type, userID, details = {}) {
        this.state = {
            emergencyID: `EMG_${Date.now()}`,
            status: 'active',
            activeAgent: type,
            userID: userID,
            emergencyType: type,
            startTime: new Date().toISOString(),
            transcript: [],
            userDetails: { ...this.state.userDetails, ...details },
            needs: [],
            responders: []
        };
        
        this.addTranscript('SYSTEM', `Emergency started: ${type}`);
        this.saveState();
        return this.state.emergencyID;
    }

    // 📝 ADD TO TRANSCRIPT
    addTranscript(role, message, metadata = {}) {
        this.state.transcript.push({
            timestamp: new Date().toISOString(),
            role: role, // USER, AGENT, SYSTEM
            message: message.substring(0, 200),
            metadata: metadata
        });
        this.saveState();
    }

    // 🎯 UPDATE USER DETAILS
    updateUserDetails(details) {
        this.state.userDetails = { ...this.state.userDetails, ...details };
        this.saveState();
    }

    // 📋 ADD NEED
    addNeed(need) {
        if (!this.state.needs.includes(need)) {
            this.state.needs.push(need);
            this.saveState();
        }
    }

    // ✅ RESOLVE EMERGENCY
    resolveEmergency() {
        this.state.status = 'resolved';
        this.addTranscript('SYSTEM', 'Emergency resolved');
        this.saveState();
    }

    // 🔄 RESET STATE
    reset() {
        this.state = {
            emergencyID: null,
            status: 'normal',
            activeAgent: null,
            userID: null,
            emergencyType: null,
            startTime: null,
            transcript: [],
            userDetails: {
                location: '',
                injuries: [],
                consciousness: 'unknown',
                mobility: 'unknown'
            },
            needs: [],
            responders: []
        };
        this.saveState();
    }

    // 💾 SAVE STATE TO LOCALSTORAGE
    saveState() {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('missionControl', JSON.stringify(this.state));
            }
        } catch (error) {
            console.log('LocalStorage not available, using memory only');
        }
    }

    // 📤 LOAD STATE FROM LOCALSTORAGE
    loadState() {
        try {
            if (typeof localStorage !== 'undefined') {
                const saved = localStorage.getItem('missionControl');
                if (saved) {
                    this.state = { ...this.state, ...JSON.parse(saved) };
                }
            }
        } catch (error) {
            console.log('Could not load saved state');
        }
    }

    // 📊 GET STATUS
    getStatus() {
        return {
            ...this.state,
            uptime: this.state.startTime ? 
                Date.now() - new Date(this.state.startTime).getTime() : 0
        };
    }

    // 🔍 CHECK ACTIVE EMERGENCY
    hasActiveEmergency() {
        return this.state.status === 'active' && this.state.activeAgent;
    }

    // 🎯 GET ACTIVE AGENT
    getActiveAgent() {
        return this.state.activeAgent;
    }

    // 👤 GET USER ID
    getUserID() {
        return this.state.userID;
    }
}

// Export singleton instance
const missionControl = new MissionControl();

// Helper functions
const MissionHelpers = {
    // 🚨 Quick emergency start
    startEmergency: (type, userID, details) => missionControl.startEmergency(type, userID, details),
    
    // 📝 Log interaction
    log: (role, message, metadata) => missionControl.addTranscript(role, message, metadata),
    
    // 🔍 Check if emergency active
    isActive: () => missionControl.hasActiveEmergency(),
    
    // 🎯 Get current agent
    getAgent: () => missionControl.getActiveAgent(),
    
    // 📊 Get full status
    getStatus: () => missionControl.getStatus(),
    
    // 🔄 Reset everything
    reset: () => missionControl.reset()
};

module.exports = { missionControl, MissionHelpers };
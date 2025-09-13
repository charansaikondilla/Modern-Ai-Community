// Personal AI Assistant for Emergency Platform
// Integrated as a personal chat rather than community-wide AI

class PersonalAI {
    constructor() {
        this.isInitialized = false;
        this.aiState = {
            isActive: true,
            mode: 'normal', // normal, emergency, responder
            lastInteraction: null
        };
        
        console.log('🤖 Personal AI Assistant initialized');
    }

    // This method is called when the main app initializes
    initialize() {
        if (this.isInitialized) return;
        
        this.isInitialized = true;
        console.log('✅ Personal AI Assistant ready for personal chats');
    }

    // Test AI connection for health check
    async testConnection() {
        try {
            const response = await fetch('/api/ai/health', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                const result = await response.json();
                return { success: true, service: result.service };
            }
            return { success: false, error: 'Service unavailable' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

// Initialize the Personal AI system
if (typeof window !== 'undefined') {
    window.personalAI = new PersonalAI();
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.personalAI.initialize();
        });
    } else {
        window.personalAI.initialize();
    }
}

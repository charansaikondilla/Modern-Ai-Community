// Frontend AI Module - Emergency Chat AI Assistant
// Handles AI state, context switching, and chat integration
// Does NOT modify existing UI, design, or emergency logic

class EmergencyAI {
    constructor(app) {
        this.app = app; // Reference to main ModernCommunity app
        this.aiState = {
            mode: 'normal', // normal, fire, medical, accident, assault, natural_disaster, responder
            emergencyActive: false,
            victimDetails: null,
            emergencyId: null,
            conversationContext: []
        };
        
        this.isProcessing = false;
        this.init();
    }

    init() {
        // Hook into existing chat system without modifying UI
        this.hookIntoChat();
        
        // Listen for emergency state changes
        this.setupEmergencyListeners();
        
        // Show AI companion indicator
        this.showAICompanion();
        
        console.log('🤖 Emergency AI Module initialized');
    }

    // Show AI companion indicator in chat
    showAICompanion() {
        // Wait for app to be fully loaded
        setTimeout(() => {
            this.displayAIWelcomeMessage();
            this.addAIStatusIndicator();
        }, 1000);
    }

    // Display AI welcome message when user opens any chat
    displayAIWelcomeMessage() {
        // Create welcome message for AI companion
        const welcomeMessage = {
            id: `ai_welcome_${Date.now()}`,
            user: {
                id: 'ai_assistant',
                name: '🤖 Emergency AI',
                avatar: '🤖',
                role: 'ai_assistant'
            },
            message: "👋 Hello! I'm your AI Emergency Assistant. I'm always here to help with:\n\n🆘 Emergency guidance (type /fire, /doctor, etc.)\n💬 General safety questions (just ask!)\n🛡️ Always includes emergency service reminders\n\n✨ Try typing 'hello AI' or ask for help anytime!",
            timestamp: new Date().toLocaleTimeString(),
            communityId: 'ai_companion',
            type: 'ai_welcome',
            isPinned: true
        };

        // Show welcome message when user enters any chat
        const originalShowCommunityChat = this.app.showCommunityChat;
        const self = this;
        
        this.app.showCommunityChat = function(community) {
            // Call original function
            const result = originalShowCommunityChat.call(this, community);
            
            // Add AI welcome message if not already shown in this session
            if (!self.welcomeShown) {
                setTimeout(() => {
                    self.app.addMessageToChat(welcomeMessage);
                    self.welcomeShown = true;
                }, 500);
            }
            
            return result;
        };
    }

    // Add AI status indicator to the interface
    addAIStatusIndicator() {
        // Add AI status indicator to message input area
        const messageInput = document.getElementById('messageInput');
        if (messageInput && !document.getElementById('aiStatusIndicator')) {
            
            // Create AI status indicator
            const aiIndicator = document.createElement('div');
            aiIndicator.id = 'aiStatusIndicator';
            aiIndicator.className = 'ai-status-indicator';
            aiIndicator.innerHTML = `
                <div class="ai-status-content">
                    <span class="ai-status-icon">🤖</span>
                    <span class="ai-status-text">AI Assistant Online</span>
                    <span class="ai-status-mode">${this.aiState.mode}</span>
                    <button class="ai-test-btn" title="Test AI">Test</button>
                </div>
            `;
            
            // Add click handler to show AI info
            aiIndicator.addEventListener('click', (e) => {
                if (e.target.classList.contains('ai-test-btn')) {
                    this.testAI();
                } else {
                    this.showAIInfo();
                }
            });
            
            // Insert before emergency commands
            const emergencyCommands = document.querySelector('.emergency-commands');
            if (emergencyCommands) {
                emergencyCommands.parentNode.insertBefore(aiIndicator, emergencyCommands);
            }
            
            // Add CSS styles
            this.addAIStyles();
        }
    }

    // Show AI information dialog
    showAIInfo() {
        const status = this.aiState.isActive ? 'Active' : 'Inactive';
        const info = `
AI Emergency Assistant Status:
• Status: ${status}
• Mode: ${this.aiState.mode}
• Keywords: emergency, help, ai, urgent, fire, medical, police

The AI assistant is monitoring all messages and will automatically respond to:
- Emergency situations
- Requests for help
- Direct AI commands
- Safety-related questions

For emergencies, always call 911 first!
        `;
        
        alert(info);
    }

    // Test AI functionality
    testAI() {
        const currentCommunity = this.app.currentCommunity;
        if (!currentCommunity) {
            alert('Please open a chat first, then test the AI');
            return;
        }
        
        // Simulate user typing "hello AI"
        this.processUserMessage('hello AI', currentCommunity.id);
        
        // Show test notification
        this.app.showNotification(
            '🤖 AI Test Started',
            'AI should respond in a few seconds. Check the chat!',
            'info'
        );
    }

    // Add AI companion styles
    addAIStyles() {
        if (!document.getElementById('aiCompanionStyles')) {
            const style = document.createElement('style');
            style.id = 'aiCompanionStyles';
            style.textContent = `
                .ai-status-indicator {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 8px 12px;
                    margin: 8px 0;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
                    animation: aiPulse 2s infinite;
                }

                .ai-status-indicator:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                }

                .ai-status-content {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 13px;
                    font-weight: 500;
                }

                .ai-status-icon {
                    font-size: 16px;
                    animation: aiRobot 3s infinite;
                }

                .ai-status-mode {
                    background: rgba(255,255,255,0.2);
                    padding: 2px 6px;
                    border-radius: 10px;
                    font-size: 11px;
                    text-transform: uppercase;
                }

                .ai-test-btn {
                    background: rgba(255,255,255,0.2);
                    border: none;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 8px;
                    font-size: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .ai-test-btn:hover {
                    background: rgba(255,255,255,0.3);
                    transform: scale(1.05);
                }

                .ai-emergency-mode .ai-status-indicator {
                    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
                    animation: aiEmergencyPulse 1s infinite;
                }

                .ai-responder-mode .ai-status-indicator {
                    background: linear-gradient(135deg, #2ed573 0%, #1e90ff 100%);
                }

                @keyframes aiPulse {
                    0%, 100% { opacity: 0.9; }
                    50% { opacity: 1; }
                }

                @keyframes aiEmergencyPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }

                @keyframes aiRobot {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(-5deg); }
                    75% { transform: rotate(5deg); }
                }

                /* AI Welcome message styling */
                .message.ai-welcome {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border-left: 4px solid #4CAF50;
                    margin: 10px 0;
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }

                .message.ai-welcome .message-avatar {
                    background: rgba(255,255,255,0.2);
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Show AI information modal
    showAIInfo() {
        const aiInfo = `
            🤖 Emergency AI Assistant Status
            
            Current Mode: ${this.aiState.mode.toUpperCase()}
            Emergency Active: ${this.aiState.emergencyActive ? 'YES' : 'NO'}
            Service: OpenAI GPT-3.5
            
            🆘 Emergency Commands:
            /fire - Fire emergency guidance
            /doctor - Medical emergency help  
            /rape - Assault support (anonymous)
            /accident - Accident response
            /disaster - Natural disaster help
            
            💬 Chat Commands:
            "hello AI" - General greeting
            "help" - Get assistance
            "safety" - Safety information
            
            ⚠️ Always includes emergency service reminders
        `;
        
        alert(aiInfo);
    }

    // Hook into existing chat without modifying DOM structure
    hookIntoChat() {
        // Override the existing sendMessage function to include AI processing
        const originalSendMessage = this.app.sendMessage;
        const self = this;
        
        this.app.sendMessage = function(message, communityId) {
            // Call original function first
            originalSendMessage.call(this, message, communityId);
            
            // Then process AI response if needed
            self.processUserMessage(message, communityId);
        };
    }

    // Listen for emergency triggers and state changes
    setupEmergencyListeners() {
        // Listen for emergency triggers
        document.addEventListener('emergencyTriggered', (event) => {
            this.handleEmergencyTrigger(event.detail);
        });

        // Listen for emergency acceptance by responders
        document.addEventListener('emergencyAccepted', (event) => {
            this.handleEmergencyAcceptance(event.detail);
        });

        // Listen for emergency resolution
        document.addEventListener('emergencyResolved', (event) => {
            this.handleEmergencyResolution(event.detail);
        });
    }

    // Handle emergency trigger (victim mode)
    handleEmergencyTrigger(emergencyDetails) {
        this.aiState.mode = emergencyDetails.type; // fire, medical, etc.
        this.aiState.emergencyActive = true;
        this.aiState.victimDetails = emergencyDetails.victim;
        this.aiState.emergencyId = emergencyDetails.id;
        
        console.log(`🚨 AI switched to ${emergencyDetails.type} emergency mode`);
        
        // Update visual indicator
        this.updateAIIndicator();
        
        // Send initial AI guidance to victim
        this.sendAIResponse('emergency_triggered', emergencyDetails.communityId);
    }

    // Handle emergency acceptance (responder mode)
    handleEmergencyAcceptance(acceptanceDetails) {
        if (acceptanceDetails.emergencyId === this.aiState.emergencyId) {
            this.aiState.mode = 'responder';
            
            console.log('👨‍🚒 AI switched to responder mode');
            
            // Update visual indicator
            this.updateAIIndicator();
            
            // Send responder guidance
            this.sendAIResponse('responder_guidance', acceptanceDetails.communityId);
        }
    }

    // Handle emergency resolution (back to normal)
    handleEmergencyResolution(resolutionDetails) {
        if (resolutionDetails.emergencyId === this.aiState.emergencyId) {
            this.aiState.mode = 'normal';
            this.aiState.emergencyActive = false;
            this.aiState.victimDetails = null;
            this.aiState.emergencyId = null;
            this.aiState.conversationContext = [];
            
            console.log('✅ AI returned to normal mode');
            
            // Update visual indicator
            this.updateAIIndicator();
        }
    }

    // Update AI visual indicator
    updateAIIndicator() {
        const indicator = document.getElementById('aiStatusIndicator');
        const modeSpan = indicator?.querySelector('.ai-status-mode');
        
        if (modeSpan) {
            modeSpan.textContent = this.aiState.mode;
        }
        
        // Update body class for styling
        document.body.classList.remove('ai-emergency-mode', 'ai-responder-mode');
        
        if (this.aiState.emergencyActive) {
            document.body.classList.add('ai-emergency-mode');
        } else if (this.aiState.mode === 'responder') {
            document.body.classList.add('ai-responder-mode');
        }
        
        // Flash indicator on state change
        if (indicator) {
            indicator.style.animation = 'none';
            setTimeout(() => {
                indicator.style.animation = this.aiState.emergencyActive 
                    ? 'aiEmergencyPulse 1s infinite' 
                    : 'aiPulse 2s infinite';
            }, 100);
        }
    }

    // Process user messages and generate AI responses
    async processUserMessage(message, communityId) {
        // Don't process if AI is busy or if it's a command
        if (this.isProcessing || message.startsWith('/')) {
            return;
        }

        // Only respond in specific contexts
        if (this.shouldAIRespond(message, communityId)) {
            this.isProcessing = true;
            
            try {
                await this.sendAIResponse('user_message', communityId, message);
            } catch (error) {
                console.error('AI response error:', error);
            } finally {
                this.isProcessing = false;
            }
        }
    }

    // Determine if AI should respond
    shouldAIRespond(message, communityId) {
        // Always respond in emergency mode
        if (this.aiState.emergencyActive) {
            return true;
        }

        // In normal mode, respond to various triggers
        const aiKeywords = [
            'hello ai', 'hi ai', 'hey ai', 
            'help', 'assistance', 'guide', 'ai', 
            'what should i do', 'emergency', 'safety',
            'hello assistant', 'ai help', 'need help'
        ];
        
        const lowerMessage = message.toLowerCase().trim();
        const containsAIKeyword = aiKeywords.some(keyword => 
            lowerMessage.includes(keyword)
        );

        // Also respond to questions
        const isQuestion = lowerMessage.includes('?') || 
                          lowerMessage.startsWith('how') ||
                          lowerMessage.startsWith('what') ||
                          lowerMessage.startsWith('where') ||
                          lowerMessage.startsWith('when') ||
                          lowerMessage.startsWith('why');

        return containsAIKeyword || isQuestion;
    }

    // Send AI response to chat
    async sendAIResponse(trigger, communityId, userMessage = null) {
        try {
            const response = await this.getAIResponse(trigger, userMessage);
            
            if (response) {
                // Inject AI message into existing chat system
                this.injectAIMessage(response, communityId);
            }
        } catch (error) {
            console.error('Failed to get AI response:', error);
            
            // Fallback safety message
            const fallbackMessage = this.getFallbackMessage();
            this.injectAIMessage(fallbackMessage, communityId);
        }
    }

    // Get AI response from backend
    async getAIResponse(trigger, userMessage = null) {
        const requestData = {
            mode: this.aiState.mode,
            trigger: trigger,
            userMessage: userMessage,
            victimDetails: this.aiState.victimDetails,
            emergencyActive: this.aiState.emergencyActive,
            context: this.aiState.conversationContext.slice(-5) // Last 5 messages for context
        };

        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error(`AI API error: ${response.status}`);
            }

            const data = await response.json();
            
            // Update conversation context
            if (userMessage) {
                this.aiState.conversationContext.push({
                    user: userMessage,
                    ai: data.message,
                    timestamp: new Date().toISOString()
                });
            }

            return data.message;
        } catch (error) {
            console.error('AI API call failed:', error);
            throw error;
        }
    }

    // Inject AI message into existing chat without modifying UI
    injectAIMessage(message, communityId) {
        // Create AI user object
        const aiUser = {
            id: 'ai_assistant',
            name: '🤖 Emergency AI',
            avatar: '🤖',
            role: 'ai_assistant'
        };

        // Create message object matching existing format
        const aiMessage = {
            id: `ai_${Date.now()}`,
            user: aiUser,
            message: message,
            timestamp: new Date().toLocaleTimeString(),
            communityId: communityId,
            type: 'ai_response'
        };

        // Add to chat using existing system
        if (this.app.currentCommunity && this.app.currentCommunity.id === communityId) {
            this.app.addMessageToChat(aiMessage);
        }

        // Also add to community messages array
        const community = this.app.communities.find(c => c.id === communityId);
        if (community) {
            if (!community.messages) {
                community.messages = [];
            }
            community.messages.push(aiMessage);
        }
    }

    // Get fallback safety message when AI fails
    getFallbackMessage() {
        const fallbacks = {
            'fire': '🔥 FIRE SAFETY: Stay low, avoid smoke, move to nearest exit, call emergency services immediately.',
            'medical': '🏥 MEDICAL: Call emergency services, check breathing, apply pressure to wounds if safe.',
            'accident': '🚑 ACCIDENT: Move to safety, call emergency services, avoid moving injured persons.',
            'assault': '🚨 SAFETY: Find safe location, contact authorities, stay in public areas.',
            'natural_disaster': '🌪️ DISASTER: Move to safe zones, follow official alerts, avoid hazards.',
            'responder': '👨‍🚒 RESPONDER: Prioritize safety, wear PPE, coordinate with team, call backup.',
            'normal': '💡 I\'m here to help. For emergencies, always contact official emergency services first.'
        };

        return fallbacks[this.aiState.mode] || fallbacks['normal'];
    }

    // Public method to manually trigger AI response
    triggerAIResponse(communityId) {
        this.sendAIResponse('manual_trigger', communityId);
    }

    // Get current AI state (for debugging)
    getState() {
        return { ...this.aiState };
    }

    // Reset AI state (for testing)
    resetState() {
        this.aiState = {
            mode: 'normal',
            emergencyActive: false,
            victimDetails: null,
            emergencyId: null,
            conversationContext: []
        };
        console.log('🔄 AI state reset to normal');
    }
}

// Export for use in main app
window.EmergencyAI = EmergencyAI;

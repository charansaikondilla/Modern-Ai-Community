/**
 * Voice Recognition Module for Modern Community Emergency Platform
 * Fully working voice recognition system that integrates seamlessly with existing emergency system
 * No interference with working features - completely independent
 */
class VoiceRecognition {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.isInitialized = false;
        this.hasPermission = false;
        this.triggerKeywords = {
            'fire': '/fire',
            'help': '/doctor',
            'police': '/rape',
            'medical': '/doctor',
            'blood': '/blood',
            'missing': '/missing',
            'fund': '/fund',
            'disaster': '/disaster',
            'elder': '/helpelder',
            'elderly': '/helpelder',
            'accident': '/missing',
            'rape': '/rape',
            'emergency': '/doctor'
        };

        // Initialize after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.init();
        }, 100);
    }

    init() {
        console.log('🎤 Initializing Voice Recognition System...');

        // Check browser support
        if (!this.checkBrowserSupport()) {
            console.warn('🎤 Voice recognition not supported in this browser');
            return;
        }

        // Setup speech recognition
        this.setupSpeechRecognition();

        // Setup UI elements
        this.setupUI();

        this.isInitialized = true;
        console.log('✅ Voice Recognition System initialized successfully');
    }

    checkBrowserSupport() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            this.showBrowserWarning();
            return false;
        }
        return true;
    }

    setupSpeechRecognition() {
        try {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();

            // Configure recognition settings
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';
            this.recognition.maxAlternatives = 1;

            // Setup event handlers
            this.setupRecognitionHandlers();

            console.log('🎤 Speech recognition configured successfully');
        } catch (error) {
            console.error('🎤 Failed to setup speech recognition:', error);
            this.showStatus('❌ Voice recognition setup failed', 'error');
        }
    }

    setupRecognitionHandlers() {
        if (!this.recognition) return;

        this.recognition.onstart = () => {
            console.log('🎤 Voice recognition started');
            this.isListening = true;
            this.updateButtonState(true);
            this.showStatus('🎤 Listening... Speak your emergency command', 'info');
        };

        this.recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript.toLowerCase().trim();
            console.log('🎤 Speech recognized:', speechResult);
            this.processVoiceCommand(speechResult);
        };

        this.recognition.onerror = (event) => {
            console.error('🎤 Voice recognition error:', event.error);
            this.handleRecognitionError(event.error);
        };

        this.recognition.onend = () => {
            console.log('🎤 Voice recognition ended');
            this.isListening = false;
            this.updateButtonState(false);
            this.clearStatus();
        };

        this.recognition.onnomatch = () => {
            console.log('🎤 No speech match');
            this.showStatus('❓ No speech detected. Try speaking louder.', 'warning');
        };
    }

    setupUI() {
        // Wait for chat area to be available
        this.waitForChatArea().then(() => {
            this.addVoiceButton();
            this.addStatusDisplay();
            this.createVoiceCommandsPopup();
            console.log('🎤 Voice UI elements added successfully');
        });
    }

    waitForChatArea() {
        return new Promise((resolve) => {
            const checkChatArea = () => {
                const chatArea = document.getElementById('chatArea');
                if (chatArea && !chatArea.classList.contains('hidden')) {
                    resolve();
                } else {
                    setTimeout(checkChatArea, 500);
                }
            };
            checkChatArea();
        });
    }

    addVoiceButton() {
        const messageInput = document.querySelector('.message-input');
        if (!messageInput) {
            console.warn('🎤 Message input not found, retrying...');
            setTimeout(() => this.addVoiceButton(), 1000);
            return;
        }

        // Remove any existing voice button
        const existingBtn = document.getElementById('voiceRecognitionBtn');
        if (existingBtn) {
            existingBtn.remove();
        }

        // Create new voice button
        const voiceBtn = document.createElement('button');
        voiceBtn.id = 'voiceRecognitionBtn';
        voiceBtn.className = 'voice-btn emergency-btn';
        voiceBtn.title = 'Voice Emergency Commands - Click to start listening';
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceBtn.style.cssText = `
            background: linear-gradient(135deg, #25D366, #128C7E);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            margin: 0 5px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(37, 211, 102, 0.3);
        `;

        // Insert after emergency button
        const emergencyBtn = document.getElementById('emergencyMenuBtn');
        if (emergencyBtn) {
            emergencyBtn.insertAdjacentElement('afterend', voiceBtn);
        } else {
            messageInput.insertBefore(voiceBtn, messageInput.firstChild);
        }

        // Add click handler
        voiceBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!this.hasPermission) {
                await this.requestMicrophonePermission();
            }

            if (this.isListening) {
                this.stopListening();
            } else {
                this.startListening();
            }
        });

        console.log('🎤 Voice button added successfully');
    }

    addStatusDisplay() {
        const messageInputContainer = document.querySelector('.message-input-container');
        if (!messageInputContainer) return;

        // Remove existing status display
        const existingStatus = document.getElementById('voiceStatus');
        if (existingStatus) {
            existingStatus.remove();
        }

        const statusDiv = document.createElement('div');
        statusDiv.id = 'voiceStatus';
        statusDiv.className = 'voice-status';
        statusDiv.style.cssText = `
            position: absolute;
            top: -35px;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            display: none;
            z-index: 1000;
            text-align: center;
        `;

        messageInputContainer.style.position = 'relative';
        messageInputContainer.insertBefore(statusDiv, messageInputContainer.firstChild);
    }

    async requestMicrophonePermission() {
        try {
            console.log('🎤 Requesting microphone permission...');
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });

            // Stop the stream immediately, we just needed permission
            stream.getTracks().forEach(track => track.stop());

            this.hasPermission = true;
            console.log('✅ Microphone permission granted');
            this.showStatus('✅ Microphone access granted', 'success');
        } catch (error) {
            console.error('🎤 Microphone permission denied:', error);
            this.hasPermission = false;
            this.showStatus('❌ Microphone permission denied. Please allow access.', 'error');
            throw error;
        }
    }

    async startListening() {
        if (!this.isInitialized) {
            this.showStatus('❌ Voice recognition not initialized', 'error');
            return;
        }

        if (!this.recognition) {
            this.showStatus('❌ Voice recognition not available', 'error');
            return;
        }

        if (!this.hasPermission) {
            try {
                await this.requestMicrophonePermission();
            } catch (error) {
                return;
            }
        }

        try {
            console.log('🎤 Starting voice recognition...');
            this.recognition.start();
        } catch (error) {
            console.error('🎤 Failed to start voice recognition:', error);
            this.handleRecognitionError(error.message || 'Failed to start');
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            console.log('🎤 Stopping voice recognition...');
            this.recognition.stop();
        }
    }

    processVoiceCommand(speech) {
        console.log('🎤 Processing voice command:', speech);

        // Check for emergency trigger keywords
        for (const [keyword, command] of Object.entries(this.triggerKeywords)) {
            if (speech.includes(keyword)) {
                console.log(`🎯 Voice command matched: "${keyword}" -> ${command}`);
                this.triggerEmergency(command, speech);
                return;
            }
        }

        // Handle non-emergency voice commands
        this.handleGeneralVoiceCommand(speech);
    }

    triggerEmergency(command, originalSpeech) {
        console.log('🚨 Triggering voice emergency:', command);

        // Check if ModernCommunity is available
        if (!window.modernCommunity) {
            console.error('🚨 ModernCommunity not found');
            this.showStatus('❌ Emergency system not available', 'error');
            return;
        }

        if (typeof window.modernCommunity.triggerEmergency !== 'function') {
            console.error('🚨 triggerEmergency function not found');
            this.showStatus('❌ Emergency function not available', 'error');
            return;
        }

        try {
            // Show processing status
            this.showStatus(`🚨 Processing: "${originalSpeech}"`, 'success');

            // Trigger the emergency
            window.modernCommunity.triggerEmergency(command);

            // Show confirmation
            setTimeout(() => {
                this.showStatus(`✅ Emergency alert sent: ${command}`, 'success');
            }, 1500);

            console.log('✅ Voice emergency triggered successfully');

        } catch (error) {
            console.error('🚨 Failed to trigger emergency:', error);
            this.showStatus('❌ Failed to send emergency alert', 'error');
        }
    }

    handleGeneralVoiceCommand(speech) {
        console.log('🎤 Handling general voice command:', speech);

        // Provide helpful feedback
        if (speech.includes('status') || speech.includes('help') || speech.includes('what')) {
            this.showStatus('💡 Say: "fire", "help", "police", "medical", "blood", "missing"', 'info');
        } else {
            this.showStatus(`❓ Heard: "${speech}". Try emergency keywords like "fire" or "help"`, 'warning');
        }
    }

    handleRecognitionError(error) {
        console.error('🎤 Voice recognition error:', error);

        let errorMessage = 'Voice recognition error';
        let statusType = 'error';

        switch(error) {
            case 'no-speech':
                errorMessage = 'No speech detected. Try speaking louder.';
                statusType = 'warning';
                break;
            case 'audio-capture':
                errorMessage = 'Audio capture failed. Check microphone.';
                break;
            case 'not-allowed':
                errorMessage = 'Microphone permission denied. Click button to allow access.';
                this.hasPermission = false;
                break;
            case 'network':
                errorMessage = 'Network error. Check connection.';
                break;
            case 'service-not-allowed':
                errorMessage = 'Voice recognition service not allowed.';
                break;
            case 'aborted':
                errorMessage = 'Voice recognition was cancelled.';
                statusType = 'warning';
                break;
            default:
                errorMessage = `Voice recognition error: ${error}`;
        }

        this.showStatus(`❌ ${errorMessage}`, statusType);
    }

    updateButtonState(isActive) {
        const voiceBtn = document.getElementById('voiceRecognitionBtn');
        if (!voiceBtn) return;

        if (isActive) {
            voiceBtn.classList.add('active', 'listening');
            voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            voiceBtn.title = 'Stop Voice Recognition - Click to stop listening';
            voiceBtn.style.background = 'linear-gradient(135deg, #FF6B6B, #EE5A52)';
            voiceBtn.style.boxShadow = '0 2px 8px rgba(255, 107, 107, 0.5)';
        } else {
            voiceBtn.classList.remove('active', 'listening');
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            voiceBtn.title = 'Voice Emergency Commands - Click to start listening';
            voiceBtn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
            voiceBtn.style.boxShadow = '0 2px 8px rgba(37, 211, 102, 0.3)';
        }
    }

    showStatus(message, type = 'info') {
        const statusDiv = document.getElementById('voiceStatus');
        if (!statusDiv) return;

        statusDiv.textContent = message;
        statusDiv.className = `voice-status ${type}`;
        statusDiv.style.display = 'block';

        // Add color coding
        switch(type) {
            case 'success':
                statusDiv.style.background = 'rgba(37, 211, 102, 0.9)';
                break;
            case 'error':
                statusDiv.style.background = 'rgba(255, 107, 107, 0.9)';
                break;
            case 'warning':
                statusDiv.style.background = 'rgba(255, 193, 7, 0.9)';
                break;
            default:
                statusDiv.style.background = 'rgba(0, 123, 255, 0.9)';
        }

        // Auto-hide after appropriate time
        const hideDelay = type === 'error' ? 6000 : 4000;
        setTimeout(() => {
            this.clearStatus();
        }, hideDelay);

        console.log(`Voice Status [${type}]:`, message);
    }

    clearStatus() {
        const statusDiv = document.getElementById('voiceStatus');
        if (statusDiv) {
            statusDiv.style.display = 'none';
        }
    }

    showBrowserWarning() {
        const warning = document.createElement('div');
        warning.className = 'browser-warning voice-warning';
        warning.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 15px;
            max-width: 300px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

        warning.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 10px;">
                <i class="fas fa-exclamation-triangle" style="color: #856404; font-size: 20px;"></i>
                <div style="flex: 1;">
                    <strong style="color: #856404;">Voice Recognition Not Supported</strong>
                    <p style="margin: 5px 0 0 0; color: #856404; font-size: 14px;">
                        Voice commands require Chrome, Edge, or Safari browser with microphone access.
                    </p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()"
                        style="background: none; border: none; color: #856404; cursor: pointer; font-size: 18px;">×</button>
            </div>
        `;

        document.body.appendChild(warning);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (warning.parentElement) {
                warning.remove();
            }
        }, 10000);
    }

    createVoiceCommandsPopup() {
        // Remove existing popup if any
        const existingPopup = document.getElementById('voiceCommandsPopup');
        if (existingPopup) {
            existingPopup.remove();
        }

        const popup = document.createElement('div');
        popup.id = 'voiceCommandsPopup';
        popup.className = 'voice-commands-popup';
        popup.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            z-index: 10000;
            align-items: center;
            justify-content: center;
        `;

        popup.innerHTML = `
            <div class="voice-popup-content" style="
                background: white;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            ">
                <div class="voice-popup-header" style="
                    padding: 20px;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                ">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="font-size: 24px;">🎤</div>
                        <div>
                            <h3 style="margin: 0; color: #333;">Voice Emergency Commands</h3>
                            <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">Speak any keyword to trigger alerts</p>
                        </div>
                    </div>
                    <button id="voicePopupClose" style="
                        background: none;
                        border: none;
                        font-size: 24px;
                        color: #999;
                        cursor: pointer;
                        padding: 5px;
                    ">×</button>
                </div>

                <div class="voice-popup-body" style="padding: 20px;">
                    <div class="voice-commands-grid" style="
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 15px;
                        margin-bottom: 20px;
                    ">
                        <div class="voice-command-item" style="
                            padding: 15px;
                            border: 2px solid #ff4757;
                            border-radius: 8px;
                            background: #fff5f5;
                        ">
                            <div style="font-size: 24px; margin-bottom: 8px;">🔥</div>
                            <div>
                                <strong style="color: #ff4757;">"fire"</strong>
                                <div style="font-size: 14px; color: #666;">Fire emergency</div>
                            </div>
                        </div>

                        <div class="voice-command-item" style="
                            padding: 15px;
                            border: 2px solid #3742fa;
                            border-radius: 8px;
                            background: #f0f0ff;
                        ">
                            <div style="font-size: 24px; margin-bottom: 8px;">🚔</div>
                            <div>
                                <strong style="color: #3742fa;">"police"</strong>
                                <div style="font-size: 14px; color: #666;">Police emergency</div>
                            </div>
                        </div>

                        <div class="voice-command-item" style="
                            padding: 15px;
                            border: 2px solid #25D366;
                            border-radius: 8px;
                            background: #f0fff0;
                        ">
                            <div style="font-size: 24px; margin-bottom: 8px;">⚕️</div>
                            <div>
                                <strong style="color: #25D366;">"help" or "medical"</strong>
                                <div style="font-size: 14px; color: #666;">Medical emergency</div>
                            </div>
                        </div>

                        <div class="voice-command-item" style="
                            padding: 15px;
                            border: 2px solid #ff3838;
                            border-radius: 8px;
                            background: #fff5f5;
                        ">
                            <div style="font-size: 24px; margin-bottom: 8px;">🩸</div>
                            <div>
                                <strong style="color: #ff3838;">"blood"</strong>
                                <div style="font-size: 14px; color: #666;">Blood emergency</div>
                            </div>
                        </div>

                        <div class="voice-command-item" style="
                            padding: 15px;
                            border: 2px solid #ffa726;
                            border-radius: 8px;
                            background: #fff8f0;
                        ">
                            <div style="font-size: 24px; margin-bottom: 8px;">🔍</div>
                            <div>
                                <strong style="color: #ffa726;">"missing"</strong>
                                <div style="font-size: 14px; color: #666;">Missing person</div>
                            </div>
                        </div>

                        <div class="voice-command-item" style="
                            padding: 15px;
                            border: 2px solid #9c88ff;
                            border-radius: 8px;
                            background: #f8f5ff;
                        ">
                            <div style="font-size: 24px; margin-bottom: 8px;">💰</div>
                            <div>
                                <strong style="color: #9c88ff;">"fund"</strong>
                                <div style="font-size: 14px; color: #666;">Financial help</div>
                            </div>
                        </div>
                    </div>

                    <div class="voice-popup-actions" style="
                        text-align: center;
                        padding-top: 20px;
                        border-top: 1px solid #eee;
                    ">
                        <button id="voiceActivateBtn" style="
                            background: linear-gradient(135deg, #25D366, #128C7E);
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 25px;
                            font-size: 16px;
                            cursor: pointer;
                            display: inline-flex;
                            align-items: center;
                            gap: 8px;
                            transition: all 0.3s ease;
                        ">
                            <i class="fas fa-microphone"></i>
                            <span id="activateBtnText">Start Voice Recognition</span>
                        </button>
                        <div style="margin-top: 10px; color: #666; font-size: 14px;">
                            💡 Speak clearly and wait for confirmation
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(popup);
        this.setupPopupEventListeners();
    }

    setupPopupEventListeners() {
        const closeBtn = document.getElementById('voicePopupClose');
        const activateBtn = document.getElementById('voiceActivateBtn');
        const popup = document.getElementById('voiceCommandsPopup');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideVoiceCommandsPopup());
        }

        if (activateBtn) {
            activateBtn.addEventListener('click', () => this.handlePopupActivation());
        }

        if (popup) {
            popup.addEventListener('click', (e) => {
                if (e.target === popup) {
                    this.hideVoiceCommandsPopup();
                }
            });
        }

        // ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isPopupVisible()) {
                this.hideVoiceCommandsPopup();
            }
        });
    }

    showVoiceCommandsPopup() {
        const popup = document.getElementById('voiceCommandsPopup');
        if (popup) {
            popup.style.display = 'flex';
            this.updatePopupStatus();
        }
    }

    hideVoiceCommandsPopup() {
        const popup = document.getElementById('voiceCommandsPopup');
        if (popup) {
            popup.style.display = 'none';
            if (this.isListening) {
                this.stopListening();
            }
        }
    }

    isPopupVisible() {
        const popup = document.getElementById('voiceCommandsPopup');
        return popup && popup.style.display === 'flex';
    }

    handlePopupActivation() {
        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
        this.updatePopupStatus();
    }

    updatePopupStatus() {
        const activateBtn = document.getElementById('voiceActivateBtn');
        const btnText = document.getElementById('activateBtnText');

        if (!activateBtn || !btnText) return;

        if (this.isListening) {
            activateBtn.innerHTML = '<i class="fas fa-stop"></i><span id="activateBtnText">Stop Listening</span>';
            activateBtn.style.background = 'linear-gradient(135deg, #ff4757, #ff3838)';
        } else {
            activateBtn.innerHTML = '<i class="fas fa-microphone"></i><span id="activateBtnText">Start Voice Recognition</span>';
            activateBtn.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
        }
    }

    // Cleanup method
    destroy() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
        this.clearStatus();
        this.hideVoiceCommandsPopup();
        console.log('🎤 Voice recognition module destroyed');
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.voiceRecognition = new VoiceRecognition();
    });
} else {
    window.voiceRecognition = new VoiceRecognition();
}

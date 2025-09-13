// Modern Community Emergency Chat Platform - JavaScript (Fixed)

class ModernCommunity {
    constructor() {
        this.currentUser = null;
        this.activeChat = null;
        this.activeCommunity = null;
        this.soundEnabled = true;
        this.volume = 0.7;
        this.emergencyVolume = 1.0;
        
        // Demo data from provided JSON
        this.users = [
            {
                "id": "user_001",
                "name": "Priya",
                "age": 28,
                "gender": "Female",
                "bloodGroup": "B+",
                "phone": "+91-9876501001",
                "medicalConditions": ["Diabetes"],
                "role": "Member",
                "isOnline": true,
                "lastSeen": "2025-08-28T21:48:11.525101",
                "avatar": "https://i.pravatar.cc/150?img=1",
                "emergencyContacts": [
                    {"name": "Mom", "phone": "+91-9876543210", "relation": "Mother"},
                    {"name": "Ravi", "phone": "+91-9876543211", "relation": "Brother"}
                ],
                "location": {"address": "Sector 4, East Zone", "coordinates": {"lat": 17.4472, "lng": 78.3731}},
                "communities": ["city_central", "east_zone", "sector_4"]
            },
            {
                "id": "user_002",
                "name": "Rahul",
                "age": 32,
                "gender": "Male",
                "bloodGroup": "A+",
                "phone": "+91-9876501002",
                "medicalConditions": [],
                "role": "Member",
                "isOnline": false,
                "lastSeen": "2025-08-28T19:48:11.525101",
                "avatar": "https://i.pravatar.cc/150?img=2",
                "emergencyContacts": [
                    {"name": "Priya", "phone": "+91-9876543212", "relation": "Wife"},
                    {"name": "Dad", "phone": "+91-9876543213", "relation": "Father"}
                ],
                "location": {"address": "Sector 3, East Zone", "coordinates": {"lat": 17.4462, "lng": 78.3721}},
                "communities": ["city_central", "east_zone", "sector_3"]
            },
            {
                "id": "user_003",
                "name": "Officer Anil",
                "age": 45,
                "gender": "Male",
                "bloodGroup": "O+",
                "phone": "+91-9876501003",
                "medicalConditions": [],
                "role": "Responder",
                "responderType": "Police",
                "isOnline": true,
                "lastSeen": "2025-08-28T21:48:11.525101",
                "avatar": "https://i.pravatar.cc/150?img=3",
                "emergencyContacts": [
                    {"name": "Station", "phone": "+91-100", "relation": "Work"},
                    {"name": "Wife", "phone": "+91-9876543214", "relation": "Spouse"}
                ],
                "location": {"address": "Police Station, East Zone", "coordinates": {"lat": 17.4482, "lng": 78.3741}},
                "communities": ["city_central", "east_zone", "police_community"],
                "responseTime": "6 min",
                "badgeNumber": "PO2025"
            },
            {
                "id": "user_004",
                "name": "Dr. Meera",
                "age": 38,
                "gender": "Female",
                "bloodGroup": "AB+",
                "phone": "+91-9876501004",
                "medicalConditions": [],
                "role": "Responder",
                "responderType": "Doctor",
                "isOnline": true,
                "lastSeen": "2025-08-28T21:48:11.525101",
                "avatar": "https://i.pravatar.cc/150?img=4",
                "emergencyContacts": [
                    {"name": "Hospital", "phone": "+91-108", "relation": "Work"},
                    {"name": "Husband", "phone": "+91-9876543215", "relation": "Spouse"}
                ],
                "location": {"address": "City Hospital, Central", "coordinates": {"lat": 17.4492, "lng": 78.3751}},
                "communities": ["city_central", "doctors_community"],
                "responseTime": "8 min",
                "specialization": "Emergency Medicine"
            },
            {
                "id": "user_005",
                "name": "Fireman Raj",
                "age": 35,
                "gender": "Male",
                "bloodGroup": "O-",
                "phone": "+91-9876501005",
                "medicalConditions": [],
                "role": "Responder",
                "responderType": "Fire",
                "isOnline": true,
                "lastSeen": "2025-08-28T21:48:11.525101",
                "avatar": "https://i.pravatar.cc/150?img=5",
                "emergencyContacts": [
                    {"name": "Fire Station", "phone": "+91-101", "relation": "Work"},
                    {"name": "Mom", "phone": "+91-9876543216", "relation": "Mother"}
                ],
                "location": {"address": "Fire Station, East Zone", "coordinates": {"lat": 17.4502, "lng": 78.3761}},
                "communities": ["city_central", "east_zone", "fire_response_team"],
                "responseTime": "5 min",
                "vehicleNumber": "FR-01"
            },
            {
                "id": "user_006",
                "name": "Sara",
                "age": 26,
                "gender": "Female",
                "bloodGroup": "A-",
                "phone": "+91-9876501006",
                "medicalConditions": ["Asthma"],
                "role": "Member",
                "isOnline": true,
                "lastSeen": "2025-08-28T21:48:11.525101",
                "avatar": "https://i.pravatar.cc/150?img=6",
                "emergencyContacts": [
                    {"name": "Sister", "phone": "+91-9876543217", "relation": "Sister"},
                    {"name": "Roommate", "phone": "+91-9876543218", "relation": "Friend"}
                ],
                "location": {"address": "Sector 5, East Zone", "coordinates": {"lat": 17.4512, "lng": 78.3771}},
                "communities": ["city_central", "east_zone", "sector_5"]
            },
            {
                "id": "user_007",
                "name": "Elder Ramu",
                "age": 72,
                "gender": "Male",
                "bloodGroup": "B-",
                "phone": "+91-9876501007",
                "medicalConditions": ["Hypertension", "Arthritis"],
                "role": "Elder",
                "isOnline": false,
                "lastSeen": "2025-08-28T17:48:11.525101",
                "avatar": "https://i.pravatar.cc/150?img=7",
                "emergencyContacts": [
                    {"name": "Son", "phone": "+91-9876543219", "relation": "Son"},
                    {"name": "Neighbor", "phone": "+91-9876543220", "relation": "Neighbor"}
                ],
                "location": {"address": "Sector 4, East Zone", "coordinates": {"lat": 17.4522, "lng": 78.3781}},
                "communities": ["city_central", "east_zone", "sector_4", "senior_support_volunteers"]
            }
        ];

        this.communities = {
            "main_communities": [
                {
                    "id": "city_central",
                    "name": "City Central",
                    "type": "main",
                    "description": "Main city community for all residents",
                    "isLocked": false,
                    "icon": "🏙️",
                    "memberCount": 7,
                    "subCommunities": ["east_zone", "west_zone", "north_zone"],
                    "roles": ["Admin", "Responder", "Member", "Elder", "NGO"],
                    "isPublicView": true // Only shows basic 4-message flow
                }
            ],
            "authority_communities": [
                {
                    "id": "police_authority",
                    "name": "Police Authority Coordination",
                    "type": "authority",
                    "description": "Police emergency coordination - victim, helper, and police officers",
                    "isLocked": true,
                    "icon": "🚔",
                    "memberCount": 0,
                    "roles": ["Police", "Member", "Helper"],
                    "unlockCondition": "Police emergency accepted by helper",
                    "allowedUsers": [],
                    "emergencyTypes": ["Rape", "Missing Person", "Crime"]
                },
                {
                    "id": "medical_authority",
                    "name": "Medical Authority Coordination", 
                    "type": "authority",
                    "description": "Medical emergency coordination - patient, helper, and medical staff",
                    "isLocked": true,
                    "icon": "🏥",
                    "memberCount": 0,
                    "roles": ["Doctor", "Member", "Helper"],
                    "unlockCondition": "Medical emergency accepted by helper",
                    "allowedUsers": [],
                    "emergencyTypes": ["Medical Help", "Blood Needed", "Doctor"]
                },
                {
                    "id": "fire_authority",
                    "name": "Fire Authority Coordination",
                    "type": "authority", 
                    "description": "Fire emergency coordination - victim, helper, and fire department",
                    "isLocked": true,
                    "icon": "🚒",
                    "memberCount": 0,
                    "roles": ["Fire", "Member", "Helper"],
                    "unlockCondition": "Fire emergency accepted by helper",
                    "allowedUsers": [],
                    "emergencyTypes": ["Fire", "Accident"]
                },
                {
                    "id": "disaster_authority",
                    "name": "Disaster Authority Coordination",
                    "type": "authority",
                    "description": "Disaster emergency coordination - affected citizens and disaster response",
                    "isLocked": true,
                    "icon": "🌪️",
                    "memberCount": 0,
                    "roles": ["Responder", "NGO", "Member", "Helper"],
                    "unlockCondition": "Disaster emergency accepted by helper",
                    "allowedUsers": [],
                    "emergencyTypes": ["Natural Disaster", "Disaster"]
                }
            ],
            "sub_communities": [
                {
                    "id": "east_zone",
                    "name": "East Zone",
                    "type": "sub",
                    "parentId": "city_central",
                    "description": "Eastern residential zone",
                    "isLocked": false,
                    "icon": "🏘️",
                    "memberCount": 6,
                    "subCommunities": ["sector_3", "sector_4", "sector_5"],
                    "roles": ["Admin", "Responder", "Member", "Elder"]
                },
                {
                    "id": "west_zone",
                    "name": "West Zone",
                    "type": "sub",
                    "parentId": "city_central",
                    "description": "Western commercial zone",
                    "isLocked": false,
                    "icon": "🏢",
                    "memberCount": 0,
                    "subCommunities": ["sector_1", "sector_2"],
                    "roles": ["Admin", "Responder", "Member", "Elder"]
                }
            ],
            "sub_sub_communities": [
                {
                    "id": "sector_3",
                    "name": "Sector 3",
                    "type": "sub-sub",
                    "parentId": "east_zone",
                    "description": "Residential Sector 3",
                    "isLocked": false,
                    "icon": "🏠",
                    "memberCount": 1,
                    "roles": ["Admin", "Member", "Elder"]
                },
                {
                    "id": "sector_4",
                    "name": "Sector 4",
                    "type": "sub-sub",
                    "parentId": "east_zone",
                    "description": "Residential Sector 4",
                    "isLocked": false,
                    "icon": "🏠",
                    "memberCount": 2,
                    "roles": ["Admin", "Member", "Elder"]
                },
                {
                    "id": "sector_5",
                    "name": "Sector 5",
                    "type": "sub-sub",
                    "parentId": "east_zone",
                    "description": "Residential Sector 5",
                    "isLocked": false,
                    "icon": "🏠",
                    "memberCount": 1,
                    "roles": ["Admin", "Member", "Elder"]
                }
            ],
            "emergency_communities": [
                {
                    "id": "police_community",
                    "name": "Police Community",
                    "type": "emergency",
                    "description": "Emergency police response team",
                    "isLocked": true,
                    "icon": "👮‍♂️",
                    "triggerTypes": ["rape", "missing"],
                    "memberCount": 1,
                    "roles": ["Responder"],
                    "unlockCondition": "Emergency alert triggered"
                },
                {
                    "id": "doctors_community",
                    "name": "Doctors Community",
                    "type": "emergency",
                    "description": "Medical emergency response",
                    "isLocked": true,
                    "icon": "👩‍⚕️",
                    "triggerTypes": ["doctor", "medical", "blood"],
                    "memberCount": 1,
                    "roles": ["Responder"],
                    "unlockCondition": "Medical emergency triggered"
                },
                {
                    "id": "fire_response_team",
                    "name": "Fire Response Team",
                    "type": "emergency",
                    "description": "Fire and accident response",
                    "isLocked": true,
                    "icon": "🚒",
                    "triggerTypes": ["fire", "accident"],
                    "memberCount": 1,
                    "roles": ["Responder"],
                    "unlockCondition": "Fire/accident emergency triggered"
                },
                {
                    "id": "disaster_response_unit",
                    "name": "Disaster Response Unit",
                    "type": "emergency",
                    "description": "Natural disaster management",
                    "isLocked": true,
                    "icon": "🚨",
                    "triggerTypes": ["disaster"],
                    "memberCount": 0,
                    "roles": ["Responder", "NGO"],
                    "unlockCondition": "Disaster alert triggered"
                },
                {
                    "id": "senior_support_volunteers",
                    "name": "Senior Support Volunteers",
                    "type": "emergency",
                    "description": "Elderly help and support",
                    "isLocked": true,
                    "icon": "🧓",
                    "triggerTypes": ["helpelder"],
                    "memberCount": 1,
                    "roles": ["Responder", "NGO"],
                    "unlockCondition": "Elder help requested"
                },
                {
                    "id": "ngo_helpers",
                    "name": "NGO / Helper Groups",
                    "type": "emergency",
                    "description": "Emergency fund and general help",
                    "isLocked": true,
                    "icon": "🤝",
                    "triggerTypes": ["fund"],
                    "memberCount": 0,
                    "roles": ["NGO", "Responder"],
                    "unlockCondition": "Emergency fund requested"
                }
            ]
        };

        this.emergencyTriggers = {
            "/rape": {
                "alertType": "Rape",
                "urgencyLevel": "Critical",
                "unlocksCommunity": "police_community",
                "systemMessage": "🚨 CRITICAL: Rape emergency triggered",
                "responderTypes": ["Police"],
                "broadcastToAll": true,
                "color": "#FF0000",
                "sound": "emergency_siren"
            },
            "/fire": {
                "alertType": "Fire",
                "urgencyLevel": "High",
                "unlocksCommunity": "fire_response_team",
                "systemMessage": "🔥 FIRE EMERGENCY: Immediate response needed",
                "responderTypes": ["Fire"],
                "broadcastToAll": true,
                "color": "#FF4500",
                "sound": "fire_alarm"
            },
            "/blood": {
                "alertType": "Blood Needed",
                "urgencyLevel": "High",
                "unlocksCommunity": "doctors_community",
                "systemMessage": "🩸 URGENT: Blood donation needed",
                "responderTypes": ["Doctor"],
                "broadcastToAll": true,
                "color": "#DC143C",
                "sound": "medical_alert"
            },
            "/missing": {
                "alertType": "Missing Person",
                "urgencyLevel": "High",
                "unlocksCommunity": "police_community",
                "systemMessage": "🔍 MISSING PERSON: Search assistance needed",
                "responderTypes": ["Police"],
                "broadcastToAll": true,
                "color": "#FF6347",
                "sound": "alert_beep"
            },
            "/doctor": {
                "alertType": "Medical Help",
                "urgencyLevel": "High",
                "unlocksCommunity": "doctors_community",
                "systemMessage": "⚕️ MEDICAL EMERGENCY: Doctor needed urgently",
                "responderTypes": ["Doctor"],
                "broadcastToAll": false,
                "color": "#00CED1",
                "sound": "medical_alert"
            },
            "/fund": {
                "alertType": "Emergency Fund",
                "urgencyLevel": "Medium",
                "unlocksCommunity": "ngo_helpers",
                "systemMessage": "💰 FINANCIAL AID: Emergency fund requested",
                "responderTypes": ["NGO"],
                "broadcastToAll": false,
                "color": "#32CD32",
                "sound": "notification_chime"
            },
            "/disaster": {
                "alertType": "Natural Disaster",
                "urgencyLevel": "Critical",
                "unlocksCommunity": "disaster_response_unit",
                "systemMessage": "🌪️ DISASTER ALERT: Natural disaster response activated",
                "responderTypes": ["Responder", "NGO"],
                "broadcastToAll": true,
                "color": "#8B0000",
                "sound": "disaster_siren"
            },
            "/helpelder": {
                "alertType": "Elderly Help",
                "urgencyLevel": "Medium",
                "unlocksCommunity": "senior_support_volunteers",
                "systemMessage": "🧓 ELDERLY ALERT: Senior citizen needs assistance",
                "responderTypes": ["Responder", "NGO"],
                "broadcastToAll": false,
                "color": "#DAA520",
                "sound": "gentle_alert"
            }
        };

        this.chats = {};
        this.emergencyCases = [];
        this.notifications = [];
        this.messageIdCounter = 1;

        // Voice recognition integration (non-disruptive)
        this.voiceRecognition = null;

        // Set up real-time cross-user communication
        this.setupCrossUserCommunication();

        // Voice recognition handled by voice-recognition.js

        // Clean up any fake/old emergencies from localStorage
        this.cleanupFakeEmergencies();

        this.initializeChats();
        this.init();
    }

    // Voice Recognition Integration (Non-Disruptive)
    initializeVoiceRecognition() {
        try {
            // Check if voice recognition is available
            if (typeof VoiceRecognition !== 'undefined') {
                console.log('🎤 Initializing Voice Recognition System...');

                // Create voice recognition instance
                this.voiceRecognition = new VoiceRecognition({
                    triggerKeyword: 'fire',
                    onSpeechRecognized: (speech) => {
                        console.log('🎤 Speech recognized:', speech);
                        this.handleVoiceCommand(speech);
                    },
                    onError: (error) => {
                        console.log('🎤 Voice recognition error:', error);
                        this.showNotification('Voice Recognition Error', error, 'warning');
                    },
                    onStatusChange: (status) => {
                        console.log('🎤 Voice recognition status:', status);
                    }
                });

                console.log('✅ Voice Recognition System initialized successfully');
            } else {
                console.log('⚠️ Voice Recognition module not loaded, skipping initialization');
            }
        } catch (error) {
            console.log('⚠️ Voice Recognition initialization failed:', error);
        }
    }

    // Handle voice commands (integrates with existing emergency system)
    handleVoiceCommand(speech) {
        const speechLower = speech.toLowerCase().trim();

        console.log('🎤 Processing voice command:', speechLower);

        // Check for emergency keywords
        const emergencyKeywords = {
            'fire': '/fire',
            'rape': '/rape',
            'medical': '/doctor',
            'blood': '/blood',
            'help': '/helpelder',
            'missing': '/missing',
            'disaster': '/disaster',
            'fund': '/fund'
        };

        // Look for emergency keywords in speech
        for (const [keyword, command] of Object.entries(emergencyKeywords)) {
            if (speechLower.includes(keyword)) {
                console.log('🚨 Voice emergency detected:', keyword, '->', command);

                // Show notification about voice emergency detection
                this.showNotification(
                    'Voice Emergency Detected',
                    `Emergency keyword "${keyword}" detected. Triggering ${command}...`,
                    'error'
                );

                // Trigger the emergency (integrates with existing system)
                setTimeout(() => {
                    this.triggerEmergency(command);
                }, 500);

                return;
            }
        }

        // If no emergency keywords found, show what was heard
        this.showNotification(
            'Voice Command Received',
            `Heard: "${speech}" (no emergency keywords detected)`,
            'info'
        );
    }

    cleanupFakeEmergencies() {
        // Clear all fake/old emergencies from localStorage
        localStorage.removeItem('pendingEmergencies');
        
        // Clear any demo emergency cases
        this.emergencyCases = [];
        
        console.log('🧹 Cleaned up all fake/old emergencies - only real user-triggered alerts will work');
    }

    setupCrossUserCommunication() {
        // Listen for storage events to simulate real-time communication
        window.addEventListener('storage', (e) => {
            if (e.key === 'crossUserNotification') {
                const notification = JSON.parse(e.oldValue || '{}');
                if (notification.type === 'NEW_EMERGENCY' && this.currentUser) {
                    // Slight delay to ensure current user is properly loaded
                    setTimeout(() => {
                        this.handleCrossUserEmergency(notification.emergency);
                    }, 500);
                }
            }
        });

        // Also check periodically for new REAL emergencies (reduced frequency)
        setInterval(() => {
            if (this.currentUser) {
                this.checkForPendingEmergencies();
            }
        }, 30000); // Check every 30 seconds (reduced from 10 seconds to avoid fake alerts)
        
        console.log('📡 Cross-user communication system initialized');
    }

    handleCrossUserEmergency(emergencyData) {
        if (!this.currentUser || emergencyData.userId === this.currentUser.id) {
            return; // Don't show own emergencies
        }

        // Only handle REAL emergencies from chat
        if (!emergencyData.triggerSource || emergencyData.triggerSource !== 'chat' || !emergencyData.isRealEmergency) {
            console.log('🚫 Ignoring fake/invalid emergency:', emergencyData.caseId);
            return;
        }

        const shouldReceive = this.shouldReceiveEmergency(emergencyData);
        if (shouldReceive) {
            console.log('🚨 Received real-time REAL emergency:', emergencyData.caseId);
            setTimeout(() => {
                this.showCrossUserEmergencyPopup(emergencyData);
            }, 1000);
        }
    }

    init() {
        // Wait for DOM to be fully ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApp();
            });
        } else {
            this.setupApp();
        }
    }

    setupApp() {
        this.setupEventListeners();
        this.showLoginScreen();
        this.setupSoundSystem();
        this.setupAutoMessageSimulation();
    }

    setupEventListeners() {
        // User selection with proper delegation
        document.addEventListener('click', (e) => {
            if (e.target.closest('.user-card')) {
                const card = e.target.closest('.user-card');
                const userId = card.dataset.userId;
                this.loginUser(userId);
            }
        });

        // Navigation tabs
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-tab')) {
                const tab = e.target.closest('.nav-tab');
                const tabName = tab.dataset.tab;
                this.switchTab(tabName);
            }
        });

        // Chat and community items
        document.addEventListener('click', (e) => {
            if (e.target.closest('.chat-item, .community-item, .emergency-community-item, .authority-community-item')) {
                const item = e.target.closest('.chat-item, .community-item, .emergency-community-item, .authority-community-item');
                const communityId = item.dataset.communityId;
                
                // Check if it's an authority community
                if (item.classList.contains('authority-community-item')) {
                    const community = this.findCommunity(communityId);
                    if (community) {
                        // Check if user has access to authority community
                        const hasAccess = !community.isLocked && 
                            community.allowedUsers && 
                            community.allowedUsers.includes(this.currentUser.id);
                        
                        if (hasAccess) {
                            this.openChat(communityId);
                        } else {
                            this.showNotification(
                                'Access Restricted', 
                                'Authority coordination is only available when you are involved in an active emergency case.',
                                'warning'
                            );
                        }
                    }
                } else {
                    // Regular community access check
                    const community = this.findCommunity(communityId);
                    if (community && (community.type !== 'emergency' || !community.isLocked)) {
                        this.openChat(communityId);
                    }
                }
            }
        });

        // Message input handling
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendMessageBtn');

        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.sendMessage();
            });
        }

        // Emergency popup events
        const acceptBtn = document.getElementById('acceptEmergency');
        const declineBtn = document.getElementById('declineEmergency');
        const confirmBtn = document.getElementById('confirmResponse');

        if (acceptBtn) acceptBtn.addEventListener('click', () => this.acceptEmergency());
        if (declineBtn) declineBtn.addEventListener('click', () => this.declineEmergency());
        if (confirmBtn) confirmBtn.addEventListener('click', () => this.confirmEmergencyResponse());

        // Emergency trigger buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.emergency-btn')) {
                const btn = e.target.closest('.emergency-btn');
                const trigger = btn.dataset.trigger;
                this.triggerEmergency(trigger);
            }
        });

        // Sound controls
        const soundToggle = document.getElementById('soundToggle');
        const volumeSlider = document.getElementById('volumeSlider');

        if (soundToggle) {
            soundToggle.addEventListener('click', () => this.toggleSound());
        }

        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
            });
        }

        // Logout
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Modal close buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.close-modal')) {
                const btn = e.target.closest('.close-modal');
                const modalId = btn.dataset.modal;
                this.closeModal(modalId);
            }
        });

        // Emergency info button
        const emergencyInfoBtn = document.getElementById('emergencyInfoBtn');
        if (emergencyInfoBtn) {
            emergencyInfoBtn.addEventListener('click', () => this.showEmergencyCases());
        }

        // Profile functionality
        const currentUserAvatar = document.getElementById('currentUserAvatar');
        if (currentUserAvatar) {
            currentUserAvatar.addEventListener('click', () => this.showUserProfile());
        }

        // Edit profile button
        document.addEventListener('click', (e) => {
            if (e.target.closest('#editProfileBtn')) {
                this.showEditProfile();
            }
        });

        // Avatar change button
        document.addEventListener('click', (e) => {
            if (e.target.closest('#changeAvatarBtn')) {
                this.showAvatarSelection();
            }
        });

        // Avatar selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.avatar-option')) {
                const avatar = e.target.closest('.avatar-option');
                this.selectAvatar(avatar.src);
            }
        });

        // Edit profile form
        const editProfileForm = document.getElementById('editProfileForm');
        if (editProfileForm) {
            editProfileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveProfileChanges();
            });
        }

        // Add emergency contact button
        document.addEventListener('click', (e) => {
            if (e.target.closest('#addEmergencyContactBtn')) {
                this.addEmergencyContactField();
            }
        });

        // Remove emergency contact buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.emergency-contact-remove-btn')) {
                const btn = e.target.closest('.emergency-contact-remove-btn');
                btn.parentElement.remove();
            }
        });

        // Cancel edit profile
        document.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'cancel') {
                this.closeModal('editProfileModal');
            }
        });

        // Close popups when clicking overlay
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup-overlay')) {
                e.target.parentElement.classList.add('hidden');
            }
            if (e.target.classList.contains('modal-overlay')) {
                e.target.parentElement.classList.add('hidden');
            }
        });
    }

    setupSoundSystem() {
        this.audioContext = null;
        
        // Try to initialize audio context on first user interaction
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                try {
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                } catch (e) {
                    console.log('Web Audio API not supported');
                }
            }
        }, { once: true });
    }

    playSound(soundType) {
        if (!this.soundEnabled || !this.audioContext) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Different sounds for different types
            switch (soundType) {
                case 'messageSent':
                    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
                    gainNode.gain.setValueAtTime(this.volume * 0.1, this.audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + 0.1);
                    break;
                case 'messageReceived':
                    oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
                    gainNode.gain.setValueAtTime(this.volume * 0.1, this.audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + 0.2);
                    break;
                case 'emergencyAlert':
                    // Emergency siren sound
                    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
                    oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime + 0.2);
                    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime + 0.4);
                    gainNode.gain.setValueAtTime(this.emergencyVolume * 0.3, this.audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.8);
                    oscillator.start(this.audioContext.currentTime);
                    oscillator.stop(this.audioContext.currentTime + 0.8);
                    break;
            }
        } catch (error) {
            console.log('Sound play failed:', error);
        }
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const soundToggle = document.getElementById('soundToggle');
        
        if (soundToggle) {
            const icon = soundToggle.querySelector('i');
            if (this.soundEnabled) {
                icon.className = 'fas fa-volume-up';
                soundToggle.classList.remove('muted');
            } else {
                icon.className = 'fas fa-volume-mute';
                soundToggle.classList.add('muted');
            }
        }
    }

    setVolume(volume) {
        this.volume = volume;
    }

    initializeChats() {
        // Initialize chat data for all communities
        const allCommunities = [
            ...this.communities.main_communities,
            ...this.communities.sub_communities || [],
            ...this.communities.sub_sub_communities || [],
            ...this.communities.emergency_communities,
            ...this.communities.authority_communities || []
        ];

        allCommunities.forEach(community => {
            this.chats[community.id] = {
                messages: [],
                unreadCount: 0
            };
        });

        // Add some initial messages
        this.chats.city_central.messages = [
            {
                id: 'msg_001',
                senderId: 'user_002',
                senderName: 'Rahul',
                content: 'Good morning everyone! Hope everyone is doing well.',
                timestamp: new Date('2025-08-28T08:30:00'),
                type: 'text',
                isSystemMessage: false
            },
            {
                id: 'msg_002',
                senderId: 'user_001',
                senderName: 'Priya',
                content: 'Morning Rahul! Yes, all good here in Sector 4.',
                timestamp: new Date('2025-08-28T08:35:00'),
                type: 'text',
                isSystemMessage: false
            }
        ];

        this.chats.east_zone.messages = [
            {
                id: 'msg_003',
                senderId: 'user_006',
                senderName: 'Sara',
                content: 'Has anyone seen the new community guidelines?',
                timestamp: new Date('2025-08-28T09:15:00'),
                type: 'text',
                isSystemMessage: false
            }
        ];
    }

    setupAutoMessageSimulation() {
        // Simulate occasional messages from other users
        setInterval(() => {
            if (Math.random() < 0.1 && this.currentUser) { // 10% chance every 15 seconds
                this.simulateRandomMessage();
            }
        }, 15000);

        // Simulate user online status changes
        setInterval(() => {
            if (this.currentUser) {
                this.simulateOnlineStatusChanges();
            }
        }, 45000);
    }

    simulateRandomMessage() {
        const messages = [
            'How is everyone doing today?',
            'Any community events coming up?',
            'Thanks for the help yesterday!',
            'Weather looks good today 🌞',
            'Remember the community meeting tomorrow.',
            'Stay safe everyone! 🙏',
            'Good afternoon neighbors!',
            'Anyone available for community service this weekend?'
        ];

        const onlineUsers = this.users.filter(user => 
            user.isOnline && user.id !== this.currentUser?.id
        );

        if (onlineUsers.length === 0) return;

        const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        // Find a community both users are in
        const sharedCommunities = randomUser.communities.filter(commId =>
            this.currentUser?.communities?.includes(commId)
        );

        if (sharedCommunities.length > 0) {
            const targetCommunity = sharedCommunities[0];
            const message = {
                id: 'msg_' + Date.now(),
                senderId: randomUser.id,
                senderName: randomUser.name,
                content: randomMessage,
                timestamp: new Date(),
                type: 'text',
                isSystemMessage: false
            };

            this.addMessage(targetCommunity, message);

            // Play sound and show notification if not in active chat
            if (this.activeCommunity !== targetCommunity) {
                this.playSound('messageReceived');
                this.showNotification(`New message in ${this.getCommunityName(targetCommunity)}`, randomMessage, 'success');
                this.updateChatBadges();
            }
        }
    }

    simulateOnlineStatusChanges() {
        this.users.forEach(user => {
            if (user.id !== this.currentUser?.id && Math.random() < 0.2) {
                user.isOnline = !user.isOnline;
                user.lastSeen = new Date().toISOString();
            }
        });

        // Update UI if needed
        if (this.activeCommunity) {
            this.updateChatHeader();
        }
    }

    showLoginScreen() {
        const loginScreen = document.getElementById('loginScreen');
        const appInterface = document.getElementById('appInterface');
        
        if (loginScreen) loginScreen.classList.remove('hidden');
        if (appInterface) appInterface.classList.add('hidden');
    }

    loginUser(userId) {
        console.log('🔄 Switching to user:', userId);
        this.currentUser = this.users.find(user => user.id === userId);
        
        if (!this.currentUser) {
            console.error('❌ User not found:', userId);
            return;
        }

        console.log('✅ Successfully logged in as:', this.currentUser.name, '(' + this.currentUser.role + ')');

        const loginScreen = document.getElementById('loginScreen');
        const appInterface = document.getElementById('appInterface');
        
        if (loginScreen) loginScreen.classList.add('hidden');
        if (appInterface) appInterface.classList.remove('hidden');

        // Clear any previous UI state
        this.clearPreviousSession();

        // Initialize UI after login
        setTimeout(() => {
            this.updateCurrentUserUI();
            this.renderChatsList();
            this.renderCommunitiesList();
            this.renderEmergencyCommunitiesList();
            this.showWelcomeScreen();
            this.updateChatBadges();
            this.updateEmergencyBadge();
            
            // Check for pending REAL emergencies from other users
            setTimeout(() => {
                this.checkForPendingEmergencies();
            }, 1000); // Reduced delay for faster response
            
            this.showNotification('User Switched', `Now logged in as ${this.currentUser.name}`, 'success');
        }, 100);
    }

    clearPreviousSession() {
        // Close any open modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => modal.classList.add('hidden'));
        
        // Clear any active timers or intervals
        if (this.emergencyCheckInterval) {
            clearInterval(this.emergencyCheckInterval);
        }
        
        // Reset active community
        this.activeCommunity = null;
        
        console.log('🧹 Cleared previous session state');
    }

    logout() {
        this.currentUser = null;
        this.activeChat = null;
        this.activeCommunity = null;
        this.showLoginScreen();
    }

    updateCurrentUserUI() {
        const avatar = document.getElementById('currentUserAvatar');
        const name = document.getElementById('currentUserName');
        const location = document.getElementById('currentUserLocation');
        
        if (avatar) avatar.src = this.currentUser.avatar;
        if (name) name.textContent = this.currentUser.name;
        if (location) location.textContent = this.currentUser.location.address;
    }

    switchTab(tabName) {
        // Update active tab
        document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTab) activeTab.classList.add('active');

        // Show corresponding panel
        document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.add('hidden'));
        const activePanel = document.getElementById(`${tabName}Tab`);
        if (activePanel) activePanel.classList.remove('hidden');
        
        // Keep chat area visible if a chat is already open
        const chatArea = document.getElementById('chatArea');
        if (chatArea && !chatArea.classList.contains('hidden') && this.activeChat) {
            // Don't hide the chat area when switching tabs, just update sidebar
            const welcomeScreen = document.getElementById('welcomeScreen');
            if (welcomeScreen) welcomeScreen.classList.add('hidden');
        }
    }

    renderChatsList() {
        const chatsList = document.getElementById('chatsList');
        if (!chatsList) return;
        
        chatsList.innerHTML = '';

        // Add AI Assistant as first personal chat
        const aiChatItem = this.createAIChatItem();
        chatsList.appendChild(aiChatItem);

        // Add separator for other chats
        const separator = document.createElement('div');
        separator.className = 'chat-separator';
        separator.innerHTML = '<span>Community Chats</span>';
        chatsList.appendChild(separator);

        // Get communities user is part of
        const userCommunities = this.currentUser.communities || [];
        
        userCommunities.forEach(communityId => {
            const community = this.findCommunity(communityId);
            if (!community || community.type === 'emergency') return;

            const chatItem = this.createChatItem(community);
            chatsList.appendChild(chatItem);
        });
    }

    renderCommunitiesList() {
        const communitiesList = document.getElementById('communitiesList');
        if (!communitiesList) return;
        
        communitiesList.innerHTML = '';

        // Render main communities
        this.communities.main_communities.forEach(community => {
            const communityItem = this.createCommunityItem(community);
            communitiesList.appendChild(communityItem);

            // Render sub-communities
            if (community.subCommunities) {
                const subContainer = document.createElement('div');
                subContainer.className = 'community-hierarchy';
                
                community.subCommunities.forEach(subId => {
                    const subCommunity = this.findCommunity(subId);
                    if (subCommunity) {
                        const subItem = this.createCommunityItem(subCommunity);
                        subItem.classList.add('sub');
                        subContainer.appendChild(subItem);

                        // Render sub-sub communities
                        if (subCommunity.subCommunities) {
                            subCommunity.subCommunities.forEach(subSubId => {
                                const subSubCommunity = this.findCommunity(subSubId);
                                if (subSubCommunity) {
                                    const subSubItem = this.createCommunityItem(subSubCommunity);
                                    subSubItem.classList.add('sub-sub');
                                    subContainer.appendChild(subSubItem);
                                }
                            });
                        }
                    }
                });

                communitiesList.appendChild(subContainer);
            }
        });
    }

    renderEmergencyCommunitiesList() {
        const emergencyList = document.getElementById('emergencyCommunitiesList');
        if (!emergencyList) return;
        
        emergencyList.innerHTML = '';

        this.communities.emergency_communities.forEach(community => {
            const emergencyItem = this.createEmergencyCommunityItem(community);
            emergencyList.appendChild(emergencyItem);
        });

        // Render authority communities as well
        this.renderAuthorityCommunitiesList();
    }

    renderAuthorityCommunitiesList() {
        const emergencyList = document.getElementById('emergencyCommunitiesList');
        if (!emergencyList) return;
        
        // Find or create authority communities section
        let authoritySection = document.getElementById('authorityCommunitiesSection');
        if (!authoritySection) {
            authoritySection = document.createElement('div');
            authoritySection.id = 'authorityCommunitiesSection';
            authoritySection.innerHTML = '<h4 style="color: var(--color-text-secondary); margin: 15px 10px 10px; font-size: 0.9rem;">Authority Coordination</h4>';
            emergencyList.appendChild(authoritySection);
        }

        // Clear existing authority communities
        const existingAuthorities = authoritySection.querySelectorAll('.authority-community-item');
        existingAuthorities.forEach(item => item.remove());

        this.communities.authority_communities.forEach(community => {
            const authorityItem = this.createAuthorityCommunityItem(community);
            authoritySection.appendChild(authorityItem);
        });
    }

    createAuthorityCommunityItem(community) {
        const div = document.createElement('div');
        div.className = `authority-community-item ${community.isLocked ? 'locked' : 'unlocked'}`;
        div.dataset.communityId = community.id;

        // Check if current user has access
        const hasAccess = !community.isLocked && 
            community.allowedUsers && 
            community.allowedUsers.includes(this.currentUser.id);

        const emergencyTypesText = community.emergencyTypes.join(', ');

        div.innerHTML = `
            <div class="community-icon">
                ${community.icon}
            </div>
            <div class="community-info">
                <div class="community-name">${community.name}</div>
                <div class="community-description">
                    ${community.isLocked ? community.unlockCondition : `Handles: ${emergencyTypesText}`}
                </div>
                ${hasAccess ? '<small style="color: #25D366;">✅ Active Emergency Access</small>' : ''}
                ${community.isLocked ? '<small style="color: #999;">🔒 Requires emergency participation</small>' : ''}
            </div>
            <div class="lock-indicator">
                <i class="fas ${community.isLocked ? 'fa-lock' : 'fa-unlock'}"></i>
                ${hasAccess ? '<i class="fas fa-check-circle" style="color: #25D366; margin-left: 5px;"></i>' : ''}
            </div>
        `;

        // Only allow access if user has permission
        if (hasAccess) {
            div.classList.add('accessible');
            div.style.cursor = 'pointer';
        } else {
            div.style.cursor = 'not-allowed';
            div.style.opacity = '0.6';
        }

        return div;
    }

    createAIChatItem() {
        const div = document.createElement('div');
        div.className = 'chat-item ai-chat-item';
        div.dataset.chatType = 'ai';

        div.innerHTML = `
            <div class="chat-avatar ai-avatar">
                🤖
            </div>
            <div class="chat-info">
                <div class="chat-name">AI Assistant</div>
                <div class="chat-preview">Your personal emergency assistant</div>
            </div>
            <div class="chat-meta">
                <div class="ai-status online">Online</div>
            </div>
        `;

        div.addEventListener('click', () => {
            this.openAIChat();
        });

        return div;
    }

    createChatItem(community) {
        const div = document.createElement('div');
        div.className = 'chat-item';
        div.dataset.communityId = community.id;

        const lastMessage = this.getLastMessage(community.id);
        const unreadCount = this.chats[community.id]?.unreadCount || 0;

        div.innerHTML = `
            <div class="chat-avatar community-icon">
                ${community.icon || '💬'}
            </div>
            <div class="chat-info">
                <div class="chat-name">${community.name}</div>
                <div class="chat-preview">${lastMessage?.content || 'No messages yet'}</div>
            </div>
            <div class="chat-meta">
                <div class="chat-time">${lastMessage ? this.formatTime(lastMessage.timestamp) : ''}</div>
                ${unreadCount > 0 ? `<div class="notification-badge show">${unreadCount}</div>` : ''}
            </div>
        `;

        return div;
    }

    createCommunityItem(community) {
        const div = document.createElement('div');
        div.className = 'community-item';
        div.dataset.communityId = community.id;

        const isMember = this.currentUser.communities?.includes(community.id);

        div.innerHTML = `
            <div class="community-icon">
                ${community.icon || '🏘️'}
            </div>
            <div class="community-info">
                <div class="community-name">${community.name}</div>
                <div class="community-description">${community.description}</div>
            </div>
            <div class="community-meta">
                <small>${community.memberCount} members</small>
                ${isMember ? '<i class="fas fa-check" style="color: #25D366;"></i>' : ''}
            </div>
        `;

        return div;
    }

    createEmergencyCommunityItem(community) {
        const div = document.createElement('div');
        div.className = `emergency-community-item ${community.isLocked ? 'locked' : 'unlocked'}`;
        div.dataset.communityId = community.id;

        div.innerHTML = `
            <div class="community-icon">
                ${community.icon}
            </div>
            <div class="community-info">
                <div class="community-name">${community.name}</div>
                <div class="community-description">${community.description}</div>
            </div>
            <div class="lock-indicator">
                <i class="fas ${community.isLocked ? 'fa-lock' : 'fa-lock-open'}"></i>
            </div>
        `;

        return div;
    }

    openChat(communityId) {
        console.log('Opening chat for community:', communityId);
        
        this.activeCommunity = communityId;
        this.activeChat = communityId;

        // Mark messages as read
        if (this.chats[communityId]) {
            this.chats[communityId].unreadCount = 0;
        }

        // Hide chatbot when opening chat
        if (window.helpChatbot) {
            window.helpChatbot.hideOnNavigation();
        }

        this.showChatArea();
        this.updateChatHeader();
        this.renderMessages();
        this.updateChatBadges();

        // Update active states with better visual feedback
        document.querySelectorAll('.chat-item, .community-item, .emergency-community-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active state to current chat items
        document.querySelectorAll(`[data-community-id="${communityId}"]`).forEach(item => {
            item.classList.add('active');
        });
        
        // Ensure the correct tab is active if switching between different types
        const community = this.findCommunity(communityId);
        if (community) {
            if (community.type === 'emergency') {
                this.switchTab('emergency');
            } else if (community.name === 'Direct Chat') {
                this.switchTab('chats');
            } else {
                this.switchTab('communities');
            }
        }

        // Focus on message input
        setTimeout(() => {
            const messageInput = document.getElementById('messageInput');
            if (messageInput) {
                messageInput.focus();
            }
        }, 100);
    }

    openAIChat() {
        console.log('Opening AI Assistant chat');
        
        this.activeCommunity = 'ai-assistant';
        this.activeChat = 'ai-assistant';

        // Initialize AI chat if not exists
        if (!this.chats['ai-assistant']) {
            this.chats['ai-assistant'] = {
                messages: [],
                unreadCount: 0
            };
        }

        this.showChatArea();
        this.updateAIChatHeader();
        this.renderAIMessages();

        // Update active states
        document.querySelectorAll('.chat-item, .community-item, .emergency-community-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active state to AI chat
        document.querySelector('.ai-chat-item').classList.add('active');

        // Switch to chats tab
        this.switchTab('chats');

        // Initialize AI if not already done
        this.initializeAI();

        // Focus on message input
        setTimeout(() => {
            const messageInput = document.getElementById('messageInput');
            if (messageInput) {
                messageInput.focus();
            }
        }, 100);
    }

    showWelcomeScreen() {
        const welcomeScreen = document.getElementById('welcomeScreen');
        const chatArea = document.getElementById('chatArea');
        
        if (welcomeScreen) welcomeScreen.classList.remove('hidden');
        if (chatArea) chatArea.classList.add('hidden');
        
        // Show chatbot on welcome screen
        if (window.helpChatbot) {
            window.helpChatbot.showOnWelcome();
        }
    }

    showChatArea() {
        const welcomeScreen = document.getElementById('welcomeScreen');
        const chatArea = document.getElementById('chatArea');
        
        if (welcomeScreen) welcomeScreen.classList.add('hidden');
        if (chatArea) chatArea.classList.remove('hidden');
        
        // Hide chatbot when navigating away from welcome
        if (window.helpChatbot) {
            window.helpChatbot.hideOnNavigation();
        }
    }

    quickSwitchToChat(communityId) {
        // Fast switching function - directly opens chat without going back to welcome
        if (this.activeCommunity !== communityId) {
            this.openChat(communityId);
        }
        // If same chat is already open, just ensure it's visible
        this.showChatArea();
    }

    updateChatHeader() {
        const community = this.findCommunity(this.activeCommunity);
        if (!community) return;

        const chatAvatar = document.getElementById('chatAvatar');
        const chatTitle = document.getElementById('chatTitle');
        const chatSubtitle = document.getElementById('chatSubtitle');

        if (chatAvatar) {
            chatAvatar.src = `data:image/svg+xml,${encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                    <rect width="40" height="40" fill="#25D366" rx="20"/>
                    <text x="20" y="28" font-size="16" text-anchor="middle" fill="white">${community.icon || '💬'}</text>
                </svg>
            `)}`;
        }

        if (chatTitle) {
            chatTitle.textContent = community.name;
        }

        if (chatSubtitle) {
            let subtitle = `${community.memberCount} members`;
            if (community.type === 'emergency') {
                subtitle += ` • ${community.isLocked ? 'Locked' : 'Active'}`;
            } else {
                const onlineMembers = this.getOnlineMembers(community.id);
                if (onlineMembers.length > 0) {
                    subtitle += ` • ${onlineMembers.length} online`;
                }
            }
            chatSubtitle.textContent = subtitle;
        }
    }

    updateAIChatHeader() {
        const chatAvatar = document.getElementById('chatAvatar');
        const chatTitle = document.getElementById('chatTitle');
        const chatSubtitle = document.getElementById('chatSubtitle');

        if (chatAvatar) {
            chatAvatar.src = `data:image/svg+xml,${encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                    <rect width="40" height="40" fill="#4CAF50" rx="20"/>
                    <text x="20" y="28" font-size="16" text-anchor="middle" fill="white">🤖</text>
                </svg>
            `)}`;
        }

        if (chatTitle) {
            chatTitle.textContent = 'AI Assistant';
        }

        if (chatSubtitle) {
            chatSubtitle.textContent = 'Personal Emergency AI • Always Available';
        }
    }

    renderMessages() {
        const container = document.getElementById('messagesContainer');
        if (!container) return;
        
        container.innerHTML = '';

        let messages = this.chats[this.activeCommunity]?.messages || [];

        // Filter messages for main community (public view) - only show 2 basic messages
        if (this.activeCommunity === 'city_central') {
            const publicMessageTypes = [
                'emergency_alert',     // Message 1: Emergency alert from victim
                'authority_appreciation' // Message 2: Authority appreciation/confirmation
            ];
            
            messages = messages.filter(message => {
                return message.isPublicMessage || 
                       publicMessageTypes.includes(message.messageType) ||
                       (!message.isAuthorityCoordination && !message.isSystemMessage) ||
                       message.senderId === this.currentUser.id; // Always show user's own messages
            });
        }

        messages.forEach(message => {
            const messageEl = this.createMessageElement(message);
            container.appendChild(messageEl);
        });

        // Scroll to bottom smoothly without conflicts
        setTimeout(() => {
            // Only scroll if not a chatbot interaction
            if (!document.querySelector('#helpChatbot.show')) {
                container.scrollTop = container.scrollHeight;
            }
        }, 50);
    }

    createMessageElement(message) {
        const div = document.createElement('div');
        div.className = `message ${message.senderId === this.currentUser.id ? 'own' : 'other'}`;

        if (message.isSystemMessage) {
            let systemClass = 'system';
            if (message.isEmergency) systemClass += ' emergency';
            if (message.isProfileShare) systemClass += ' profile-share';
            if (message.isAuthorityResponse) systemClass += ' authority-response';
            if (message.isHelperResponse) systemClass += ' helper-response';
            div.className = `message ${systemClass}`;
        }

        let messageHTML = '';

        if (!message.isSystemMessage && message.senderId !== this.currentUser.id) {
            const sender = this.users.find(u => u.id === message.senderId);
            const avatarUrl = sender?.avatar || 'https://i.pravatar.cc/150?img=1';
            messageHTML += `
                <img src="${avatarUrl}" alt="${message.senderName}" class="sender-avatar" 
                     onerror="this.src='https://i.pravatar.cc/150?img=1'; this.onerror=null;">
            `;
        }

        messageHTML += `
            <div class="message-bubble">
                ${!message.isSystemMessage && message.senderId !== this.currentUser.id ? 
                    `<div class="message-sender">${message.senderName}</div>` : ''
                }
                <div class="message-content">${this.escapeHtml(message.content)}</div>
                <div class="message-time">${this.formatTime(message.timestamp)}</div>
            </div>
        `;

        div.innerHTML = messageHTML;
        return div;
    }

    sendMessage() {
        const input = document.getElementById('messageInput');
        if (!input) return;
        
        const content = input.value.trim();

        if (!content || !this.activeCommunity) return;

        console.log('Sending message:', content);

        // Handle AI chat differently
        if (this.activeCommunity === 'ai-assistant') {
            this.sendAIMessage(content);
            input.value = '';
            input.focus();
            return;
        }

        // Check for emergency triggers (only in regular chats)
        if (content.startsWith('/')) {
            if (this.emergencyTriggers[content]) {
                this.triggerEmergency(content);
                input.value = '';
                return;
            }
        }

        const message = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: this.currentUser.id,
            senderName: this.currentUser.name,
            content: content,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: false
        };

        this.addMessage(this.activeCommunity, message);
        this.playSound('messageSent');

        input.value = '';
        input.focus();
    }

    sendAIMessage(content) {
        // 🚨 CHECK FOR EMERGENCY TRIGGERS IN AI CHAT (same as community chat)
        if (content.startsWith('/')) {
            if (this.emergencyTriggers[content]) {
                console.log('🚨 Emergency trigger detected in AI chat:', content);
                
                // Show notification about emergency trigger
                this.showNotification(
                    'Emergency Triggered in AI Chat',
                    `${content} emergency activated. AI Emergency Agent activated!`,
                    'error'
                );
                
                // Trigger the emergency system
                this.triggerEmergency(content);
                
                // Also send to AI for emergency guidance
                this.sendEmergencyToAI(content);
                return;
            }
        }

        // Add user message
        const userMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: this.currentUser.id,
            senderName: this.currentUser.name,
            content: content,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: false
        };

        // Add to AI chat
        if (!this.chats['ai-assistant']) {
            this.chats['ai-assistant'] = { messages: [], unreadCount: 0 };
        }
        
        this.chats['ai-assistant'].messages.push(userMessage);
        this.renderAIMessages();
        this.playSound('messageSent');

        // Get AI response
        this.getAIResponse(content);
    }
    
    // Send emergency trigger to AI for emergency guidance
    sendEmergencyToAI(trigger) {
        const emergencyConfig = this.emergencyTriggers[trigger];
        if (!emergencyConfig) return;
        
        const emergencyMessage = `${trigger} - ${emergencyConfig.alertType} Emergency activated`;
        
        // Add emergency activation message
        const emergencyUserMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: this.currentUser.id,
            senderName: this.currentUser.name,
            content: emergencyMessage,
            timestamp: new Date(),
            type: 'emergency_trigger',
            isSystemMessage: false
        };

        this.chats['ai-assistant'].messages.push(emergencyUserMessage);
        this.renderAIMessages();

        // Get AI emergency response
        this.getAIEmergencyResponse(emergencyMessage, trigger);
    }
    
    // Get AI emergency response with trigger context
    async getAIEmergencyResponse(userMessage, trigger) {
        try {
            console.log('🚨 Getting AI emergency response for trigger:', trigger);
            
            this.showAITyping();

            const emergencyType = this.detectEmergencyTypeFromTrigger(trigger);
            
            const context = {
                mode: 'emergency',
                user: {
                    name: this.currentUser.name,
                    role: this.currentUser.role,
                    location: this.currentUser.location?.address,
                    userRole: 'victim'
                },
                emergencyActive: true,
                emergencyType: emergencyType,
                userMessage: userMessage,
                trigger: trigger,
                triggerSource: 'text',
                conversationHistory: this.chats['ai-assistant']?.messages || [],
                message: userMessage
            };

            console.log('📤 Sending emergency context to AI:', context);

            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(context)
            });

            if (!response.ok) {
                throw new Error('AI emergency service unavailable');
            }

            const aiResponse = await response.json();
            this.hideAITyping();

            // Add AI emergency response (INITIAL MESSAGE)
            const aiMessage = {
                id: 'msg_' + this.messageIdCounter++,
                senderId: 'ai-assistant',
                senderName: `� ${aiResponse.agentName || 'Fire Emergency Agent'}`,
                content: aiResponse.response || aiResponse.message || 'Emergency guidance activated. Follow safety instructions.',
                timestamp: new Date(),
                type: 'ai_emergency_response',
                isSystemMessage: false,
                agentType: aiResponse.agentType || 'fire',
                emergencyActive: true
            };

            this.chats['ai-assistant'].messages.push(aiMessage);
            this.renderAIMessages();
            this.playSound('messageReceived');

            // Send FIRE TEAM MESSAGE with 1 second delay
            if (trigger === '/fire') {
                setTimeout(() => {
                    this.sendFireTeamMessage();
                }, 1000);
                
                // Unlock Fire Authority for victim
                this.unlockFireAuthorityForVictim();
            }

        } catch (error) {
            console.error('❌ AI Emergency Error:', error);
            this.hideAITyping();
            
            const errorMessage = {
                id: 'msg_' + this.messageIdCounter++,
                senderId: 'ai-assistant',
                senderName: '🚨 Emergency Assistant',
                content: '⚠️ Emergency guidance system error. Call 911 immediately for real emergencies!',
                timestamp: new Date(),
                type: 'ai_emergency_response',
                isSystemMessage: false
            };

            this.chats['ai-assistant'].messages.push(errorMessage);
            this.renderAIMessages();
        }
    }
    
    // Send fire team message with delay
    sendFireTeamMessage() {
        const fireTeamMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'fire-team',
            senderName: '🚒 Fire Department Dispatch',
            content: `🚨 FIRE TEAM RESPONSE:
• Fire Department notified - Response team dispatched
• Estimated arrival: 4-6 minutes  
• Captain Martinez leading rescue team
• Full response: Engine, ladder truck, rescue unit

💙 Help is on the way - focus on getting out safely!`,
            timestamp: new Date(),
            type: 'fire_team_update',
            isSystemMessage: true
        };

        this.chats['ai-assistant'].messages.push(fireTeamMessage);
        this.renderAIMessages();
        this.playSound('messageReceived');
        
        // Send communication message with another 1 second delay
        setTimeout(() => {
            this.sendCommunicationMessage();
        }, 1000);
    }
    
    // Send communication instructions
    sendCommunicationMessage() {
        const commMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system',
            senderName: '📞 Emergency Coordination',
            content: `📞 COMMUNICATION SETUP:
• Fire Authority coordination channel is now active
• Go to Fire Authority for team communication
• Real-time updates with responders available
• Emergency services will contact you directly

🔥 Continue chatting here for safety guidance!`,
            timestamp: new Date(),
            type: 'communication_info',
            isSystemMessage: true
        };

        this.chats['ai-assistant'].messages.push(commMessage);
        this.renderAIMessages();
    }
    
    // Unlock Fire Authority for victim
    unlockFireAuthorityForVictim() {
        const fireAuthority = this.communities.authority_communities.find(c => c.id === 'fire_authority');
        if (fireAuthority) {
            fireAuthority.isLocked = false;
            fireAuthority.allowedUsers = fireAuthority.allowedUsers || [];
            
            // Add current user (victim) to allowed users
            if (!fireAuthority.allowedUsers.includes(this.currentUser.id)) {
                fireAuthority.allowedUsers.push(this.currentUser.id);
                fireAuthority.memberCount = fireAuthority.allowedUsers.length;
            }
            
            // Initialize chat if not exists
            if (!this.chats['fire_authority']) {
                this.chats['fire_authority'] = { messages: [], unreadCount: 0 };
            }
            
            // Re-render to show unlocked authority
            this.renderAuthorityCommunitiesList();
            
            console.log('🔓 Fire Authority unlocked for victim:', this.currentUser.name);
        }
    }
    
    // Detect emergency type from trigger
    detectEmergencyTypeFromTrigger(trigger) {
        const triggerToType = {
            '/fire': 'fire',
            '/doctor': 'medical',
            '/medical': 'medical',
            '/rape': 'police',
            '/missing': 'police',
            '/blood': 'medical',
            '/disaster': 'emergency',
            '/helpelder': 'medical',
            '/fund': 'emergency'
        };
        
        return triggerToType[trigger] || 'emergency';
    }

    async getAIResponse(userMessage) {
        try {
            console.log('💬 Getting AI response for message:', userMessage);
            this.showAITyping();

            // Use Coordinator for AI requests
            const context = {
                userMessage: userMessage,
                userID: this.currentUser.id,
                location: this.currentUser.location?.address || '',
                details: {
                    userRole: this.currentUser.role,
                    userName: this.currentUser.name
                }
            };

            console.log('📤 Sending context to Coordinator:', context);

            // Call new Coordinator API
            const response = await fetch('/api/coordinator', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(context)
            });

            console.log('📡 Coordinator Response status:', response.status, response.statusText);

            if (!response.ok) {
                console.error('❌ Coordinator Response not OK:', response.status);
                throw new Error('AI Coordinator service unavailable');
            }

            const coordinatorResponse = await response.json();
            console.log('📥 Coordinator Response received:', coordinatorResponse);
            
            // Hide typing indicator
            this.hideAITyping();

            // 🚨 DETERMINE AGENT TYPE AND DISPLAY NAME FROM COORDINATOR
            let agentName = 'AI Assistant';
            let agentEmoji = '🤖';
            let agentType = coordinatorResponse.agentType || 'general';
            
            // Map agent types to display names
            switch (coordinatorResponse.agentType) {
                case 'FIRE_EMERGENCY':
                    agentName = 'Fire Emergency Specialist';
                    agentEmoji = '🔥';
                    break;
                case 'MEDICAL_EMERGENCY':
                    agentName = 'Medical Emergency Specialist';
                    agentEmoji = '🏥';
                    break;
                case 'POLICE_EMERGENCY':
                    agentName = 'Police Emergency Specialist';
                    agentEmoji = '👮';
                    break;
                case 'general_fire_info':
                    agentName = 'Fire Safety Assistant';
                    agentEmoji = '🔥';
                    break;
                case 'general_medical_info':
                    agentName = 'Medical Information Assistant';
                    agentEmoji = '🏥';
                    break;
                case 'general_safety_info':
                    agentName = 'Safety Information Assistant';
                    agentEmoji = '👮';
                    break;
                case 'help_assistant':
                    agentName = 'Help Assistant';
                    agentEmoji = '💡';
                    break;
                default:
                    agentName = 'AI Assistant';
                    agentEmoji = '🤖';
            }

            // Add emergency badge if active
            const emergencyBadge = coordinatorResponse.emergencyActive ? ' 🚨' : '';

            // Add AI response message with Coordinator information
            const aiMessage = {
                id: 'msg_' + this.messageIdCounter++,
                senderId: 'ai-assistant',
                senderName: `${agentEmoji} ${agentName}${emergencyBadge}`,
                content: coordinatorResponse.response || 'No response generated',
                timestamp: new Date(),
                type: 'ai_response',
                isSystemMessage: false,
                agentType: agentType,
                emergencyActive: coordinatorResponse.emergencyActive || false,
                emergencyID: coordinatorResponse.emergencyID || null,
                source: coordinatorResponse.source || 'coordinator'
            };

            this.chats['ai-assistant'].messages.push(aiMessage);
            this.renderAIMessages();
            this.playSound('messageReceived');

        } catch (error) {
            console.error('❌ AI Response Error:', error);
            this.hideAITyping();
            
            const errorMessage = {
                id: 'msg_' + this.messageIdCounter++,
                senderId: 'ai-assistant',
                senderName: '⚠️ System Notice',
                content: '⚠️ AI service temporarily unavailable. For real emergencies, call 911 immediately!',
                timestamp: new Date(),
                type: 'ai_error',
                isSystemMessage: true
            };

            this.chats['ai-assistant'].messages.push(errorMessage);
            this.renderAIMessages();
        }
    }

    // 🚨 ENHANCED EMERGENCY DETECTION SYSTEM
    detectEmergencyType(message) {
        const lowerMessage = message.toLowerCase();
        
        // Fire Emergency Keywords
        const fireKeywords = ['fire', 'smoke', 'burning', 'flames', 'blazing', '/fire', 'building on fire'];
        if (fireKeywords.some(keyword => lowerMessage.includes(keyword))) {
            return 'fire';
        }
        
        // Medical Emergency Keywords  
        const medicalKeywords = ['medical', 'hurt', 'injured', 'bleeding', 'unconscious', 'heart attack', 'stroke', '/medical', 'doctor'];
        if (medicalKeywords.some(keyword => lowerMessage.includes(keyword))) {
            return 'medical';
        }
        
        // Police Emergency Keywords
        const policeKeywords = ['police', 'robbery', 'attack', 'violence', 'assault', 'break in', '/police', 'crime'];
        if (policeKeywords.some(keyword => lowerMessage.includes(keyword))) {
            return 'police';
        }
        
        // General Emergency Keywords
        const generalKeywords = ['emergency', 'help urgent', 'crisis', 'danger', '911', 'need help now'];
        if (generalKeywords.some(keyword => lowerMessage.includes(keyword))) {
            return 'emergency';
        }
        
        return 'normal';
    }

    detectEmergencyKeywords(message) {
        return this.detectEmergencyType(message) !== 'normal';
    }

    // 🚨 EMERGENCY MODE UI INDICATOR
    showEmergencyModeIndicator(emergencyType) {
        // Update chat header to show emergency mode
        const chatHeader = document.querySelector('.chat-header h3');
        if (chatHeader) {
            const emergencyIcons = {
                'fire': '🔥',
                'medical': '🏥', 
                'police': '👮',
                'emergency': '🚨'
            };
            
            chatHeader.innerHTML = `${emergencyIcons[emergencyType] || '🚨'} Emergency Mode - ${emergencyType.toUpperCase()} Agent Active`;
            chatHeader.style.color = '#e74c3c';
            chatHeader.style.fontWeight = 'bold';
            chatHeader.style.animation = 'blink 1s infinite';
        }
        
        // Add emergency notification
        this.showEmergencyNotification(emergencyType);
    }
    
    showEmergencyNotification(emergencyType) {
        // Create emergency notification banner
        const existingNotification = document.querySelector('.emergency-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = 'emergency-notification';
        notification.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #e74c3c;
            color: white;
            padding: 10px;
            text-align: center;
            font-weight: bold;
            z-index: 9999;
            animation: emergencyPulse 2s infinite;
        `;
        
        const emergencyMessages = {
            'fire': '🔥 FIRE EMERGENCY DETECTED - Fire Safety Agent Activated',
            'medical': '🏥 MEDICAL EMERGENCY DETECTED - Medical Agent Activated', 
            'police': '👮 POLICE EMERGENCY DETECTED - Police Agent Activated',
            'emergency': '🚨 EMERGENCY DETECTED - Emergency Agent Activated'
        };
        
        notification.innerHTML = emergencyMessages[emergencyType] || '🚨 EMERGENCY MODE ACTIVE';
        document.body.prepend(notification);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    showAITyping() {
        const container = document.getElementById('messagesContainer');
        if (!container) return;

        const typingDiv = document.createElement('div');
        typingDiv.id = 'ai-typing';
        typingDiv.className = 'message ai typing';
        typingDiv.innerHTML = `
            <div class="ai-avatar">🤖</div>
            <div class="message-bubble ai-bubble">
                <div class="message-sender">AI Assistant</div>
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;

        container.appendChild(typingDiv);
        container.scrollTop = container.scrollHeight;
    }

    hideAITyping() {
        const typingElement = document.getElementById('ai-typing');
        if (typingElement) {
            typingElement.remove();
        }
    }

    initializeAI() {
        // This replaces the old AI initialization
        console.log('🤖 AI Assistant initialized for personal chat');
    }

    // Add message to chat (for AI integration)
    addMessageToChat(messageObj) {
        if (!this.currentCommunity) return;
        
        const chat = this.chats[this.currentCommunity.id];
        if (!chat) return;

        // Add message to chat messages
        chat.messages.push(messageObj);

        // Re-render messages to show the new AI message
        this.renderMessages();

        // Scroll to bottom
        const messagesContainer = document.getElementById('messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // Play notification sound for AI messages
        if (messageObj.type === 'ai_response') {
            this.playSound('messageReceived');
        }
    }

    renderAIMessages() {
        const container = document.getElementById('messagesContainer');
        if (!container) return;
        
        container.innerHTML = '';

        let messages = this.chats['ai-assistant']?.messages || [];

        // Add welcome message if no messages exist
        if (messages.length === 0) {
            const welcomeMessage = {
                id: 'ai_welcome',
                senderId: 'ai-assistant',
                senderName: 'AI Assistant',
                content: '👋 Hello! I\'m your personal emergency AI assistant. I can help you with:\n\n🚨 Emergency guidance\n📞 Finding help resources\n💬 General assistance\n\nFor real emergencies, always call 911 first!\n\nHow can I help you today?',
                timestamp: new Date(),
                type: 'ai_response',
                isSystemMessage: false
            };
            
            this.chats['ai-assistant'].messages.push(welcomeMessage);
            messages = [welcomeMessage];
        }

        messages.forEach(message => {
            const messageEl = this.createAIMessageElement(message);
            container.appendChild(messageEl);
        });

        // Scroll to bottom
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 50);
    }

    createAIMessageElement(message) {
        const div = document.createElement('div');
        const isUser = message.senderId === this.currentUser.id;
        const isAI = message.senderId === 'ai-assistant';
        
        div.className = `message ${isUser ? 'own' : isAI ? 'ai' : 'other'}`;

        let messageHTML = '';

        if (isAI) {
            messageHTML += `
                <div class="ai-avatar">🤖</div>
            `;
        }

        messageHTML += `
            <div class="message-bubble ${isAI ? 'ai-bubble' : ''}">
                ${isAI ? `<div class="message-sender">AI Assistant</div>` : ''}
                <div class="message-content">${this.escapeHtml(message.content)}</div>
                <div class="message-time">${this.formatTime(message.timestamp)}</div>
            </div>
        `;

        div.innerHTML = messageHTML;
        return div;
    }

    triggerEmergency(trigger) {
        console.log('🚨 REAL EMERGENCY TRIGGERED BY USER IN CHAT:', {
            trigger: trigger,
            user: this.currentUser.name,
            timestamp: new Date().toISOString(),
            source: 'chat_command'
        });
        
        const emergencyConfig = this.emergencyTriggers[trigger];
        if (!emergencyConfig) {
            console.error('❌ Unknown emergency trigger:', trigger);
            return;
        }

        // Create emergency case with detailed profile information
        const caseId = this.generateCaseId(emergencyConfig.alertType);
        const emergencyCase = {
            caseId: caseId,
            alertType: emergencyConfig.alertType,
            userId: this.currentUser.id,
            userName: this.currentUser.name,
            userAge: this.currentUser.age,
            userGender: this.currentUser.gender,
            userBloodGroup: this.currentUser.bloodGroup,
            userPhone: this.currentUser.phone,
            userAvatar: this.currentUser.avatar,
            medicalConditions: this.currentUser.medicalConditions || [],
            emergencyContacts: this.currentUser.emergencyContacts || [],
            location: this.currentUser.location.address,
            coordinates: this.currentUser.location.coordinates,
            triggerTime: new Date(),
            status: 'Pending',
            responder: null,
            emergencyContactsNotified: this.currentUser.emergencyContacts,
            resolutionTime: null,
            notes: '',
            isAnonymous: trigger === '/rape', // Anonymous for rape cases initially
            acceptedBy: null,
            responseDetails: null
        };

        this.emergencyCases.push(emergencyCase);

        // Unlock emergency community
        const emergencyCommunity = this.communities.emergency_communities.find(
            c => c.id === emergencyConfig.unlocksCommunity
        );

        if (emergencyCommunity) {
            emergencyCommunity.isLocked = false;
            this.renderEmergencyCommunitiesList();
        }

        // Store current emergency for cross-user demo
        this.currentEmergencyCase = emergencyCase;
        this.currentEmergencyConfig = emergencyConfig;

        // Simulate sending alert to other demo users
        this.simulateMultiUserEmergencyAlert(emergencyCase, emergencyConfig);

        // Show emergency popup to responders (current user if they're a responder)
        setTimeout(() => {
            this.showEmergencyPopup(emergencyCase, emergencyConfig);
        }, 500);

        // Add BASIC system message to main community (public view) - Message 1 of 4
        this.addBasicEmergencyMessageToMainCommunity(emergencyCase, emergencyConfig);

        // Notify emergency contacts
        this.notifyEmergencyContacts(emergencyCase);

        // Play emergency sound
        this.playSound('emergencyAlert');

        // Show notification
        this.showNotification(
            `${emergencyConfig.alertType} Alert Sent`,
            'Emergency alert sent to all available responders. Switch to another user account to see the alert!',
            'error'
        );

        // Update emergency badge
        this.updateEmergencyBadge();

        // Dispatch AI event for emergency triggered
        document.dispatchEvent(new CustomEvent('emergencyTriggered', {
            detail: {
                id: caseId,
                type: emergencyConfig.alertType.toLowerCase(),
                victim: {
                    name: this.currentUser.name,
                    age: this.currentUser.age,
                    medicalConditions: this.currentUser.medicalConditions || [],
                    location: this.currentUser.location
                },
                communityId: emergencyConfig.unlocksCommunity,
                trigger: trigger
            }
        }));
    }

    // Add basic emergency message to main community (Message 1 of 2)
    addBasicEmergencyMessageToMainCommunity(emergencyCase, emergencyConfig) {
        const basicEmergencyMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: emergencyCase.userId,
            senderName: emergencyCase.userName,
            content: `🚨 ${emergencyConfig.alertType.toUpperCase()} EMERGENCY\n\n📍 ${emergencyCase.location}\n⏰ ${this.formatTime(emergencyCase.triggerTime)}\n🆘 Immediate help needed`,
            timestamp: emergencyCase.triggerTime,
            type: 'text',
            isSystemMessage: false,
            isEmergency: true,
            messageType: 'emergency_alert', // Track message type for public view
            isPublicMessage: true
        };

        // Add to main community only (public view)
        this.addMessage('city_central', basicEmergencyMessage);
    }

    simulateMultiUserEmergencyAlert(emergencyCase, emergencyConfig) {
        // Store the emergency in localStorage so other demo users can see it
        const pendingEmergencies = JSON.parse(localStorage.getItem('pendingEmergencies') || '[]');
        
        // Add this emergency to pending list with enhanced data - ONLY FOR REAL EMERGENCIES
        const emergencyData = {
            ...emergencyCase,
            triggerTime: emergencyCase.triggerTime.toISOString(),
            config: emergencyConfig,
            timestamp: Date.now(),
            status: 'Pending', // Track status
            triggerSource: 'chat', // Mark as chat-triggered (REAL emergency)
            broadcastTime: new Date().toISOString(),
            expiresAt: Date.now() + (15 * 60 * 1000), // Expire after 15 minutes
            isRealEmergency: true // Flag to identify real emergencies
        };
        
        pendingEmergencies.push(emergencyData);
        
        // Keep only real, recent emergencies and remove expired ones
        const now = Date.now();
        const validEmergencies = pendingEmergencies
            .filter(e => e.expiresAt > now && e.triggerSource === 'chat' && e.isRealEmergency)
            .slice(-10); // Keep only last 10
        
        localStorage.setItem('pendingEmergencies', JSON.stringify(validEmergencies));
        
        // Send automated follow-up messages from relevant authorities
        this.sendAutomatedFollowupMessages(emergencyCase, emergencyConfig);
        
        // Trigger immediate check for all active users (simulate real-time)
        this.triggerCrossUserNotifications(emergencyData);
        
        console.log('🚨 REAL Emergency broadcasted for cross-user demo:', {
            caseId: emergencyCase.caseId,
            type: emergencyCase.alertType,
            user: emergencyCase.userName,
            source: 'chat',
            totalPending: validEmergencies.length
        });
    }

    triggerCrossUserNotifications(emergencyData) {
        // Create a storage event to notify other tabs/sessions
        const notificationEvent = {
            type: 'NEW_EMERGENCY',
            emergency: emergencyData,
            timestamp: Date.now()
        };
        
        localStorage.setItem('crossUserNotification', JSON.stringify(notificationEvent));
        
        // Immediately remove it to trigger storage event
        localStorage.removeItem('crossUserNotification');
        
        console.log('📢 Triggered cross-user notifications for emergency:', emergencyData.caseId);
    }

    sendAutomatedFollowupMessages(emergencyCase, emergencyConfig) {
        // Define follow-up messages for different emergency types
        const followupMessages = {
            'Rape': {
                police: `🚔 Police Department: We have received your emergency alert. Officers are being dispatched immediately. Please stay safe and find a secure location. Help is on the way. Case ID: ${emergencyCase.caseId}`,
                community: `⚠️ Community Alert: Emergency situation reported in ${emergencyCase.location}. Community members nearby are requested to provide assistance if safe to do so.`
            },
            'Medical Help': {
                doctor: `⚕️ Medical Emergency Response: Medical alert received for ${emergencyCase.userName}. Medical team is being notified. Blood Type: ${emergencyCase.userBloodGroup}. Medical conditions noted: ${emergencyCase.medicalConditions.join(', ') || 'None'}. Stay calm, help is coming.`,
                community: `🏥 Medical Alert: Medical emergency in ${emergencyCase.location}. Anyone with medical training nearby please assist if possible.`
            },
            'Fire': {
                fire: `🔥 Fire Department: Fire emergency received at ${emergencyCase.location}. Fire trucks dispatched. Please evacuate the area immediately and stay at a safe distance. Emergency services ETA: 5-8 minutes.`,
                community: `🚨 Fire Alert: Fire emergency reported in ${emergencyCase.location}. Please avoid the area and assist with evacuation if needed.`
            },
            'Blood Needed': {
                doctor: `🩸 Blood Bank Alert: Urgent blood donation request received. Blood type needed: ${emergencyCase.userBloodGroup}. Medical facilities and donors are being contacted.`,
                community: `🩸 Blood Donation Alert: Urgent need for ${emergencyCase.userBloodGroup} blood type. If you are a compatible donor, please contact medical authorities immediately.`
            },
            'Missing Person': {
                police: `🔍 Missing Person Alert: Missing person report filed for ${emergencyCase.userName}. Search teams are being organized. Location: ${emergencyCase.location}. Please report any sightings to authorities.`,
                community: `🔍 Missing Person: ${emergencyCase.userName} reported missing from ${emergencyCase.location}. Community members requested to assist in search efforts.`
            },
            'Elderly Help': {
                community: `👴 Elder Care Alert: Senior citizen ${emergencyCase.userName} (${emergencyCase.userAge} years) needs assistance at ${emergencyCase.location}. Medical conditions: ${emergencyCase.medicalConditions.join(', ') || 'None'}. Volunteers please respond.`,
                medical: `⚕️ Senior Care: Elder emergency for ${emergencyCase.userName}. Age: ${emergencyCase.userAge}. Known conditions: ${emergencyCase.medicalConditions.join(', ') || 'None'}. Medical evaluation may be required.`
            },
            'Natural Disaster': {
                all: `🌪️ Disaster Response: Natural disaster emergency declared at ${emergencyCase.location}. All emergency services activated. Citizens please follow evacuation procedures and stay tuned to emergency broadcasts.`
            },
            'Emergency Fund': {
                community: `💰 Emergency Fund Request: Financial emergency assistance requested by ${emergencyCase.userName} at ${emergencyCase.location}. Community support and NGO assistance being coordinated.`
            }
        };

        const messages = followupMessages[emergencyCase.alertType];
        if (!messages) return;

        // Send follow-up messages with delay for realistic timing
        setTimeout(() => {
            Object.keys(messages).forEach((messageType, index) => {
                setTimeout(() => {
                    this.broadcastFollowupMessage(messages[messageType], emergencyCase, messageType);
                }, index * 1500); // 1.5 second delay between messages
            });
        }, 3000); // 3 seconds after emergency triggered
    }

    broadcastFollowupMessage(messageContent, emergencyCase, messageType) {
        const followupMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system_' + messageType,
            senderName: this.getFollowupSenderName(messageType, emergencyCase.alertType),
            content: messageContent,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: true,
            isFollowupMessage: true,
            isAuthorityResponse: true, // Mark as authority response for green styling
            isEmergency: true,
            emergencyType: emergencyCase.alertType
        };

        // Determine which communities should receive this message
        const targetCommunities = this.getTargetCommunitiesForFollowup(messageType, emergencyCase);
        
        targetCommunities.forEach(communityId => {
            this.addMessage(communityId, followupMessage);
        });
    }

    getFollowupSenderName(messageType, alertType) {
        const senderNames = {
            'police': 'Emergency Dispatch - Police',
            'doctor': 'Medical Emergency Services',
            'fire': 'Fire Department Control',
            'medical': 'Medical Response Team', 
            'community': 'Community Emergency Coordinator',
            'all': 'Emergency Management Authority'
        };
        return senderNames[messageType] || 'Emergency Services';
    }

    getTargetCommunitiesForFollowup(messageType, emergencyCase) {
        // Determine which communities should receive followup messages
        const communities = [];
        
        if (messageType === 'police' || messageType === 'all') {
            communities.push('police_community');
        }
        if (messageType === 'doctor' || messageType === 'medical' || messageType === 'all') {
            communities.push('doctors_community');
        }
        if (messageType === 'fire' || messageType === 'all') {
            communities.push('fire_response_team');
        }
        if (messageType === 'community' || messageType === 'all') {
            // Add user's own communities
            const emergencyUser = this.users.find(u => u.id === emergencyCase.userId);
            if (emergencyUser && emergencyUser.communities) {
                communities.push(...emergencyUser.communities);
            }
        }

        return [...new Set(communities)]; // Remove duplicates
    }

    checkForPendingEmergencies() {
        console.log('🔍 Checking for REAL pending emergencies for:', this.currentUser.name);
        const pendingEmergencies = JSON.parse(localStorage.getItem('pendingEmergencies') || '[]');
        
        // Filter out old, fake, or invalid emergencies
        const validEmergencies = pendingEmergencies.filter(emergency => {
            const now = Date.now();
            const emergencyAge = now - emergency.timestamp;
            const maxAge = 5 * 60 * 1000; // 5 minutes max age
            
            // Only show emergencies that are:
            // 1. Recent (within 5 minutes)
            // 2. From a real user (has userId and userName)
            // 3. Still pending
            // 4. Triggered by chat command (has triggerSource)
            return (
                emergency.timestamp && 
                emergencyAge < maxAge &&
                emergency.userId && 
                emergency.userName &&
                emergency.status === 'Pending' &&
                emergency.triggerSource === 'chat' // Only chat-triggered emergencies
            );
        });
        
        console.log('📋 Found valid real emergencies:', validEmergencies.length);
        
        let relevantEmergencies = [];
        
        validEmergencies.forEach((emergency, index) => {
            // Only show emergencies from other users
            if (emergency.userId !== this.currentUser.id) {
                // Check if this user should receive this emergency
                const shouldReceive = this.shouldReceiveEmergency(emergency);
                
                console.log(`🎯 Real Emergency ${emergency.caseId}: Should receive = ${shouldReceive}`);
                
                if (shouldReceive) {
                    relevantEmergencies.push(emergency);
                }
            }
        });

        // Show relevant emergencies with staggered timing
        relevantEmergencies.forEach((emergency, index) => {
            setTimeout(() => {
                console.log('🚨 Showing REAL emergency popup for:', emergency.caseId);
                this.showCrossUserEmergencyPopup(emergency);
            }, (index + 1) * 1500); // 1.5 second delay between alerts
        });

        if (relevantEmergencies.length === 0) {
            console.log('✅ No relevant REAL emergencies found for current user');
        } else {
            console.log(`🚨 Will show ${relevantEmergencies.length} REAL emergency alerts`);
        }
    }

    shouldReceiveEmergency(emergency) {
        console.log('🤔 Checking if user should receive emergency:', {
            currentUser: this.currentUser.name,
            currentRole: this.currentUser.role,
            emergencyType: emergency.alertType,
            emergencyUser: emergency.userName
        });

        // Check if current user is appropriate responder
        if (this.currentUser.role === 'Responder') {
            const responderTypes = emergency.config.responderTypes || [];
            const shouldReceive = responderTypes.includes(this.currentUser.responderType);
            console.log(`👮 Responder check: ${shouldReceive} (types: ${responderTypes.join(', ')})`);
            return shouldReceive;
        }
        
        // Community members in same area should also receive alerts
        if (this.currentUser.role === 'Member' || this.currentUser.role === 'Elder') {
            // Check if they're in same community area
            const userCommunities = this.currentUser.communities || [];
            const emergencyUser = this.users.find(u => u.id === emergency.userId);
            const emergencyUserCommunities = emergencyUser?.communities || [];
            
            console.log('🏘️ Community check:', {
                userCommunities,
                emergencyUserCommunities
            });
            
            // Find common communities
            const hasCommonCommunity = userCommunities.some(community => 
                emergencyUserCommunities.includes(community)
            );
            
            // Also check if they're in nearby areas (same zone)
            const sameZone = this.currentUser.zone === emergencyUser?.zone;
            
            const shouldReceive = hasCommonCommunity || sameZone;
            console.log(`🏘️ Community/Zone check: ${shouldReceive} (common: ${hasCommonCommunity}, same zone: ${sameZone})`);
            return shouldReceive;
        }
        
        console.log('❌ User does not meet criteria to receive emergency');
        return false;
    }

    showCrossUserEmergencyPopup(emergencyData) {
        console.log('Showing cross-user emergency popup:', emergencyData.alertType);
        
        const popup = document.getElementById('emergencyPopup');
        if (!popup) return;
        
        // Reset popup state
        document.querySelector('.popup-actions').classList.remove('hidden');
        document.getElementById('etaInput').classList.add('hidden');
        
        // For rape cases, show anonymous initially
        const isAnonymous = emergencyData.isAnonymous && !emergencyData.acceptedBy;
        
        document.getElementById('emergencyTitle').textContent = 
            `${emergencyData.alertType.toUpperCase()} EMERGENCY`;
        document.getElementById('emergencyType').textContent = emergencyData.alertType;
        
        // Set user information (anonymous for rape cases)
        if (isAnonymous) {
            document.getElementById('alertUser').textContent = 'Anonymous User';
            document.getElementById('alertUserDetails').textContent = 'Details will be revealed after acceptance';
            document.getElementById('alertUserAvatar').src = 'https://i.pravatar.cc/150?img=50';
            document.getElementById('profileName').textContent = 'Anonymous';
            document.getElementById('profileBloodGroup').textContent = 'Hidden';
            document.getElementById('profileConditions').textContent = 'Hidden for privacy';
        } else {
            document.getElementById('alertUser').textContent = emergencyData.userName;
            document.getElementById('alertUserDetails').textContent = 
                `${emergencyData.userAge} years, ${emergencyData.userGender}, ${emergencyData.userBloodGroup}`;
            document.getElementById('alertUserAvatar').src = emergencyData.userAvatar;
            document.getElementById('profileName').textContent = emergencyData.userName;
            document.getElementById('profileBloodGroup').textContent = emergencyData.userBloodGroup;
            document.getElementById('profileConditions').textContent = 
                emergencyData.medicalConditions.length > 0 ? emergencyData.medicalConditions.join(', ') : 'None';
        }
        
        document.getElementById('alertLocation').textContent = emergencyData.location;
        document.getElementById('alertDistance').textContent = this.calculateDistance(emergencyData.coordinates);
        document.getElementById('alertTime').textContent = this.formatTime(emergencyData.triggerTime);
        
        popup.classList.remove('hidden');
        popup.dataset.caseId = emergencyData.caseId;
        popup.dataset.emergencyData = JSON.stringify(emergencyData);
        
        // Play emergency sound
        this.playSound('emergencyAlert');
        
        // Show notification
        this.showNotification(
            'Emergency Alert Received!',
            `${emergencyData.alertType} emergency from ${isAnonymous ? 'Anonymous User' : emergencyData.userName}`,
            'error'
        );
        
        // Auto-close popup after 30 seconds if no response
        setTimeout(() => {
            if (!popup.classList.contains('hidden')) {
                this.declineEmergency();
            }
        }, 30000);
    }

    calculateDistance(coordinates) {
        if (!coordinates || !this.currentUser.location?.coordinates) {
            return 'Unknown distance';
        }
        
        // Simple distance calculation (not accurate, for demo only)
        const lat1 = this.currentUser.location.coordinates.lat;
        const lng1 = this.currentUser.location.coordinates.lng;
        const lat2 = coordinates.lat;
        const lng2 = coordinates.lng;
        
        const distance = Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lng2 - lng1, 2)) * 111; // Rough km conversion
        return distance < 1 ? `${Math.round(distance * 1000)}m away` : `${distance.toFixed(1)}km away`;
    }

    showEmergencyPopup(emergencyCase, emergencyConfig) {
        console.log('Showing emergency popup for:', emergencyCase.alertType);
        
        // Check if current user is a responder for this type of emergency
        const isResponder = this.currentUser.role === 'Responder' && 
            (emergencyConfig.responderTypes.includes(this.currentUser.responderType) ||
             emergencyConfig.responderTypes.includes(this.currentUser.role));

        if (!isResponder) {
            // Show confirmation for regular users
            this.showNotification(
                'Emergency Alert Sent',
                `${emergencyConfig.alertType} alert has been sent to nearby responders`,
                'warning'
            );
            return;
        }

        const popup = document.getElementById('emergencyPopup');
        if (!popup) return;
        
        // Reset popup state
        document.querySelector('.popup-actions').classList.remove('hidden');
        document.getElementById('etaInput').classList.add('hidden');
        
        const emergencyUser = this.users.find(u => u.id === emergencyCase.userId);
        
        document.getElementById('emergencyTitle').textContent = `${emergencyConfig.alertType.toUpperCase()} EMERGENCY`;
        document.getElementById('emergencyType').textContent = emergencyConfig.alertType;
        
        document.getElementById('alertUser').textContent = emergencyCase.userName;
        document.getElementById('alertUserDetails').textContent = 
            `${emergencyUser.age} years, ${emergencyUser.bloodGroup}, ${emergencyUser.medicalConditions.join(', ') || 'No medical conditions'}`;
        
        document.getElementById('alertLocation').textContent = emergencyCase.location;
        document.getElementById('alertDistance').textContent = '0.5 km away';
        
        document.getElementById('alertTime').textContent = this.formatTime(emergencyCase.triggerTime);
        
        document.getElementById('alertUserAvatar').src = emergencyUser.avatar;
        document.getElementById('profileName').textContent = emergencyCase.userName;
        document.getElementById('profileBloodGroup').textContent = emergencyUser.bloodGroup;
        document.getElementById('profileConditions').textContent = emergencyUser.medicalConditions.join(', ') || 'None';

        popup.classList.remove('hidden');
        popup.dataset.caseId = emergencyCase.caseId;

        // Auto-close popup after 30 seconds if no response
        setTimeout(() => {
            if (!popup.classList.contains('hidden')) {
                this.declineEmergency();
            }
        }, 30000);
    }

    acceptEmergency() {
        const popup = document.getElementById('emergencyPopup');
        const caseId = popup.dataset.caseId;
        const emergencyDataStr = popup.dataset.emergencyData;
        console.log('Accepting emergency:', caseId);

        // Parse emergency data if available
        let emergencyData = null;
        if (emergencyDataStr) {
            try {
                emergencyData = JSON.parse(emergencyDataStr);
            } catch (e) {
                console.error('Failed to parse emergency data:', e);
            }
        }

        // For anonymous cases (rape), reveal details after acceptance
        if (emergencyData && emergencyData.isAnonymous) {
            this.revealAnonymousDetails(emergencyData);
        }

        // Show ETA input
        document.querySelector('.popup-actions').classList.add('hidden');
        document.getElementById('etaInput').classList.remove('hidden');
        
        // Focus on ETA input
        setTimeout(() => {
            document.getElementById('responseEta').focus();
        }, 100);
    }

    revealAnonymousDetails(emergencyData) {
        // Update popup with actual user details
        document.getElementById('alertUser').textContent = emergencyData.userName;
        document.getElementById('alertUserDetails').textContent = 
            `${emergencyData.userAge} years, ${emergencyData.userGender}, ${emergencyData.userBloodGroup}`;
        document.getElementById('alertUserAvatar').src = emergencyData.userAvatar;
        document.getElementById('profileName').textContent = emergencyData.userName;
        document.getElementById('profileBloodGroup').textContent = emergencyData.userBloodGroup;
        document.getElementById('profileConditions').textContent = 
            emergencyData.medicalConditions.length > 0 ? emergencyData.medicalConditions.join(', ') : 'None';
        
        // Show notification about details being revealed
        this.showNotification(
            'Details Revealed',
            'User details are now visible after accepting the emergency',
            'info'
        );
        
        // Mark as accepted in localStorage
        const pendingEmergencies = JSON.parse(localStorage.getItem('pendingEmergencies') || '[]');
        const emergencyIndex = pendingEmergencies.findIndex(e => e.caseId === emergencyData.caseId);
        if (emergencyIndex !== -1) {
            pendingEmergencies[emergencyIndex].acceptedBy = this.currentUser.id;
            pendingEmergencies[emergencyIndex].isAnonymous = false;
            localStorage.setItem('pendingEmergencies', JSON.stringify(pendingEmergencies));
        }
    }

    declineEmergency() {
        const popup = document.getElementById('emergencyPopup');
        popup.classList.add('hidden');
        
        this.showNotification('Emergency Declined', 'You have declined to respond to this emergency', 'warning');
    }

    confirmEmergencyResponse() {
        const popup = document.getElementById('emergencyPopup');
        const caseId = popup.dataset.caseId;
        const etaInput = document.getElementById('responseEta');
        const eta = etaInput.value || '5';
        const emergencyDataStr = popup.dataset.emergencyData;

        console.log('Confirming emergency response:', caseId, 'ETA:', eta);

        // Parse emergency data
        let emergencyData = null;
        if (emergencyDataStr) {
            try {
                emergencyData = JSON.parse(emergencyDataStr);
            } catch (e) {
                console.error('Failed to parse emergency data:', e);
            }
        }

        const emergencyCase = this.emergencyCases.find(c => c.caseId === caseId) || emergencyData;
        if (!emergencyCase) return;

        // Update case with responder info
        const responderInfo = {
            id: this.currentUser.id,
            name: this.currentUser.name,
            role: this.currentUser.role,
            responderType: this.currentUser.responderType,
            phone: this.currentUser.phone,
            badgeNumber: this.currentUser.badgeNumber || this.currentUser.vehicleNumber,
            acceptTime: new Date(),
            eta: `${eta} min`,
            arrivalTime: null
        };

        if (emergencyCase.responder) {
            Object.assign(emergencyCase.responder, responderInfo);
        } else {
            emergencyCase.responder = responderInfo;
        }
        emergencyCase.status = 'In Progress';
        emergencyCase.acceptedBy = this.currentUser.id;

        // Calculate distance
        const distance = this.calculateDistance();
        
        // UNLOCK SPECIFIC AUTHORITY COMMUNITY based on emergency type
        this.unlockSpecificAuthorityCommunityCommunity(emergencyCase, responderInfo);

        // Share comprehensive case details with SPECIFIC authority community (detailed coordination)
        this.shareComprehensiveCaseDetailsWithSpecificAuthorityCommunityCommunity(emergencyCase, responderInfo, distance);
        
        // Send helper details to victim's AI chat
        this.sendHelperDetailsToVictimAI(emergencyCase, responderInfo, eta);

        // Update localStorage for cross-user demo
        this.updateEmergencyInStorage(emergencyCase);

        popup.classList.add('hidden');

        this.showNotification(
            'Emergency Accepted',
            `You are responding to ${emergencyCase.alertType} emergency. ETA: ${eta} minutes. Authority coordination unlocked.`,
            'success'
        );
        
        // Activate AI Assistant for responder with fire agent mode
        if (emergencyCase.alertType === 'Fire') {
            this.activateResponderAIAssistant(emergencyCase, responderInfo);
        }

        // Dispatch AI event for emergency acceptance
        document.dispatchEvent(new CustomEvent('emergencyAccepted', {
            detail: {
                emergencyId: caseId,
                responder: responderInfo,
                eta: eta,
                communityId: emergencyCase.alertType.toLowerCase() + '_emergency',
                emergencyType: emergencyCase.alertType.toLowerCase()
            }
        }));

        // Simulate arrival after a shorter time for demo
        setTimeout(() => {
            this.simulateArrival(emergencyCase);
        }, Math.min(parseInt(eta) * 1000, 10000)); // Max 10 seconds for demo
    }
    
    // Send helper details to victim's AI chat
    sendHelperDetailsToVictimAI(emergencyCase, responderInfo, eta) {
        // Find victim user and check if they have AI chat active
        const victimUser = this.users.find(u => u.id === emergencyCase.userId);
        if (!victimUser) return;
        
        // For demo purposes, we'll simulate adding message to victim's AI chat
        // In real app, this would be sent through real-time communication
        
        console.log(`📱 Sending helper details to victim ${victimUser.name} AI chat`);
        
        // Simulate helper acceptance notification in victim's AI chat
        setTimeout(() => {
            this.addHelperAcceptanceToAIChat(emergencyCase, responderInfo, eta);
        }, 2000);
    }
    
    // Add helper acceptance message to AI chat
    addHelperAcceptanceToAIChat(emergencyCase, responderInfo, eta) {
        const helperMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'helper-system',
            senderName: '🆘 Helper Response Team',
            content: `✅ HELPER ACCEPTED YOUR EMERGENCY!

👨‍🚒 **Helper Details:**
• Name: ${responderInfo.name}
• Type: ${responderInfo.responderType || responderInfo.role}
• ETA: ${eta} minutes
• Badge/ID: ${responderInfo.badgeNumber || 'Helper ID: ' + responderInfo.id.slice(-4)}

📞 **Next Steps:**
• Helper is en route to your location
• Communicate with helper in Fire Authority chat
• Continue getting safety guidance here

💙 **You're not alone - help is coming!**`,
            timestamp: new Date(),
            type: 'helper_acceptance',
            isSystemMessage: true
        };

        // Add to current AI chat if it exists
        if (this.chats['ai-assistant']) {
            this.chats['ai-assistant'].messages.push(helperMessage);
            
            // Re-render if AI chat is currently active
            if (this.activeCommunity === 'ai-assistant') {
                this.renderAIMessages();
                this.playSound('messageReceived');
            }
        }
    }

    // Unlock SPECIFIC authority community based on emergency type
    unlockSpecificAuthorityCommunityCommunity(emergencyCase, responderInfo) {
        const authorityCommunityId = this.getAuthorityCommunityIdByEmergencyType(emergencyCase.alertType);
        const authorityCommunity = this.communities.authority_communities.find(c => c.id === authorityCommunityId);
        
        if (authorityCommunity) {
            // Unlock the specific authority community
            authorityCommunity.isLocked = false;
            
            // Grant access to victim, helper, and relevant authorities
            authorityCommunity.allowedUsers = [
                emergencyCase.userId, // Victim
                responderInfo.id, // Helper
                ...this.getSpecificAuthorityUserIds(emergencyCase.alertType) // Relevant authorities
            ];
            
            // Update member count
            authorityCommunity.memberCount = authorityCommunity.allowedUsers.length;
            
            // Initialize chat if not exists
            if (!this.chats[authorityCommunityId]) {
                this.chats[authorityCommunityId] = { messages: [], unreadCount: 0 };
            }
            
            // Add initial coordination message
            const initialMessage = {
                id: 'msg_' + this.messageIdCounter++,
                senderId: 'system',
                senderName: `${this.getAuthorityTypeDisplayName(emergencyCase.alertType)} Emergency Coordination`,
                content: `🚨 ${emergencyCase.alertType.toUpperCase()} AUTHORITY COORDINATION ACTIVATED\n\n` +
                        `📋 Emergency Case: ${emergencyCase.caseId}\n` +
                        `📍 Location: ${emergencyCase.location}\n` +
                        `⏰ Triggered: ${this.formatTime(emergencyCase.triggerTime)}\n\n` +
                        `👥 COORDINATION PARTICIPANTS:\n` +
                        `👤 Victim: ${emergencyCase.userName}\n` +
                        `🆘 Helper: ${responderInfo.name} (${responderInfo.responderType || responderInfo.role})\n` +
                        `🚔 Authority: ${this.getAuthorityTypeDisplayName(emergencyCase.alertType)} Department\n\n` +
                        `� This secure channel contains detailed coordination information for this ${emergencyCase.alertType} emergency response.`,
                timestamp: new Date(),
                type: 'text',
                isSystemMessage: true,
                isAuthorityCoordination: true,
                emergencyType: emergencyCase.alertType
            };
            
            this.chats[authorityCommunityId].messages.push(initialMessage);
            
            // Re-render communities to show unlocked authority community
            this.renderAuthorityCommunitiesList();
            
            console.log(`🔓 ${emergencyCase.alertType} authority community unlocked for emergency coordination`);
        }
    }

    // Get authority community ID based on emergency type
    getAuthorityCommunityIdByEmergencyType(emergencyType) {
        const emergencyToAuthority = {
            'Rape': 'police_authority',
            'Missing Person': 'police_authority', 
            'Crime': 'police_authority',
            'Medical Help': 'medical_authority',
            'Blood Needed': 'medical_authority',
            'Doctor': 'medical_authority',
            'Fire': 'fire_authority',
            'Accident': 'fire_authority',
            'Natural Disaster': 'disaster_authority',
            'Disaster': 'disaster_authority',
            'Elderly Help': 'medical_authority',
            'Emergency Fund': 'disaster_authority'
        };
        
        return emergencyToAuthority[emergencyType] || 'police_authority';
    }

    // Get authority type display name
    getAuthorityTypeDisplayName(emergencyType) {
        const emergencyToAuthorityName = {
            'Rape': 'Police',
            'Missing Person': 'Police',
            'Crime': 'Police', 
            'Medical Help': 'Medical',
            'Blood Needed': 'Medical',
            'Doctor': 'Medical',
            'Fire': 'Fire Department',
            'Accident': 'Fire Department',
            'Natural Disaster': 'Disaster Management',
            'Disaster': 'Disaster Management',
            'Elderly Help': 'Medical',
            'Emergency Fund': 'Community Support'
        };
        
        return emergencyToAuthorityName[emergencyType] || 'Emergency';
    }

    // Get specific authority user IDs based on emergency type
    getSpecificAuthorityUserIds(emergencyType) {
        const authorityIds = [];
        
        switch (emergencyType) {
            case 'Rape':
            case 'Missing Person':
            case 'Crime':
                const policeOfficer = this.users.find(u => u.responderType === 'Police');
                if (policeOfficer) authorityIds.push(policeOfficer.id);
                break;
                
            case 'Medical Help':
            case 'Blood Needed': 
            case 'Doctor':
            case 'Elderly Help':
                const doctor = this.users.find(u => u.responderType === 'Doctor');
                if (doctor) authorityIds.push(doctor.id);
                break;
                
            case 'Fire':
            case 'Accident':
                const fireOfficer = this.users.find(u => u.responderType === 'Fire');
                if (fireOfficer) authorityIds.push(fireOfficer.id);
                break;
                
            case 'Natural Disaster':
            case 'Disaster':
            case 'Emergency Fund':
                // Add multiple responder types for disasters
                const responders = this.users.filter(u => 
                    u.responderType === 'Police' || 
                    u.responderType === 'Fire' || 
                    u.responderType === 'Doctor'
                );
                authorityIds.push(...responders.map(r => r.id));
                break;
        }
        
        return [...new Set(authorityIds)]; // Remove duplicates
    }

    // Share comprehensive details with SPECIFIC authority community
    shareComprehensiveCaseDetailsWithSpecificAuthorityCommunityCommunity(emergencyCase, responderInfo, distance) {
        const authorityCommunityId = this.getAuthorityCommunityIdByEmergencyType(emergencyCase.alertType);
        const authorityName = this.getAuthorityTypeDisplayName(emergencyCase.alertType);
        
        const victimProfile = this.users.find(u => u.id === emergencyCase.userId) || {
            name: emergencyCase.userName,
            phone: emergencyCase.userPhone,
            bloodGroup: emergencyCase.userBloodGroup,
            age: emergencyCase.userAge,
            medicalConditions: emergencyCase.medicalConditions
        };

        const comprehensiveMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system',
            senderName: `${authorityName} Emergency Coordination Center`,
            content: `🚨 DETAILED ${emergencyCase.alertType.toUpperCase()} EMERGENCY CASE\n\n` +
                    `📋 CASE INFORMATION:\n` +
                    `Case ID: ${emergencyCase.caseId}\n` +
                    `Emergency Type: ${emergencyCase.alertType}\n` +
                    `Location: ${emergencyCase.location}\n` +
                    `Time Reported: ${new Date(emergencyCase.triggerTime).toLocaleString()}\n` +
                    `Authority Type: ${authorityName} Department\n\n` +
                    
                    `👤 VICTIM DETAILS:\n` +
                    `Name: ${victimProfile.name}\n` +
                    `Phone: ${victimProfile.phone}\n` +
                    `Age: ${victimProfile.age || 'N/A'}\n` +
                    `Blood Group: ${victimProfile.bloodGroup || 'Unknown'}\n` +
                    `Medical Conditions: ${(victimProfile.medicalConditions || []).join(', ') || 'None reported'}\n` +
                    `Emergency Contacts: ${emergencyCase.emergencyContacts ? emergencyCase.emergencyContacts.map(c => `${c.name} (${c.phone})`).join(', ') : 'Not provided'}\n\n` +
                    
                    `🤝 RESPONDER/HELPER DETAILS:\n` +
                    `Helper Name: ${responderInfo.name}\n` +
                    `Helper Type: ${responderInfo.responderType || responderInfo.role}\n` +
                    `Helper Phone: ${responderInfo.phone}\n` +
                    `Helper ID: ${responderInfo.badgeNumber || responderInfo.vehicleNumber || 'Civilian Helper'}\n` +
                    `Distance to Victim: ${distance} km\n` +
                    `ETA: ${responderInfo.eta}\n` +
                    `Status: Responding to Emergency\n\n` +
                    
                    `⚠️ ${authorityName.toUpperCase()} COORDINATION STATUS:\n` +
                    `• Helper assigned and en route to victim\n` +
                    `• ${authorityName} authorities notified and coordinating\n` +
                    `• Real-time updates will be provided in this channel\n` +
                    `• All parties maintain communication until resolution\n\n` +
                    
                    `🔒 This information is confidential and for ${authorityName} coordination only.`,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: true,
            isAuthorityCoordination: true,
            emergencyType: emergencyCase.alertType
        };

        // Add to specific authority community
        if (this.chats[authorityCommunityId]) {
            this.chats[authorityCommunityId].messages.push(comprehensiveMessage);
        }
    }

    // Notify appropriate authorities based on emergency type with helper details
    notifyAppropriateAuthorities(emergencyCase, responderInfo) {
        const helperDetails = `🤝 HELPER RESPONDED TO EMERGENCY\n\n` +
                            `Emergency: ${emergencyCase.alertType}\n` +
                            `Location: ${emergencyCase.location}\n\n` +
                            `👤 Victim: ${emergencyCase.userName}\n` +
                            `📞 Victim Contact: ${emergencyCase.userPhone}\n\n` +
                            `🆘 Helper: ${responderInfo.name}\n` +
                            `📞 Helper Contact: ${responderInfo.phone}\n` +
                            `📏 Distance: ${this.calculateDistance()} km\n` +
                            `⏱️ ETA: ${responderInfo.eta}\n\n` +
                            `✅ Authorities have been notified for follow-up\n` +
                            `🙏 Community members may provide additional support if needed`;

        // Determine which authorities to notify based on emergency type
        const authoritiesToNotify = this.getAppropriateAuthorities(emergencyCase.alertType);

        authoritiesToNotify.forEach(authority => {
            this.sendHelperDetailsToAuthority(authority, emergencyCase, responderInfo, helperDetails);
        });

        // Also notify emergency contacts and share with communities
        this.notifyEmergencyContactsAboutResponse(emergencyCase);
        this.shareResponderProfileWithCommunities(emergencyCase, responderInfo);
    }

    // Get appropriate authorities based on emergency type
    getAppropriateAuthorities(emergencyType) {
        const authorities = [];

        switch (emergencyType) {
            case 'Rape':
                authorities.push('police', 'medical');
                break;
            case 'Medical Help':
            case 'Medical Emergency':
                authorities.push('medical', 'police');
                break;
            case 'Blood Needed':
                authorities.push('medical', 'blood_bank');
                break;
            case 'Fire':
            case 'Fire Emergency':
                authorities.push('fire', 'police');
                break;
            case 'Missing Person':
                authorities.push('police', 'community');
                break;
            case 'Elderly Help':
                authorities.push('medical', 'community');
                break;
            default:
                authorities.push('police'); // Default to police for unknown types
        }

        return authorities;
    }

    // Send helper details to specific authority
    sendHelperDetailsToAuthority(authorityType, emergencyCase, responderInfo, helperDetails) {
        const authorityMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system',
            senderName: this.getAuthorityName(authorityType),
            content: `🚨 ${this.getAuthorityTitle(authorityType)} - HELPER COORDINATION\n\n${helperDetails}\n\n` +
                    `⚠️ IMMEDIATE ACTION REQUIRED:\n` +
                    `• Contact helper for coordination: ${responderInfo.phone}\n` +
                    `• Provide backup support\n` +
                    `• Monitor situation until resolution\n` +
                    `• Prepare for helper arrival in ${responderInfo.eta}\n\n` +
                    `🔒 This is a REAL emergency - Helper en route to victim location.`,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: true,
            isAuthorityResponse: true, // Green styling
            emergencyType: emergencyCase.alertType,
            caseId: emergencyCase.caseId
        };

        // Send to appropriate authority community
        const authorityCommunityId = this.getAuthorityCommunityId(authorityType);
        if (authorityCommunityId) {
            if (!this.chats[authorityCommunityId]) {
                this.chats[authorityCommunityId] = { messages: [], unreadCount: 0 };
            }
            this.chats[authorityCommunityId].messages.push(authorityMessage);
            
            console.log(`📢 Helper details sent to ${authorityType} authority for case:`, emergencyCase.caseId);
        }
    }

    // Get authority display names
    getAuthorityName(authorityType) {
        const names = {
            'police': 'Police Emergency Dispatch',
            'medical': 'Medical Emergency Services',
            'fire': 'Fire Department Control',
            'blood_bank': 'Blood Bank Emergency',
            'community': 'Community Coordination'
        };
        return names[authorityType] || 'Emergency Authority';
    }

    getAuthorityTitle(authorityType) {
        const titles = {
            'police': 'POLICE COORDINATION',
            'medical': 'MEDICAL COORDINATION', 
            'fire': 'FIRE DEPARTMENT COORDINATION',
            'blood_bank': 'BLOOD BANK COORDINATION',
            'community': 'COMMUNITY COORDINATION'
        };
        return titles[authorityType] || 'AUTHORITY COORDINATION';
    }

    getAuthorityCommunityId(authorityType) {
        const communityIds = {
            'police': 'police_community',
            'medical': 'medical_community',
            'fire': 'fire_community',
            'blood_bank': 'medical_community', // Use medical community for blood bank
            'community': 'city_central' // Use main community
        };
        return communityIds[authorityType];
    }

    notifyPoliceForFollowup(emergencyCase, responderInfo) {
        // Create police follow-up message with comprehensive details
        const policeNotification = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system',
            senderName: 'Emergency Coordination Center',
            content: `🚔 POLICE FOLLOW-UP REQUIRED - HELPER ACCEPTED EMERGENCY\n\n` +
                    `📋 CASE DETAILS:\n` +
                    `Case ID: ${emergencyCase.caseId}\n` +
                    `Emergency Type: ${emergencyCase.alertType}\n` +
                    `Location: ${emergencyCase.location}\n` +
                    `Reported Time: ${new Date(emergencyCase.triggerTime).toLocaleString()}\n\n` +
                    
                    `👤 VICTIM INFORMATION:\n` +
                    `Name: ${emergencyCase.userName}\n` +
                    `Phone: ${emergencyCase.userPhone}\n` +
                    `Age: ${emergencyCase.userAge || 'Unknown'}\n` +
                    `Blood Group: ${emergencyCase.userBloodGroup || 'Unknown'}\n\n` +
                    
                    `🤝 HELPER/RESPONDER DETAILS:\n` +
                    `Helper: ${responderInfo.name}\n` +
                    `Type: ${responderInfo.responderType || responderInfo.role}\n` +
                    `Phone: ${responderInfo.phone}\n` +
                    `ID/Badge: ${responderInfo.badgeNumber || responderInfo.vehicleNumber || 'Civilian'}\n` +
                    `ETA: ${responderInfo.eta}\n` +
                    `Status: En Route to Emergency\n\n` +
                    
                    `⚠️ ACTION REQUIRED:\n` +
                    `• Contact helper for coordination: ${responderInfo.phone}\n` +
                    `• Verify victim safety\n` +
                    `• Provide official police backup\n` +
                    `• Document case properly\n\n` +
                    
                    `🔒 This is a REAL emergency triggered by user in chat.`,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: true,
            isEmergency: true,
            isPoliceNotification: true,
            isAuthorityResponse: true // Green styling for authority messages
        };

        // Find police community and add message
        const policeCommunity = this.communities.emergency_communities.find(c => c.id === 'police_community');
        if (policeCommunity) {
            if (!this.chats['police_community']) {
                this.chats['police_community'] = { messages: [], unreadCount: 0 };
            }
            this.chats['police_community'].messages.push(policeNotification);
        }

        console.log('Police notified for follow-up:', emergencyCase.caseId);
    }

    updateEmergencyInStorage(emergencyCase) {
        const pendingEmergencies = JSON.parse(localStorage.getItem('pendingEmergencies') || '[]');
        const emergencyIndex = pendingEmergencies.findIndex(e => e.caseId === emergencyCase.caseId);
        
        if (emergencyIndex !== -1) {
            pendingEmergencies[emergencyIndex] = {
                ...pendingEmergencies[emergencyIndex],
                status: 'In Progress',
                acceptedBy: this.currentUser.id,
                responder: emergencyCase.responder
            };
            localStorage.setItem('pendingEmergencies', JSON.stringify(pendingEmergencies));
        }
    }

    // Share comprehensive case details with authorities (victim + helper information)
    shareComprehensiveCaseDetailsWithAuthorities(emergencyCase, responderInfo, distance) {
        const victimProfile = this.users.find(u => u.id === emergencyCase.userId) || {
            name: emergencyCase.userName,
            phone: emergencyCase.userPhone,
            bloodGroup: emergencyCase.userBloodGroup,
            age: emergencyCase.userAge,
            medicalConditions: emergencyCase.medicalConditions
        };

        const comprehensiveMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system',
            senderName: 'Emergency Coordination Center',
            content: `🚨 COMPREHENSIVE EMERGENCY CASE DETAILS\n\n` +
                    `📋 CASE INFORMATION:\n` +
                    `Case ID: ${emergencyCase.caseId}\n` +
                    `Emergency Type: ${emergencyCase.alertType}\n` +
                    `Location: ${emergencyCase.location}\n` +
                    `Time Reported: ${new Date(emergencyCase.timestamp).toLocaleString()}\n\n` +
                    
                    `👤 VICTIM DETAILS:\n` +
                    `Name: ${victimProfile.name}\n` +
                    `Phone: ${victimProfile.phone}\n` +
                    `Age: ${victimProfile.age || 'N/A'}\n` +
                    `Blood Group: ${victimProfile.bloodGroup || 'Unknown'}\n` +
                    `Medical Conditions: ${(victimProfile.medicalConditions || []).join(', ') || 'None reported'}\n` +
                    `Emergency Contacts: ${emergencyCase.emergencyContacts ? emergencyCase.emergencyContacts.map(c => `${c.name} (${c.phone})`).join(', ') : 'Not provided'}\n\n` +
                    
                    `🤝 RESPONDER/HELPER DETAILS:\n` +
                    `Helper Name: ${responderInfo.name}\n` +
                    `Helper Type: ${responderInfo.responderType || responderInfo.role}\n` +
                    `Helper Phone: ${responderInfo.phone}\n` +
                    `Helper ID: ${responderInfo.badgeNumber || responderInfo.vehicleNumber || 'Civilian Helper'}\n` +
                    `Distance to Victim: ${distance} km\n` +
                    `ETA: ${responderInfo.eta}\n` +
                    `Status: Responding to Emergency\n\n` +
                    
                    `⚠️ CASE STATUS: HELPER ASSIGNED - POLICE FOLLOW-UP REQUIRED\n` +
                    `🔒 This information is confidential and for official use only.`,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: true,
            isAuthorityResponse: true // Green styling for authority coordination
        };

        // Share with all emergency authorities
        this.shareWithEmergencyAuthorities(comprehensiveMessage, emergencyCase.alertType);

        // Also create a community notification (yellow) about the helper acceptance
        const communityNotification = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system',
            senderName: 'Community Emergency Coordinator',
            content: `🤝 HELPER RESPONDED TO EMERGENCY\n\n` +
                    `Emergency: ${emergencyCase.alertType}\n` +
                    `Location: ${emergencyCase.location}\n\n` +
                    `👤 Victim: ${victimProfile.name}\n` +
                    `📞 Victim Contact: ${victimProfile.phone}\n\n` +
                    `🆘 Helper: ${responderInfo.name}\n` +
                    `📞 Helper Contact: ${responderInfo.phone}\n` +
                    `📏 Distance: ${distance} km\n` +
                    `⏱️ ETA: ${responderInfo.eta}\n\n` +
                    `✅ Authorities have been notified for follow-up\n` +
                    `🙏 Community members may provide additional support if needed`,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: true,
            isHelperResponse: true // Yellow styling for helper coordination
        };

        // Add to main communities for awareness
        this.addMessageToMainCommunities(communityNotification);
    }

    // Share message with emergency authorities
    shareWithEmergencyAuthorities(message, emergencyType) {
        // Always share with police
        if (!this.chats['police_community']) {
            this.chats['police_community'] = { messages: [], unreadCount: 0 };
        }
        this.chats['police_community'].messages.push(message);

        // Share with medical if medical emergency
        if (emergencyType === 'Medical Help' || emergencyType === 'Blood Needed' || emergencyType.includes('Medical')) {
            if (!this.chats['medical_community']) {
                this.chats['medical_community'] = { messages: [], unreadCount: 0 };
            }
            this.chats['medical_community'].messages.push(message);
        }

        // Share with fire department if fire emergency
        if (emergencyType === 'Fire' || emergencyType.includes('Fire')) {
            if (!this.chats['fire_community']) {
                this.chats['fire_community'] = { messages: [], unreadCount: 0 };
            }
            this.chats['fire_community'].messages.push(message);
        }
    }

    // Add message to main communities only
    addMessageToMainCommunities(message) {
        this.communities.main_communities.forEach(community => {
            this.addMessage(community.id, message);
        });
    }

    simulateArrival(emergencyCase) {
        console.log('🚁 Helper arriving at location for case:', emergencyCase.caseId);
        
        emergencyCase.responder.arrivalTime = new Date();

        const authorityCommunityId = this.getAuthorityCommunityIdByEmergencyType(emergencyCase.alertType);
        const authorityName = this.getAuthorityTypeDisplayName(emergencyCase.alertType);

        // Add detailed arrival information to SPECIFIC authority community
        const authorityArrivalMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system',
            senderName: `${authorityName} Emergency Coordination`,
            content: `🚁 HELPER ARRIVED AT ${emergencyCase.alertType.toUpperCase()} LOCATION\n\n` +
                    `📍 Emergency Location: ${emergencyCase.location}\n` +
                    `🆘 Helper: ${emergencyCase.responder.name}\n` +
                    `📞 Helper Direct Contact: ${emergencyCase.responder.phone}\n` +
                    `🆔 Helper ID: ${emergencyCase.responder.badgeNumber || 'Civilian Helper'}\n` +
                    `⏰ Arrival Time: ${new Date().toLocaleTimeString()}\n` +
                    `🚨 Emergency Type: ${emergencyCase.alertType}\n` +
                    `👤 Victim: ${emergencyCase.userName}\n` +
                    `📱 Victim Contact: ${emergencyCase.userPhone}\n\n` +
                    
                    `📋 ${authorityName.toUpperCase()} COORDINATION STATUS:\n` +
                    `• Helper has successfully reached the emergency location\n` +
                    `• Initial contact with victim established\n` +
                    `• ${authorityName} authorities coordinating backup support\n` +
                    `• Situation assessment phase initiated\n` +
                    `• Real-time communication channel active between all parties\n\n` +
                    
                    `🔄 NEXT PHASE: Detailed situation assessment and safety protocols\n` +
                    `📞 Direct Helper Communication: ${emergencyCase.responder.phone}`,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: true,
            isAuthorityCoordination: true,
            emergencyType: emergencyCase.alertType
        };

        // Add to SPECIFIC authority community (detailed)
        if (this.chats[authorityCommunityId]) {
            this.chats[authorityCommunityId].messages.push(authorityArrivalMessage);
        }

        this.showNotification(
            'Helper Arrived',
            `${emergencyCase.responder.name} has arrived. ${authorityName} coordination active.`,
            'success'
        );

        // Simulate situation assessment and resolution
        setTimeout(() => {
            this.simulateSituationAssessment(emergencyCase);
        }, 15000); // 15 seconds for assessment
        
        // Add case solved notification to AI chat with 10-second delay
        setTimeout(() => {
            this.addCaseSolvedToAIChat(emergencyCase);
        }, 10000); // 10 seconds for prototype demo
    }
    
    // Add case solved notification to AI chat
    addCaseSolvedToAIChat(emergencyCase) {
        const caseSolvedMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'case-resolution',
            senderName: '✅ Emergency Resolution Team',
            content: `🎉 EMERGENCY CASE SOLVED!

✅ **Case Status: RESOLVED**
• Emergency Type: ${emergencyCase.alertType}
• Helper: ${emergencyCase.responder.name}
• Resolution Time: ${new Date().toLocaleTimeString()}

🏆 **Success Summary:**
• Victim safely assisted
• Emergency situation contained
• All safety protocols followed
• No further assistance needed

💙 **Great job everyone! Emergency successfully resolved.**

🚪 You may now safely exit the emergency chat.`,
            timestamp: new Date(),
            type: 'case_solved',
            isSystemMessage: true,
            caseSolved: true
        };

        // Add to current AI chat if it exists
        if (this.chats['ai-assistant']) {
            this.chats['ai-assistant'].messages.push(caseSolvedMessage);
            
            // Re-render if AI chat is currently active
            if (this.activeCommunity === 'ai-assistant') {
                this.renderAIMessages();
                this.playSound('messageReceived');
            }
        }
        
        console.log('✅ Case solved notification sent to AI chat for case:', emergencyCase.caseId);
    }
    
    // Activate AI Assistant for responder with fire agent mode
    activateResponderAIAssistant(emergencyCase, responderInfo) {
        // Initialize AI chat for responder if not exists
        if (!this.chats['ai-assistant']) {
            this.chats['ai-assistant'] = { messages: [], unreadCount: 0 };
        }
        
        // Add responder activation message
        const responderActivationMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'responder-system',
            senderName: '🚒 Responder Emergency Assistant',
            content: `🚨 RESPONDER MODE ACTIVATED

💙 Welcome ${responderInfo.name} - You accepted a FIRE EMERGENCY

🧘‍♂️ **STAY CALM - NO TENSION:**
• You are trained for this situation
• Follow your emergency protocols  
• Focus on safety first - yours and victim's
• Take deep breaths and proceed methodically

🔥 **Your Mission:**
• Assess situation safely from outside
• Guide victim to safety if possible
• Coordinate with fire department
• Establish safe perimeter

📞 **Communication:**
• Go to Fire Authority for team coordination
• Keep victim informed of your progress

💪 **You've got this! Help is on the way.**`,
            timestamp: new Date(),
            type: 'responder_activation',
            isSystemMessage: true,
            isResponder: true
        };

        this.chats['ai-assistant'].messages.push(responderActivationMessage);
        
        // Send fire team and victim details with delay
        setTimeout(() => {
            this.sendResponderFireTeamDetails(emergencyCase, responderInfo);
        }, 1500);
        
        // Suggest opening AI Assistant
        this.showNotification(
            'AI Assistant Available',
            'Open AI Assistant for responder guidance and victim details!',
            'info'
        );
    }
    
    // Send fire team and victim details to responder
    sendResponderFireTeamDetails(emergencyCase, responderInfo) {
        const detailsMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'responder-details',
            senderName: '📋 Emergency Details',
            content: `📋 **EMERGENCY DETAILS:**

👤 **Victim Information:**
• Name: ${emergencyCase.userName}
• Location: ${emergencyCase.location}
• Contact: ${emergencyCase.userPhone || 'Contact via app'}
• Medical: ${(emergencyCase.medicalConditions || []).join(', ') || 'None reported'}

🚒 **Fire Team Status:**
• Fire Department: Dispatched
• ETA: 4-6 minutes  
• Captain Martinez leading team
• Your ETA: ${responderInfo.eta}

📞 **Coordination:**
• Communicate with victim in Fire Authority
• Contact fire team directly if needed
• Keep emergency dispatch updated

🎯 **Your role: Guide victim safely while fire team arrives**`,
            timestamp: new Date(),
            type: 'responder_details',
            isSystemMessage: true
        };

        this.chats['ai-assistant'].messages.push(detailsMessage);
        
        // Re-render if AI chat is active
        if (this.activeCommunity === 'ai-assistant') {
            this.renderAIMessages();
        }
    }

    // Notify authorities when helper arrives (for SPECIFIC authority community)
    notifyAuthoritiesOfHelperArrival(emergencyCase) {
        const authorityCommunityId = this.getAuthorityCommunityIdByEmergencyType(emergencyCase.alertType);
        const authorityName = this.getAuthorityTypeDisplayName(emergencyCase.alertType);

        const arrivalNotification = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system',
            senderName: `${authorityName} Command Center`,
            content: `✅ ${authorityName.toUpperCase()} - HELPER ARRIVAL CONFIRMED\n\n` +
                    `📍 Emergency Location: ${emergencyCase.location}\n` +
                    `🆘 Helper: ${emergencyCase.responder.name}\n` +
                    `📞 Helper Contact: ${emergencyCase.responder.phone}\n` +
                    `⏰ Arrival Time: ${new Date().toLocaleTimeString()}\n` +
                    `🚨 Case: ${emergencyCase.caseId} (${emergencyCase.alertType})\n\n` +
                    
                    `🔍 ${authorityName.toUpperCase()} COORDINATION STATUS:\n` +
                    `• Helper has successfully reached the emergency location\n` +
                    `• Victim contact established and safety protocols initiated\n` +
                    `• ${authorityName} authorities on standby for backup support\n` +
                    `• Real-time situation monitoring in progress\n` +
                    `• All communication channels active and secured\n\n` +
                    
                    `📱 Maintain direct contact with helper: ${emergencyCase.responder.phone}\n` +
                    `🔄 Awaiting situation assessment and next status update`,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: true,
            isAuthorityCoordination: true,
            emergencyType: emergencyCase.alertType
        };

        // Add to SPECIFIC authority community
        if (this.chats[authorityCommunityId]) {
            this.chats[authorityCommunityId].messages.push(arrivalNotification);
        }
    }

    // Notify authorities when helper arrives (for SPECIFIC authority community)
    notifyAuthoritiesOfHelperArrival(emergencyCase) {
        const authorityCommunityId = this.getAuthorityCommunityIdByEmergencyType(emergencyCase.alertType);
        const authorityName = this.getAuthorityTypeDisplayName(emergencyCase.alertType);

        const arrivalNotification = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system',
            senderName: `${authorityName} Command Center`,
            content: `✅ ${authorityName.toUpperCase()} - HELPER ARRIVAL CONFIRMED\n\n` +
                    `📍 Emergency Location: ${emergencyCase.location}\n` +
                    `🆘 Helper: ${emergencyCase.responder.name}\n` +
                    `📞 Helper Contact: ${emergencyCase.responder.phone}\n` +
                    `⏰ Arrival Time: ${new Date().toLocaleTimeString()}\n` +
                    `🚨 Case: ${emergencyCase.caseId} (${emergencyCase.alertType})\n\n` +
                    
                    `🔍 ${authorityName.toUpperCase()} COORDINATION STATUS:\n` +
                    `• Helper has successfully reached the emergency location\n` +
                    `• Victim contact established and safety protocols initiated\n` +
                    `• ${authorityName} authorities on standby for backup support\n` +
                    `• Real-time situation monitoring in progress\n` +
                    `• All communication channels active and secured\n\n` +
                    
                    `📱 Maintain direct contact with helper: ${emergencyCase.responder.phone}\n` +
                    `🔄 Awaiting situation assessment and next status update`,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: true,
            isAuthorityCoordination: true,
            emergencyType: emergencyCase.alertType
        };

        // Add to SPECIFIC authority community
        if (this.chats[authorityCommunityId]) {
            this.chats[authorityCommunityId].messages.push(arrivalNotification);
        }
    }

    // New method for situation assessment with SPECIFIC authority community updates
    simulateSituationAssessment(emergencyCase) {
        console.log('🔍 Helper assessing situation for case:', emergencyCase.caseId);

        const authorityCommunityId = this.getAuthorityCommunityIdByEmergencyType(emergencyCase.alertType);
        const authorityName = this.getAuthorityTypeDisplayName(emergencyCase.alertType);

        // Detailed assessment for SPECIFIC authority community
        const authorityAssessmentMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system',
            senderName: `${authorityName} Field Assessment Unit`,
            content: `🔍 COMPREHENSIVE ${emergencyCase.alertType.toUpperCase()} ASSESSMENT\n\n` +
                    `🆘 Field Responder: ${emergencyCase.responder.name}\n` +
                    `📞 Responder Contact: ${emergencyCase.responder.phone}\n` +
                    `📍 Emergency Location: ${emergencyCase.location}\n` +
                    `🚨 Emergency Type: ${emergencyCase.alertType}\n` +
                    `👤 Victim: ${emergencyCase.userName}\n` +
                    `📱 Victim Contact: ${emergencyCase.userPhone}\n\n` +
                    
                    `📋 DETAILED ${authorityName.toUpperCase()} ASSESSMENT:\n` +
                    `• Victim successfully located and secured\n` +
                    `• Initial safety perimeter established by helper\n` +
                    `• Victim's immediate safety status: Secured\n` +
                    `• Environmental and situational hazards: Assessed and clear\n` +
                    `• ${emergencyCase.alertType === 'Rape' ? 'Victim moved to safe and secure location' : 'Emergency situation fully stabilized'}\n` +
                    `• Emergency contacts notified of current safe status\n` +
                    `• Area secured and ready for ${authorityName} backup if needed\n` +
                    `• Helper maintaining direct communication with victim\n\n` +
                    
                    `🎯 ${authorityName.toUpperCase()} COORDINATION ACTIONS:\n` +
                    `• Implementing final safety and security protocols\n` +
                    `• Preparing for complete situation resolution\n` +
                    `• Maintaining continuous contact with all emergency parties\n` +
                    `• Documentation in progress for official ${authorityName} records\n` +
                    `• Coordinating with helper for seamless handover if needed\n\n` +
                    
                    `⏱️ Assessment Completion Time: ${new Date().toLocaleTimeString()}\n` +
                    `📊 Overall ${authorityName} Status: FULLY UNDER CONTROL - RESOLUTION PHASE INITIATED\n` +
                    `🔄 Next Update: Complete resolution and official closure`,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: true,
            isAuthorityCoordination: true,
            emergencyType: emergencyCase.alertType
        };

        // Add to SPECIFIC authority community
        if (this.chats[authorityCommunityId]) {
            this.chats[authorityCommunityId].messages.push(authorityAssessmentMessage);
        }

        // Simulate resolution after assessment
        setTimeout(() => {
            this.simulateResolution(emergencyCase);
        }, 10000); // 10 seconds after assessment
    }

    simulateResolution(emergencyCase) {
        console.log('✅ Emergency resolution for case:', emergencyCase.caseId);
        
        emergencyCase.status = 'Resolved';
        emergencyCase.resolutionTime = new Date();
        emergencyCase.notes = `Emergency resolved successfully by ${emergencyCase.responder.name}. All parties safe.`;

        const authorityCommunityId = this.getAuthorityCommunityIdByEmergencyType(emergencyCase.alertType);
        const authorityName = this.getAuthorityTypeDisplayName(emergencyCase.alertType);

        // Detailed resolution for SPECIFIC authority community
        const authorityResolutionMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system',
            senderName: `${authorityName} Emergency Resolution Center`,
            content: `✅ ${emergencyCase.alertType.toUpperCase()} EMERGENCY SUCCESSFULLY RESOLVED\n\n` +
                    `📋 COMPLETE CASE RESOLUTION SUMMARY:\n` +
                    `Case ID: ${emergencyCase.caseId}\n` +
                    `Emergency Type: ${emergencyCase.alertType}\n` +
                    `Location: ${emergencyCase.location}\n` +
                    `Victim: ${emergencyCase.userName}\n` +
                    `Responding Helper: ${emergencyCase.responder.name}\n` +
                    `Coordinating Authority: ${authorityName} Department\n\n` +
                    
                    `🎯 FINAL RESOLUTION DETAILS:\n` +
                    `• ${emergencyCase.alertType === 'Rape' ? 'Victim successfully rescued and secured by helper' : 'Emergency situation completely resolved by helper'}\n` +
                    `• All immediate threats and dangers fully eliminated\n` +
                    `• Victim confirmed safe, secure, and in stable condition\n` +
                    `• Professional emergency protocols completed successfully\n` +
                    `• Location cleared and secured for normal operations\n` +
                    `• All emergency contacts updated with successful resolution\n` +
                    `• Helper provided exceptional care and professionalism\n\n` +
                    
                    `⏱️ COMPLETE ${authorityName.toUpperCase()} TIMELINE:\n` +
                    `• Emergency Reported: ${new Date(emergencyCase.triggerTime).toLocaleTimeString()}\n` +
                    `• Helper Accepted: ${new Date(emergencyCase.responder.acceptTime).toLocaleTimeString()}\n` +
                    `• Helper Arrived: ${new Date(emergencyCase.responder.arrivalTime).toLocaleTimeString()}\n` +
                    `• Resolution Completed: ${new Date().toLocaleTimeString()}\n` +
                    `• Total Response Time: ${this.calculateTotalResponseTime(emergencyCase)}\n\n` +
                    
                    `📞 OFFICIAL CONTACT RECORD:\n` +
                    `• Victim Contact: ${emergencyCase.userPhone} (Safe)\n` +
                    `• Helper Contact: ${emergencyCase.responder.phone} (Available)\n` +
                    `• ${authorityName} Case Officer: On duty and monitoring\n\n` +
                    
                    `✅ FINAL ${authorityName.toUpperCase()} STATUS: CASE OFFICIALLY CLOSED\n` +
                    `🏆 COMMENDATION: ${emergencyCase.responder.name} recommended for community hero recognition\n` +
                    `📋 Case documentation complete and filed with ${authorityName} department`,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: true,
            isAuthorityCoordination: true,
            emergencyType: emergencyCase.alertType
        };

        // Add to SPECIFIC authority community
        if (this.chats[authorityCommunityId]) {
            this.chats[authorityCommunityId].messages.push(authorityResolutionMessage);
        }

        // Send detailed appreciation within authority community first
        setTimeout(() => {
            this.sendDetailedAuthorityAppreciationInAuthorityCommunity(emergencyCase);
        }, 2000);

        // Then send basic appreciation to main community (Message 2 of 2)
        setTimeout(() => {
            this.addBasicAuthorityAppreciationToMainCommunity(emergencyCase);
        }, 5000);

        this.showNotification(
            'Emergency Resolved',
            `Case ${emergencyCase.caseId} resolved. ${authorityName} coordination complete.`,
            'success'
        );

        // Dispatch AI event for emergency resolution
        document.dispatchEvent(new CustomEvent('emergencyResolved', {
            detail: {
                emergencyId: emergencyCase.caseId,
                emergencyType: emergencyCase.alertType.toLowerCase(),
                resolvedAt: new Date().toISOString(),
                responder: emergencyCase.responder
            }
        }));

        // Update emergency badge
        this.updateEmergencyBadge();
    }

    // Send detailed appreciation within SPECIFIC authority community
    sendDetailedAuthorityAppreciationInAuthorityCommunity(emergencyCase) {
        const authorityCommunityId = this.getAuthorityCommunityIdByEmergencyType(emergencyCase.alertType);
        const authorityName = this.getAuthorityTypeDisplayName(emergencyCase.alertType);
        
        const detailedAppreciation = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system',
            senderName: `${authorityName} Department Chief`,
            content: `🏆 OFFICIAL ${authorityName.toUpperCase()} DEPARTMENT APPRECIATION\n\n` +
                    `👏 COMPREHENSIVE COMMENDATION FOR: ${emergencyCase.responder.name}\n\n` +
                    `📋 COMPLETE PERFORMANCE EVALUATION:\n` +
                    `Case ID: ${emergencyCase.caseId}\n` +
                    `Emergency Type: ${emergencyCase.alertType}\n` +
                    `Emergency Location: ${emergencyCase.location}\n` +
                    `Victim Assisted: ${emergencyCase.userName}\n` +
                    `Response Time: ${emergencyCase.responder.eta}\n` +
                    `Total Resolution Time: ${this.calculateTotalResponseTime(emergencyCase)}\n` +
                    `Coordinating Authority: ${authorityName} Department\n\n` +
                    
                    `🌟 DETAILED ${authorityName.toUpperCase()} PERFORMANCE ASSESSMENT:\n` +
                    `• EMERGENCY RESPONSE TIME: Outstanding (${emergencyCase.responder.eta})\n` +
                    `• VICTIM SAFETY & CARE: Exceptional professionalism and compassion\n` +
                    `• SITUATION ASSESSMENT: Thorough, accurate, and comprehensive\n` +
                    `• COMMUNICATION: Clear, consistent, and professional with all parties\n` +
                    `• PROBLEM RESOLUTION: Complete, effective, and exemplary\n` +
                    `• SAFETY PROTOCOL ADHERENCE: Perfectly followed and implemented\n` +
                    `• AUTHORITY COORDINATION: Excellent cooperation with ${authorityName} department\n` +
                    `• COMMUNITY SERVICE: Goes above and beyond expectations\n\n` +
                    
                    `🎖️ OFFICIAL ${authorityName.toUpperCase()} RECOGNITION:\n` +
                    `The ${authorityName} Department officially recognizes and honors ${emergencyCase.responder.name} as a TRUE COMMUNITY HERO for their exceptional response to this ${emergencyCase.alertType} emergency.\n\n` +
                    
                    `Their remarkable actions have:\n` +
                    `• Saved a life and ensured complete victim safety and security\n` +
                    `• Demonstrated outstanding community service and citizenship\n` +
                    `• Set the gold standard for emergency response excellence\n` +
                    `• Strengthened community trust and cooperation with ${authorityName} services\n` +
                    `• Proven that community heroes make our neighborhoods safer\n\n` +
                    
                    `📞 OFFICIAL ${authorityName.toUpperCase()} CONTACT RECORD:\n` +
                    `Community Hero: ${emergencyCase.responder.name}\n` +
                    `Hero Contact: ${emergencyCase.responder.phone}\n` +
                    `Hero Badge/ID: ${emergencyCase.responder.badgeNumber || 'Community Volunteer Hero'}\n` +
                    `${authorityName} Case Officer: [CLASSIFIED]\n` +
                    `Official Documentation: Filed and Archived\n\n` +
                    
                    `🙏 ${emergencyCase.responder.name}, the ${authorityName} Department salutes you!\n` +
                    `🏅 You are officially recognized as a ${authorityName.toUpperCase()} COMMUNITY EMERGENCY HERO!\n` +
                    `🌟 Your heroic actions will be remembered and honored by our department!`,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: true,
            isAuthorityCoordination: true,
            isOfficialAppreciation: true,
            emergencyType: emergencyCase.alertType
        };

        // Add to SPECIFIC authority community
        if (this.chats[authorityCommunityId]) {
            this.chats[authorityCommunityId].messages.push(detailedAppreciation);
        }
    }

    // Add basic authority appreciation to main community (Message 2 of 2)
    addBasicAuthorityAppreciationToMainCommunity(emergencyCase) {
        const authorityName = this.getAuthorityTypeDisplayName(emergencyCase.alertType);
        
        const basicAppreciationMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system',
            senderName: `${authorityName} Department`,
            content: `🏆 ${authorityName} Department Official Recognition\n\n👏 Community Hero: ${emergencyCase.responder.name}\n✅ Successfully resolved: ${emergencyCase.alertType} emergency\n📍 Location: ${emergencyCase.location}\n⏰ Resolved: ${new Date().toLocaleTimeString()}\n\n🙏 Thank you for keeping our community safe!\n🏅 Official ${authorityName} Department commendation awarded`,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: true,
            messageType: 'authority_appreciation', // Track message type
            isPublicMessage: true,
            isAuthorityResponse: true,
            emergencyType: emergencyCase.alertType
        };

        // Add to main community (public view) - This is Message 2 of 2
        this.addMessage('city_central', basicAppreciationMessage);
    }

    // Send detailed appreciation in authority community
    sendAuthorityAppreciationToAuthorityCommunity(emergencyCase) {
        const authorities = this.getAppropriateAuthorities(emergencyCase.alertType);
        
        authorities.forEach((authorityType, index) => {
            setTimeout(() => {
                const detailedAppreciation = {
                    id: 'msg_' + this.messageIdCounter++,
                    senderId: 'system',
                    senderName: this.getAuthorityName(authorityType),
                    content: `🏆 ${this.getAuthorityTitle(authorityType)} - OFFICIAL DETAILED APPRECIATION\n\n` +
                            `👏 COMPREHENSIVE COMMENDATION FOR: ${emergencyCase.responder.name}\n\n` +
                            `📋 COMPLETE CASE EVALUATION:\n` +
                            `Case ID: ${emergencyCase.caseId}\n` +
                            `Emergency Type: ${emergencyCase.alertType}\n` +
                            `Emergency Location: ${emergencyCase.location}\n` +
                            `Victim Assisted: ${emergencyCase.userName}\n` +
                            `Response Time: ${emergencyCase.responder.eta}\n` +
                            `Total Resolution Time: ${this.calculateTotalResponseTime(emergencyCase)}\n\n` +
                            
                            `🌟 DETAILED PERFORMANCE EVALUATION:\n` +
                            `• RESPONSE TIME: Excellent (${emergencyCase.responder.eta})\n` +
                            `• SITUATION ASSESSMENT: Thorough and professional\n` +
                            `• VICTIM ASSISTANCE: Exemplary care and safety measures\n` +
                            `• COMMUNICATION: Clear and consistent updates\n` +
                            `• PROBLEM RESOLUTION: Complete and effective\n` +
                            `• SAFETY PROTOCOLS: Properly followed and implemented\n` +
                            `• COORDINATION: Excellent cooperation with authorities\n\n` +
                            
                            `🎖️ OFFICIAL RECOGNITION:\n` +
                            `The ${this.getAuthorityTitle(authorityType)} officially recognizes ${emergencyCase.responder.name} as a COMMUNITY HERO for their exceptional response to this ${emergencyCase.alertType} emergency.\n\n` +
                            
                            `Their quick thinking, professional approach, and brave actions have:\n` +
                            `• Saved a life and ensured victim safety\n` +
                            `• Demonstrated outstanding community service\n` +
                            `• Set an example for emergency response excellence\n` +
                            `• Strengthened community trust and cooperation\n\n` +
                            
                            `📞 OFFICIAL CONTACT RECORD:\n` +
                            `Hero Contact: ${emergencyCase.responder.phone}\n` +
                            `Badge/ID: ${emergencyCase.responder.badgeNumber || 'Community Volunteer'}\n` +
                            `This heroic action has been officially documented.\n\n` +
                            
                            `🙏 ${emergencyCase.responder.name}, thank you for making our community safer!\n` +
                            `🏅 You are officially recognized as a COMMUNITY EMERGENCY HERO!`,
                    timestamp: new Date(),
                    type: 'text',
                    isSystemMessage: true,
                    isAuthorityCoordination: true,
                    isOfficialAppreciation: true
                };

                // Add to authority community
                if (this.chats['authority_coordination']) {
                    this.chats['authority_coordination'].messages.push(detailedAppreciation);
                }
            }, index * 3000); // Stagger appreciations by 3 seconds
        });
    }

    // Add basic appreciation to main community (Message 3 of 4)
    addBasicAppreciationToMainCommunity(emergencyCase) {
        const basicAppreciationMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system',
            senderName: 'Community Authorities',
            content: `👏 Official appreciation for emergency response\n\n🏆 Hero: ${emergencyCase.responder.name}\n✅ Successfully resolved: ${emergencyCase.alertType} emergency\n📍 Location: ${emergencyCase.location}\n🙏 Thank you for keeping our community safe!`,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: true,
            messageType: 'authority_appreciation', // Track message type
            isPublicMessage: true,
            isAuthorityResponse: true
        };

        // Add to main community (public view)
        this.addMessage('city_central', basicAppreciationMessage);
    }

    // Add final resolution to main community (Message 4 of 4)
    addFinalResolutionToMainCommunity(emergencyCase) {
        const finalResolutionMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system',
            senderName: 'Emergency Management System',
            content: `✅ Emergency case resolved successfully\n\n📋 Case: ${emergencyCase.caseId}\n🚨 Type: ${emergencyCase.alertType}\n👤 Victim: ${emergencyCase.userName} - Safe\n🆘 Helper: ${emergencyCase.responder.name}\n⏰ Resolved: ${new Date().toLocaleTimeString()}\n\n🔒 Case officially closed`,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: true,
            messageType: 'final_resolution', // Track message type
            isPublicMessage: true
        };

        // Add to main community (public view)
        this.addMessage('city_central', finalResolutionMessage);
    }

    // Calculate total response time for reports
    calculateTotalResponseTime(emergencyCase) {
        const startTime = new Date(emergencyCase.triggerTime).getTime();
        const endTime = new Date(emergencyCase.resolutionTime).getTime();
        const totalMinutes = Math.floor((endTime - startTime) / (1000 * 60));
        return totalMinutes < 1 ? '< 1 minute' : `${totalMinutes} minutes`;
    }

    // Send appreciation from authorities to helper
    sendAuthorityAppreciationAndConfirmation(emergencyCase) {
        const authorities = this.getAppropriateAuthorities(emergencyCase.alertType);
        
        authorities.forEach((authorityType, index) => {
            setTimeout(() => {
                const appreciationMessage = {
                    id: 'msg_' + this.messageIdCounter++,
                    senderId: 'system',
                    senderName: this.getAuthorityName(authorityType),
                    content: `🏆 ${this.getAuthorityTitle(authorityType)} - OFFICIAL APPRECIATION\n\n` +
                            `👏 COMMENDATION FOR: ${emergencyCase.responder.name}\n\n` +
                            `📋 CASE SUMMARY:\n` +
                            `Case ID: ${emergencyCase.caseId}\n` +
                            `Emergency Type: ${emergencyCase.alertType}\n` +
                            `Location: ${emergencyCase.location}\n` +
                            `Victim: ${emergencyCase.userName}\n` +
                            `Resolution Time: ${new Date(emergencyCase.resolutionTime).toLocaleString()}\n\n` +
                            
                            `🌟 OFFICIAL RECOGNITION:\n` +
                            `• Exemplary response to emergency situation\n` +
                            `• Quick arrival and professional assessment\n` +
                            `• Successful victim rescue and safety assurance\n` +
                            `• Outstanding community service\n\n` +
                            
                            `🎖️ APPRECIATION:\n` +
                            `The ${this.getAuthorityTitle(authorityType)} officially recognizes and appreciates ${emergencyCase.responder.name} for their heroic response to this ${emergencyCase.alertType} emergency. Your quick thinking and brave actions have saved a life and made our community safer.\n\n` +
                            
                            `📞 CONTACT ACKNOWLEDGMENT:\n` +
                            `Helper Contact: ${emergencyCase.responder.phone}\n` +
                            `This case has been officially documented and closed.\n\n` +
                            
                            `🙏 Thank you for being a true community hero!`,
                    timestamp: new Date(),
                    type: 'text',
                    isSystemMessage: true,
                    isAuthorityResponse: true, // Green styling for official appreciation
                    isAppreciation: true
                };

                // Send to authority community
                const authorityCommunityId = this.getAuthorityCommunityId(authorityType);
                if (authorityCommunityId && this.chats[authorityCommunityId]) {
                    this.chats[authorityCommunityId].messages.push(appreciationMessage);
                }

                // Also send appreciation to main community
                if (index === 0) { // Send community appreciation only once
                    const communityAppreciation = {
                        ...appreciationMessage,
                        senderName: 'Community Leadership',
                        content: `🏆 COMMUNITY HERO APPRECIATION\n\n` +
                                `👏 CELEBRATING: ${emergencyCase.responder.name}\n\n` +
                                `🌟 Our community hero ${emergencyCase.responder.name} successfully responded to a ${emergencyCase.alertType} emergency and ensured ${emergencyCase.userName}'s safety.\n\n` +
                                `📍 Location: ${emergencyCase.location}\n` +
                                `⏰ Response Time: ${emergencyCase.responder.eta}\n` +
                                `✅ Status: SUCCESSFULLY RESOLVED\n\n` +
                                `🙏 The entire community thanks ${emergencyCase.responder.name} for their courage, quick response, and dedication to keeping our neighborhood safe.\n\n` +
                                `👥 This is what community support looks like! 🤝`,
                        isHelperResponse: true // Yellow styling for community appreciation
                    };

                    this.addMessageToMainCommunities(communityAppreciation);
                }
            }, index * 3000); // Stagger authority appreciations by 3 seconds
        });
    }

    broadcastEmergencyMessage(emergencyCase, emergencyConfig) {
        const message = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system',
            senderName: 'System',
            content: `${emergencyConfig.systemMessage}\n📍 Location: ${emergencyCase.location}\n👤 User: ${emergencyCase.userName}\n🕐 Time: ${this.formatTime(emergencyCase.triggerTime)}`,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: true,
            isEmergency: true
        };

        if (emergencyConfig.broadcastToAll) {
            this.addMessageToAllCommunities(message);
        } else {
            // Add only to emergency community
            this.addMessage(emergencyConfig.unlocksCommunity, message);
        }
    }

    addMessage(communityId, message) {
        if (!this.chats[communityId]) {
            this.chats[communityId] = { messages: [], unreadCount: 0 };
        }

        this.chats[communityId].messages.push(message);

        // Update unread count if not active chat
        if (this.activeCommunity !== communityId && message.senderId !== this.currentUser.id) {
            this.chats[communityId].unreadCount++;
        }

        // Update UI if this is the active chat
        if (this.activeCommunity === communityId) {
            this.renderMessages();
        }

        // Update chats list
        this.renderChatsList();
    }

    addMessageToAllCommunities(message) {
        const userCommunities = this.currentUser.communities || [];
        userCommunities.forEach(communityId => {
            this.addMessage(communityId, message);
        });

        // Also add to emergency communities that are unlocked
        this.communities.emergency_communities.forEach(community => {
            if (!community.isLocked) {
                this.addMessage(community.id, message);
            }
        });
    }

    notifyEmergencyContacts(emergencyCase) {
        emergencyCase.emergencyContactsNotified.forEach(contact => {
            const notification = `🚨 Alert: ${emergencyCase.userName} triggered a ${emergencyCase.alertType} emergency in ${emergencyCase.location}. Emergency services have been notified.`;
            
            // Simulate sending message to emergency contacts
            console.log(`Notifying ${contact.name} (${contact.phone}): ${notification}`);
        });
        
        // Add system message about notification
        const message = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system',
            senderName: 'System',
            content: `📱 Emergency contacts notified: ${emergencyCase.emergencyContactsNotified.map(c => c.name).join(', ')}`,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: true
        };

        this.addMessage(this.activeCommunity, message);
    }

    notifyEmergencyContactsAboutResponse(emergencyCase) {
        emergencyCase.emergencyContactsNotified.forEach(contact => {
            const notification = `✅ Update: ${emergencyCase.responder.name} is responding to ${emergencyCase.userName}'s emergency. ETA: ${emergencyCase.responder.eta}`;
            
            console.log(`Notifying ${contact.name} (${contact.phone}): ${notification}`);
        });
    }

    generateCaseId(alertType) {
        const prefix = alertType.charAt(0).toUpperCase();
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const caseNumber = String(this.emergencyCases.length + 1).padStart(4, '0');
        
        return `${prefix}-${year}-${month}-${caseNumber}`;
    }

    showEmergencyCases() {
        const modal = document.getElementById('emergencyCasesModal');
        const casesList = document.getElementById('emergencyCasesList');
        
        if (!modal || !casesList) return;
        
        casesList.innerHTML = '';

        if (this.emergencyCases.length === 0) {
            casesList.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); padding: 20px;">No emergency cases recorded yet.</p>';
        } else {
            this.emergencyCases.forEach(emergencyCase => {
                const caseItem = document.createElement('div');
                caseItem.className = 'case-item';
                
                caseItem.innerHTML = `
                    <div class="case-header">
                        <div class="case-id">${emergencyCase.caseId}</div>
                        <div class="case-status ${emergencyCase.status.toLowerCase().replace(' ', '-')}">${emergencyCase.status}</div>
                    </div>
                    <div class="case-details">
                        <div class="case-detail">
                            <strong>Type:</strong>
                            <span>${emergencyCase.alertType}</span>
                        </div>
                        <div class="case-detail">
                            <strong>User:</strong>
                            <span>${emergencyCase.userName}</span>
                        </div>
                        <div class="case-detail">
                            <strong>Location:</strong>
                            <span>${emergencyCase.location}</span>
                        </div>
                        <div class="case-detail">
                            <strong>Triggered:</strong>
                            <span>${this.formatDateTime(emergencyCase.triggerTime)}</span>
                        </div>
                        ${emergencyCase.responder ? `
                        <div class="case-detail">
                            <strong>Responder:</strong>
                            <span>${emergencyCase.responder.name} (ETA: ${emergencyCase.responder.eta})</span>
                        </div>
                        ` : ''}
                        ${emergencyCase.resolutionTime ? `
                        <div class="case-detail">
                            <strong>Resolved:</strong>
                            <span>${this.formatDateTime(emergencyCase.resolutionTime)}</span>
                        </div>
                        ` : ''}
                    </div>
                    ${emergencyCase.notes ? `
                    <div class="case-notes">
                        <strong>Notes:</strong> ${emergencyCase.notes}
                    </div>
                    ` : ''}
                `;
                
                casesList.appendChild(caseItem);
            });
        }

        modal.classList.remove('hidden');
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('hidden');
    }

    // Profile Management Methods
    showUserProfile(userId = null) {
        const user = userId ? this.users.find(u => u.id === userId) : this.currentUser;
        if (!user) return;

        // Populate profile data
        this.populateProfileData(user);
        
        // Show modal
        document.getElementById('userProfileModal').classList.remove('hidden');
    }

    populateProfileData(user) {
        // Basic information
        document.getElementById('profileAvatarImg').src = user.avatar;
        document.getElementById('profileUserName').textContent = user.name;
        document.getElementById('profileUserRole').textContent = `${user.role}${user.responderType ? ` - ${user.responderType}` : ''}`;
        
        // Status
        const statusIndicator = document.getElementById('profileOnlineStatus');
        const lastSeen = document.getElementById('profileLastSeen');
        statusIndicator.className = `status-indicator ${user.isOnline ? '' : 'offline'}`;
        lastSeen.textContent = user.isOnline ? 'Online' : `Last seen ${this.formatDateTime(user.lastSeen)}`;

        // Personal information
        document.getElementById('profileAge').textContent = user.age || '--';
        document.getElementById('profileGender').textContent = user.gender || '--';
        document.getElementById('profileBloodGroup').textContent = user.bloodGroup || '--';
        document.getElementById('profilePhone').textContent = user.phone || '+91-XXXXXXXXXX';

        // Location
        document.getElementById('profileAddress').textContent = user.location?.address || '--';
        document.getElementById('profileCoordinates').textContent = user.location?.coordinates ? 
            `${user.location.coordinates.lat}, ${user.location.coordinates.lng}` : '--';

        // Medical conditions
        this.populateMedicalConditions(user.medicalConditions || []);

        // Emergency contacts
        this.populateEmergencyContacts(user.emergencyContacts || []);

        // Communities
        this.populateProfileCommunities(user.communities || []);

        // Responder information
        this.populateResponderInfo(user);
    }

    populateMedicalConditions(conditions) {
        const container = document.getElementById('profileMedicalConditions');
        container.innerHTML = '';
        
        conditions.forEach(condition => {
            const tag = document.createElement('span');
            tag.className = 'medical-condition-tag';
            tag.textContent = condition;
            container.appendChild(tag);
        });
    }

    populateEmergencyContacts(contacts) {
        const container = document.getElementById('profileEmergencyContacts');
        container.innerHTML = '';
        
        contacts.forEach(contact => {
            const contactItem = document.createElement('div');
            contactItem.className = 'emergency-contact-item';
            
            const relationIcons = {
                'Mother': 'fa-heart',
                'Father': 'fa-male',
                'Brother': 'fa-user-friends',
                'Sister': 'fa-user-friends',
                'Wife': 'fa-heart',
                'Husband': 'fa-heart',
                'Son': 'fa-child',
                'Daughter': 'fa-child',
                'Friend': 'fa-user-friends',
                'Neighbor': 'fa-home',
                'Work': 'fa-briefcase',
                'Spouse': 'fa-heart'
            };
            
            const icon = relationIcons[contact.relation] || 'fa-user';
            
            contactItem.innerHTML = `
                <div class="emergency-contact-icon">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="emergency-contact-info">
                    <div class="emergency-contact-name">${this.escapeHtml(contact.name)}</div>
                    <div class="emergency-contact-details">
                        <div class="emergency-contact-phone">
                            <i class="fas fa-phone"></i>
                            ${this.escapeHtml(contact.phone)}
                        </div>
                        <div class="emergency-contact-relation">
                            <i class="fas fa-tag"></i>
                            ${this.escapeHtml(contact.relation)}
                        </div>
                    </div>
                </div>
            `;
            
            container.appendChild(contactItem);
        });
    }

    populateProfileCommunities(communityIds) {
        const container = document.getElementById('profileCommunities');
        container.innerHTML = '';
        
        communityIds.forEach(communityId => {
            const community = this.findCommunity(communityId);
            if (community) {
                const communityItem = document.createElement('div');
                communityItem.className = 'profile-community-item';
                communityItem.dataset.communityId = communityId;
                
                communityItem.innerHTML = `
                    <div class="profile-community-header">
                        <div class="profile-community-icon">${community.icon || '🏘️'}</div>
                        <div>
                            <div class="profile-community-name">${this.escapeHtml(community.name)}</div>
                            <div class="profile-community-type">${community.type || 'Community'}</div>
                        </div>
                    </div>
                `;
                
                container.appendChild(communityItem);
            }
        });
    }

    populateResponderInfo(user) {
        const section = document.getElementById('responderSection');
        
        if (user.role === 'Responder') {
            section.classList.remove('hidden');
            document.getElementById('profileResponderType').textContent = user.responderType || '--';
            document.getElementById('profileResponseTime').textContent = user.responseTime || '--';
            document.getElementById('profileBadgeNumber').textContent = user.badgeNumber || user.vehicleNumber || '--';
            document.getElementById('profileSpecialization').textContent = user.specialization || '--';
        } else {
            section.classList.add('hidden');
        }
    }

    showEditProfile() {
        if (!this.currentUser) return;
        
        // Close profile modal
        this.closeModal('userProfileModal');
        
        // Populate edit form
        this.populateEditForm(this.currentUser);
        
        // Show edit modal
        document.getElementById('editProfileModal').classList.remove('hidden');
    }

    populateEditForm(user) {
        document.getElementById('editName').value = user.name || '';
        document.getElementById('editAge').value = user.age || '';
        document.getElementById('editGender').value = user.gender || '';
        document.getElementById('editBloodGroup').value = user.bloodGroup || '';
        document.getElementById('editPhone').value = user.phone || '';
        document.getElementById('editAddress').value = user.location?.address || '';
        document.getElementById('editMedicalConditions').value = (user.medicalConditions || []).join(', ');
        
        this.populateEmergencyContactsEdit(user.emergencyContacts || []);
    }

    populateEmergencyContactsEdit(contacts) {
        const container = document.getElementById('editEmergencyContacts');
        container.innerHTML = '';
        
        contacts.forEach((contact, index) => {
            this.addEmergencyContactField(contact, index);
        });
        
        // Add at least one empty field if none exist
        if (contacts.length === 0) {
            this.addEmergencyContactField();
        }
    }

    addEmergencyContactField(contact = null, index = null) {
        const container = document.getElementById('editEmergencyContacts');
        const fieldId = index !== null ? index : Date.now();
        
        const contactItem = document.createElement('div');
        contactItem.className = 'emergency-contact-edit-item';
        
        contactItem.innerHTML = `
            <div class="form-group">
                <label class="form-label">Name</label>
                <input type="text" class="form-control emergency-contact-name-input" 
                       value="${contact?.name || ''}" placeholder="Contact name" required>
            </div>
            <div class="form-group">
                <label class="form-label">Phone</label>
                <input type="tel" class="form-control emergency-contact-phone-input" 
                       value="${contact?.phone || ''}" placeholder="+91-XXXXXXXXXX" required>
            </div>
            <div class="form-group">
                <label class="form-label">Relation</label>
                <select class="form-control emergency-contact-relation-input" required>
                    <option value="">Select Relation</option>
                    <option value="Mother" ${contact?.relation === 'Mother' ? 'selected' : ''}>Mother</option>
                    <option value="Father" ${contact?.relation === 'Father' ? 'selected' : ''}>Father</option>
                    <option value="Brother" ${contact?.relation === 'Brother' ? 'selected' : ''}>Brother</option>
                    <option value="Sister" ${contact?.relation === 'Sister' ? 'selected' : ''}>Sister</option>
                    <option value="Wife" ${contact?.relation === 'Wife' ? 'selected' : ''}>Wife</option>
                    <option value="Husband" ${contact?.relation === 'Husband' ? 'selected' : ''}>Husband</option>
                    <option value="Son" ${contact?.relation === 'Son' ? 'selected' : ''}>Son</option>
                    <option value="Daughter" ${contact?.relation === 'Daughter' ? 'selected' : ''}>Daughter</option>
                    <option value="Friend" ${contact?.relation === 'Friend' ? 'selected' : ''}>Friend</option>
                    <option value="Neighbor" ${contact?.relation === 'Neighbor' ? 'selected' : ''}>Neighbor</option>
                    <option value="Work" ${contact?.relation === 'Work' ? 'selected' : ''}>Work</option>
                    <option value="Other" ${contact?.relation === 'Other' ? 'selected' : ''}>Other</option>
                </select>
            </div>
            <button type="button" class="emergency-contact-remove-btn" title="Remove Contact">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        container.appendChild(contactItem);
    }

    showAvatarSelection() {
        const modal = document.getElementById('avatarSelectionModal');
        const avatarGrid = modal.querySelector('.avatar-grid');
        
        // Generate avatar options
        avatarGrid.innerHTML = '';
        for (let i = 1; i <= 20; i++) {
            const avatar = document.createElement('img');
            avatar.className = 'avatar-option';
            avatar.src = `https://i.pravatar.cc/150?img=${i}`;
            avatar.alt = `Avatar ${i}`;
            
            if (this.currentUser.avatar === avatar.src) {
                avatar.classList.add('selected');
            }
            
            avatarGrid.appendChild(avatar);
        }
        
        modal.classList.remove('hidden');
    }

    selectAvatar(avatarSrc) {
        if (!this.currentUser) return;
        
        // Update current user avatar
        this.currentUser.avatar = avatarSrc;
        
        // Update UI
        document.getElementById('currentUserAvatar').src = avatarSrc;
        document.getElementById('profileAvatarImg').src = avatarSrc;
        
        // Update selection in modal
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.classList.toggle('selected', option.src === avatarSrc);
        });
        
        // Close modal
        this.closeModal('avatarSelectionModal');
        
        this.showNotification('Avatar Updated', 'Your profile avatar has been updated successfully!', 'success');
    }

    saveProfileChanges() {
        if (!this.currentUser) return;
        
        try {
            // Get form data
            const formData = this.getEditFormData();
            
            // Validate required fields
            if (!formData.name.trim()) {
                throw new Error('Name is required');
            }
            
            // Update current user
            this.currentUser.name = formData.name;
            this.currentUser.age = parseInt(formData.age);
            this.currentUser.gender = formData.gender;
            this.currentUser.bloodGroup = formData.bloodGroup;
            this.currentUser.phone = formData.phone;
            this.currentUser.location = this.currentUser.location || {};
            this.currentUser.location.address = formData.address;
            this.currentUser.medicalConditions = formData.medicalConditions;
            this.currentUser.emergencyContacts = formData.emergencyContacts;
            
            // Update UI
            this.updateCurrentUserUI();
            
            // Close modal
            this.closeModal('editProfileModal');
            
            // Show success notification
            this.showNotification('Profile Updated', 'Your profile has been updated successfully!', 'success');
            
        } catch (error) {
            this.showNotification('Error', error.message, 'error');
        }
    }

    getEditFormData() {
        const name = document.getElementById('editName').value.trim();
        const age = document.getElementById('editAge').value;
        const gender = document.getElementById('editGender').value;
        const bloodGroup = document.getElementById('editBloodGroup').value;
        const phone = document.getElementById('editPhone').value.trim();
        const address = document.getElementById('editAddress').value.trim();
        const medicalConditionsText = document.getElementById('editMedicalConditions').value.trim();
        
        // Parse medical conditions
        const medicalConditions = medicalConditionsText 
            ? medicalConditionsText.split(',').map(c => c.trim()).filter(c => c)
            : [];
        
        // Parse emergency contacts
        const emergencyContacts = [];
        const contactItems = document.querySelectorAll('.emergency-contact-edit-item');
        
        contactItems.forEach(item => {
            const nameInput = item.querySelector('.emergency-contact-name-input');
            const phoneInput = item.querySelector('.emergency-contact-phone-input');
            const relationInput = item.querySelector('.emergency-contact-relation-input');
            
            const contactName = nameInput.value.trim();
            const contactPhone = phoneInput.value.trim();
            const contactRelation = relationInput.value;
            
            if (contactName && contactPhone && contactRelation) {
                emergencyContacts.push({
                    name: contactName,
                    phone: contactPhone,
                    relation: contactRelation
                });
            }
        });
        
        return {
            name,
            age,
            gender,
            bloodGroup,
            phone,
            address,
            medicalConditions,
            emergencyContacts
        };
    }

    showNotification(title, message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        notification.innerHTML = `
            <div class="notification-header">
                <h4 class="notification-title">${this.escapeHtml(title)}</h4>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <p class="notification-message">${this.escapeHtml(message)}</p>
        `;

        const notificationCenter = document.getElementById('notificationCenter');
        if (notificationCenter) {
            notificationCenter.appendChild(notification);
        }

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        // Close button
        notification.querySelector('.notification-close')?.addEventListener('click', () => {
            notification.remove();
        });
    }

    updateChatBadges() {
        let totalUnread = 0;
        Object.values(this.chats).forEach(chat => {
            totalUnread += chat.unreadCount || 0;
        });

        const chatsBadge = document.getElementById('chatsBadge');
        if (chatsBadge) {
            if (totalUnread > 0) {
                chatsBadge.textContent = totalUnread;
                chatsBadge.classList.add('show');
            } else {
                chatsBadge.classList.remove('show');
            }
        }
    }

    updateEmergencyBadge() {
        const activeCases = this.emergencyCases.filter(c => c.status === 'Pending' || c.status === 'In Progress');
        const emergencyBadge = document.getElementById('emergencyBadge');
        
        if (emergencyBadge) {
            if (activeCases.length > 0) {
                emergencyBadge.textContent = activeCases.length;
                emergencyBadge.classList.add('show');
            } else {
                emergencyBadge.classList.remove('show');
            }
        }
    }

    // Utility functions
    findCommunity(communityId) {
        const allCommunities = [
            ...this.communities.main_communities,
            ...this.communities.sub_communities || [],
            ...this.communities.sub_sub_communities || [],
            ...this.communities.emergency_communities,
            ...this.communities.authority_communities || []
        ];
        return allCommunities.find(c => c.id === communityId);
    }

    getCommunityName(communityId) {
        const community = this.findCommunity(communityId);
        return community ? community.name : 'Unknown Community';
    }

    getLastMessage(communityId) {
        const messages = this.chats[communityId]?.messages || [];
        return messages[messages.length - 1];
    }

    getOnlineMembers(communityId) {
        return this.users.filter(user => 
            user.isOnline && user.communities?.includes(communityId)
        );
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
        });
    }

    formatDateTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', { 
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Calculate distance between victim and responder (demo values)
    calculateDistance() {
        // Generate realistic distance values for demo
        const distances = ['0.8', '1.2', '1.5', '2.1', '2.8', '3.4', '4.2', '5.7'];
        return distances[Math.floor(Math.random() * distances.length)];
    }

    // Get enhanced authority details for responder profile
    getEnhancedAuthorityDetails(responderInfo) {
        const vehicles = {
            'Police': ['Patrol Unit Alpha-12', 'Police Cruiser PC-456', 'Emergency Response Unit ER-89'],
            'Doctor': ['Medical Unit AMB-23', 'Emergency Medical Vehicle EMV-67', 'Mobile ICU MI-45'],
            'Fire Fighter': ['Fire Truck FT-34', 'Emergency Fire Unit EFU-78', 'Rescue Vehicle RV-12'],
            'Ambulance': ['Ambulance AMB-56', 'Emergency Ambulance EA-23', 'Critical Care Unit CCU-89']
        };

        const statuses = ['En Route to Emergency', 'Mobilizing Response Team', 'Preparing Equipment', 'Coordinating with Base'];
        
        const specializations = {
            'Police': ['Emergency Response', 'Crisis Intervention', 'Search & Rescue', 'Traffic Control'],
            'Doctor': ['Emergency Medicine', 'Trauma Care', 'Critical Care', 'Field Medicine'],
            'Fire Fighter': ['Fire Suppression', 'Emergency Rescue', 'Hazmat Response', 'Medical First Aid'],
            'Ambulance': ['Advanced Life Support', 'Emergency Transport', 'Critical Patient Care', 'Trauma Stabilization']
        };

        const experiences = ['Senior Officer (10+ years)', 'Experienced Professional (5-10 years)', 'Certified Responder (2-5 years)', 'Qualified Officer (1-2 years)'];

        const responderType = responderInfo.responderType || responderInfo.role || 'Police';
        
        return {
            vehicle: vehicles[responderType] ? vehicles[responderType][Math.floor(Math.random() * vehicles[responderType].length)] : `Unit-${Math.floor(Math.random() * 1000)}`,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            specialization: specializations[responderType] ? specializations[responderType][Math.floor(Math.random() * specializations[responderType].length)] : 'General Emergency Response',
            experience: experiences[Math.floor(Math.random() * experiences.length)]
        };
    }

    // Share responder profile with relevant communities
    shareResponderProfileWithCommunities(emergencyCase, responderInfo) {
        // Enhanced authority profile information
        const authorityDetails = this.getEnhancedAuthorityDetails(responderInfo);
        
        const profileShareMessage = {
            id: 'msg_' + this.messageIdCounter++,
            senderId: 'system',
            senderName: 'Authority Coordination Center',
            content: `�‍✈️ RESPONDER AUTHORITY DETAILS\n\n` +
                    `👤 Officer Name: ${responderInfo.name}\n` +
                    `🎖️ Authority Level: ${responderInfo.responderType || responderInfo.role}\n` +
                    `🆔 Badge/ID Number: ${responderInfo.badgeNumber || responderInfo.vehicleNumber || 'ID-' + Math.floor(Math.random() * 10000)}\n` +
                    `📱 Direct Contact: ${responderInfo.phone}\n` +
                    `⏱️ Response ETA: ${responderInfo.eta}\n` +
                    `🚗 Vehicle/Unit: ${authorityDetails.vehicle}\n` +
                    `📍 Current Status: ${authorityDetails.status}\n` +
                    `🎯 Specialization: ${authorityDetails.specialization}\n` +
                    `📊 Experience Level: ${authorityDetails.experience}\n\n` +
                    `🔐 AUTHORITY VERIFICATION: CONFIRMED\n` +
                    `🔒 This profile is verified and shared for emergency coordination only.`,
            timestamp: new Date(),
            type: 'text',
            isSystemMessage: true,
            isProfileShare: true,
            isHelperResponse: true // Yellow styling for helper profile sharing
        };

        // Share with police community if responder is not police
        if (responderInfo.responderType !== 'Police') {
            const policeCommunity = this.communities.emergency_communities.find(c => 
                c.name.toLowerCase().includes('police')
            );
            if (policeCommunity) {
                if (!policeCommunity.messages) policeCommunity.messages = [];
                policeCommunity.messages.push({
                    ...profileShareMessage,
                    content: `🚔 POLICE COORDINATION\n${profileShareMessage.content}\n\n` +
                            `📍 Emergency Type: ${emergencyCase.alertType}\n` +
                            `⏰ Reported: ${new Date(emergencyCase.timestamp).toLocaleTimeString()}`
                });
            }
        }

        // Share with medical community if it's a medical emergency
        if (emergencyCase.alertType === 'Medical Emergency' || emergencyCase.alertType === 'Blood Emergency') {
            const medicalCommunity = this.communities.emergency_communities.find(c => 
                c.name.toLowerCase().includes('medical') || c.name.toLowerCase().includes('hospital')
            );
            if (medicalCommunity) {
                if (!medicalCommunity.messages) medicalCommunity.messages = [];
                medicalCommunity.messages.push({
                    ...profileShareMessage,
                    content: `🏥 MEDICAL COORDINATION\n${profileShareMessage.content}\n\n` +
                            `🩺 Medical Info: ${emergencyCase.medicalInfo || 'Standard emergency response'}\n` +
                            `🩸 Blood Group: ${emergencyCase.bloodGroup || 'Unknown'}`
                });
            }
        }

        // Share with fire department if it's a fire emergency
        if (emergencyCase.alertType === 'Fire Emergency') {
            const fireCommunity = this.communities.emergency_communities.find(c => 
                c.name.toLowerCase().includes('fire')
            );
            if (fireCommunity) {
                if (!fireCommunity.messages) fireCommunity.messages = [];
                fireCommunity.messages.push({
                    ...profileShareMessage,
                    content: `🚒 FIRE DEPARTMENT COORDINATION\n${profileShareMessage.content}\n\n` +
                            `🔥 Fire Type: Structure/Emergency\n` +
                            `⚠️ Priority: High Response Required`
                });
            }
        }

        // Share with general community for awareness
        const generalCommunity = this.communities.main_communities.find(c => 
            c.name.toLowerCase().includes('general') || c.name.toLowerCase().includes('main')
        );
        if (generalCommunity) {
            if (!generalCommunity.messages) generalCommunity.messages = [];
            generalCommunity.messages.push({
                ...profileShareMessage,
                content: `🤝 COMMUNITY COORDINATION\n\n` +
                        `A ${responderInfo.responderType || responderInfo.role} is responding to a ${emergencyCase.alertType}.\n\n` +
                        `Responder: ${responderInfo.name}\n` +
                        `ETA: ${responderInfo.eta}\n` +
                        `Status: Professional emergency response in progress\n\n` +
                        `🙏 Please keep the area clear and assist authorities if requested.`
            });
        }

        this.renderMessages();
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.modernCommunity = new ModernCommunity();
    
    // Initialize Emergency Button System with delay to ensure DOM is fully loaded
    setTimeout(() => {
        initializeEmergencyButton();
    }, 500);

    // Initialize Help Chatbot with delay to ensure all DOM elements are ready
    setTimeout(() => {
        window.helpChatbot = new HelpChatbot();
        
        // Add global helper function for testing
        window.testChatbot = function() {
            console.log('🧪 Testing Chatbot System...');
            console.log('Chatbot initialized:', !!window.helpChatbot);
            console.log('Chatbot button:', !!document.getElementById('helpChatbotButton'));
            console.log('Chatbot modal:', !!document.getElementById('helpChatbotModal'));
            
            if (window.helpChatbot) {
                window.helpChatbot.openChatbot();
                console.log('✅ Chatbot opened for testing');
            }
        };
    }, 1000);
});

// Emergency Button System
function initializeEmergencyButton() {
    console.log('🔧 Initializing Emergency Button System...');
    
    // Wait for elements to be available
    let attempts = 0;
    const maxAttempts = 10;
    
    function tryInitialize() {
        attempts++;
        console.log(`🔍 Initialization attempt ${attempts}/${maxAttempts}`);
        
        const emergencyBtn = document.getElementById('emergencyMenuBtn');
        const emergencyModal = document.getElementById('emergencyModal');
        const emergencyClose = document.getElementById('emergencyClose');
        const emergencyConfirmModal = document.getElementById('emergencyConfirmModal');
        const emergencyOptions = document.querySelectorAll('.emergency-option');
        
        console.log('🔍 Emergency Button Elements:', {
            emergencyBtn: !!emergencyBtn,
            emergencyModal: !!emergencyModal,
            emergencyClose: !!emergencyClose,
            emergencyConfirmModal: !!emergencyConfirmModal,
            emergencyOptionsCount: emergencyOptions.length,
            bodyHasModals: document.body.innerHTML.includes('emergency-modal')
        });

        // Check if critical elements are missing
        if (!emergencyBtn || !emergencyModal || emergencyOptions.length === 0) {
            if (attempts < maxAttempts) {
                console.warn(`⚠️ Emergency elements not ready, retrying in 200ms... (${attempts}/${maxAttempts})`);
                setTimeout(tryInitialize, 200);
                return;
            } else {
                console.error('❌ Failed to initialize emergency system after maximum attempts');
                return;
            }
        }

        // All elements found, proceed with initialization
        console.log('✅ All emergency elements found, setting up event listeners');
        setupEmergencyEventListeners(emergencyBtn, emergencyModal, emergencyClose, emergencyConfirmModal, emergencyOptions);
        
        // Add ready class to indicate the button is functional
        emergencyBtn.classList.add('ready');
        console.log('🎯 Emergency button system is fully initialized and ready!');
        
        // Test function for debugging
        window.testEmergencySystem = function() {
            console.log('🧪 Testing Emergency System...');
            console.log('Emergency Button:', !!emergencyBtn);
            console.log('Emergency Modal:', !!emergencyModal);
            console.log('Emergency Options:', emergencyOptions.length);
            console.log('ModernCommunity Instance:', !!window.modernCommunity);
            
            if (emergencyBtn) {
                console.log('✅ Emergency button is ready');
                emergencyBtn.style.border = '3px solid lime';
                setTimeout(() => {
                    emergencyBtn.style.border = '';
                }, 2000);
            }
        };
        
        // Auto-test after initialization
        setTimeout(() => {
            window.testEmergencySystem();
        }, 1000);
    }
    
    tryInitialize();
}

function setupEmergencyEventListeners(emergencyBtn, emergencyModal, emergencyClose, emergencyConfirmModal, emergencyOptions) {
    const confirmEmergencyBtn = document.getElementById('confirmEmergency');
    const cancelEmergencyBtn = document.getElementById('cancelEmergency');
    const emergencyLocationInput = document.getElementById('emergencyLocation');
    const emergencyDescriptionInput = document.getElementById('emergencyDescription');
    
    let selectedEmergencyType = null;
    let selectedEmergencyDetails = null;

    // Emergency button click - show modal
    console.log('✅ Adding emergency button click listener');
    emergencyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('🚨 Emergency button clicked!');
        if (emergencyModal) {
            emergencyModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            console.log('📱 Emergency modal should be visible now');
        }
    });

    // Close modal
    if (emergencyClose) {
        console.log('✅ Emergency close button found');
        emergencyClose.addEventListener('click', () => {
            console.log('🔒 Closing emergency modal');
            closeEmergencyModal();
        });
    } else {
        console.error('❌ Emergency close button not found!');
    }

    // Emergency option selection
    if (emergencyOptions.length > 0) {
        console.log(`✅ Found ${emergencyOptions.length} emergency options`);
        emergencyOptions.forEach((option, index) => {
            console.log(`📋 Option ${index + 1}: ${option.dataset.type}`);
            option.addEventListener('click', () => {
                selectedEmergencyType = option.dataset.type;
                const emergencyIcon = option.querySelector('i').className;
                const emergencyTitle = option.querySelector('span').textContent;
                const emergencyDescription = option.querySelector('small').textContent;
                
                console.log('🎯 Emergency option selected:', selectedEmergencyType);
                
                selectedEmergencyDetails = {
                    type: selectedEmergencyType,
                    icon: emergencyIcon,
                    title: emergencyTitle,
                    description: emergencyDescription
                };

                showEmergencyConfirmation();
            });
        });
    } else {
        console.error('❌ No emergency options found!');
    }

    // Confirm emergency
    if (confirmEmergencyBtn) {
        confirmEmergencyBtn.addEventListener('click', () => {
            const location = emergencyLocationInput.value.trim();
            const description = emergencyDescriptionInput.value.trim();

            if (!location) {
                alert('Please enter your location before confirming the emergency.');
                emergencyLocationInput.focus();
                return;
            }

            // Process emergency based on type
            processEmergencyRequest(selectedEmergencyType, location, description);
            
            // Close modals
            closeEmergencyModal();
            closeConfirmationModal();
            
            // Clear form
            emergencyLocationInput.value = '';
            emergencyDescriptionInput.value = '';
        });
    }

    // Cancel emergency
    if (cancelEmergencyBtn) {
        cancelEmergencyBtn.addEventListener('click', () => {
            closeConfirmationModal();
            emergencyModal.classList.add('show'); // Show main modal again
        });
    }

    // Close modal when clicking outside
    emergencyModal.addEventListener('click', (e) => {
        if (e.target === emergencyModal) {
            closeEmergencyModal();
        }
    });

    emergencyConfirmModal.addEventListener('click', (e) => {
        if (e.target === emergencyConfirmModal) {
            closeConfirmationModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (emergencyConfirmModal.classList.contains('show')) {
                closeConfirmationModal();
            } else if (emergencyModal.classList.contains('show')) {
                closeEmergencyModal();
            }
        }
        
        // Ctrl+E to open emergency modal for testing
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            console.log('🔥 Ctrl+E pressed - opening emergency modal');
            emergencyModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    });

    function showEmergencyConfirmation() {
        // Hide main modal
        emergencyModal.classList.remove('show');
        
        // Update confirmation details
        const confirmDetails = document.getElementById('emergencyConfirmDetails');
        if (confirmDetails && selectedEmergencyDetails) {
            confirmDetails.innerHTML = `
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                    <i class="${selectedEmergencyDetails.icon}" style="font-size: 24px; color: var(--color-red-500);"></i>
                    <div>
                        <h3 style="margin: 0; color: var(--color-text);">${selectedEmergencyDetails.title}</h3>
                        <p style="margin: 4px 0 0 0; color: var(--color-text-secondary); font-size: 14px;">${selectedEmergencyDetails.description}</p>
                    </div>
                </div>
                <p style="margin: 0; color: var(--color-red-500); font-weight: 600;">⚠️ This will trigger an immediate emergency response!</p>
            `;
        }
        
        // Show confirmation modal
        emergencyConfirmModal.classList.add('show');
        
        // Focus on location input
        setTimeout(() => {
            emergencyLocationInput.focus();
        }, 300);
    }

    function closeEmergencyModal() {
        emergencyModal.classList.remove('show');
        document.body.style.overflow = '';
        selectedEmergencyType = null;
        selectedEmergencyDetails = null;
    }

    function closeConfirmationModal() {
        emergencyConfirmModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function processEmergencyRequest(emergencyType, location, description) {
        if (!window.modernCommunity) {
            console.error('ModernCommunity instance not available');
            return;
        }

        console.log('🚨 Processing emergency request:', { emergencyType, location, description });

        // Map emergency types to trigger commands
        const emergencyTriggerMap = {
            'fire': '/fire',
            'blood': '/blood',
            'rape': '/rape',
            'medical': '/doctor',
            'disaster': '/disaster',
            'elderly': '/helpelder',
            'development': '/fund',
            'accident': '/missing', // Use missing person trigger for accidents
            'missing': '/missing',
            'custom': '/fund' // Use fund trigger for custom emergencies
        };

        // Handle custom emergency type
        if (emergencyType === 'custom') {
            if (!description) {
                alert('Please describe your emergency situation.');
                return;
            }
            
            console.log('Triggering custom emergency with fund trigger');
            
            // Store custom emergency details
            if (window.modernCommunity) {
                window.modernCommunity.lastEmergencyContext = {
                    location: location,
                    description: description,
                    customType: 'Custom Emergency',
                    timestamp: new Date().toISOString()
                };

                // Use fund trigger for custom emergencies as it's most general
                window.modernCommunity.triggerEmergency('/fund');
                
                // Show success notification
                window.modernCommunity.showNotification(
                    'Emergency Alert Sent',
                    `Your custom emergency has been reported. Help is on the way!`,
                    'success'
                );
            }
            return;
        }

        // Get the appropriate trigger
        const trigger = emergencyTriggerMap[emergencyType];
        if (!trigger) {
            console.error('Unknown emergency type:', emergencyType);
            alert('Unknown emergency type. Please try again.');
            return;
        }

        console.log('Using trigger:', trigger);

        // Store emergency details temporarily for the system to use
        if (window.modernCommunity) {
            // Set emergency context
            window.modernCommunity.lastEmergencyContext = {
                location: location,
                description: description,
                timestamp: new Date().toISOString()
            };

            // Trigger the emergency
            window.modernCommunity.triggerEmergency(trigger);
            
            // Show success notification
            window.modernCommunity.showNotification(
                'Emergency Alert Sent',
                `Your ${selectedEmergencyDetails.title} has been reported. Help is on the way!`,
                'success'
            );
        }
    }
}

// Help Chatbot System
class HelpChatbot {
    constructor() {
        this.isInitialized = false;
        this.currentCategory = 'main';
        this.chatHistory = [];
        
        // Comprehensive Q&A database with emojis and detailed information
        this.qaDatabase = {
            // Main Important Questions - Top Priority
            main: {
                title: "🌟 Main Questions",
                questions: {
                    "community_problems_solving": {
                        button: "🔧 What problems does your community solve?",
                        answer: "🌟 **Our Community Solves Critical Problems:**\n\n**🚨 Emergency Response Issues:**\n• ⚡ **Response Time:** From 20+ minutes to under 2 minutes\n• 🏥 **Medical Emergencies:** 98% faster ambulance coordination\n• 🔥 **Fire Incidents:** Immediate neighbor alerts & fire brigade\n• 👮 **Crime Prevention:** Real-time community watch system\n\n**🤝 Community Connection Problems:**\n• 🏠 **Isolation:** Connecting 50,000+ neighbors across zones\n• 💬 **Communication:** Breaking language & cultural barriers\n• 🆘 **Help Access:** Making assistance available 24/7\n• 👴 **Elder Care:** Dedicated support for senior citizens\n\n**📊 Impact Statistics:**\n• ✅ **500+ Lives Saved** through faster emergency response\n• 🤝 **10,000+ Connections** made between neighbors\n• 🏆 **95% Success Rate** in emergency resolution\n• 🌍 **25 Communities** actively connected and helping each other"
                    },
                    "sustainable_development_goals": {
                        button: "🌍 What Sustainable Development Goals do you support?",
                        answer: "🌍 **Our Platform Supports Multiple UN SDGs:**\n\n**🎯 Primary SDG Alignment:**\n\n**SDG 3 - Good Health & Well-being** 🏥\n• Emergency medical response system\n• Mental health community support\n• Health crisis rapid response\n\n**SDG 11 - Sustainable Cities & Communities** 🏙️\n• Smart community emergency networks\n• Inclusive neighborhood safety systems\n• Resilient urban emergency response\n\n**SDG 16 - Peace, Justice & Strong Institutions** ⚖️\n• Crime prevention through community watch\n• Safe reporting systems for vulnerable groups\n• Transparent emergency response tracking\n\n**SDG 5 - Gender Equality** 👩\n• Anonymous reporting for women's safety\n• Gender-sensitive emergency protocols\n• Safe spaces for vulnerable individuals\n\n**🎯 How We Help Achieve These Goals:**\n• 🚀 **Faster Response Times** save more lives\n• 🤝 **Community Unity** builds stronger societies\n• 🔒 **Safe Reporting** protects vulnerable groups\n• 📊 **Data-Driven** improvements for better outcomes"
                    },
                    "rape_emergency_handling": {
                        button: "🛡️ How do you handle rape/assault emergencies?",
                        answer: "🛡️ **Serious & Sensitive Rape Emergency Protocol:**\n\n**🔒 Anonymous Protection System:**\n• 🕶️ **Complete Anonymity** - No personal details exposed\n• 📍 **Location Only** - Helper gets general area, not exact address\n• 🤐 **Privacy First** - No names, photos, or identifying info shared\n\n**⚡ Immediate Response Process:**\n1️⃣ **Alert Triggered** - Woman presses emergency button/command\n2️⃣ **Authority Notification** - Police community instantly activated\n3️⃣ **Helper Verification** - Only verified responders can accept\n4️⃣ **Anonymous Details** - Helper gets basic situation info only\n5️⃣ **Secure Communication** - Protected channel for coordination\n\n**👮 Serious Treatment:**\n• 🚨 **Highest Priority** - Immediately routed to Police Authority\n• 🏥 **Medical Support** - Automatic medical team notification\n• 👩‍⚕️ **Counselor Alert** - Mental health support activated\n• 📋 **Case Tracking** - Professional documentation & follow-up\n\n**🔐 What Helpers See:**\n• ⚠️ \"**Sexual Assault Emergency in Sector [X]**\"\n• 📍 **General Location** (not exact address)\n• ⏰ **Time of Alert**\n• 🚨 **Priority Level: CRITICAL**\n\n**✅ Helper Must Accept Responsibility Before Viewing Any Details**\n\n💡 **Remember:** We take this extremely seriously - it's about saving lives while protecting dignity."
                    }
                }
            },

            // Basic Platform Questions
            basic: {
                title: "📱 Platform Basics",
                questions: {
                    "what_is_platform": {
                        button: "🏠 What is this platform?",
                        answer: "🌟 **Modern Community Emergency Platform** is a life-saving emergency response system that connects community members, authorities, and responders in real-time.\n\n🎯 **Main Purpose:** Save lives through instant emergency alerts and community coordination.\n\n✨ **Key Features:**\n• 🚨 Instant emergency alerts (under 30 seconds)\n• 👥 Community-based response network\n• 🏥 Multi-authority coordination (Police/Fire/Medical)\n• 📍 Location-based assistance system\n• 🔒 Anonymous reporting for sensitive situations\n• 🤝 24/7 neighbor support network\n\n🏆 **Why It Works:** Because your neighbors are always closer than distant emergency services!"
                    },
                    "why_use_platform": {
                        button: "❓ Why should I use this?",
                        answer: "💪 **Why Choose Our Platform:**\n\n⚡ **Speed Saves Lives:**\n• Emergency alerts reach authorities in 15 seconds\n• Average response time: Under 2 minutes\n• Your neighbors respond before official services arrive\n\n🤝 **Community Power:**\n• 10,000+ verified community members ready to help\n• Local knowledge of your exact area\n• Multiple helpers available 24/7 in your zone\n\n🎯 **Smart Technology:**\n• Authority-specific routing (Police/Medical/Fire/Disaster)\n• Anonymous reporting for sensitive situations\n• Real-time tracking of emergency response\n\n🔒 **Privacy & Safety:**\n• Secure community-based communication\n• Verified member system\n• Anonymous options for vulnerable situations\n\n📱 **Always Accessible:**\n• Works on any device, anywhere\n• Simple one-click emergency activation\n• No complicated forms during crisis"
                    },
                    "how_it_helps": {
                        button: "🆘 How does it help in emergencies?",
                        answer: "🚨 **Complete Emergency Response Process:**\n\n**⚡ Instant Alert (0-30 seconds):**\n1️⃣ **Report:** Click emergency button or use /fire, /rape, /medical commands\n2️⃣ **Smart Routing:** System identifies emergency type automatically\n3️⃣ **Authority Alert:** Specific authorities notified instantly\n\n**🤝 Community Mobilization (30 seconds - 2 minutes):**\n4️⃣ **Neighbor Alerts:** Nearby verified helpers get notification\n5️⃣ **Response Coordination:** Multiple helpers can respond simultaneously\n6️⃣ **Real-time Updates:** Everyone stays informed of progress\n\n**👮 Professional Response (2-10 minutes):**\n7️⃣ **Official Services:** Police/Fire/Medical dispatched with full details\n8️⃣ **Case Management:** Professional tracking and follow-up\n9️⃣ **Resolution Confirmation:** Ensure help has arrived successfully\n\n**📊 Proven Results:**\n• ⏱️ **Average Response:** 90 seconds\n• 🏆 **Success Rate:** 98% emergency resolution\n• 💝 **Lives Saved:** 500+ documented cases\n• 🤝 **Community Satisfaction:** 97% user trust rating"
                    },
                    "get_started_guide": {
                        button: "🎯 Complete Getting Started Guide",
                        answer: "🎯 **Complete Getting Started Guide:**\n\n**Step 1: Choose Your Profile** 👤\n• Try **Priya** (Regular Member) - East Zone, Sector 4\n• Try **Officer Anil** (Police Responder) - See authority view\n• Try **Dr. Meera** (Medical Responder) - Medical emergency expert\n• Try **Elder Ramu** (Community Elder) - Wisdom and guidance\n\n**Step 2: Explore Communities** 🏠\n• 🏙️ **City Central** - Main city-wide discussions\n• 🌆 **East Zone** - Your neighborhood zone\n• 🏠 **Sector 4** - Your immediate local area\n\n**Step 3: Test Emergency Features** 🚨\n• 🔴 Click the **red emergency button** in message area\n• ⌨️ Try emergency commands: **/fire**, **/medical**, **/rape**\n• 📍 Add your location for realistic testing\n\n**Step 4: Join Community Conversations** 💬\n• Send messages in different community levels\n• See how information flows up and down\n• Experience real-time cross-user communication\n\n**Step 5: Understand Authority System** 👮\n• Trigger emergencies to see authority communities unlock\n• Watch how cases get routed to right responders\n• See the professional coordination in action\n\n**🎉 Pro Tips:**\n• 🤖 Use this chatbot anytime for help!\n• 🔄 Switch between users to see different perspectives\n• 📱 Test on mobile for full experience"
                    }
                }
            },

            // Emergency System Questions
            emergency: {
                title: "🚨 Emergency System",
                questions: {
                    "emergency_types": {
                        button: "🔥 What emergencies are supported?",
                        answer: "🚨 **Complete Emergency Types with Response Teams:**\n\n**🔴 Critical Emergencies (Instant Response):**\n• 🛡️ **Rape/Sexual Assault** → Police + Medical + Counselor\n• 🔥 **Fire Emergency** → Fire Brigade + Medical backup\n• 🩸 **Blood Emergency** → Medical + Blood bank network\n• ⚕️ **Medical Crisis** → Ambulance + Doctors + Hospital\n\n**🟡 High Priority Emergencies:**\n• ⚠️ **Natural Disaster** → Disaster Response + NGOs + Government\n• 🚗 **Serious Accident** → Police + Medical + Fire if needed\n• 🔍 **Missing Person** → Police + Community search teams\n\n**🟢 Community Support Emergencies:**\n• 🤲 **Elderly Help** → Senior support volunteers + Medical check\n• 🔧 **Community Development** → Local leaders + Municipal authorities\n• 💰 **Emergency Fund** → NGOs + Community donors\n\n**✨ Smart Features:**\n• 🎯 **Auto-routing** to correct authorities\n• 🏥 **Multi-team coordination** for complex emergencies\n• 📍 **Location-based** nearest responder selection\n• 🔒 **Privacy protection** for sensitive cases\n• ⏰ **24/7 availability** across all emergency types"
                    },
                    "color_codes": {
                        button: "🎨 What do the colors mean?",
                        answer: "🎨 **Smart Color-Coded Message System:**\n\n**🔴 RED MESSAGES** <span class='color-info color-emergency'>Emergency Alerts</span>\n• Life-threatening situations requiring immediate action\n• Rape, fire, medical crisis, blood emergencies\n• Highest priority - everyone stops to help\n• Triggers sound alerts and push notifications\n\n**🟢 GREEN MESSAGES** <span class='color-info color-helper'>Helper Responses</span>\n• Community volunteers responding to emergencies\n• \"On my way\", \"I can help\", \"Bringing supplies\"\n• Shows community support is mobilizing\n• Builds confidence that help is coming\n\n**🔵 BLUE MESSAGES** <span class='color-info color-authority'>Authority Messages</span>\n• Official responder communications\n• Police updates, fire brigade status, medical reports\n• Professional case management updates\n• Authoritative information and instructions\n\n**🟠 ORANGE MESSAGES** <span class='color-info color-community'>Community Updates</span>\n• General community information and discussions\n• Non-emergency coordination and planning\n• Community events and announcements\n• Neighborly conversations and support\n\n**💡 Smart Recognition System:**\n• Colors help you instantly identify message importance\n• Emergency messages always stand out visually\n• Easy to scan conversations during high-stress situations\n• Color-blind friendly with icons and text indicators"
                    },
                    "emergency_commands": {
                        button: "💻 Complete Emergency Commands List",
                        answer: "⌨️ **Complete Emergency Chat Commands:**\n\n**🔴 CRITICAL EMERGENCY COMMANDS:**\n• 🛡️ **/rape** - Sexual assault emergency (Police + Medical + Counselor)\n• 🔥 **/fire** - Fire/explosion emergency (Fire Brigade + Medical)\n• 🩸 **/blood** - Critical blood loss/donation needed (Medical + Blood Bank)\n• ⚕️ **/doctor** - Medical emergency (Ambulance + Hospital)\n\n**🟡 HIGH PRIORITY COMMANDS:**\n• ⚠️ **/disaster** - Natural disaster alert (Disaster Response + Government)\n• 🔍 **/missing** - Missing person search (Police + Community)\n• 💰 **/fund** - Emergency financial assistance (NGO + Community)\n\n**🟢 COMMUNITY SUPPORT COMMANDS:**\n• 🤲 **/helpelder** - Senior citizen assistance (Volunteers + Medical)\n• 🔧 **/development** - Infrastructure/community issues (Municipal)\n• 🚗 **/accident** - Traffic or other accidents (Police + Medical)\n\n**💻 How to Use:**\n1. Type the command in any community chat\n2. Add your location: \"/fire At Main Street Market\"\n3. Add details: \"/medical Chest pain, difficulty breathing\"\n4. System automatically routes to correct authorities\n5. Community members and responders get instant alerts\n\n**✨ Pro Tips:**\n• Commands work in ANY chat - city, zone, or sector level\n• You can add location and description in the same message\n• Multiple people can use commands for the same emergency\n• System prevents duplicate alerts automatically"
                    },
                    "response_time_details": {
                        button: "⏰ How fast is emergency response?",
                        answer: "⏰ **Lightning-Fast Response Times:**\n\n**📱 Alert Phase (0-30 seconds):**\n• ⚡ **5 seconds** - Emergency button/command processed\n• 🎯 **10 seconds** - Correct authorities identified and alerted\n• 📢 **15 seconds** - Community members in area notified\n• 🔔 **30 seconds** - All relevant responders have full alert\n\n**🏃 Response Phase (30 seconds - 3 minutes):**\n• 👥 **45 seconds** - First community helper responds \"On my way\"\n• 🚗 **90 seconds** - Average time for first helper to arrive\n• 👮 **2 minutes** - Official authorities (Police/Fire/Medical) dispatched\n• 🏥 **3 minutes** - Professional responders typically arrive\n\n**📊 Real Performance Data:**\n• 🏆 **Average Total Response:** 90 seconds from alert to help\n• ⚡ **Fastest Response:** 23 seconds (neighbor next door)\n• 📈 **98% Success Rate** - Help arrives as expected\n• 🌍 **24/7 Coverage** - Same speed day or night\n\n**🤝 Why So Fast:**\n• Your neighbors are already nearby\n• No call center delays or paperwork\n• Smart routing eliminates confusion\n• Multiple responders can help simultaneously\n• Community knows local shortcuts and challenges\n\n**⚠️ Compare to Traditional:**\n• 🐌 **Traditional Emergency:** 8-20 minutes average\n• ⚡ **Our System:** Under 2 minutes average\n• 🚀 **Speed Improvement:** 10x faster response times"
                    }
                }
            },

            // Community System Questions  
            community: {
                title: "👥 Community System",
                questions: {
                    "community_hierarchy": {
                        button: "🏗️ How does community hierarchy work?",
                        answer: "🏗️ **Smart 3-Level Community Hierarchy:**\n\n**📍 LEVEL 1: SECTOR COMMUNITIES** 🏠\n• Your immediate neighborhood (2-5 blocks)\n• 50-200 families in direct vicinity\n• **Benefits:** Instant local help, know your neighbors personally\n• **Example:** Sector 4 - everyone within 500 meters\n\n**📍 LEVEL 2: ZONE COMMUNITIES** 🌆\n• Broader area covering multiple sectors\n• 1,000-5,000 families in wider region\n• **Benefits:** More responders, diverse skills available\n• **Example:** East Zone - covers Sectors 1-8\n\n**📍 LEVEL 3: CITY COMMUNITIES** 🏙️\n• Entire city coordination and resources\n• 10,000+ families across all zones\n• **Benefits:** Professional authorities, citywide resources\n• **Example:** City Central - covers all zones and sectors\n\n**🎯 Smart Emergency Routing:**\n• 🚨 **Minor Emergency** → Starts at Sector level\n• ⚠️ **Major Emergency** → Escalates to Zone level automatically\n• 🔴 **Critical Emergency** → Immediately reaches City level\n• 🏥 **Specialized Need** → Routes to appropriate authority community\n\n**👑 Authority Levels Within Each:**\n• 👤 **Members** - Regular community participants\n• 🆘 **Responders** - Trained emergency volunteers\n• 👮 **Authorities** - Professional emergency services\n• 👴 **Elders** - Community leaders and advisors\n\n💡 **Why This Works:** Right people get right information at right time!"
                    },
                    "community_benefits": {
                        button: "🌟 What are the amazing community benefits?",
                        answer: "🌟 **Life-Changing Community Benefits:**\n\n**🚀 SPEED & EFFICIENCY:**\n• ⚡ **Neighbors respond in 90 seconds** vs 8-20 minutes for distant services\n• 🗺️ **Local knowledge** - they know shortcuts, building layouts, local challenges\n• 🤝 **Multiple helpers** - 5-10 people can help simultaneously\n• 🏠 **Always nearby** - someone is always awake and available in your area\n\n**💪 COLLECTIVE POWER:**\n• 🛠️ **Diverse Skills** - doctors, engineers, teachers, mechanics all in your neighborhood\n• 🚗 **Shared Resources** - cars, medical supplies, tools, equipment available\n• 💰 **Financial Support** - community can pool money for emergency needs\n• 🧠 **Collective Intelligence** - many minds solve problems faster\n\n**🔐 SAFETY & TRUST NETWORK:**\n• 👁️ **Community Watch** - always someone keeping an eye out\n• ✅ **Verified Members** - everyone goes through community verification\n• 🤝 **Mutual Responsibility** - we all look out for each other\n• 🏠 **Home Security** - neighbors watch your property when you're away\n\n**❤️ EMOTIONAL & SOCIAL SUPPORT:**\n• 👨‍👩‍👧‍👦 **Extended Family** - feel like part of a larger family\n• 🎉 **Community Events** - festivals, celebrations, gatherings\n• 👴 **Elder Care** - senior citizens get daily check-ins and support\n• 🧒 **Child Safety** - kids have multiple trusted adults watching out\n\n**📊 Real Impact Statistics:**\n• 🏆 **500+ Lives Saved** through faster emergency response\n• 💝 **10,000+ Daily Interactions** of neighbors helping neighbors\n• 🏠 **95% Feel Safer** living in connected communities\n• 🤝 **87% Made New Friends** through platform connections"
                    },
                    "authority_communities": {
                        button: "👮 How do specialized authority communities work?",
                        answer: "👮 **Professional Authority Community System:**\n\n**🔒 AUTOMATIC ACCESS CONTROL:**\n• Only unlocked during relevant emergencies for privacy\n• Authorities get comprehensive case information instantly\n• Secure professional communication channels\n• Automatic documentation for legal/medical records\n\n**🎯 SPECIALIZED AUTHORITY COMMUNITIES:**\n\n**👮 POLICE AUTHORITY COMMUNITY:**\n• **Handles:** Rape, assault, crime, missing persons, accidents\n• **Members:** Police officers, detectives, security experts\n• **Features:** Anonymous reporting, evidence tracking, legal coordination\n• **Response:** Immediate dispatch + investigation team\n\n**🏥 MEDICAL AUTHORITY COMMUNITY:**\n• **Handles:** Medical emergencies, blood needs, health crises\n• **Members:** Doctors, nurses, paramedics, medical students\n• **Features:** Medical history access, hospital coordination, specialist calls\n• **Response:** Ambulance + medical team + hospital prep\n\n**🔥 FIRE AUTHORITY COMMUNITY:**\n• **Handles:** Fire, explosions, building collapses, rescues\n• **Members:** Firefighters, rescue specialists, safety experts\n• **Features:** Building layout access, water source mapping, equipment coordination\n• **Response:** Fire trucks + rescue teams + safety perimeter\n\n**⚠️ DISASTER AUTHORITY COMMUNITY:**\n• **Handles:** Natural disasters, mass casualties, infrastructure damage\n• **Members:** Emergency coordinators, government officials, NGO leaders\n• **Features:** Resource mobilization, evacuation coordination, relief distribution\n• **Response:** Multi-agency coordination + government resources\n\n**📋 PROFESSIONAL FEATURES:**\n• 📊 **Case Management** - Complete emergency lifecycle tracking\n• 🔄 **Resource Coordination** - Equipment, personnel, facilities\n• 🤝 **Multi-Agency Collaboration** - Different authorities work together\n• 📝 **Documentation** - Legal records, medical reports, case files\n• 📈 **Performance Analytics** - Response time optimization, success tracking"
                    }
                }
            },

            // Platform Features Questions
            features: {
                title: "⚙️ Advanced Features",
                questions: {
                    "real_time_features": {
                        button: "⚡ What real-time features make this special?",
                        answer: "⚡ **Cutting-Edge Real-Time Features:**\n\n**📱 INSTANT COMMUNICATION:**\n• ⚡ **0.2 second message delivery** across all community levels\n• 🔄 **Live typing indicators** - see when someone is responding\n• ✅ **Read receipts** - know when critical messages are seen\n• 🔔 **Push notifications** - never miss emergency alerts\n\n**🗺️ LIVE LOCATION & TRACKING:**\n• 📍 **Real-time responder locations** - see help approaching on map\n• 🚗 **Estimated arrival times** - know exactly when help arrives\n• 🏃 **Live movement tracking** - watch responders navigate to you\n• 🎯 **Precise emergency location** - helpers find you instantly\n\n**📊 DYNAMIC STATUS UPDATES:**\n• 🚨 **Live emergency status** - \"Alert Sent\" → \"Help Dispatched\" → \"Arrived\"\n• 👥 **Real-time responder count** - see how many people are helping\n• 🏥 **Authority response status** - police/fire/medical dispatch updates\n• ✅ **Resolution confirmation** - real-time case closure\n\n**🔔 SMART NOTIFICATION SYSTEM:**\n• 🎯 **Priority-based alerts** - critical emergencies override everything\n• 📱 **Multi-device sync** - get alerts on phone, tablet, computer\n• 🔊 **Sound alerts** - different tones for different emergency types\n• 👁️ **Visual indicators** - flashing, color changes, badges\n\n**🤝 LIVE COLLABORATION:**\n• 💬 **Group coordination** - all responders communicate in real-time\n• 📋 **Task assignment** - \"John brings medical kit, Sarah calls ambulance\"\n• 🔄 **Resource sharing** - \"I have bandages\", \"Need transportation\"\n• 📸 **Media sharing** - photos, voice messages, location pins\n\n**⚡ Performance Metrics:**\n• 📈 **99.9% Uptime** - system always available when needed\n• 🚀 **Sub-second response** - faster than traditional messaging\n• 🌍 **24/7 Global Coverage** - works anywhere, anytime\n• 📱 **Cross-platform** - iOS, Android, Web, all in sync"
                    },
                    "safety_privacy_features": {
                        button: "🔒 What advanced safety & privacy features exist?",
                        answer: "🔒 **Military-Grade Safety & Privacy Protection:**\n\n**🛡️ PRIVACY PROTECTION:**\n• 🔐 **End-to-end encryption** - messages protected like banking apps\n• 🕶️ **Anonymous reporting** - report emergencies without revealing identity\n• 📍 **Location privacy** - share general area, not exact address\n• 🗑️ **Data retention control** - you decide how long data is stored\n• 👁️ **View tracking** - know who has access to your emergency details\n\n**✅ VERIFICATION & TRUST SYSTEM:**\n• 🏆 **Multi-level member verification** - phone, ID, community references\n• 👮 **Authority credential checks** - real police, doctors, firefighters only\n• 🚫 **False alarm prevention** - smart detection of fake emergencies\n• 🛡️ **Spam protection** - advanced filters for genuine emergencies only\n• ⭐ **Community rating system** - track helper reliability and trustworthiness\n\n**🚨 EMERGENCY SAFETY FEATURES:**\n• 📱 **Panic button mode** - silent alerts when speaking is dangerous\n• 🔒 **Safe word system** - code words for when you can't speak freely\n• 🏃 **Evacuation coordination** - organized community evacuation routes\n• 👥 **Buddy system** - pair vulnerable people with trusted helpers\n• 📞 **Emergency contact integration** - family automatically notified\n\n**🔍 ABUSE PREVENTION:**\n• 🚫 **Harassment protection** - immediate blocking and reporting\n• 👮 **Authority escalation** - serious issues go to police automatically\n• 📝 **Evidence preservation** - secure logging for legal proceedings\n• 🕵️ **Behavior monitoring** - AI detects suspicious patterns\n• ⚖️ **Legal compliance** - meets all privacy and safety regulations\n\n**🌐 TECHNICAL SECURITY:**\n• 🔒 **256-bit encryption** - same security as online banking\n• 🛡️ **DDoS protection** - system stays online during attacks\n• 💾 **Secure cloud backup** - your data is never lost\n• 🔄 **Regular security audits** - constant improvement and testing\n• 🚫 **No data selling** - your information never shared with advertisers"
                    },
                    "future_roadmap": {
                        button: "🚀 What exciting features are coming next?",
                        answer: "🚀 **Revolutionary Future Features Coming Soon:**\n\n**🤖 AI-POWERED INTELLIGENCE (Q1 2026):**\n• 🧠 **Predictive Emergency Detection** - AI spots emergencies before they happen\n• 🎯 **Smart Response Optimization** - AI chooses best responders automatically\n• 📊 **Risk Assessment** - AI identifies high-risk areas and times\n• 💬 **AI Assistant** - 24/7 chatbot for emergency guidance and support\n• 🔍 **Pattern Recognition** - AI detects crime patterns and prevents incidents\n\n**🌐 GLOBAL EXPANSION (Q2 2026):**\n• 🌍 **Multi-City Network** - connect communities across different cities\n• 🏛️ **Government Integration** - direct connection to official emergency services\n• 🌏 **International Support** - emergency help when traveling abroad\n• 🔗 **Cross-Platform Integration** - work with existing emergency systems\n• 📡 **Satellite Connectivity** - work even without internet in disasters\n\n**📱 ADVANCED MOBILE FEATURES (Q3 2026):**\n• 📸 **AR Emergency Guide** - point phone camera for real-time emergency instructions\n• 🗣️ **Voice Command System** - \"Hey Community, I need medical help\"\n• 🎥 **Live Video Support** - stream emergency situation to responders\n• 📱 **Offline Mode** - basic emergency features work without internet\n• ⌚ **Smartwatch Integration** - one-tap emergency from your wrist\n\n**🏥 HEALTH & MEDICAL INTEGRATION (Q4 2026):**\n• 💊 **Medical Record Integration** - responders see your health conditions instantly\n• 🩺 **Telehealth Support** - video calls with doctors during emergencies\n• 💉 **Medication Tracking** - alerts for medicine needs and allergies\n• 🏥 **Hospital Integration** - direct communication with nearest hospitals\n• 🚑 **Ambulance Tracking** - real-time ETA and medical crew status\n\n**🔮 ADVANCED FEATURES (2027+):**\n• 🌟 **Holographic Emergency Meetings** - 3D community coordination\n• 🚁 **Drone Response Network** - aerial emergency response and supplies\n• 🧬 **Biometric Health Monitoring** - detect emergencies from health data\n• 🏠 **Smart Home Integration** - your house calls for help automatically\n• 🤝 **Community Cryptocurrency** - blockchain-based mutual aid system\n\n**💡 Community-Requested Features:**\n• 📚 **Emergency Training Platform** - learn life-saving skills\n• 🎮 **Emergency Simulation Games** - practice emergency response\n• 📊 **Personal Safety Dashboard** - track your community safety metrics\n• 🏆 **Gamification** - earn points and badges for helping others"
                    }
                }
            },

            // Quick Help Questions
            quick: {
                title: "⚡ Quick Help",
                questions: {
                    "immediate_help": {
                        button: "🆘 I need immediate help RIGHT NOW!",
                        answer: "🆘 **IMMEDIATE EMERGENCY HELP - DO THIS NOW:**\n\n**🔴 STEP 1: TRIGGER ALERT (Choose One):**\n• 🚨 **Big Red Emergency Button** - Click the red button in message area\n• ⌨️ **Emergency Commands** - Type: **/fire** **/medical** **/rape** **/blood**\n• 📱 **Mobile** - Tap emergency button, select emergency type\n\n**📍 STEP 2: ADD LOCATION IMMEDIATELY:**\n• Type your exact location: \"123 Main Street, Apartment 4B\"\n• Include landmarks: \"Near Central Mall, blue building\"\n• Be specific: \"Second floor, red door\"\n\n**💬 STEP 3: ADD CRITICAL DETAILS:**\n• **Medical:** \"Chest pain, can't breathe, conscious\"\n• **Fire:** \"Kitchen fire, smoke everywhere, trapped on 2nd floor\"\n• **Assault:** \"Need help now, unsafe situation\"\n• **Accident:** \"Car crash, Main St & Oak Ave, injuries\"\n\n**⏰ EXPECT HELP:**\n• **60 seconds:** First community helper responds\n• **90 seconds:** Helper arrives (average)\n• **3 minutes:** Official authorities arrive\n\n**🔴 FOR LIFE-THREATENING EMERGENCIES:**\n• **ALSO CALL:** Your local emergency number (911/102/etc)\n• **Our platform:** Gets community help faster\n• **Official services:** For professional medical/police/fire response\n\n**💡 REMEMBER:**\n• ✅ **Stay calm** - help is coming fast\n• 📱 **Keep phone close** - responders will contact you\n• 🚪 **Unlock doors** if safe - helpers need to reach you\n• 🗣️ **Shout for help** - neighbors might hear you immediately\n\n**🤝 Community is mobilizing to help you - hold on!**"
                    },
                    "report_problem": {
                        button: "⚠️ How to report different types of problems?",
                        answer: "⚠️ **Complete Problem Reporting Guide:**\n\n**🚨 EMERGENCY PROBLEMS - Use These Commands:**\n• 🛡️ **/rape** - Sexual assault, harassment, feeling unsafe\n• 🔥 **/fire** - Fire, smoke, explosion, gas leaks\n• ⚕️ **/medical** - Health emergency, injury, unconscious person\n• 🩸 **/blood** - Severe bleeding, blood donation urgently needed\n• ⚠️ **/disaster** - Natural disaster, building collapse, flood\n• 🔍 **/missing** - Missing person, lost child, elderly person\n\n**🔧 COMMUNITY PROBLEMS - Use These Commands:**\n• 🏠 **/development** - Broken streetlights, road damage, utilities\n• 💰 **/fund** - Need financial help, community fundraising\n• 🤲 **/helpelder** - Senior citizen needs assistance, health check\n• 🚗 **/accident** - Traffic accidents, property damage\n\n**💻 TECHNICAL PROBLEMS - Try These Solutions:**\n1. **Page Not Loading:** Press F5 or Ctrl+R to refresh\n2. **Messages Not Sending:** Check internet connection\n3. **Emergency Button Not Working:** Use chat commands instead\n4. **Can't See Communities:** Try different user profile\n5. **Audio Not Working:** Check volume settings and permissions\n\n**👥 COMMUNITY BEHAVIOR PROBLEMS:**\n• **Harassment:** Report to community leaders immediately\n• **False Alarms:** Contact authorities through proper channels\n• **Spam/Abuse:** Block user and report to moderators\n• **Privacy Concerns:** Contact platform administrators\n\n**📱 MOBILE APP PROBLEMS:**\n• **Notifications Not Working:** Check app permissions in settings\n• **Location Not Accurate:** Enable GPS/location services\n• **App Crashing:** Update app or restart device\n• **Login Issues:** Clear cache or reinstall app\n\n**🏥 REPORTING SERIOUS ISSUES:**\n• **Always combine** platform alerts with official emergency calls\n• **Document everything** - screenshots, times, details\n• **Follow up** - ensure problems are resolved\n• **Provide feedback** - help improve the system for everyone\n\n**💡 Pro Tips:**\n• 📸 **Take photos** of non-emergency problems to help responders\n• ⏰ **Include time** when reporting ongoing issues\n• 📍 **Be specific** about locations for faster response\n• 🤝 **Thank helpers** after problems are resolved"
                    },
                    "testing_features": {
                        button: "🧪 How to safely test platform features?",
                        answer: "🧪 **Safe Testing Guide - Learn Without Real Alerts:**\n\n**✅ SAFE TESTING METHODS:**\n\n**👤 User Profile Testing:**\n• Switch between different user types to see various perspectives:\n• 👩 **Priya (Member)** - Experience regular user view\n• 👮 **Officer Anil (Police)** - See authority responses\n• 👨‍⚕️ **Dr. Meera (Medical)** - Medical emergency specialist view\n• 👴 **Elder Ramu** - Community leader perspective\n\n**💬 Community Exploration:**\n• 🏙️ **City Central** - Send non-emergency messages\n• 🌆 **East Zone** - Test neighborhood communication\n• 🏠 **Sector 4** - Experience local community chat\n• 👮 **Authority Communities** - Will unlock during test emergencies\n\n**🧪 EMERGENCY TESTING (Safe Methods):**\n\n**Method 1: Use Test Phrases**\n• Add \"TEST\" to your emergency: \"TEST /fire Small kitchen fire\"\n• Community knows it's practice, but system works normally\n• You see full emergency response without causing panic\n\n**Method 2: Use Demo Scenarios**\n• \"/fire TEST - Practice fire drill at 123 Demo Street\"\n• \"/medical TEST - Training scenario for community response\"\n• \"/helpelder TEST - Checking on fictional elderly neighbor\"\n\n**🎮 INTERACTIVE TESTING FEATURES:**\n• 🤖 **This Chatbot** - Ask questions and learn without triggering alerts\n• 🔴 **Emergency Button** - Click and explore options (don't confirm real emergencies)\n• 📱 **Mobile Interface** - Test on phone for full experience\n• 🔊 **Sound System** - Adjust volume and test notification sounds\n\n**📊 WHAT TO OBSERVE DURING TESTING:**\n• ⏰ **Response Times** - How quickly system reacts\n• 🎯 **Smart Routing** - Which authorities get alerted\n• 💬 **Community Engagement** - How neighbors respond\n• 📱 **Cross-Platform** - Test on different devices\n• 🔔 **Notifications** - Sound and visual alerts\n\n**⚠️ IMPORTANT TESTING RULES:**\n• ✅ **Always mark as TEST** to avoid false alarms\n• ❌ **Never test real emergencies** without marking as practice\n• 🤝 **Thank community** for participating in drills\n• 📝 **Provide feedback** on what you learned\n• 🎓 **Share knowledge** with other community members\n\n**🏆 TESTING SCENARIOS TO TRY:**\n1. **Test different emergency types** and see routing differences\n2. **Switch user profiles** during same emergency to see all perspectives\n3. **Test mobile vs desktop** experience\n4. **Try different community levels** for same emergency\n5. **Test during different times** to see 24/7 coverage\n\n**💡 Learning Objectives:**\n• Understand how community hierarchy works\n• See authority coordination in action\n• Learn proper emergency reporting techniques\n• Build confidence in system reliability\n• Practice for real emergencies"
                    }
                }
            }
        };

        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        console.log('🤖 Initializing Help Chatbot System...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupChatbot());
        } else {
            this.setupChatbot();
        }
    }

    setupChatbot() {
        const chatbotButton = document.getElementById('helpChatbotButton');
        const chatbotModal = document.getElementById('helpChatbotModal');
        const chatbotClose = document.getElementById('chatbotClose');
        const chatbotMessages = document.getElementById('chatbotMessages');
        const chatbotQuestions = document.getElementById('chatbotQuestions');

        if (!chatbotButton || !chatbotModal) {
            console.warn('🤖 Chatbot elements not found, retrying...');
            setTimeout(() => this.setupChatbot(), 500);
            return;
        }

        console.log('✅ Chatbot elements found, setting up...');

        // Setup event listeners - Toggle functionality
        chatbotButton.addEventListener('click', () => this.toggleChatbot());
        chatbotClose.addEventListener('click', () => this.closeChatbot());
        
        // Close on outside click
        chatbotModal.addEventListener('click', (e) => {
            if (e.target === chatbotModal) {
                this.closeChatbot();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && chatbotModal.classList.contains('show')) {
                this.closeChatbot();
            }
        });

        // Initialize main questions
        this.showMainQuestions();
        
        this.isInitialized = true;
        console.log('🎉 Help Chatbot System initialized successfully!');
    }

    toggleChatbot() {
        const chatbotModal = document.getElementById('helpChatbotModal');
        const isVisible = chatbotModal.classList.contains('show');
        
        if (isVisible) {
            this.closeChatbot();
        } else {
            this.openChatbot();
        }
    }

    openChatbot() {
        const chatbotModal = document.getElementById('helpChatbotModal');
        chatbotModal.classList.add('show');
        console.log('🤖 Chatbot opened');
    }

    closeChatbot() {
        const chatbotModal = document.getElementById('helpChatbotModal');
        chatbotModal.classList.remove('show');
        console.log('🤖 Chatbot closed');
    }

    showMainQuestions() {
        const questionsContainer = document.getElementById('chatbotQuestions');
        if (!questionsContainer) return;

        questionsContainer.innerHTML = '';
        this.currentCategory = 'main';

        // Add welcome message for main menu
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'question-category main-welcome';
        
        const welcomeTitle = document.createElement('div');
        welcomeTitle.className = 'category-title main-title';
        welcomeTitle.innerHTML = '🤖 Choose a topic to explore:';
        
        welcomeDiv.appendChild(welcomeTitle);
        questionsContainer.appendChild(welcomeDiv);

        // Create category buttons with priority order
        const priorityOrder = ['main', 'emergency', 'community', 'basic', 'features', 'quick'];
        
        priorityOrder.forEach(categoryKey => {
            if (this.qaDatabase[categoryKey]) {
                const category = this.qaDatabase[categoryKey];
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'question-category';
                
                const categoryTitle = document.createElement('div');
                categoryTitle.className = 'category-title';
                categoryTitle.textContent = category.title;
                
                const buttonsDiv = document.createElement('div');
                buttonsDiv.className = 'question-buttons';
                
                // Add questions for this category
                Object.keys(category.questions).forEach(questionKey => {
                    const questionData = category.questions[questionKey];
                    const button = document.createElement('button');
                    button.className = `question-btn ${categoryKey}`;
                    button.innerHTML = questionData.button;
                    button.addEventListener('click', () => {
                        this.showAnswer(questionKey, categoryKey, questionData);
                        // Remove automatic scrolling to prevent interface conflicts
                        // setTimeout(() => {
                        //     questionsContainer.scrollTo({
                        //         top: 0,
                        //         behavior: 'smooth'
                        //     });
                        // }, 200);
                    });
                    buttonsDiv.appendChild(button);
                });
                
                categoryDiv.appendChild(categoryTitle);
                categoryDiv.appendChild(buttonsDiv);
                questionsContainer.appendChild(categoryDiv);
            }
        });
    }

    showAnswer(questionKey, categoryKey, questionData) {
        const messagesContainer = document.getElementById('chatbotMessages');
        if (!messagesContainer) return;

        // Create bot message with answer
        const botMessage = document.createElement('div');
        botMessage.className = 'bot-message';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<i class="fas fa-robot"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        // Process answer text to handle HTML and formatting
        const formattedAnswer = this.formatAnswer(questionData.answer);
        content.innerHTML = `<p>${formattedAnswer}</p>`;
        
        botMessage.appendChild(avatar);
        botMessage.appendChild(content);
        messagesContainer.appendChild(botMessage);
        
        // No automatic scrolling - let user control their chat position
        // Removed: messagesContainer.scrollTo() to prevent interference with main chat
        
        // Add to chat history
        this.chatHistory.push({
            question: questionData.button,
            answer: questionData.answer,
            timestamp: new Date().toISOString()
        });

        // Show enhanced related questions with main menu option
        this.showEnhancedRelatedQuestions(categoryKey);
        
        console.log('🤖 Answered question:', questionKey);
    }

    showEnhancedRelatedQuestions(categoryKey) {
        const questionsContainer = document.getElementById('chatbotQuestions');
        if (!questionsContainer) return;

        const category = this.qaDatabase[categoryKey];
        questionsContainer.innerHTML = '';

        // Add back to main menu button at the top
        const mainMenuButton = document.createElement('button');
        mainMenuButton.className = 'question-btn back-btn main-menu';
        mainMenuButton.innerHTML = '🏠 Back to Main Menu';
        mainMenuButton.addEventListener('click', () => this.showMainQuestions());
        
        const mainMenuDiv = document.createElement('div');
        mainMenuDiv.className = 'question-category';
        mainMenuDiv.appendChild(mainMenuButton);
        questionsContainer.appendChild(mainMenuDiv);

        // Show category title
        const categoryTitle = document.createElement('div');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = `More about ${category.title}`;
        questionsContainer.appendChild(categoryTitle);

        // Show questions from this category
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'question-buttons';
        
        Object.keys(category.questions).forEach(questionKey => {
            const questionData = category.questions[questionKey];
            const button = document.createElement('button');
            button.className = `question-btn ${categoryKey}`;
            button.innerHTML = questionData.button;
            button.addEventListener('click', () => {
                this.showAnswer(questionKey, categoryKey, questionData);
                // Remove automatic scrolling to prevent conflicts
                // questionsContainer.scrollTo({
                //     top: 0,
                //     behavior: 'smooth'
                // });
            });
            buttonsDiv.appendChild(button);
        });
        
        questionsContainer.appendChild(buttonsDiv);

        // Add quick access to other important categories
        if (categoryKey !== 'main') {
            this.addQuickAccessButtons(questionsContainer, categoryKey);
        }
    }

    addQuickAccessButtons(container, currentCategory) {
        const quickAccessDiv = document.createElement('div');
        quickAccessDiv.className = 'question-category';
        
        const quickTitle = document.createElement('div');
        quickTitle.className = 'category-title';
        quickTitle.textContent = '⚡ Quick Access to Other Topics';
        
        const quickButtons = document.createElement('div');
        quickButtons.className = 'question-buttons';
        
        // Add buttons for other important categories
        const otherCategories = Object.keys(this.qaDatabase).filter(key => key !== currentCategory);
        
        otherCategories.forEach(categoryKey => {
            const category = this.qaDatabase[categoryKey];
            const button = document.createElement('button');
            button.className = `question-btn ${categoryKey} quick-access`;
            button.innerHTML = `${category.title.split(' ')[0]} Explore ${categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}`;
            button.addEventListener('click', () => {
                this.showCategoryQuestions(categoryKey);
            });
            quickButtons.appendChild(button);
        });
        
        quickAccessDiv.appendChild(quickTitle);
        quickAccessDiv.appendChild(quickButtons);
        container.appendChild(quickAccessDiv);
    }

    showCategoryQuestions(categoryKey) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const questionsContainer = document.getElementById('chatbotQuestions');
        
        if (!messagesContainer || !questionsContainer) return;

        // Add a transition message
        const botMessage = document.createElement('div');
        botMessage.className = 'bot-message';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<i class="fas fa-robot"></i>';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        
        const category = this.qaDatabase[categoryKey];
        content.innerHTML = `<p>🔄 Let's explore <strong>${category.title}</strong>! Choose any question below to learn more:</p>`;
        
        botMessage.appendChild(avatar);
        botMessage.appendChild(content);
        messagesContainer.appendChild(botMessage);
        
        // Remove automatic scrolling to prevent chat interference
        // messagesContainer.scrollTo({
        //     top: 0,
        //     behavior: 'smooth'
        // });

        // Show category questions
        this.showEnhancedRelatedQuestions(categoryKey);
        
        // Remove automatic scrolling to prevent chat interference
        // questionsContainer.scrollTo({
        //     top: 0,
        //     behavior: 'smooth'
        // });
    }

    formatAnswer(answer) {
        return answer
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
    }

    showRelatedQuestions(categoryKey) {
        const questionsContainer = document.getElementById('chatbotQuestions');
        if (!questionsContainer) return;

        const category = this.qaDatabase[categoryKey];
        questionsContainer.innerHTML = '';

        // Show category title
        const categoryTitle = document.createElement('div');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = `More about ${category.title}`;
        questionsContainer.appendChild(categoryTitle);

        // Show questions from this category
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'question-buttons';
        
        Object.keys(category.questions).forEach(questionKey => {
            const questionData = category.questions[questionKey];
            const button = document.createElement('button');
            button.className = `question-btn ${categoryKey}`;
            button.innerHTML = questionData.button;
            button.addEventListener('click', () => {
                this.showAnswer(questionKey, categoryKey, questionData);
            });
            buttonsDiv.appendChild(button);
        });
        
        questionsContainer.appendChild(buttonsDiv);

        // Add back to main menu button
        const backButton = document.createElement('button');
        backButton.className = 'question-btn back-btn';
        backButton.innerHTML = '🏠 Back to Main Menu';
        backButton.addEventListener('click', () => this.showMainQuestions());
        questionsContainer.appendChild(backButton);
    }

    // Method to hide chatbot on non-welcome screens
    hideOnNavigation() {
        const chatbotButton = document.getElementById('helpChatbotButton');
        const chatbotModal = document.getElementById('helpChatbotModal');
        
        if (chatbotButton) {
            chatbotButton.style.display = 'none';
        }
        if (chatbotModal && chatbotModal.classList.contains('show')) {
            this.closeChatbot();
        }
    }

    // Method to show chatbot on welcome screen
    showOnWelcome() {
        const chatbotButton = document.getElementById('helpChatbotButton');
        if (chatbotButton) {
            chatbotButton.style.display = 'flex';
        }
    }
}

// Enhanced error handling
window.addEventListener('error', (event) => {
    console.error('🚨 JavaScript Error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
    
    // Show user-friendly error notification
    if (window.modernCommunity) {
        window.modernCommunity.showNotification(
            'System Error',
            'A minor error occurred. The application will continue working normally.',
            'error'
        );
    }
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('🚨 Unhandled Promise Rejection:', event.reason);
    
    // Show user-friendly error notification
    if (window.modernCommunity) {
        window.modernCommunity.showNotification(
            'Connection Issue',
            'A minor connection issue occurred. Please try again if needed.',
            'error'
        );
    }
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.modernCommunity) {
            window.modernCommunity = new ModernCommunity();
        }
    });
} else {
    window.modernCommunity = new ModernCommunity();
}

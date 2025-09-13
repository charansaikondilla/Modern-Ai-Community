const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Load environment variables
try {
    require('dotenv').config();
} catch (e) {
    // dotenv not available, use process.env directly
}

const PORT = process.env.PORT || 3006;

// Import AI coordinator for intelligent routing
let coordinator;
try {
    coordinator = require('./coordinator');
    console.log('✅ AI Coordinator loaded successfully');
} catch (error) {
    console.log('🤖 AI Coordinator not available - running without AI features:', error.message);
}

// MIME types mapping
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

// 🚨 ENHANCED AI REQUEST HANDLER WITH AGENTS
function handleAIRequest(requestData) {
    const {
        mode = 'normal',
        trigger,
        userMessage,
        victimDetails,
        emergencyActive = false,
        emergencyType
    } = requestData;

    console.log('🤖 AI Request received:', { mode, trigger, emergencyActive, emergencyType, userMessage });

    // 🚨 AI AGENTS ROUTING - Check for emergency and route to appropriate agent
    if (emergencyActive || emergencyType) {
        console.log('🚨 Emergency detected, routing to AI agent:', emergencyType);
        return handleEmergencyAgent(emergencyType || 'fire', userMessage, requestData);
    }

    // 📋 NORMAL AI RESPONSES for regular chat
    const normalResponses = {
        help: "💡 I'm your AI assistant. I can help with questions, provide information, and assist with emergencies. For any real emergency, please call 911 immediately. What would you like to know?",
        greeting: "👋 Hello! I'm here to help with questions and provide assistance. How can I help you today?",
        default: "I'm here to help! Feel free to ask me anything or type 'help' for more information."
    };

    // Determine normal response
    let response;
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('help')) {
        response = normalResponses.help;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        response = normalResponses.greeting;
    } else {
        response = normalResponses.default;
    }

    return {
        message: response,
        agentType: 'normal',
        agentName: 'AI Assistant',
        emergencyActive: false,
        contextLocked: false,
        timestamp: new Date().toISOString()
    };
}

// 🔥 AI EMERGENCY AGENT HANDLER
function handleEmergencyAgent(emergencyType, userMessage, requestData) {
    try {
        console.log('🚨 Loading emergency agent for type:', emergencyType);
        
        // Load the appropriate emergency agent
        let emergencyAgent;
        
        if (emergencyType === 'fire') {
            emergencyAgent = require('./emergency-agents/fire-agent.js');
        } else if (emergencyType === 'medical') {
            // Use the clean medical agent
            emergencyAgent = require('./emergency-agents/medical-agent-clean.js');
        } else {
            // Default to fire agent for unknown emergencies
            emergencyAgent = require('./emergency-agents/fire-agent.js');
        }
        
        console.log('✅ Emergency agent loaded:', emergencyAgent.name);
        
        // Generate response using the emergency agent
        const context = {
            userRole: requestData.userRole || 'victim',
            emergencyStage: 'immediate',
            userMessage: userMessage,
            userLocation: requestData.user?.location?.address
        };
        
        const agentResponse = emergencyAgent.generateResponse(context);
        
        console.log('✅ Emergency agent response generated:', agentResponse);
        
        return {
            message: agentResponse.message,
            agentType: agentResponse.agentType,
            agentName: agentResponse.agentName,
            emergencyActive: true,
            contextLocked: true,
            timestamp: agentResponse.timestamp
        };
        
    } catch (error) {
        console.error('❌ Emergency agent error:', error);
        
        // Fallback emergency response
        const fallbackResponses = {
            fire: "🚨 FIRE EMERGENCY DETECTED\n\n💙 I WILL HELP YOU - Stay calm!\n\n🔥 IMMEDIATE ACTIONS:\n• Exit building immediately\n• Stay low to avoid smoke\n• Call 911 now\n• Get to safe location\n\n🚒 Fire team is being dispatched to your location",
            medical: "🚨 MEDICAL EMERGENCY DETECTED\n\n💙 I WILL HELP YOU - Stay calm!\n\n🏥 IMMEDIATE ACTIONS:\n• Call 911 immediately\n• Check if person is breathing\n• Apply pressure to bleeding\n• Don't move injured person\n\n🚑 Medical team is being dispatched",
            default: "🚨 EMERGENCY DETECTED\n\n💙 I WILL HELP YOU - Stay calm!\n\n📞 CALL 911 IMMEDIATELY\n\n🚨 Emergency responders are being alerted to your situation."
        };
        
        return {
            message: fallbackResponses[emergencyType] || fallbackResponses.default,
            agentType: 'emergency',
            agentName: 'Emergency Agent',
            emergencyActive: true,
            contextLocked: true,
            timestamp: new Date().toISOString()
        };
    }
}

// Legacy function for backwards compatibility
function handleLegacyAIRequest(requestData) {
    const { mode = 'normal' } = requestData;
    
    // Generate response based on context - LEGACY SUPPORT
    let response = "I'm here to help! How can I assist you today?";
    
    return {
        message: response,
        mode: mode,
        safetyIncluded: true,
        timestamp: new Date().toISOString()
    };
}

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Handle AI API requests
    if (pathname.startsWith('/api/ai') && aiApiHandler) {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    const requestData = JSON.parse(body);
                    
                    // Handle the AI request using the new module
                    if (pathname === '/api/ai') {
                        const aiResponse = await aiApiHandler.handleAIRequest(requestData);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(aiResponse));
                    }
                } catch (error) {
                    console.error('AI API Error:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        message: "🚨 I'm having trouble right now, but your safety is the priority. For any emergency, call 911 immediately. Stay safe!",
                        error: 'AI service error'
                    }));
                }
            });
        } else if (req.method === 'GET') {
            // Handle health check and modes endpoints
            if (pathname === '/api/ai/health') {
                const healthStatus = aiApiHandler.getHealthStatus();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(healthStatus));
            } else if (pathname === '/api/ai/modes') {
                const modesInfo = aiApiHandler.getAvailableModes();
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(modesInfo));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'AI endpoint not found' }));
            }
        } else {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Method not allowed' }));
        }
        return;
    }

    // Handle Coordinator API requests (NEW ENDPOINT)
    if (pathname === '/api/coordinator' && coordinator) {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    console.log('🎯 Coordinator API called');
                    const requestData = JSON.parse(body);
                    const { userMessage, userID, location, details } = requestData;
                    
                    // Validate input
                    if (!userMessage) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({
                            error: 'Missing userMessage in request'
                        }));
                        return;
                    }
                    
                    // Build user context
                    const userContext = {
                        userID: userID || 'anonymous',
                        location: location || '',
                        details: details || {}
                    };
                    
                    console.log('📤 Processing coordinator request:', { userMessage, userContext });
                    
                    // Route through Coordinator
                    const response = await coordinator.handleRequest(userMessage, userContext);
                    
                    console.log('📥 Coordinator response:', response);
                    
                    // Return response in expected format
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: true,
                        response: response.response,
                        agentType: response.agentType,
                        emergencyActive: response.emergencyActive || false,
                        emergencyID: response.emergencyID || null,
                        activeAgent: response.activeAgent || null,
                        source: response.source || 'coordinator'
                    }));
                    
                } catch (error) {
                    console.error('❌ Coordinator API Error:', error);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        error: 'Coordinator service error',
                        response: '⚠️ AI service temporarily unavailable. For real emergencies, call 911 immediately!',
                        agentType: 'error',
                        emergencyActive: false,
                        source: 'error'
                    }));
                }
            });
        } else {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Method not allowed' }));
        }
        return;
    }

    // Handle static file requests
    let filePath = pathname === '/' ? '/index.html' : pathname;
    
    // Remove query parameters
    filePath = filePath.split('?')[0];
    
    const fullPath = path.join(__dirname, filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'text/plain';

    // Log requests for debugging
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${filePath}`);

    // Check if file exists
    fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(`[${new Date().toLocaleTimeString()}] 404 - File not found: ${filePath}`);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                <head><title>404 - File Not Found</title></head>
                <body>
                    <h1>404 - File Not Found</h1>
                    <p>The requested file <strong>${filePath}</strong> was not found.</p>
                    <p><a href="/">← Back to Home</a></p>
                </body>
                </html>
            `);
            return;
        }

        // Read and serve the file
        fs.readFile(fullPath, (err, data) => {
            if (err) {
                console.error(`[${new Date().toLocaleTimeString()}] 500 - Error reading file: ${filePath}`, err.message);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`
                    <html>
                    <head><title>500 - Internal Server Error</title></head>
                    <body>
                        <h1>500 - Internal Server Error</h1>
                        <p>Error reading file: ${err.message}</p>
                    </body>
                    </html>
                `);
                return;
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

// Enhanced error handling
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Please close the existing server or use a different port.`);
        console.log('💡 Try running: netstat -ano | findstr :3000');
        console.log('💡 Then kill the process with: taskkill /PID <PID> /F');
    } else {
        console.error('❌ Server error:', err.message);
    }
    process.exit(1);
});

server.on('clientError', (err, socket) => {
    console.error(`[${new Date().toLocaleTimeString()}] Client error:`, err.message);
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

// Handle uncaught exceptions to prevent server crashes
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    console.log('🔄 Server continuing to run...');
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    console.log('🔄 Server continuing to run...');
});

server.listen(PORT, () => {
    console.log('🚀 Modern Community Emergency Chat Platform');
    console.log('=========================================');
    console.log(`✅ Server running at: http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log('');
    console.log('🔥 Emergency Features Available:');
    console.log('   • Multi-role user system (Members, Responders, Elders)');
    console.log('   • Emergency alert system with sound notifications');
    console.log('   • Community-based hierarchical chat');
    console.log('   • Real-time emergency response workflow');
    console.log('   • 🤖 AI-powered emergency guidance system');
    console.log('');
    console.log('🚨 Emergency Commands:');
    console.log('   /rape - Critical police emergency');
    console.log('   /fire - Fire emergency');
    console.log('   /doctor - Medical emergency');
    console.log('   /blood - Blood donation needed');
    console.log('   /missing - Missing person');
    console.log('   /fund - Emergency funding');
    console.log('   /disaster - Natural disaster');
    console.log('   /helpelder - Elderly assistance');
    console.log('');
    console.log('💡 Demo Users Available:');
    console.log('   • Priya (Member) - Sector 4, East Zone');
    console.log('   • Rahul (Member) - Sector 3, East Zone');
    console.log('   • Officer Anil (Police Responder)');
    console.log('   • Dr. Meera (Medical Responder)');
    console.log('   • Fireman Raj (Fire Responder)');
    console.log('   • Sara (Member) - Sector 5, East Zone');
    console.log('   • Elder Ramu (Elder) - Sector 4, East Zone');
    console.log('');
    console.log('Press Ctrl+C to stop the server');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down server...');
    server.close(() => {
        console.log('✅ Server stopped successfully');
        process.exit(0);
    });
});

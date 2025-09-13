const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url'); // Updated for WHATWG URL API

// Load environment variables
try {
    require('dotenv').config();
} catch (e) {
    // dotenv not available, use process.env directly
}

const PORT = process.env.PORT || 3006;

// Import AI coordinator
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

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Parse URL using WHATWG API to avoid deprecation
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = reqUrl.pathname;

    // Coordinator API
    if (pathname === '/api/coordinator' && coordinator) {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', async () => {
                try {
                    const { userMessage, userID, location, details } = JSON.parse(body);

                    if (!userMessage) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Missing userMessage in request' }));
                        return;
                    }

                    const userContext = {
                        userID: userID || 'anonymous',
                        location: location || '',
                        details: details || {}
                    };

                    const response = await coordinator.handleRequest(userMessage, userContext);

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
                } catch (err) {
                    console.error('❌ Coordinator API Error:', err);
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

    // Serve static files from public/
    const publicDir = path.join(process.cwd(), 'public'); // Use process.cwd() for Render deployment
    let filePath = pathname === '/' ? '/index.html' : pathname;
    filePath = filePath.split('?')[0];
    const fullPath = path.join(publicDir, filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'text/plain';

    fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`<h1>404 - File Not Found</h1><p>${filePath} not found</p>`);
            return;
        }

        fs.readFile(fullPath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`<h1>500 - Error</h1><p>${err.message}</p>`);
                return;
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

// Error handling
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use.`);
    } else {
        console.error('❌ Server error:', err.message);
    }
    process.exit(1);
});

process.on('SIGINT', () => {
    console.log('\n👋 Shutting down server...');
    server.close(() => {
        console.log('✅ Server stopped successfully');
        process.exit(0);
    });
});

server.listen(PORT, () => {
    console.log('🚀 Modern Community Emergency Chat Platform');
    console.log(`✅ Running at: http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${path.join(process.cwd(), 'public')}`);
});

// Simple test using curl equivalent for PowerShell
console.log('🧪 Quick AI API Test...');

async function quickTest() {
    try {
        const fetch = (await import('node-fetch')).default;
        
        const response = await fetch('http://localhost:3006/api/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userMessage: '/fire',
                emergencyType: 'fire',
                emergencyActive: true
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ SUCCESS! AI API is working');
            console.log('🔥 Fire agent response received');
            console.log('📝 Message preview:', data.message?.substring(0, 100) + '...');
        } else {
            console.log('❌ Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
}

quickTest();

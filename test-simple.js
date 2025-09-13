// 🧪 SIMPLE COORDINATOR TEST
console.log('🧪 Testing Coordinator import...');

try {
    const coordinator = require('./coordinator');
    console.log('✅ Coordinator imported successfully');
    console.log('Coordinator methods:', Object.getOwnPropertyNames(coordinator));
    
    // Test basic functionality
    coordinator.handleRequest('hello', { userID: 'test' }).then(response => {
        console.log('✅ Test response:', response);
    }).catch(error => {
        console.error('❌ Test error:', error.message);
    });
    
} catch (error) {
    console.error('❌ Import error:', error.message);
}
// 🧪 TEST SPECIALIZED EMERGENCY AGENTS
// Test script to verify agent system works correctly

const emergencyCoordinator = require('./emergency-agents/emergency-coordinator');

console.log('🤖 Testing Emergency Agent System...\n');

// Test 1: Fire Emergency
console.log('🔥 TEST 1: Fire Emergency');
const fireTest = emergencyCoordinator.generateResponse({
    userMessage: 'fire in my house help',
    userRole: 'victim',
    userLocation: 'East Sector 4'
});
console.log('Response:', fireTest.message.substring(0, 200) + '...');
console.log('Agent Type:', fireTest.agentType);
console.log('Context Locked:', fireTest.contextLocked);
console.log('');

// Test 2: Medical Emergency  
console.log('🏥 TEST 2: Medical Emergency');
const medicalTest = emergencyCoordinator.generateResponse({
    userMessage: 'someone is unconscious and not breathing',
    userRole: 'bystander',
    userLocation: 'West Sector 2'
});
console.log('Response:', medicalTest.message.substring(0, 200) + '...');
console.log('Agent Type:', medicalTest.agentType);
console.log('Context Locked:', medicalTest.contextLocked);
console.log('');

// Test 3: Non-Emergency (should not trigger agents)
console.log('💬 TEST 3: Non-Emergency');
const normalTest = emergencyCoordinator.generateResponse({
    userMessage: 'what is the weather today',
    userRole: 'member',
    userLocation: 'North Sector 1'
});
console.log('Response:', normalTest.message);
console.log('Agent Type:', normalTest.agentType);
console.log('Emergency Detected:', normalTest.emergencyDetected);
console.log('');

// Test 4: Agent Status
console.log('📊 AGENT SYSTEM STATUS:');
const status = emergencyCoordinator.getAgentStatus();
console.log('Available Agents:', status.availableAgents);
console.log('Emergency Types:', status.emergencyTypes);
console.log('Total Agents:', status.totalAgents);

console.log('\n✅ Agent system testing complete!');

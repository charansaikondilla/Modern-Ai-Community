# 🧪 AI Emergency Assistant - Testing Guide

## 🚀 Quick Test Scenarios

### **Scenario 1: Normal Chat**
1. Login as **Priya**
2. Go to any chat (e.g., "City Central")
3. Type: `hello AI` or `help`
4. ✅ **Expected**: AI responds with general assistance and safety reminder

### **Scenario 2: Fire Emergency**
1. Login as **Priya** (victim)
2. Type: `/fire` in any chat
3. ✅ **Expected**: AI provides fire safety guidance with step-by-step instructions
4. Switch to **Fireman Raj** account
5. Accept the emergency when popup appears
6. ✅ **Expected**: AI provides responder guidance with victim details

### **Scenario 3: Medical Emergency**
1. Login as **Rahul** (victim)
2. Type: `/doctor` in any chat
3. ✅ **Expected**: AI provides medical emergency guidance
4. Switch to **Dr. Meera** account
5. Accept the emergency
6. ✅ **Expected**: AI provides medical responder guidance

### **Scenario 4: Assault Emergency**
1. Login as **Sara** (victim)
2. Type: `/rape` in any chat
3. ✅ **Expected**: AI provides trauma-informed support
4. Switch to **Officer Anil** account
5. Accept the emergency
6. ✅ **Expected**: AI provides sensitive response guidance

### **Scenario 5: AI State Persistence**
1. Trigger any emergency
2. Type additional messages during emergency
3. ✅ **Expected**: AI stays in emergency mode until resolved
4. Wait for auto-resolution
5. ✅ **Expected**: AI returns to normal mode

---

## 🔍 What to Look For

### **AI Messages Appearance**
- 🤖 Messages show "🤖 Emergency AI" as sender
- 💬 Appear like normal chat messages
- 🔊 Play message notification sound
- ⚡ Instant response to emergency triggers

### **Safety Instructions**
- ⚠️ Every AI response includes safety reminder section
- 📞 Always mentions emergency services when appropriate
- 🎯 Clear, step-by-step guidance
- 😌 Calm, non-panic-inducing tone

### **Context Awareness**
- 🏥 Includes victim details in responder mode
- 🎯 Appropriate guidance for emergency type
- 🔄 Maintains context throughout emergency
- ✅ Returns to normal after resolution

---

## 🛠️ Testing Commands

### **Emergency Triggers**
```
/fire      - Fire emergency
/doctor    - Medical emergency
/rape      - Assault emergency (anonymous initially)
/disaster  - Natural disaster
/accident  - Accident emergency
```

### **AI Activation Keywords** (in normal mode)
```
help       - General assistance
hello ai   - Greeting response
safety     - Safety information
emergency  - Emergency guidance
```

---

## 📊 Expected Response Examples

### **Fire Emergency Response**
```
🔥 Stay calm! Cover your nose and mouth, stay low to avoid smoke. 
Move quickly to the nearest exit - avoid elevators. 
Call emergency services immediately: 911. 

⚠️ Stay low to avoid smoke, avoid elevators, call emergency services, move to safe exits.
```

### **Responder Guidance**
```
👨‍🚒 Responder briefing: Victim Priya, age 28, asthma patient, Sector 7. 
Approach from upwind side, full PPE required. Backup ETA: 3-5 minutes.

⚠️ Approach from windward side, wear PPE, monitor hazards, call backup.
```

---

## ❌ Troubleshooting

### **AI Not Responding?**
1. Check browser console for errors
2. Verify server is running on port 3003
3. Ensure ai.js loaded after app.js
4. Try refreshing page and re-login

### **Emergency Mode Not Switching?**
1. Check if emergency was properly triggered
2. Look for emergencyTriggered event in console
3. Verify AI state in browser console: `window.emergencyAI.getState()`

### **Messages Not Appearing?**
1. Check if in correct community/chat
2. Verify addMessageToChat function exists
3. Look for console errors during message injection

---

## ✅ Success Indicators

- ✅ AI responds to normal chat keywords
- ✅ Emergency triggers switch AI mode immediately
- ✅ Responder acceptance changes AI context
- ✅ Safety instructions included in every response
- ✅ AI returns to normal mode after resolution
- ✅ All existing functionality still works
- ✅ No UI/design changes

---

**🎯 Ready to test! Start server and try the scenarios above.**

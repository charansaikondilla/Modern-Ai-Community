# 🔑 API Key Setup Guide - AI Emergency Assistant

## 🚀 **QUICK SETUP - Add Your API Key**

### **Step 1: Choose Your AI Service**
We recommend **OpenAI GPT** for the best emergency response quality:

- **OpenAI GPT-3.5/4** (Recommended) - Most reliable
- **Anthropic Claude** - Good alternative 
- **Google Gemini** - Free tier available

### **Step 2: Get Your API Key**

#### **🟢 OpenAI (Recommended)**
1. Go to: https://platform.openai.com/api-keys
2. Create account (requires phone verification)
3. Add payment method (pay-per-use, very affordable)
4. Click "Create new secret key"
5. Copy the key (starts with `sk-...`)

#### **🔵 Anthropic Claude (Alternative)**
1. Go to: https://console.anthropic.com/
2. Create account and verify email
3. Go to API Keys section
4. Create new key
5. Copy the key

#### **🔴 Google Gemini (Free Option)**
1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API key"
4. Copy the key

---

## 🔧 **Step 3: Add Your API Key**

### **Method 1: Environment File (.env) - RECOMMENDED**
1. Open the `.env` file in your project root
2. Replace `your-openai-api-key-here` with your actual key:

```bash
# 🔑 ADD YOUR API KEY HERE
OPENAI_API_KEY=sk-proj-your-actual-key-here
PORT=3005
```

### **Method 2: Direct Code Edit**
1. Open `api/ai.js`
2. Find line 8:
```javascript
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'your-openai-api-key-here';
```
3. Replace with:
```javascript
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'sk-proj-your-actual-key-here';
```

### **Method 3: System Environment Variable**
```bash
# Windows (PowerShell)
$env:OPENAI_API_KEY="sk-proj-your-actual-key-here"

# Windows (Command Prompt)
set OPENAI_API_KEY=sk-proj-your-actual-key-here

# Linux/Mac
export OPENAI_API_KEY=sk-proj-your-actual-key-here
```

---

## 🚀 **Step 4: Install Dependencies & Run**

```bash
# Install required packages
npm install

# Start server
npm start
# OR
node server.js
```

**Expected Output:**
```
🤖 AI Service: OPENAI
✅ AI API handler loaded successfully
🚀 Modern Community Emergency Chat Platform
✅ Server running at: http://localhost:3005
🔥 Emergency Features Available:
   • 🤖 AI-powered emergency guidance system
```

---

## 🧪 **Step 5: Test AI Functionality**

### **Test 1: Normal Chat**
1. Login as **Priya**
2. Type: `hello AI`
3. ✅ **Expected**: Real AI response with safety reminder

### **Test 2: Emergency Mode**
1. Type: `/fire`
2. ✅ **Expected**: Intelligent fire safety guidance from real AI

### **Test 3: Responder Mode**
1. Switch to **Fireman Raj**
2. Accept the emergency
3. ✅ **Expected**: Tactical guidance with victim details

---

## 🛠️ **Troubleshooting**

### **Problem: "Mock mode - add real API key"**
- ❌ API key not set correctly
- ✅ **Fix**: Check `.env` file or direct code edit

### **Problem: "OpenAI API error: 401"**
- ❌ Invalid API key
- ✅ **Fix**: Double-check your API key is correct

### **Problem: "OpenAI API error: 429"**
- ❌ Rate limit exceeded or no credits
- ✅ **Fix**: Add payment method to OpenAI account

### **Problem: AI not responding**
- ❌ Server not running or dependencies missing
- ✅ **Fix**: Run `npm install` then `npm start`

---

## 💰 **API Costs (Very Affordable)**

### **OpenAI Pricing:**
- GPT-3.5-turbo: $0.001 per 1K tokens (~$0.002 per emergency response)
- GPT-4: $0.03 per 1K tokens (~$0.06 per emergency response)

### **Example Usage:**
- 100 emergency responses/day = ~$0.20-$6.00/day
- Most users spend $1-5/month for personal projects

---

## 🔒 **Security Best Practices**

✅ **DO:**
- Keep API keys in `.env` file
- Add `.env` to `.gitignore`
- Use environment variables in production

❌ **DON'T:**
- Commit API keys to version control
- Share API keys publicly
- Hardcode keys in frontend code

---

## 🎯 **Multiple AI Services Setup**

You can configure multiple AI services as fallbacks:

```bash
# In .env file
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key
GOOGLE_API_KEY=your-google-key
```

The system will automatically fall back to mock responses if APIs fail.

---

## ✅ **Final Checklist**

- [ ] API key added to `.env` file
- [ ] Dependencies installed (`npm install`)
- [ ] Server started (`npm start`)
- [ ] Tested normal chat with AI
- [ ] Tested emergency mode
- [ ] AI responses include safety instructions
- [ ] No console errors

---

**🔥 Once your API key is added, your AI Emergency Assistant will be fully functional with intelligent, context-aware responses!**

**🎯 The AI will always be available and work without errors once properly configured.**

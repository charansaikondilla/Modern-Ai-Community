// 🤖 AI AGENT - OpenAI API Integration
// Low temperature, error handling, optional streaming

class AIAgent {
    constructor() {
        this.provider = 'openai'; // Default
        this.baseURL = 'https://api.openai.com/v1/chat/completions';
        this.model = 'gpt-3.5-turbo';
        this.apiKey = this.getAPIKey(); // This will set provider and baseURL
        this.defaultOptions = {
            temperature: 0.1, // Low temperature for consistent emergency responses
            max_tokens: 300,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        };
    }

    // 🔑 GET API KEY AND DETERMINE PROVIDER
    getAPIKey() {
        try {
            const { API_KEYS } = require('../local-keys');
            const key = API_KEYS.OPENAI_API_KEY;
            
            // Detect provider based on key format
            if (key && key.startsWith('sk-or-v1-')) {
                this.provider = 'openrouter';
                this.baseURL = 'https://openrouter.ai/api/v1/chat/completions';
                this.model = 'openai/gpt-3.5-turbo';
                console.log('🔄 Using OpenRouter API');
            } else if (key && key.startsWith('sk-')) {
                this.provider = 'openai';
                this.baseURL = 'https://api.openai.com/v1/chat/completions';
                this.model = 'gpt-3.5-turbo';
                console.log('🔄 Using OpenAI API');
            } else {
                this.provider = null;
                console.log('⚠️ No valid API key detected');
            }
            
            return key;
        } catch (error) {
            // Fallback to environment variable
            return process.env.OPENAI_API_KEY || null;
        }
    }

    // 🎯 CALL OPENAI API
    async callOpenAI(systemPrompt, userMessage, options = {}) {
        if (!this.apiKey) {
            console.log('⚠️ No OpenAI API key available');
            return null;
        }

        const requestOptions = { ...this.defaultOptions, ...options };
        
        const messages = [
            {
                role: 'system',
                content: systemPrompt
            },
            {
                role: 'user',
                content: userMessage
            }
        ];

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            };
            
            // Add specific headers for OpenRouter
            if (this.provider === 'openrouter') {
                headers['HTTP-Referer'] = 'https://emergency-platform.local';
                headers['X-Title'] = 'Emergency AI Assistant';
            }
            
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    model: this.model,
                    messages: messages,
                    ...requestOptions
                })
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status} - ${this.provider}`);
            }

            const data = await response.json();
            
            if (data.choices && data.choices.length > 0) {
                return data.choices[0].message.content.trim();
            }

            return null;

        } catch (error) {
            console.log(`🚨 ${this.provider} API Error:`, error.message);
            return null;
        }
    }

    // 🌊 STREAMING RESPONSE (Optional - for future use)
    async callOpenAIStream(systemPrompt, userMessage, onChunk, options = {}) {
        if (!this.apiKey) {
            console.log('⚠️ No OpenAI API key available');
            return null;
        }

        const requestOptions = { ...this.defaultOptions, ...options, stream: true };
        
        const messages = [
            {
                role: 'system',
                content: systemPrompt
            },
            {
                role: 'user',
                content: userMessage
            }
        ];

        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: messages,
                    ...requestOptions
                })
            });

            if (!response.ok) {
                throw new Error(`OpenAI API error: ${response.status}`);
            }

            const reader = response.body.getReader();
            let fullResponse = '';

            while (true) {
                const { done, value } = await reader.read();
                
                if (done) break;
                
                const chunk = new TextDecoder().decode(value);
                const lines = chunk.split('\n');
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;
                        
                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.choices?.[0]?.delta?.content) {
                                const content = parsed.choices[0].delta.content;
                                fullResponse += content;
                                if (onChunk) onChunk(content);
                            }
                        } catch (e) {
                            // Skip invalid JSON
                        }
                    }
                }
            }

            return fullResponse;

        } catch (error) {
            console.log('🚨 OpenAI Stream Error:', error.message);
            return null;
        }
    }

    // 🔍 TEST API CONNECTION
    async testConnection() {
        if (!this.apiKey) {
            return { success: false, error: 'No API key' };
        }

        try {
            const response = await this.callOpenAI(
                'You are a helpful assistant.',
                'Say "test successful" if you can respond.',
                { max_tokens: 10 }
            );

            return { 
                success: !!response, 
                response: response,
                model: this.model 
            };
        } catch (error) {
            return { 
                success: false, 
                error: error.message 
            };
        }
    }

    // 📊 GET STATUS
    getStatus() {
        return {
            hasAPIKey: !!this.apiKey,
            model: this.model,
            baseURL: this.baseURL,
            defaultOptions: this.defaultOptions
        };
    }
}

module.exports = new AIAgent();
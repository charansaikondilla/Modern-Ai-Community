# SYSTEM.md

## 🚨 System Rules & Best Practices

### 1. **Do Not Change What Works**
- **Never modify** any code, configuration, or file that is already working unless you are explicitly instructed to do so.
- If a change is required, **only** change the specific part mentioned. **Do not refactor, rename, or restructure** unrelated code.

### 2. **AI System Guidelines**
- All AI logic must be modular, well-documented, and easy to test.
- Use clear, descriptive variable and function names.
- Always add comments for complex logic or AI decision points.
- **Do not hardcode sensitive data** (like API keys) in source files.

### 3. **API Key Management**
- Store API keys in a `.env` file or a secure environment variable, never in the codebase.
- Example `.env` entry:
  ```
  AI_API_KEY=your-api-key-here
  ```
- **Never commit** `.env` or any file containing secrets to version control.

### 4. **Change Management**
- **Only change what is requested.** Do not touch other files, features, or logic.
- Before making any change, review the request and confirm the exact scope.
- After making changes, test only the affected area unless otherwise specified.

### 5. **No Mess Policy**
- Do not leave unused code, commented-out blocks, or temporary files.
- Keep the codebase clean and organized.
- If you are unsure, ask before making changes.

### 6. **Documentation**
- Update documentation if your change affects usage, configuration, or behavior.
- Add clear commit messages describing what was changed and why.

---

## Example: Adding an AI API Key

1. Add your key to `.env`:
   ```
   AI_API_KEY=your-api-key-here
   ```
2. In your code, load it securely:
   ```js
   require('dotenv').config();
   const apiKey = process.env.AI_API_KEY;
   ```

---

## Summary

- **Do not touch what works.**
- **Change only what is requested.**
- **Keep the system clean and secure.**
- **Document your changes.**

---

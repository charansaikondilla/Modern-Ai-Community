# Copilot Instructions Guide (`copiolt.md`)

## Purpose
This document provides detailed instructions and best practices for using GitHub Copilot (or similar AI coding assistants) in this project. It is designed to ensure smooth collaboration, error-free code, and a consistent workflow.

---


## General Guidelines

1. **Do Not Interfere with Currently Working Features**
   - **Never** modify, update, or remove any code, feature, or component that is currently working and stable, unless the instruction specifically requests a change to that part.
   - Do **not** touch or alter any existing logic, design, or configuration that is not mentioned in the prompt.
   - Always preserve the integrity and functionality of all existing, working features.
   - If a new feature or fix is requested, implement it in a way that does not disrupt or break any current functionality.
   - If you are unsure whether a change might affect existing features, ask for clarification before proceeding.

2. **No Backward Changes**
   - Do **not** revert or undo previous changes unless explicitly instructed.
   - Maintain forward progress in all code and documentation edits.

3. **Design Integrity**
   - **Do not** alter, update, or redesign any UI/UX or visual design elements unless the instruction specifically requests a design change.
   - All design-related changes must be clearly mentioned in the task or request.

4. **Error-Free Code**
   - Ensure all code is syntactically and logically correct before submission.
   - Run linting and basic tests (if available) after every code change.
   - Avoid introducing new warnings or errors.

5. **Explicit Instructions Only**
   - Only perform actions that are clearly and explicitly requested.
   - Do not make assumptions or add features/changes that are not mentioned.

6. **Documentation**
   - Update documentation only when instructed.
   - Do not remove or alter existing documentation unless specified.

7. **Code Flow and Structure**
   - Follow the existing code structure and conventions.
   - Do not refactor or restructure code unless requested.
   - Maintain readability and consistency throughout the codebase.

8. **Testing and Validation**
   - After making changes, validate that the application runs without errors.
   - If tests exist, ensure all tests pass before considering the task complete.

9. **Communication**
   - If a request is unclear, ask for clarification before proceeding.
   - Summarize the changes made after each task for transparency.

---

## Special Note: Preserving Existing Functionality

- **Absolute Priority:** Do not change, update, or interfere with any existing, working code, design, or feature unless the prompt or instruction specifically mentions it.
- **No Unintended Side Effects:** All new code or changes must be implemented in a way that does not break, alter, or degrade any current functionality.
- **Respect Boundaries:** If a task is to add or fix something, do so without modifying unrelated parts of the codebase.
- **Validation:** After any change, thoroughly test to ensure all previously working features remain fully functional.

---

---

## Workflow Flowchart

1. **Receive Task/Instruction**
2. **Clarify (if needed)**
3. **Plan the Change**
4. **Implement the Change**
5. **Test and Validate**
6. **Document (if instructed)**
7. **Summarize and Report**
8. **Wait for Next Instruction**

---

## Best Practices

- Always backup files before making significant changes.
- Use version control (git) for all code changes.
- Keep commits atomic and descriptive.
- Review code for potential errors or side effects.
- Maintain a changelog if required.

---

## Example Instruction (for Copilot)

> "Add a new feature to handle user login, but do not change any existing design or UI elements. Only update the backend logic."

**Copilot should:**
- Only update backend code related to user login.
- Not touch any frontend or design files.
- Not change unrelated code or documentation.

---

## Final Note

By following these instructions, Copilot (or any AI assistant) will ensure a smooth, error-free, and consistent development process, respecting all project requirements and design constraints.

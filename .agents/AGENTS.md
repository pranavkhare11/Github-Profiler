## Proactive Diagnostic Checking
- **Proactive Check**: Immediately after executing any file edit, creation, deletion, or compilation commands, you must inspect the `current_problems` metadata block (containing IDE lints, TypeScript compile warnings, and type errors).
- **Proactive Fix**: If any warnings or errors are reported in the `current_problems` block, you must resolve them immediately as your highest priority, before concluding your turn or asking the user for verification.

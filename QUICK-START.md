# 🚀 Quick Start Guide: AI-Powered SDLC System

Get started with the AI-powered SDLC system in 5 minutes!

## What You've Got

✅ **8 Specialized AI Agents** - Each expert in their domain  
✅ **1 Orchestrator Agent** - The conductor of the orchestra  
✅ **2 Skills** - Reusable capabilities (GitHub & Testing)  
✅ **Complete Pipeline** - From user story to production

## 📋 Table of Contents

1. [Understanding the System](#understanding-the-system)
2. [Running Your First Pipeline](#running-your-first-pipeline)
3. [Using Individual Agents](#using-individual-agents)
4. [Best Practices](#best-practices)
5. [Troubleshooting](#troubleshooting)

## Understanding the System

### The 8 Agents

```
1. Requirements Agent    → Analyzes user stories
2. Architecture Agent    → Designs system
3. Design Review Agent   → Reviews quality
4. Implementation Agent  → Writes code
5. Testing Agent        → Creates tests
6. Code Review Agent    → Reviews code
7. Documentation Agent  → Writes docs
8. Deployment Agent     → Deploys to production
```

### The Orchestrator

The **SDLC Orchestrator** is like a project manager - it:
- Invokes agents in the right order
- Enforces quality gates
- Handles errors and retries
- Generates comprehensive reports

## Running Your First Pipeline

### Step 1: Prepare Your User Story

Write a clear user story:

```
As a user, I want to see a "Login failed" message 
when I enter invalid credentials so that I know 
the login was unsuccessful.

Valid credentials: username="admin", password="1234"
```

### Step 2: Invoke the Orchestrator

In your AI chat interface:

```
Run complete SDLC pipeline for: Display "Login failed" 
on invalid credentials with valid creds admin/1234
```

### Step 3: Watch the Magic

The Orchestrator will:

```
📍 [1/8] Requirements Agent - Creating requirements...
✅ Created docs/requirements.md

📍 [2/8] Architecture Agent - Designing architecture...
✅ Created docs/architecture.md

📍 [3/8] Design Review Agent - Reviewing design...
✅ Design APPROVED - Created docs/design-review.md

📍 [4/8] Implementation Agent - Writing code...
✅ Created index.html, script.js, style.css

📍 [5/8] Testing Agent - Creating tests...
✅ All tests PASSED (45/45) - 100%

📍 [6/8] Code Review Agent - Reviewing code...
✅ Code APPROVED - Created docs/code-review-report.md

📍 [7/8] Documentation Agent - Writing docs...
✅ Created README.md, user guides

📍 [8/8] Deployment Agent - Deploying v1.0.0...
✅ Successfully deployed to production

🎉 Pipeline Complete! Feature is live!
```

### Step 4: Review the Results

Check the created files:

```bash
# View requirements
cat docs/requirements.md

# View architecture
cat docs/architecture.md

# View test report
cat docs/test-report.md

# View code review
cat docs/code-review-report.md

# Run the app
open index.html
```

## Using Individual Agents

### When to Use Individual Agents

- **Single agent tasks** - "Just create requirements"
- **Debugging** - "Re-run just the tests"
- **Partial updates** - "Update documentation only"
- **Manual workflow** - Step-by-step control

### Examples

#### Requirements Agent Only

```
Invoke Requirements Agent for user story: 
Password reset functionality
```

**Result:** Creates `docs/requirements.md` with FR and NFR

#### Testing Agent Only

```
Invoke Testing Agent to create tests for the login feature
```

**Result:** Creates test files and runs test suite

#### Code Review Agent Only

```
Invoke Code Review Agent to review the current codebase
```

**Result:** Creates `docs/code-review-report.md`

#### Documentation Agent Only

```
Invoke Documentation Agent to update README 
with the new password reset feature
```

**Result:** Updates README and creates guides

## Resuming from a Specific Agent

### Skip Early Phases

Already have requirements and architecture? Start from implementation:

```
Run SDLC pipeline starting from Implementation Agent
```

This skips:
- ❌ Requirements Agent
- ❌ Architecture Agent
- ❌ Design Review Agent

And runs:
- ✅ Implementation Agent
- ✅ Testing Agent
- ✅ Code Review Agent
- ✅ Documentation Agent
- ✅ Deployment Agent

### Common Resume Points

```bash
# After manual requirements
"Run SDLC pipeline starting from Architecture Agent"

# After manual architecture
"Run SDLC pipeline starting from Implementation Agent"

# Just test and deploy
"Run SDLC pipeline starting from Testing Agent"

# Just deploy
"Run SDLC pipeline starting from Deployment Agent"
```

## Quality Gates - What They Mean

### Gate 1: Design Review

**When:** After Architecture Agent  
**Criteria:** Design must be APPROVED  
**What happens if it fails:**
```
❌ Gate 1 FAILED: Design Review = CHANGES REQUIRED

Issues:
- Missing error handling in Message Manager
- Security concern with credential storage

Action: Architecture Agent will fix and re-submit
```

### Gate 2: Testing

**When:** After Testing Agent  
**Criteria:** All tests must PASS (100%)  
**What happens if it fails:**
```
❌ Gate 2 FAILED: Tests = 42/45 passed (93%)

Failed tests:
- login.cy.js > should clear error on input
- validation.test.js > should trim whitespace

Action: Implementation Agent will fix bugs
```

### Gate 3: Code Review

**When:** After Code Review Agent  
**Criteria:** Code must be APPROVED  
**What happens if it fails:**
```
❌ Gate 3 FAILED: Code Review = REJECTED

Critical issues:
- XSS vulnerability in script.js line 45
- No input sanitization

Action: Implementation Agent will fix critical issues
```

### Gate 4: Pre-Deployment

**When:** Before Deployment  
**Criteria:** All checks must PASS  
**What happens if it fails:**
```
❌ Gate 4 FAILED: Pre-deployment checks

Failed checks:
- Documentation incomplete
- CHANGELOG.md not updated

Action: Documentation Agent will update docs
```

## Best Practices

### 1. Start with Clear User Stories

✅ **Good:**
```
As a user, I want to reset my password via email 
so that I can regain access if I forget it.

Acceptance Criteria:
- User enters email address
- System sends reset link
- Link expires after 24 hours
```

❌ **Bad:**
```
Add password reset
```

### 2. Let Agents Iterate

Don't force past failed quality gates. Let agents fix issues:

✅ **Good:** Let Testing Agent report failures, then Implementation Agent fixes  
❌ **Bad:** Manually override test failures

### 3. Review Agent Outputs

Always review what agents create:

```bash
# After Requirements Agent
cat docs/requirements.md

# After Architecture Agent
cat docs/architecture.md

# After Code Review
cat docs/code-review-report.md
```

### 4. Use Git Integration

Commit agent outputs:

```bash
# Each agent should commit its work
git add docs/requirements.md
git commit -m "docs: Add requirements from user story"

# Or let agents do it automatically
```

### 5. Trust the Process

The SDLC pipeline is designed to catch issues early:
- Bad requirements → caught by Architecture Agent
- Bad architecture → caught by Design Review Agent
- Bad code → caught by Testing Agent
- Bad quality → caught by Code Review Agent

## Troubleshooting

### "Pipeline is blocked at Gate X"

**Solution:** Check the agent report for specific issues and fix them.

```bash
# Example: Gate 3 failed
cat docs/code-review-report.md  # Read what's wrong
# Fix the issues
# Re-run from Implementation Agent
```

### "Tests are failing"

**Solution:** Review test report and fix bugs

```bash
cat docs/test-report.md  # See which tests failed
# Fix the code
npm test  # Verify fixes
# Re-run from Implementation Agent
```

### "Deployment failed"

**Solution:** Check pre-deployment checklist

```bash
# Verify all checks
✓ All tests pass
✓ Code review approved
✓ Documentation complete
✓ CHANGELOG updated
```

### "Agent is taking too long"

**Solution:** Agents work sequentially. Complex features take time:

- Requirements: 1-2 minutes
- Architecture: 2-3 minutes
- Implementation: 3-5 minutes
- Testing: 2-4 minutes
- Code Review: 2-3 minutes
- Documentation: 2-3 minutes
- Deployment: 1-2 minutes

**Total:** 13-22 minutes for complete pipeline

### "I want to skip an agent"

**Solution:** Use resume functionality

```bash
# Skip requirements and architecture
"Run SDLC pipeline starting from Implementation Agent"
```

## Advanced Usage

### Custom Agent Invocation

```bash
# Pass specific instructions to an agent
"Invoke Implementation Agent to refactor 
the validation logic for better performance"

"Invoke Testing Agent to add performance 
tests for login response time"

"Invoke Documentation Agent to create 
a video tutorial guide"
```

### Parallel Workflows

For multiple features:

```bash
# Feature 1: Login
"Run SDLC pipeline for: Login functionality"

# Feature 2: Password Reset (in new branch)
"Run SDLC pipeline for: Password reset"

# Feature 3: User Registration (in new branch)
"Run SDLC pipeline for: User registration"
```

### Integration with GitHub

```bash
# After pipeline completes, create PR
gh pr create --title "feat: Add login validation" \
  --body "$(cat docs/code-review-report.md)"

# Merge after review
gh pr merge --squash
```

## Next Steps

1. **Run your first pipeline** - Try the example above
2. **Explore agent outputs** - Read the generated docs
3. **Try individual agents** - Invoke them one by one
4. **Customize agents** - Edit `.github/agents/*.agent.md`
5. **Add new agents** - Create your own specialized agents

## Quick Reference

### Commands Cheat Sheet

```bash
# Full pipeline
"Run complete SDLC pipeline for: [user story]"

# Resume from agent
"Run SDLC pipeline starting from [Agent Name]"

# Single agent
"Invoke [Agent Name] to [task]"

# Check results
cat docs/requirements.md
cat docs/test-report.md
cat docs/code-review-report.md

# Run tests
npm test
npx cypress run

# Deploy
"Invoke Deployment Agent to deploy v1.0.0"
```

### Agent Names

```
Requirements Agent
Architecture Agent
Design Review Agent
Implementation Agent
Testing Agent
Code Review Agent
Documentation Agent
Deployment Agent
SDLC Orchestrator
```

## Getting Help

- **Read agent docs:** `.github/agents/[agent-name].agent.md`
- **Check AGENTS.md:** `.github/AGENTS.md`
- **Review examples:** This guide
- **Open an issue:** GitHub Issues

---

**Happy Automating! 🎉**

Built with ❤️ by AI Agents

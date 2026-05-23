---
name: github-integration
description: Skill for integrating with GitHub to create issues, pull requests, manage branches, and automate Git workflows
---

# GitHub Integration Skill

This skill enables agents to interact with GitHub for complete version control and collaboration workflows.

## Capabilities

1. **Branch Management**
   - Create feature branches
   - Create release branches
   - Merge branches
   - Delete branches

2. **Commit Management**
   - Stage files
   - Create commits with conventional commit messages
   - Push commits to remote
   - View commit history

3. **Pull Request Management**
   - Create pull requests
   - Add PR descriptions with agent reports
   - Request reviews
   - Merge pull requests
   - Close pull requests

4. **Issue Management**
   - Create issues for bugs
   - Create issues for features
   - Link issues to commits and PRs
   - Close issues

5. **Tag Management**
   - Create version tags
   - Push tags to remote
   - List tags

6. **Repository Status**
   - Check repository status
   - View diffs
   - Check for uncommitted changes

---

## Usage Instructions

### 1. Create Feature Branch

```bash
# Create and switch to feature branch
git checkout -b feature/login-validation

# Or using git switch
git switch -c feature/login-validation
```

**Naming Conventions:**
- `feature/<feature-name>` - for new features
- `bugfix/<bug-name>` - for bug fixes
- `hotfix/<issue>` - for urgent production fixes
- `release/<version>` - for release preparation

### 2. Commit Changes

Use **Conventional Commits** format:

```bash
git add <files>
git commit -m "<type>(<scope>): <description>"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, tooling
- `perf`: Performance improvements
- `ci`: CI/CD changes

**Examples:**
```bash
git commit -m "feat(auth): Add login validation logic"
git commit -m "test(auth): Add unit tests for login validation"
git commit -m "docs: Update README with login feature"
git commit -m "fix(ui): Fix error message positioning"
```

### 3. Push to Remote

```bash
# Push current branch
git push origin <branch-name>

# Push with tags
git push origin <branch-name> --tags

# Force push (use carefully)
git push origin <branch-name> --force
```

### 4. Create Pull Request

Using GitHub CLI (`gh`):

```bash
# Create PR with title and body
gh pr create --title "feat: Add login validation" --body "$(cat pr-description.md)"

# Create PR interactively
gh pr create

# Create PR with reviewers
gh pr create --title "feat: Add login validation" --reviewer username1,username2

# Create PR and auto-fill from commits
gh pr create --fill
```

**PR Description Template:**

````markdown
## Description
Brief description of changes.

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Refactoring

## Related Issues
Closes #123

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] All tests passing

## Code Review Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings

## Screenshots (if applicable)
[Add screenshots]

## Agent Reports
### Code Review Report
```
[Paste code review summary]
```

### Test Report
```
Tests: 45/45 passed (100%)
Coverage: 95%
```

## Deployment Notes
- [ ] Ready for production
- [ ] Requires database migration
- [ ] Requires configuration changes
````

### 5. Merge Pull Request

```bash
# Merge PR using GitHub CLI
gh pr merge <pr-number> --squash
gh pr merge <pr-number> --merge
gh pr merge <pr-number> --rebase

# Delete branch after merge
gh pr merge <pr-number> --delete-branch
```

### 6. Create GitHub Issue

```bash
# Create issue using GitHub CLI
gh issue create --title "Bug: Login fails with whitespace" --body "Description of bug"

# Create issue with label
gh issue create --title "Feature: Add password reset" --label "enhancement"

# Create issue from template
gh issue create --template bug_report.md
```

### 7. Create Git Tags

```bash
# Create annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tag to remote
git push origin v1.0.0

# Push all tags
git push origin --tags

# List tags
git tag -l
```

### 8. Check Repository Status

```bash
# Check status
git status

# View diff
git diff

# View staged diff
git diff --staged

# View commit history
git log --oneline

# View branch list
git branch -a
```

---

## Agent Integration Workflows

### Requirements Agent → GitHub

After creating requirements:
```bash
git add docs/requirements.md
git commit -m "docs: Update requirements from user story US-123"
git push origin feature/login-validation
```

### Implementation Agent → GitHub

After implementing features:
```bash
git add src/*.js index.html style.css
git commit -m "feat: Implement login validation - FR-001 to FR-010"
git push origin feature/login-validation
```

### Testing Agent → GitHub

After creating tests:
```bash
git add tests/ cypress/e2e/
git commit -m "test: Add unit and e2e tests for login feature"
git push origin feature/login-validation
```

### Code Review Agent → GitHub PR

Create PR with code review report:
```bash
# Generate PR description from code review
cat > pr-description.md << 'EOF'
## Code Review Summary
✅ **Status:** APPROVED

### Quality Metrics
- Test Coverage: 95%
- Code Quality: Excellent
- Security: No issues found

### Files Changed
- index.html
- script.js
- style.css

### Requirements Coverage
- FR-001 to FR-010: ✓ All implemented
- NFR-001 to NFR-006: ✓ All satisfied

See full report: docs/code-review-report.md
EOF

gh pr create --title "feat: Add login validation" --body "$(cat pr-description.md)"
```

### Deployment Agent → GitHub Release

Create GitHub release with notes:
```bash
# Create tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Create GitHub release
gh release create v1.0.0 \
  --title "Release v1.0.0" \
  --notes-file docs/release-notes-v1.0.0.md

# Or with auto-generated notes
gh release create v1.0.0 --generate-notes
```

---

## Orchestrator → GitHub Workflow

Complete SDLC pipeline with GitHub integration:

```bash
# 1. Create feature branch
git checkout -b feature/login-validation

# 2. Requirements Agent
git add docs/requirements.md
git commit -m "docs: Add requirements from user story"

# 3. Architecture Agent
git add docs/architecture.md
git commit -m "docs: Add system architecture"

# 4. Design Review Agent
git add docs/design-review.md
git commit -m "docs: Add design review - APPROVED"

# 5. Implementation Agent
git add index.html script.js style.css
git commit -m "feat: Implement login validation"

# 6. Testing Agent
git add tests/ cypress/e2e/
git commit -m "test: Add comprehensive test suite"

# 7. Code Review Agent
git add docs/code-review-report.md
git commit -m "docs: Add code review report - APPROVED"

# 8. Documentation Agent
git add README.md docs/*.md
git commit -m "docs: Add user guide and API documentation"

# 9. Push all commits
git push origin feature/login-validation

# 10. Create Pull Request
gh pr create --title "feat: Add login validation" --body "$(cat pr-description.md)"

# 11. Merge PR after review
gh pr merge <pr-number> --squash --delete-branch

# 12. Switch to main and pull
git checkout main
git pull origin main

# 13. Deployment Agent - Tag and release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
gh release create v1.0.0 --notes-file docs/release-notes-v1.0.0.md
```

---

## GitHub CLI Setup

### Install GitHub CLI

```bash
# macOS
brew install gh

# Linux
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# Windows
winget install --id GitHub.cli
```

### Authenticate

```bash
# Login to GitHub
gh auth login

# Check authentication status
gh auth status
```

---

## Best Practices

### 1. Commit Messages

- Use conventional commits format
- Keep first line under 50 characters
- Use body for detailed explanation
- Reference issue numbers

### 2. Branch Management

- Create feature branches from main
- Keep branches short-lived
- Delete merged branches
- Use descriptive branch names

### 3. Pull Requests

- Keep PRs small and focused
- Add comprehensive descriptions
- Link related issues
- Request appropriate reviewers
- Respond to review comments

### 4. Code Review

- Review within 24 hours
- Be constructive and respectful
- Focus on code, not person
- Approve when ready, request changes if needed

### 5. Releases

- Use semantic versioning
- Generate release notes
- Tag releases properly
- Document breaking changes

---

## Troubleshooting

### Authentication Issues

```bash
# Re-authenticate
gh auth logout
gh auth login

# Check auth status
gh auth status
```

### Push Rejected

```bash
# Pull latest changes
git pull origin main --rebase

# Resolve conflicts
git add <resolved-files>
git rebase --continue

# Push
git push origin <branch-name>
```

### Merge Conflicts

```bash
# View conflicts
git status

# Resolve conflicts in editor
# Then stage resolved files
git add <resolved-files>
git commit

# Push
git push origin <branch-name>
```

---

## Security Best Practices

1. **Never commit secrets**
   - Use `.gitignore` for sensitive files
   - Use environment variables
   - Use GitHub Secrets for CI/CD

2. **Use branch protection**
   - Require PR reviews
   - Require status checks
   - Prevent force pushes to main

3. **Sign commits**
   ```bash
   git config --global commit.gpgsign true
   git config --global user.signingkey <key-id>
   ```

4. **Scan for vulnerabilities**
   ```bash
   # Enable Dependabot
   # Enable Code Scanning
   # Enable Secret Scanning
   ```

---

## References

- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

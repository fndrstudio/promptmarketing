# Git Strategy - Prompt Marketing

## Branch Structure

```
main (production)
 └── develop (integration/staging)
      └── feature/* (new features)
      └── fix/* (bug fixes)
      └── content/* (content updates)
```

## Branch Purposes

| Branch | Purpose | Deploys To |
|--------|---------|------------|
| `main` | Production-ready code only | Production |
| `develop` | Integration branch, tested features | Staging |
| `feature/*` | New features in development | — |
| `fix/*` | Bug fixes | — |
| `content/*` | Content/copy updates | — |

## Workflow

### 1. Starting New Work
```bash
git checkout develop
git pull origin develop
git checkout -b feature/descriptive-name
```

### 2. Committing Changes
Atomic commits with conventional messages:
```bash
git add <specific-files>
git commit -m "type: brief description"
```

**Commit Types:**
- `feat:` New feature
- `fix:` Bug fix
- `content:` Content/copy changes
- `style:` Styling changes (CSS, design)
- `refactor:` Code restructuring
- `chore:` Build, config, maintenance
- `docs:` Documentation

### 3. Pushing Feature Branch
```bash
git push -u origin feature/descriptive-name
```

### 4. Merging to Develop
```bash
git checkout develop
git pull origin develop
git merge feature/descriptive-name
git push origin develop
git branch -d feature/descriptive-name
```

### 5. Releasing to Production
```bash
git checkout main
git pull origin main
git merge develop
git push origin main
git checkout develop
```

## Rules

1. **Never commit directly to `main`** — always merge from `develop`
2. **Never force push** to `main` or `develop`
3. **Pull before starting work** on any branch
4. **Keep commits atomic** — one logical change per commit
5. **Test on `develop`** before merging to `main`

## File Exclusions

These stay local and are NOT committed:
- `gradients/` — local design assets
- `logo's/` — local logo files
- `*.md` planning docs in root (except this file)
- `.env*` files

## Quick Reference

```bash
# Start feature
git checkout develop && git pull && git checkout -b feature/name

# Save work
git add -p  # interactive staging
git commit -m "feat: description"

# Finish feature
git checkout develop && git pull && git merge feature/name && git push

# Deploy to production
git checkout main && git pull && git merge develop && git push && git checkout develop
```

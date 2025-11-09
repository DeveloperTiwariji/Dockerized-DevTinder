# 🚀 GitHub Actions CI/CD - Quick Reference

## ⚡ Quick Commands

### View Workflows
```bash
# Check all workflow runs
https://github.com/DeveloperTiwariji/Dockerized-DevTinder/actions

# View specific workflow
https://github.com/DeveloperTiwariji/Dockerized-DevTinder/actions/workflows/ci-cd.yml
```

### Trigger Deployment
```bash
# Method 1: Push to main (automatic)
git add .
git commit -m "deploy: your changes"
git push origin main

# Method 2: Manual deployment
# Go to: Actions → Manual Deployment → Run workflow
# Choose environment and version

# Method 3: Create release tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

## 🔐 GitHub Secrets Setup (One-time)

### 1. Docker Hub Credentials
```bash
# Get your Docker Hub token
1. Login to https://hub.docker.com
2. Account Settings → Security → New Access Token
3. Name: "github-actions"
4. Copy token

# Add to GitHub
Settings → Secrets → New secret
Name: DOCKER_USERNAME    Value: your-dockerhub-username
Name: DOCKER_PASSWORD    Value: paste-token-here
```

### 2. AWS Credentials
```bash
# Create IAM access key
1. AWS Console → IAM → Users → Your User
2. Security credentials → Create access key
3. Choose "Command Line Interface (CLI)"
4. Copy Access Key ID and Secret Access Key

# Add to GitHub
Name: AWS_ACCESS_KEY_ID        Value: paste-access-key
Name: AWS_SECRET_ACCESS_KEY    Value: paste-secret-key
```

### 3. EC2 SSH Access
```bash
# Display your private key
cat ~/.ssh/devtinder_key

# Copy ENTIRE output including:
# -----BEGIN RSA PRIVATE KEY-----
# (all lines)
# -----END RSA PRIVATE KEY-----

# Add to GitHub
Name: EC2_SSH_PRIVATE_KEY    Value: paste-entire-key
Name: EC2_HOST               Value: 3.6.150.204
Name: EC2_USER               Value: ec2-user
```

## 📊 What Gets Deployed

```
Every push to main:
├── Runs backend tests
├── Runs frontend tests
├── Builds Docker images
├── Pushes to Docker Hub
│   ├── <username>/backend-image:latest
│   └── <username>/web-image:latest
└── Deploys to EC2
    ├── Pulls latest code
    ├── Pulls latest images
    ├── Restarts containers
    └── Health check
```

## ✅ Pre-deployment Checklist

Before enabling CI/CD:

```bash
# 1. EC2 Setup
[ ] EC2 instance running
[ ] Security group ports open (22, 80, 3000, 5173, 8080)
[ ] Repository cloned at /home/ec2-user/devtinder
[ ] .env file created on EC2

# 2. GitHub Secrets
[ ] DOCKER_USERNAME
[ ] DOCKER_PASSWORD
[ ] AWS_ACCESS_KEY_ID
[ ] AWS_SECRET_ACCESS_KEY
[ ] EC2_SSH_PRIVATE_KEY
[ ] EC2_HOST
[ ] EC2_USER

# 3. Docker Hub
[ ] Account created
[ ] Repositories created (backend-image, web-image)
[ ] Access token generated

# 4. GitHub Actions
[ ] Workflows enabled
[ ] Actions tab accessible
```

## 🧪 Test Your Pipeline

### Test 1: PR Check
```bash
git checkout -b test-cicd
echo "test" >> README.md
git add README.md
git commit -m "test: CI/CD"
git push origin test-cicd
# Create PR on GitHub → Check Actions tab
```

### Test 2: Main Branch Deployment
```bash
git checkout main
git pull
echo "# CI/CD Test" >> test.md
git add test.md
git commit -m "test: trigger deployment"
git push origin main
# Check Actions tab → Should show full pipeline
```

### Test 3: Manual Deployment
```bash
# GitHub UI:
1. Actions tab
2. "Manual Deployment" workflow
3. "Run workflow" button
4. Select: production, latest
5. "Run workflow"
# Watch deployment logs
```

## 🔍 Monitoring Deployments

### View Deployment Status
```bash
# Real-time
GitHub → Actions → Click running workflow

# History
GitHub → Actions → Filter by status/branch

# Logs
Click workflow → Click job → Expand steps
```

### Verify on EC2
```bash
ssh -i ~/.ssh/devtinder_key ec2-user@<EC2_IP>

# Check running containers
docker ps

# Check logs
docker-compose logs -f

# Check specific service
docker logs server -f
docker logs client -f
docker logs nagios -f
```

### Health Checks
```bash
# Backend
curl http://<EC2_IP>:3000/api/health

# Frontend
curl http://<EC2_IP>:5173

# Nagios
curl http://<EC2_IP>:8080/nagios/
```

## 🐛 Common Issues

### Issue 1: "Login to Docker Hub failed"
```bash
Solution:
1. Regenerate Docker Hub token
2. Update DOCKER_PASSWORD secret
3. Re-run workflow
```

### Issue 2: "SSH connection failed"
```bash
Solution:
1. Verify EC2_HOST is correct
2. Check EC2 instance is running
3. Verify security group allows SSH
4. Check EC2_SSH_PRIVATE_KEY format
```

### Issue 3: "Health check failed"
```bash
Solution:
1. SSH to EC2
2. Check containers: docker ps
3. Check logs: docker-compose logs
4. Verify .env file exists
5. Restart: docker-compose restart
```

### Issue 4: "Permission denied"
```bash
Solution:
1. Check EC2_USER is "ec2-user"
2. Verify SSH key has correct permissions
3. Check /home/ec2-user/devtinder exists
4. Verify user has docker group access
```

## 🔄 Rollback Procedure

### Automatic (Manual Deployment workflow)
```
If deployment fails → Automatic rollback from backup
```

### Manual Rollback
```bash
# SSH to EC2
ssh -i ~/.ssh/devtinder_key ec2-user@<EC2_IP>
cd /home/ec2-user/devtinder

# Option 1: Restore from backup
ls backup-*.tar.gz
tar -xzf backup-20250108-120000.tar.gz
docker-compose up -d

# Option 2: Use previous image version
docker-compose down
# Edit docker-compose.yml to use previous tag
docker-compose pull
docker-compose up -d

# Option 3: Revert git commit
git log --oneline
git reset --hard <previous-commit-hash>
docker-compose down && docker-compose up -d --build
```

## 📈 Workflow Triggers

| Workflow | Trigger | When |
|----------|---------|------|
| CI/CD Pipeline | Push to `main` or `develop` | Always runs full pipeline |
| CI/CD Pipeline | Pull request to `main` | Runs tests only, no deploy |
| PR Checks | Pull request | Runs lint, test, build check |
| Manual Deploy | Manual trigger | Anytime via GitHub UI |

## 🎯 Best Practices

```bash
# 1. Always create feature branches
git checkout -b feature/my-feature

# 2. Create PR for code review
git push origin feature/my-feature
# Then create PR on GitHub

# 3. Test in PR first
# PR runs tests without deploying

# 4. Merge to main after approval
# Triggers automatic deployment

# 5. Use manual deployment for specific versions
# Safer for production

# 6. Monitor deployments
# Check Actions tab and EC2 logs

# 7. Keep secrets up to date
# Rotate every 90 days
```

## 📚 Learn More

- Full documentation: [.github/CICD_SETUP.md](.github/CICD_SETUP.md)
- Main README: [README.md](README.md)
- GitHub Actions: https://docs.github.com/en/actions
- Docker Hub: https://docs.docker.com/docker-hub/

## 🆘 Getting Help

```bash
# Check workflow logs
GitHub → Actions → Failed workflow → View logs

# Check EC2 logs
ssh -i ~/.ssh/devtinder_key ec2-user@<EC2_IP>
docker-compose logs -f

# Open GitHub issue
https://github.com/DeveloperTiwariji/Dockerized-DevTinder/issues/new

# Ask in discussions
https://github.com/DeveloperTiwariji/Dockerized-DevTinder/discussions
```

---

**🎉 You're all set! Push to main to trigger your first deployment!**

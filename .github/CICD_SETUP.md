# GitHub Actions CI/CD Setup Guide

This document explains how to set up and use the GitHub Actions CI/CD pipeline for DevTinder.

## 📋 Overview

The CI/CD pipeline automatically:
- ✅ Builds and tests backend and frontend on every push
- ✅ Runs security scans on pull requests
- ✅ Builds and pushes Docker images to Docker Hub
- ✅ Deploys to AWS EC2 automatically on main branch
- ✅ Provides manual deployment options

## 🔐 Required GitHub Secrets

Navigate to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**

### 1. Docker Hub Credentials

```
Name: DOCKER_USERNAME
Value: your-dockerhub-username

Name: DOCKER_PASSWORD
Value: your-dockerhub-password-or-token
```

**How to get Docker Hub token:**
```bash
1. Login to Docker Hub (https://hub.docker.com)
2. Go to Account Settings → Security
3. Click "New Access Token"
4. Name it "github-actions"
5. Copy the token and save it as DOCKER_PASSWORD secret
```

### 2. AWS Credentials

```
Name: AWS_ACCESS_KEY_ID
Value: your-aws-access-key-id

Name: AWS_SECRET_ACCESS_KEY
Value: your-aws-secret-access-key
```

**How to create AWS credentials:**
```bash
1. Login to AWS Console
2. Go to IAM → Users → Your User
3. Security credentials tab
4. Create access key → Command Line Interface (CLI)
5. Copy both Access Key ID and Secret Access Key
```

### 3. EC2 SSH Credentials

```
Name: EC2_SSH_PRIVATE_KEY
Value: -----BEGIN RSA PRIVATE KEY-----
       (paste your entire private key here)
       -----END RSA PRIVATE KEY-----

Name: EC2_HOST
Value: 3.6.150.204  (your EC2 public IP)

Name: EC2_USER
Value: ec2-user
```

**How to add SSH private key:**
```bash
# Display your private key
cat ~/.ssh/devtinder_key

# Copy the ENTIRE output (including BEGIN/END lines)
# Paste into GitHub secret EC2_SSH_PRIVATE_KEY
```

## 📊 Workflows Explained

### 1. Main CI/CD Pipeline (`ci-cd.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main`
- Manual trigger via GitHub UI

**Jobs:**
```
1. backend-build-test
   └─ Installs dependencies, runs tests, builds Docker image

2. frontend-build-test
   └─ Installs dependencies, builds app, runs tests

3. docker-build-push (only on main branch)
   └─ Builds and pushes images to Docker Hub
   
4. deploy-to-ec2 (only on main branch)
   └─ SSH to EC2, pulls code, restarts containers
   
5. terraform-validate (only on PRs)
   └─ Validates Terraform configuration
   
6. security-scan (only on PRs)
   └─ Scans for vulnerabilities
```

**Workflow visualization:**
```
Push to main
    │
    ├─► Backend Build & Test ──┐
    │                          │
    ├─► Frontend Build & Test ─┤
    │                          │
    └──────────────────────────┴─► Docker Build & Push ──► Deploy to EC2
```

### 2. Pull Request Checks (`pr-checks.yml`)

**Triggers:**
- Pull requests to `main` or `develop`

**What it does:**
- Runs linter on both frontend and backend
- Runs tests
- Builds Docker images to verify Dockerfiles
- Validates docker-compose.yml

**Example:**
```bash
# Create a feature branch
git checkout -b feature/new-feature

# Make changes and push
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Create PR on GitHub
# Workflow automatically runs and shows status
```

### 3. Manual Deployment (`manual-deploy.yml`)

**Triggers:**
- Manual trigger only (via GitHub Actions UI)

**How to use:**
```
1. Go to GitHub → Actions tab
2. Select "Manual Deployment" workflow
3. Click "Run workflow"
4. Choose:
   - Environment: production/staging/development
   - Version: latest or specific tag (e.g., v1.0.0)
5. Click "Run workflow"
```

**Features:**
- ✅ Choose environment
- ✅ Choose specific version to deploy
- ✅ Automatic backup before deployment
- ✅ Automatic rollback on failure

## 🚀 Quick Start

### Step 1: Add Secrets to GitHub

```bash
# Add all 6 required secrets (see above section)
# Settings → Secrets and variables → Actions → New repository secret
```

### Step 2: Enable GitHub Actions

```bash
# Go to your repository
# Click "Actions" tab
# If disabled, click "I understand my workflows, go ahead and enable them"
```

### Step 3: Test the Pipeline

```bash
# Method 1: Push to main (triggers full pipeline)
git checkout main
git pull
echo "test" >> README.md
git add README.md
git commit -m "test: trigger CI/CD"
git push origin main

# Method 2: Create a PR (triggers PR checks only)
git checkout -b test-cicd
echo "test" >> README.md
git add README.md
git commit -m "test: trigger PR checks"
git push origin test-cicd
# Then create PR on GitHub

# Method 3: Manual trigger
# GitHub → Actions → Manual Deployment → Run workflow
```

### Step 4: Monitor Deployment

```bash
# Go to GitHub → Actions tab
# Click on the running workflow
# View real-time logs for each job
```

## 📈 Workflow Status Badges

Add these badges to your README.md:

```markdown
[![CI/CD Pipeline](https://github.com/DeveloperTiwariji/Dockerized-DevTinder/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/DeveloperTiwariji/Dockerized-DevTinder/actions/workflows/ci-cd.yml)

[![PR Checks](https://github.com/DeveloperTiwariji/Dockerized-DevTinder/actions/workflows/pr-checks.yml/badge.svg)](https://github.com/DeveloperTiwariji/Dockerized-DevTinder/actions/workflows/pr-checks.yml)
```

## 🔍 Deployment Process Details

### What Happens During Deployment:

```
1. GitHub Action triggers on push to main
   ↓
2. Runs tests for backend and frontend
   ↓
3. Builds Docker images
   ↓
4. Pushes images to Docker Hub
   ↓
5. SSH into EC2 instance
   ↓
6. Pull latest code from GitHub
   ↓
7. Pull latest Docker images
   ↓
8. Stop current containers
   ↓
9. Start new containers with updated code
   ↓
10. Verify deployment with health check
    ↓
11. Send notification (success/failure)
```

### On EC2, these commands run:

```bash
cd /home/ec2-user/devtinder
git pull origin main
docker-compose pull
docker-compose down
docker-compose up -d
docker-compose ps
docker image prune -f
```

## 🛠️ Customization

### Change Deployment Target

Edit `.github/workflows/ci-cd.yml`:

```yaml
- name: Deploy to EC2
  env:
    EC2_HOST: ${{ secrets.EC2_HOST }}  # Change secret name if needed
    EC2_USER: ${{ secrets.EC2_USER }}
```

### Add Environment Variables

Create `.env` file on EC2 before first deployment:

```bash
ssh -i ~/.ssh/devtinder_key ec2-user@<EC2_IP>
cd /home/ec2-user/devtinder
cat > DevTinder/.env << 'EOF'
MONGO_URI=mongodb://mongodb:27017/devtinder
JWT_SECRET=your-production-secret
NODE_ENV=production
EOF
```

### Add More Environments

Create GitHub environments:

```
1. Go to Settings → Environments
2. Click "New environment"
3. Name it "staging" or "production"
4. Add environment-specific secrets
5. Add protection rules (optional)
```

Then update `manual-deploy.yml` to use environment secrets.

### Add Slack Notifications

Add to any job in workflows:

```yaml
- name: Send Slack notification
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: 'Deployment completed!'
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
  if: always()
```

### Add Tests

Add test scripts to `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "lint": "eslint src/"
  }
}
```

## 🔒 Security Best Practices

### 1. Rotate Secrets Regularly

```bash
# Update Docker Hub token every 90 days
# Update AWS credentials every 90 days
# Update SSH keys yearly
```

### 2. Use Environment Protection Rules

```
Settings → Environments → production → Configure
- Required reviewers (2 people)
- Wait timer (5 minutes)
- Deployment branches (only main)
```

### 3. Scan for Vulnerabilities

The pipeline includes Trivy security scanner. View results:

```
GitHub → Security → Code scanning alerts
```

## 📊 Monitoring Deployments

### View Deployment History

```
GitHub → Actions → All workflows
Filter by: workflow name, branch, status
```

### Check Deployment Logs

```
1. Click on specific workflow run
2. Click on job name (e.g., "Deploy to AWS EC2")
3. Expand step logs
4. View real-time or historical logs
```

### Verify Deployment on EC2

```bash
# SSH to EC2
ssh -i ~/.ssh/devtinder_key ec2-user@<EC2_IP>

# Check containers
docker ps

# Check logs
docker-compose logs -f

# Check specific service
docker logs server -f
```

## 🐛 Troubleshooting

### Pipeline Fails at "Build Backend"

```
Cause: npm install fails
Solution:
1. Check package.json is valid
2. Delete package-lock.json and regenerate
3. Check Node version compatibility
```

### Pipeline Fails at "Login to Docker Hub"

```
Cause: Invalid credentials
Solution:
1. Verify DOCKER_USERNAME is correct
2. Regenerate Docker Hub access token
3. Update DOCKER_PASSWORD secret
```

### Pipeline Fails at "Deploy to EC2"

```
Cause: SSH connection fails
Solution:
1. Verify EC2_HOST is correct public IP
2. Check EC2_SSH_PRIVATE_KEY has correct format
3. Verify security group allows SSH from GitHub IPs
4. Check EC2 instance is running
```

### Deployment Succeeds but App Not Working

```
Cause: Environment variables missing
Solution:
1. SSH to EC2
2. Check .env file exists
3. Restart containers: docker-compose restart
```

### Health Check Fails

```
Cause: Backend not responding
Solution:
1. Check backend container logs: docker logs server
2. Verify backend is running: docker ps
3. Check MongoDB is accessible
4. Verify port 3000 is open in security group
```

## 🔄 Rollback Procedure

### Automatic Rollback (Manual Deployment workflow)

If deployment fails, automatic rollback happens from backup.

### Manual Rollback

```bash
# SSH to EC2
ssh -i ~/.ssh/devtinder_key ec2-user@<EC2_IP>

# Navigate to app directory
cd /home/ec2-user/devtinder

# List backups
ls -lh backup-*.tar.gz

# Restore from backup
tar -xzf backup-20250108-103045.tar.gz
docker-compose up -d

# Or rollback to specific Docker image version
docker-compose down
sed -i 's/:latest/:v1.0.0/g' docker-compose.yml
docker-compose pull
docker-compose up -d
```

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Hub Documentation](https://docs.docker.com/docker-hub/)
- [AWS EC2 User Guide](https://docs.aws.amazon.com/ec2/)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

## ✅ Deployment Checklist

Before first deployment:

- [ ] All 6 GitHub secrets configured
- [ ] Docker Hub account created and logged in
- [ ] EC2 instance running and accessible
- [ ] Security group ports open (22, 80, 3000, 5173, 8080)
- [ ] Repository cloned on EC2 at `/home/ec2-user/devtinder`
- [ ] .env file created on EC2 with correct values
- [ ] Docker and Docker Compose installed on EC2
- [ ] GitHub Actions enabled for repository
- [ ] Test deployment with manual workflow first

---

**Need Help?** Check the [main README](../README.md) or open an issue on GitHub.

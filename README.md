# 🔥 DevTinder - Dockerized Full-Stack Application

> A production-ready, fully Dockerized dating application with React frontend, Node.js backend, MongoDB database, Redis cache, and Nagios monitoring - deployed on AWS EC2 with Terraform infrastructure.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)](https://www.docker.com/)
[![Terraform](https://img.shields.io/badge/Terraform-IaC-7B42BC?logo=terraform)](https://www.terraform.io/)
[![Nagios](https://img.shields.io/badge/Monitoring-Nagios-00C853)](https://www.nagios.org/)
[![CI/CD](https://github.com/DeveloperTiwariji/Dockerized-DevTinder/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/DeveloperTiwariji/Dockerized-DevTinder/actions/workflows/ci-cd.yml)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Quick Start - Local Development](#-quick-start---local-development)
- [Docker Services](#-docker-services)
- [Infrastructure Setup (Terraform)](#-infrastructure-setup-terraform)
- [Deployment to AWS EC2](#-deployment-to-aws-ec2)
- [CI/CD with GitHub Actions](#-cicd-with-github-actions)
- [Nagios Monitoring](#-nagios-monitoring)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

DevTinder is a modern dating application showcasing enterprise-grade architecture with microservices, containerization, infrastructure as code, and comprehensive monitoring. This project demonstrates:

- **Full-stack development** with React and Node.js
- **Containerization** using Docker and Docker Compose
- **Infrastructure as Code** with Terraform
- **Configuration Management** using Ansible
- **Monitoring & Alerting** with Nagios
- **CI/CD** with Jenkins pipeline
- **Cloud Deployment** on AWS EC2

---

## 🏗️ Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          AWS EC2 Instance                           │
│                         (Amazon Linux 2)                            │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                    Docker Network                             │ │
│  │                  (devconnect-network)                         │ │
│  │                                                               │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐ │ │
│  │  │   Nginx     │  │   Node.js   │  │      MongoDB         │ │ │
│  │  │  (Frontend) │◄─┤   Express   │◄─┤   (Database)         │ │ │
│  │  │   React     │  │  (Backend)  │  │   Port: 27017        │ │ │
│  │  │  Port: 5173 │  │  Port: 3000 │  │   Data: Persistent   │ │ │
│  │  │             │  │             │  └──────────────────────┘ │ │
│  │  └─────────────┘  └─────────────┘                           │ │
│  │         │                 │                                  │ │
│  │         │                 │         ┌──────────────────────┐ │ │
│  │         │                 └────────►│       Redis          │ │ │
│  │         │                           │     (Cache)          │ │ │
│  │         │                           │   Port: 6379         │ │ │
│  │         │                           └──────────────────────┘ │ │
│  │         │                                                    │ │
│  │         │                           ┌──────────────────────┐ │ │
│  │         └──────────────────────────►│      Nagios          │ │ │
│  │                                     │   (Monitoring)       │ │ │
│  │                                     │   Port: 8080         │ │ │
│  │                                     │   Checks: All Svcs   │ │ │
│  │                                     └──────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                     │
│  Security Group Rules:                                              │
│  - Port 22 (SSH)                                                   │
│  - Port 80 (HTTP)                                                  │
│  - Port 3000 (Backend API)                                         │
│  - Port 5173 (Frontend)                                            │
│  - Port 8080 (Nagios)                                              │
└─────────────────────────────────────────────────────────────────────┘
```

### Technology Stack

```
Frontend (Client)
├── React 18
├── Redux Toolkit (State Management)
├── React Router DOM
├── Axios (HTTP Client)
├── Vite (Build Tool)
└── Nginx (Web Server)

Backend (Server)
├── Node.js
├── Express.js
├── Mongoose (MongoDB ODM)
├── bcrypt (Password Hashing)
├── JWT (Authentication)
├── Redis Client
└── AWS SES (Email Service)

Database & Cache
├── MongoDB 6.0
└── Redis Alpine

Infrastructure
├── Docker & Docker Compose
├── Terraform (AWS Provider)
├── Ansible (Configuration)
└── Jenkins (CI/CD)

Monitoring
└── Nagios Core 4.5.7
```

### Data Flow

```
User Request Flow:
─────────────────

1. Browser → Nginx (Port 5173)
2. Nginx → React App (SPA)
3. React → Axios Request → Backend API (Port 3000)
4. Backend → Authentication Middleware → JWT Verification
5. Backend → MongoDB (User Data, Connections, Requests)
6. Backend → Redis (Session Cache, Rate Limiting)
7. Backend → Response → React
8. React → UI Update

Monitoring Flow:
───────────────

1. Nagios → TCP Check → Backend (Port 3000) → OK/CRITICAL
2. Nagios → TCP Check → Frontend (Port 80) → OK/CRITICAL
3. Nagios → TCP Check → MongoDB (Port 27017) → OK/CRITICAL
4. Nagios → TCP Check → Redis (Port 6379) → OK/CRITICAL
5. Nagios → Web UI (Port 8080) → Admin Dashboard
```

---

## ✨ Features

### User Features
- ✅ **User Authentication** - Secure signup/login with JWT
- ✅ **Profile Management** - Edit profile, upload photos
- ✅ **Feed System** - Swipe left/right on user profiles
- ✅ **Connection Requests** - Send and receive connection requests
- ✅ **Connections** - View accepted connections
- ✅ **Real-time Updates** - Instant UI updates with Redux

### Technical Features
- 🐳 **Fully Dockerized** - One command to run entire stack
- 🔄 **Hot Reload** - Development mode with live reload
- 🔒 **Secure** - Password hashing, JWT tokens, CORS protection
- 📊 **Monitored** - Nagios checks all services every 10 seconds
- 🚀 **Production Ready** - Nginx reverse proxy, environment configs
- 🏗️ **Infrastructure as Code** - Terraform for AWS resources
- 📦 **Automated Deployment** - Ansible playbooks for configuration

---

## 📦 Prerequisites

### Required Software

```bash
# 1. Docker & Docker Compose
docker --version          # Should be 20.10+
docker-compose --version  # Should be 1.29+

# 2. Git
git --version

# 3. Node.js (for local development only)
node --version   # Should be 16+
npm --version

# 4. Terraform (for infrastructure)
terraform --version  # Should be 1.0+

# 5. AWS CLI (for deployment)
aws --version
```

### Installation Links

- **Docker Desktop**: https://www.docker.com/products/docker-desktop
- **Git**: https://git-scm.com/downloads
- **Node.js**: https://nodejs.org/ (LTS version)
- **Terraform**: https://www.terraform.io/downloads
- **AWS CLI**: https://aws.amazon.com/cli/

---

## 🚀 Quick Start - Local Development

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/DeveloperTiwariji/Dockerized-DevTinder.git

# Navigate to project directory
cd Dockerized-DevTinder
```

### Step 2: Environment Configuration

Create `.env` files for backend:

```bash
# DevTinder/.env
MONGO_URI=mongodb://mongodb:27017/devtinder
REDIS_URL=redis://redis:6379
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=development
PORT=3000

# AWS SES (optional - for email features)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
SES_SENDER_EMAIL=noreply@yourdomain.com
```

### Step 3: Start All Services

```bash
# Start all containers in detached mode
docker-compose up -d

# Or build and start (if you made changes)
docker-compose up -d --build

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f server   # Backend logs
docker-compose logs -f client   # Frontend logs
docker-compose logs -f nagios   # Nagios logs
```

### Step 4: Access the Application

Open your browser and navigate to:

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | - |
| **Backend API** | http://localhost:3000/api | - |
| **Nagios Dashboard** | http://localhost:8080/nagios | admin / nagios123 |
| **MongoDB** | mongodb://localhost:27017 | - |
| **Redis** | redis://localhost:6379 | - |

### Step 5: Create Your First Account

1. Open http://localhost:5173
2. Click "Sign Up"
3. Enter your details (email, password, firstName, lastName)
4. After signup, you'll be redirected to login
5. Login with your credentials
6. Start swiping!

### Step 6: Stop the Application

```bash
# Stop all containers
docker-compose down

# Stop and remove volumes (clears database)
docker-compose down -v
```

---

## 🐳 Docker Services

### Service Configuration

```yaml
# docker-compose.yml overview

services:
  mongodb:
    - Image: mongo:6.0
    - Port: 27017
    - Volume: mongodb_data (persistent)
    
  redis:
    - Image: redis:alpine
    - Port: 6379
    - Volume: redis_data (persistent)
    
  server:
    - Build: ./DevTinder
    - Port: 3000
    - Depends: mongodb, redis
    - Environment: NODE_ENV, MONGO_URI, REDIS_URL
    
  client:
    - Build: ./devTinder-web
    - Port: 5173
    - Nginx config: reverse proxy to backend
    
  nagios:
    - Build: ./nagios
    - Port: 8080
    - Monitors: all 4 services
    - Credentials: admin/nagios123
```

### Docker Commands Cheat Sheet

```bash
# Start services
docker-compose up -d                    # Start in background
docker-compose up --build               # Rebuild and start
docker-compose up -d --force-recreate   # Force recreate containers

# Stop services
docker-compose stop                     # Stop without removing
docker-compose down                     # Stop and remove containers
docker-compose down -v                  # Stop and remove volumes

# View status
docker-compose ps                       # List running services
docker ps                               # List all containers
docker stats                            # Real-time resource usage

# Logs
docker-compose logs -f                  # Follow all logs
docker-compose logs -f server           # Follow backend logs
docker-compose logs --tail=100 client   # Last 100 lines

# Execute commands in containers
docker-compose exec server sh           # Shell in backend
docker-compose exec mongodb mongosh     # MongoDB shell
docker-compose exec redis redis-cli     # Redis CLI

# Rebuild specific service
docker-compose build server             # Rebuild backend only
docker-compose up -d server             # Restart backend only

# Clean up
docker system prune -a                  # Remove unused containers/images
docker volume prune                     # Remove unused volumes
```

---

## 🏗️ Infrastructure Setup (Terraform)

### Architecture Overview

```
Terraform Infrastructure:
─────────────────────────

infra/
├── bootstrap/
│   └── main.tf              # S3 bucket for remote state
│
└── terraform/
    ├── provider.tf          # AWS provider configuration
    ├── backend.tf           # Remote state configuration
    ├── variables.tf         # Input variables
    ├── main.tf              # Main infrastructure (EC2, SG)
    └── outputs.tf           # Output values
```

### Step 1: Configure AWS Credentials

```bash
# Configure AWS CLI
aws configure

# Enter your credentials:
# AWS Access Key ID: YOUR_ACCESS_KEY
# AWS Secret Access Key: YOUR_SECRET_KEY
# Default region name: us-east-1
# Default output format: json

# Verify credentials
aws sts get-caller-identity
```

### Step 2: Create S3 Backend (One-time setup)

```bash
# Navigate to bootstrap directory
cd infra/bootstrap

# Initialize Terraform
terraform init

# Create S3 bucket and DynamoDB table for state locking
terraform plan
terraform apply

# Note the outputs - you'll need them for main terraform config
```

### Step 3: Deploy Infrastructure

```bash
# Navigate to main terraform directory
cd ../terraform

# Initialize Terraform
terraform init

# Review planned changes
terraform plan -out=tfplan

# Apply infrastructure changes
terraform apply "tfplan"

# Note the EC2 public IP from outputs
```

### Step 4: SSH Key Setup

```bash
# The terraform will create a key pair
# Download the private key from AWS console or use existing key

# Set proper permissions
chmod 400 ~/.ssh/devtinder_key

# Test SSH connection
ssh -i ~/.ssh/devtinder_key ec2-user@<EC2_PUBLIC_IP>
```

### Terraform Commands Reference

```bash
# Initialize
terraform init

# Format code
terraform fmt

# Validate configuration
terraform validate

# Plan changes
terraform plan
terraform plan -out=tfplan

# Apply changes
terraform apply
terraform apply "tfplan"
terraform apply -auto-approve

# Destroy infrastructure
terraform destroy
terraform destroy -auto-approve

# Show current state
terraform show

# List resources
terraform state list

# Output values
terraform output
terraform output ec2_public_ip

# Unlock state (if locked)
terraform force-unlock <LOCK_ID>

# Import existing resource
terraform import aws_instance.app i-1234567890abcdef0
```

---

## 🚢 Deployment to AWS EC2

### Complete Deployment Flow

```
Local Machine → Push Code to GitHub → Clone on EC2 → Docker Deploy
     ↓                                        ↓
  Terraform                                 Ansible
  (Create EC2)                         (Configure EC2)
```

### Step 1: Provision EC2 with Terraform

```bash
# Already done in Infrastructure Setup section
# This creates:
# - EC2 t3.micro instance (Amazon Linux 2)
# - Security group with ports: 22, 80, 3000, 5173, 8080
# - Key pair for SSH access
```

### Step 2: Configure EC2 Instance

```bash
# SSH into EC2
ssh -i ~/.ssh/devtinder_key ec2-user@<EC2_PUBLIC_IP>

# Update system
sudo yum update -y

# Install Docker
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installations
docker --version
docker-compose --version

# Logout and login again for group changes
exit
ssh -i ~/.ssh/devtinder_key ec2-user@<EC2_PUBLIC_IP>
```

### Step 3: Deploy Application

```bash
# Clone repository
cd ~
git clone https://github.com/DeveloperTiwariji/Dockerized-DevTinder.git
cd Dockerized-DevTinder

# Create environment file
cat > DevTinder/.env << 'EOF'
MONGO_URI=mongodb://mongodb:27017/devtinder
REDIS_URL=redis://redis:6379
JWT_SECRET=production-secret-key-change-this
NODE_ENV=production
PORT=3000
EOF

# Build all images
docker-compose build

# Start all services
docker-compose up -d

# Verify services are running
docker-compose ps
docker logs <container_name>
```

### Step 4: Verify Deployment

```bash
# Check containers
docker ps

# Expected output:
# - mongodb (port 27017)
# - redis (port 6379)
# - server (port 3000)
# - client (port 5173)
# - nagios (port 8080)

# Test backend API
curl http://localhost:3000/api/health

# Test frontend
curl http://localhost:5173

# Check logs
docker-compose logs -f
```

### Step 5: Access Your Application

```bash
# Get your EC2 public IP
EC2_IP=$(terraform output -raw ec2_public_ip)

# Or get it from AWS console
```

Open in browser:
- **Frontend**: http://`<EC2_PUBLIC_IP>`:5173
- **Backend API**: http://`<EC2_PUBLIC_IP>`:3000
- **Nagios**: http://`<EC2_PUBLIC_IP>`:8080/nagios

### Automated Deployment with Ansible

```bash
# Update inventory file
cat > infra/ansible/inventory.ini << EOF
[devtinder]
<EC2_PUBLIC_IP> ansible_user=ec2-user ansible_ssh_private_key_file=~/.ssh/devtinder_key
EOF

# Run Ansible playbook
cd infra/ansible
ansible-playbook -i inventory.ini deploy.yml

# This will:
# 1. Install Docker and dependencies
# 2. Clone repository
# 3. Configure environment
# 4. Start Docker services
# 5. Configure firewall
```

### Deployment Checklist

- [ ] Terraform infrastructure created
- [ ] EC2 instance accessible via SSH
- [ ] Docker and Docker Compose installed
- [ ] Repository cloned on EC2
- [ ] Environment variables configured
- [ ] All 5 containers running
- [ ] Security group ports open
- [ ] Application accessible from browser
- [ ] Nagios monitoring active
- [ ] Database persistent volume created

---

## � CI/CD with GitHub Actions

### Automated Pipeline Overview

DevTinder uses GitHub Actions for continuous integration and deployment:

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Repository                        │
│                 (Push to main branch)                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ├─► Job 1: Backend Build & Test
                     │   └─ npm install, lint, test, docker build
                     │
                     ├─► Job 2: Frontend Build & Test
                     │   └─ npm install, lint, build, test
                     │
                     ├─► Job 3: Build & Push Docker Images
                     │   └─ Build → Tag → Push to Docker Hub
                     │
                     └─► Job 4: Deploy to EC2
                         └─ SSH → Pull Code → Restart Containers
                              │
                              └─► Health Check → Success/Failure
```

### Workflows Included

#### 1. **Main CI/CD Pipeline** (`ci-cd.yml`)
- Triggers on push to `main` or `develop`
- Runs tests for both backend and frontend
- Builds and pushes Docker images to Docker Hub
- Deploys to EC2 automatically
- Runs health checks post-deployment

#### 2. **Pull Request Checks** (`pr-checks.yml`)
- Triggers on PRs to `main` or `develop`
- Runs linters and tests
- Validates Docker builds
- Checks docker-compose configuration

#### 3. **Manual Deployment** (`manual-deploy.yml`)
- Trigger manually from GitHub UI
- Choose environment (production/staging/development)
- Choose specific version to deploy
- Automatic backup and rollback on failure

### Quick Setup Guide

#### Step 1: Add GitHub Secrets

Go to **Settings → Secrets and variables → Actions** and add:

```bash
# Docker Hub
DOCKER_USERNAME=your-dockerhub-username
DOCKER_PASSWORD=your-dockerhub-token

# AWS Credentials
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret

# EC2 SSH Access
EC2_SSH_PRIVATE_KEY=your-private-key-content
EC2_HOST=3.6.150.204
EC2_USER=ec2-user
```

#### Step 2: Enable Actions

```bash
# Go to repository → Actions tab
# Click "I understand my workflows, go ahead and enable them"
```

#### Step 3: Test Pipeline

```bash
# Push to main branch
git add .
git commit -m "feat: trigger CI/CD"
git push origin main

# Or trigger manually
# GitHub → Actions → Manual Deployment → Run workflow
```

### Monitoring Deployments

```bash
# View workflow runs
GitHub → Actions tab

# View real-time logs
Click on running workflow → Click on job → View logs

# Check deployment on EC2
ssh -i ~/.ssh/devtinder_key ec2-user@<EC2_IP>
docker-compose ps
docker-compose logs -f
```

### Detailed Documentation

For complete CI/CD setup instructions, see: [`.github/CICD_SETUP.md`](.github/CICD_SETUP.md)

Topics covered:
- ✅ How to get Docker Hub and AWS credentials
- ✅ How to add SSH keys to GitHub secrets
- ✅ Detailed explanation of each workflow
- ✅ Customization options
- ✅ Troubleshooting common issues
- ✅ Rollback procedures
- ✅ Security best practices

---

## �📊 Nagios Monitoring

### What is Monitored

```
Host Checks (4 hosts):
─────────────────────
✓ backend-server     (Express API)
✓ frontend-client    (React/Nginx)
✓ mongodb-server     (Database)
✓ redis-server       (Cache)

Service Checks (4 services):
───────────────────────────
✓ Backend_API        → Port 3000 (TCP check every 10s)
✓ Frontend_Web       → Port 80 (TCP check every 10s)
✓ MongoDB_DB         → Port 27017 (TCP check every 10s)
✓ Redis_Cache        → Port 6379 (TCP check every 10s)
```

### Accessing Nagios Dashboard

```bash
# Local development
http://localhost:8080/nagios/

# Production (EC2)
http://<EC2_PUBLIC_IP>:8080/nagios/

# Default credentials
Username: admin
Password: nagios123
```

### Nagios Web Interface Guide

```
Main Menu:
─────────
1. Tactical Overview      → Summary of all hosts/services
2. Services               → All service checks and status
3. Hosts                  → All monitored hosts
4. Problems               → Only showing issues
5. Event Log              → Historical events
6. Reports                → Availability reports
```

### Nagios Configuration Files

```
nagios/
├── Dockerfile                    # Nagios container build
├── nagios.cfg                    # Main configuration
└── objects/
    ├── templates.cfg            # Host/service templates
    ├── timeperiods.cfg          # 24x7 time definitions
    ├── commands.cfg             # Check commands
    ├── contacts.cfg             # Alert contacts
    ├── hosts.cfg                # 4 Docker hosts
    └── services.cfg             # 4 service checks
```

### Customize Nagios

#### Change Admin Password

```bash
# SSH to EC2 or use local terminal
docker exec -it nagios htpasswd -b /opt/nagios/etc/htpasswd.users admin NEW_PASSWORD

# Restart Nagios
docker-compose restart nagios
```

#### Add Email Notifications

```bash
# Edit contacts.cfg
docker exec -it nagios vi /opt/nagios/etc/objects/contacts.cfg

# Update email address
define contact {
    contact_name    devtinder-admin
    email           your-email@domain.com
}

# Configure SMTP in commands.cfg
# Then restart Nagios
docker-compose restart nagios
```

#### Add Custom Service Check

```bash
# Example: HTTP response time check
# Edit services.cfg

define service {
    use                     generic-service
    host_name               backend-server
    service_description     Backend_HTTP_Response
    check_command           check_http!-p 3000 -u /api/health
}

# Restart Nagios
docker-compose restart nagios
```

### Nagios Troubleshooting

```bash
# View Nagios logs
docker logs nagios -f

# Verify configuration
docker exec nagios /opt/nagios/bin/nagios -v /opt/nagios/etc/nagios.cfg

# Check service status
docker exec nagios cat /opt/nagios/var/status.dat | grep -A5 "servicestatus"

# Restart Nagios
docker-compose restart nagios

# Rebuild Nagios
docker-compose build --no-cache nagios
docker-compose up -d nagios
```

---

## 🔐 Environment Variables

### Backend (DevTinder/.env)

```bash
# Database
MONGO_URI=mongodb://mongodb:27017/devtinder

# Cache
REDIS_URL=redis://redis:6379

# Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# Server
NODE_ENV=production
PORT=3000

# AWS SES (Email service)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
SES_SENDER_EMAIL=noreply@yourdomain.com

# Optional: Session configuration
SESSION_SECRET=another-secret-key-for-sessions
COOKIE_MAX_AGE=86400000
```

### Frontend (devTinder-web/.env)

```bash
# API Base URL
VITE_API_BASE_URL=http://localhost:3000

# For production
VITE_API_BASE_URL=http://<EC2_PUBLIC_IP>:3000
```

### Terraform (infra/terraform/terraform.tfvars)

```bash
# AWS Configuration
aws_region = "us-east-1"

# EC2 Configuration
instance_type = "t3.micro"
ami_id = "ami-0c55b159cbfafe1f0"  # Amazon Linux 2

# Project name
project_name = "devtinder"

# Environment
environment = "production"

# SSH Key
key_name = "devtinder-key"
```

---

## 📡 API Documentation

### Base URL

```
Local: http://localhost:3000
Production: http://<EC2_PUBLIC_IP>:3000
```

### Authentication Endpoints

#### Signup
```http
POST /signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "emailId": "john@example.com",
  "password": "SecurePass123",
  "age": 25,
  "gender": "male"
}

Response: 200 OK
{
  "message": "User created successfully",
  "user": { ... }
}
```

#### Login
```http
POST /login
Content-Type: application/json

{
  "emailId": "john@example.com",
  "password": "SecurePass123"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "jwt-token-here"
}
Set-Cookie: token=jwt-token-here
```

#### Logout
```http
POST /logout

Response: 200 OK
{
  "message": "Logout successful"
}
```

### Profile Endpoints

#### View Profile
```http
GET /profile/view
Authorization: Bearer <token>

Response: 200 OK
{
  "firstName": "John",
  "lastName": "Doe",
  "emailId": "john@example.com",
  "age": 25,
  "gender": "male",
  "photoUrl": "https://...",
  "about": "..."
}
```

#### Edit Profile
```http
PATCH /profile/edit
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "age": 26,
  "about": "Updated bio"
}

Response: 200 OK
{
  "message": "Profile updated successfully"
}
```

### Connection Endpoints

#### Get Feed
```http
GET /feed
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "_id": "user-id",
    "firstName": "Jane",
    "lastName": "Doe",
    "age": 24,
    "photoUrl": "...",
    "about": "..."
  }
]
```

#### Send Connection Request
```http
POST /request/send/:status/:userId
Authorization: Bearer <token>
Params: status = "interested" | "ignored"

Response: 200 OK
{
  "message": "Connection request sent"
}
```

#### View Received Requests
```http
GET /user/requests/received
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "fromUserId": {
      "firstName": "Jane",
      "lastName": "Doe",
      ...
    },
    "status": "interested"
  }
]
```

#### Review Request
```http
POST /request/review/:status/:requestId
Authorization: Bearer <token>
Params: status = "accepted" | "rejected"

Response: 200 OK
{
  "message": "Request accepted"
}
```

#### Get Connections
```http
GET /user/connections
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "firstName": "Jane",
    "lastName": "Doe",
    ...
  }
]
```

### Health Check

```http
GET /api/health

Response: 200 OK
{
  "status": "OK",
  "timestamp": "2025-11-08T10:30:00Z"
}
```

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use

```bash
# Problem: Port 3000, 5173, or 8080 already in use

# Solution 1: Find and kill the process
# Linux/Mac
sudo lsof -i :3000
sudo kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Solution 2: Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use 3001 instead
```

#### 2. MongoDB Connection Failed

```bash
# Problem: Backend can't connect to MongoDB

# Solution 1: Check MongoDB is running
docker-compose ps mongodb

# Solution 2: Check MongoDB logs
docker-compose logs mongodb

# Solution 3: Restart MongoDB
docker-compose restart mongodb

# Solution 4: Verify connection string
# Should be: mongodb://mongodb:27017/devtinder
```

#### 3. Frontend Not Loading

```bash
# Problem: White screen or errors in browser

# Solution 1: Check backend API URL
# Update devTinder-web/src/utils/constants.js
export const BASE_URL = "http://localhost:3000";

# Solution 2: Clear browser cache
# Ctrl+Shift+R (hard refresh)

# Solution 3: Rebuild frontend
docker-compose build client
docker-compose up -d client
```

#### 4. Nagios Shows Permission Error

```bash
# Problem: CGI permission denied in Nagios

# Solution: Add admin user to CGI config
docker exec nagios htpasswd -b /opt/nagios/etc/htpasswd.users nagiosadmin nagios123

# Restart Apache
docker exec nagios apachectl restart
```

#### 5. Nagios Services Show CRITICAL

```bash
# Problem: All services showing CRITICAL status

# Solution 1: Check plugin path
docker exec nagios cat /opt/nagios/etc/resource.cfg
# Should have: $USER1$=/opt/nagios/libexec

# Solution 2: Verify check_tcp exists
docker exec nagios ls -la /opt/nagios/libexec/check_tcp

# Solution 3: Restart Nagios
docker-compose restart nagios
```

#### 6. Terraform State Locked

```bash
# Problem: Error acquiring state lock

# Solution: Force unlock
terraform force-unlock <LOCK_ID>

# Get lock ID from error message
```

#### 7. EC2 Connection Refused

```bash
# Problem: Can't connect to EC2 via SSH

# Solution 1: Check security group allows port 22
# AWS Console → EC2 → Security Groups → Inbound Rules

# Solution 2: Verify key permissions
chmod 400 ~/.ssh/devtinder_key

# Solution 3: Check instance is running
aws ec2 describe-instances --instance-ids <instance-id>
```

#### 8. Docker Build Fails

```bash
# Problem: Docker build errors

# Solution 1: Clean Docker cache
docker system prune -a

# Solution 2: Build without cache
docker-compose build --no-cache

# Solution 3: Check Dockerfile syntax
docker-compose config
```

#### 9. Can't Access Application from Browser (EC2)

```bash
# Problem: EC2 public IP not accessible

# Solution 1: Check security group inbound rules
# Ports 3000, 5173, 8080 should be open to 0.0.0.0/0

# Solution 2: Verify containers are running
ssh -i ~/.ssh/devtinder_key ec2-user@<EC2_IP>
docker ps

# Solution 3: Check EC2 public IP
# AWS Console → EC2 → Instance → Public IPv4 address

# Solution 4: Test from EC2 instance
curl http://localhost:3000
curl http://localhost:5173
```

#### 10. JWT Token Expired/Invalid

```bash
# Problem: 401 Unauthorized errors

# Solution 1: Clear browser cookies and login again

# Solution 2: Check JWT_SECRET is set
# In DevTinder/.env file

# Solution 3: Restart backend
docker-compose restart server
```

### Debug Commands

```bash
# Check all container status
docker-compose ps

# View all logs
docker-compose logs -f

# Execute shell in container
docker-compose exec server sh
docker-compose exec client sh

# Check container resource usage
docker stats

# Inspect container
docker inspect <container_name>

# Check Docker networks
docker network ls
docker network inspect devtinder_devconnect-network

# Check volumes
docker volume ls
docker volume inspect devtinder_mongodb_data
```

### Getting Help

If you encounter issues not listed here:

1. **Check logs**: `docker-compose logs -f <service_name>`
2. **Search issues**: https://github.com/DeveloperTiwariji/Dockerized-DevTinder/issues
3. **Create issue**: Provide logs, error messages, and steps to reproduce
4. **Discord/Slack**: Join community channels (if available)

---

## 🧪 Development Workflow

### Local Development Setup

```bash
# Clone repository
git clone https://github.com/DeveloperTiwariji/Dockerized-DevTinder.git
cd Dockerized-DevTinder

# Install backend dependencies (optional - for IDE intellisense)
cd DevTinder
npm install
cd ..

# Install frontend dependencies (optional - for IDE intellisense)
cd devTinder-web
npm install
cd ..

# Start development environment
docker-compose up -d

# Watch logs
docker-compose logs -f server client
```

### Making Changes

```bash
# Frontend changes (React)
# Edit files in: devTinder-web/src/
# Changes auto-reload in development mode

# Backend changes (Node.js)
# Edit files in: DevTinder/src/
# Restart backend: docker-compose restart server

# Docker config changes
# Edit: docker-compose.yml or Dockerfiles
# Rebuild: docker-compose up -d --build

# Terraform changes
# Edit files in: infra/terraform/
# Plan: terraform plan
# Apply: terraform apply
```

### Testing

```bash
# Run backend tests (if available)
docker-compose exec server npm test

# Run frontend tests (if available)
docker-compose exec client npm test

# API testing with curl
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{"emailId":"test@test.com","password":"test123"}'
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/your-feature-name

# Create pull request on GitHub

# Merge to main
git checkout main
git pull origin main
git merge feature/your-feature-name
git push origin main
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Code Style

- **JavaScript**: Use ES6+ features, follow Airbnb style guide
- **React**: Functional components with hooks
- **Backend**: RESTful API design
- **Commits**: Use conventional commits (feat, fix, docs, etc.)

### Pull Request Process

1. Update README.md with details of changes
2. Update documentation if needed
3. Ensure all tests pass
4. Get approval from maintainers
5. Squash commits before merging

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 DevTinder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Contact & Support

- **GitHub**: [@DeveloperTiwariji](https://github.com/DeveloperTiwariji)
- **Email**: developertiwari@example.com
- **Issues**: https://github.com/DeveloperTiwariji/Dockerized-DevTinder/issues
- **Discussions**: https://github.com/DeveloperTiwariji/Dockerized-DevTinder/discussions

---

## 🎓 Learning Resources

### Docker & Containers
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Dockerfile Best Practices](https://docs.docker.com/develop/dev-best-practices/)

### React & Frontend
- [React Documentation](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vite](https://vitejs.dev/)

### Node.js & Backend
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose ODM](https://mongoosejs.com/)
- [JWT Authentication](https://jwt.io/)

### Infrastructure & DevOps
- [Terraform Documentation](https://www.terraform.io/docs)
- [Ansible Documentation](https://docs.ansible.com/)
- [AWS EC2 Guide](https://docs.aws.amazon.com/ec2/)
- [Nagios Documentation](https://www.nagios.org/documentation/)

---

## 🗺️ Roadmap

### Planned Features

- [ ] Add WebSocket for real-time chat
- [ ] Implement video calls
- [ ] Add photo upload to S3
- [ ] Integrate Stripe for premium features
- [ ] Mobile app with React Native
- [ ] Kubernetes deployment
- [x] CI/CD with GitHub Actions ✅
- [ ] Unit and integration tests
- [ ] Performance monitoring with Prometheus
- [ ] Log aggregation with ELK stack

---

## 📊 Project Statistics

```
Lines of Code:
- Backend: ~2,500 lines
- Frontend: ~3,000 lines
- Infrastructure: ~500 lines
- Total: ~6,000 lines

Technologies:
- Languages: JavaScript, HCL, YAML
- Frameworks: React, Express, Terraform
- Databases: MongoDB, Redis
- Tools: Docker, Nagios, Ansible, Jenkins

Contributors: 1
Version: 1.0.0
Last Updated: November 2025
```

---

## 🙏 Acknowledgments

- MongoDB for the excellent database
- Redis for lightning-fast caching
- Docker for containerization
- Terraform for infrastructure automation
- Nagios for monitoring
- AWS for cloud hosting
- Open source community

---

## 📸 Screenshots

### Application Screenshots

```
[Add screenshots of your application here]

1. Login Page
2. Signup Page
3. Feed/Swipe Page
4. Connections Page
5. Profile Page
6. Nagios Dashboard
```

---

**⭐ If you find this project helpful, please give it a star on GitHub!**

**Made with ❤️ by [DeveloperTiwariji](https://github.com/DeveloperTiwariji)**

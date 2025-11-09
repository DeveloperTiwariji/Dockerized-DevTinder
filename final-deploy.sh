#!/bin/bash

# 🎯 DevTinder Final Deployment Checklist
# Run this to deploy your complete project

set -e

echo "🚀 DevTinder Final Deployment Script"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Step 1
echo -e "${BLUE}📦 Step 1/5: Building Backend Image...${NC}"
cd DevTinder
docker build -t 12207441/backend-image:latest .
echo -e "${GREEN}✅ Backend image built${NC}"
echo ""

# Step 2
echo -e "${BLUE}📦 Step 2/5: Pushing Backend Image...${NC}"
docker push 12207441/backend-image:latest
echo -e "${GREEN}✅ Backend image pushed${NC}"
echo ""

# Step 3
echo -e "${BLUE}📦 Step 3/5: Building Frontend Image...${NC}"
cd ../devTinder-web
docker build -t 12207441/web-image:latest .
echo -e "${GREEN}✅ Frontend image built${NC}"
echo ""

# Step 4
echo -e "${BLUE}📦 Step 4/5: Pushing Frontend Image...${NC}"
docker push 12207441/web-image:latest
echo -e "${GREEN}✅ Frontend image pushed${NC}"
echo ""

cd ..

# Step 5
echo -e "${BLUE}📝 Step 5/5: Committing Changes...${NC}"
git add .
git commit -m "Production Ready: Fixed JWT env, complete .env, Nagios monitoring"
git push origin main
echo -e "${GREEN}✅ Code pushed to GitHub${NC}"
echo ""

echo -e "${GREEN}✅✅✅ ALL STEPS COMPLETED SUCCESSFULLY! ✅✅✅${NC}"
echo ""
echo -e "${YELLOW}📋 Next: Deploy on EC2${NC}"
echo ""
echo "Run these commands:"
echo ""
echo "ssh -i ~/.ssh/devtinder_key ec2-user@13.235.214.25"
echo ""
echo "# On EC2:"
echo "cd /home/ec2-user/devtinder"
echo "git pull origin main"
echo "docker-compose pull"
echo "docker-compose down"
echo "docker-compose up -d --build"
echo "docker-compose ps"
echo ""
echo "# Then access:"
echo "Frontend: http://13.235.214.25:5173"
echo "Backend Health: http://13.235.214.25:3000/api/health"
echo "Nagios: http://13.235.214.25:8080/nagios (admin/admin)"
echo ""
echo "🎉 Happy Deploying!"

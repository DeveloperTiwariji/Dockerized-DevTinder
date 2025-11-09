#!/bin/bash

# DevTinder Deployment Script
# Run this script to build and push Docker images

set -e  # Exit on error

echo "🚀 Starting DevTinder Deployment Process..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Build and Push Backend
echo -e "${BLUE}📦 Step 1/2: Building and pushing backend image...${NC}"
cd DevTinder
docker build -t 12207441/backend-image:latest .
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend image built successfully${NC}"
    docker push 12207441/backend-image:latest
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Backend image pushed successfully${NC}"
    else
        echo -e "${RED}❌ Failed to push backend image${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ Failed to build backend image${NC}"
    exit 1
fi
echo ""

# Step 2: Build and Push Frontend
echo -e "${BLUE}📦 Step 2/2: Building and pushing frontend image...${NC}"
cd ../devTinder-web
docker build -t 12207441/web-image:latest .
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend image built successfully${NC}"
    docker push 12207441/web-image:latest
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Frontend image pushed successfully${NC}"
    else
        echo -e "${RED}❌ Failed to push frontend image${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ Failed to build frontend image${NC}"
    exit 1
fi
echo ""

cd ..

echo -e "${GREEN}✅✅✅ All images built and pushed successfully! ✅✅✅${NC}"
echo ""
echo "📋 Next steps:"
echo "1. Update Terraform security group:"
echo "   cd infra/terraform && terraform apply -auto-approve"
echo ""
echo "2. Commit and push changes:"
echo "   git add . && git commit -m 'Deploy: Fixed CORS, added health check, Nagios monitoring' && git push"
echo ""
echo "3. Deploy on EC2:"
echo "   ssh -i ~/.ssh/devtinder_key ec2-user@13.235.214.25"
echo "   cd /home/ec2-user/devtinder"
echo "   git pull origin main"
echo "   docker-compose pull"
echo "   docker-compose down"
echo "   docker-compose up -d --build"
echo ""
echo "4. Access your apps:"
echo "   Frontend: http://13.235.214.25:5173"
echo "   Backend Health: http://13.235.214.25:3000/api/health"
echo "   Nagios: http://13.235.214.25:8080/nagios (admin/admin)"
echo ""
echo "🎉 Deployment preparation complete!"

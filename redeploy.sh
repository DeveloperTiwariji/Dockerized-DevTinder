#!/bin/bash
# Complete Redeployment Script for DevTinder
# This script handles full infrastructure teardown and redeployment

set -e  # Exit on any error

echo "🚀 DevTinder Complete Redeployment Script"
echo "=========================================="
echo ""

# Step 1: Destroy existing infrastructure
echo "📦 Step 1: Destroying existing infrastructure..."
cd infra/terraform
terraform destroy -auto-approve
cd ../..
echo "✅ Infrastructure destroyed"
echo ""

# Step 2: Deploy new infrastructure
echo "📦 Step 2: Deploying new infrastructure..."
cd infra/terraform
terraform init
terraform apply -auto-approve
cd ../..
echo "✅ New infrastructure deployed"
echo ""

# Step 3: Get new EC2 IP
echo "📦 Step 3: Retrieving new EC2 public IP..."
cd infra/terraform
NEW_IP=$(terraform output -raw ec2_public_ip)
echo "New EC2 IP: $NEW_IP"
cd ../..
echo ""

# Step 4: Update Ansible inventory
echo "📦 Step 4: Updating Ansible inventory with new IP..."
cat > infra/ansible/inventory.ini << EOF
[devtinder]
$NEW_IP ansible_user=ec2-user ansible_ssh_private_key_file=~/.ssh/devtinder_key ansible_ssh_common_args='-o StrictHostKeyChecking=no'
EOF
echo "✅ Inventory updated"
echo ""

# Step 5: Update backend CORS configuration
echo "📦 Step 5: Updating backend CORS configuration..."
sed -i "s|http://[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}:5173|http://$NEW_IP:5173|g" DevTinder/src/app.js
sed -i "s|http://[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\"|http://$NEW_IP\"|g" DevTinder/src/app.js
echo "✅ CORS updated"
echo ""

# Step 6: Rebuild and push Docker images
echo "📦 Step 6: Rebuilding Docker images..."
docker build --platform linux/amd64 -t 12207441/backend-image:latest -f DevTinder/Dockerfile DevTinder --no-cache
docker push 12207441/backend-image:latest
echo "✅ Backend image pushed"
echo ""

# Step 7: Wait for EC2 to be ready
echo "📦 Step 7: Waiting for EC2 to be ready..."
sleep 30
echo "✅ EC2 should be ready"
echo ""

# Step 8: Run Ansible deployment
echo "📦 Step 8: Running Ansible deployment..."
cd infra/ansible
ansible-playbook -i inventory.ini deploy.yml
cd ../..
echo "✅ Ansible deployment complete"
echo ""

# Step 9: Verify deployment
echo "📦 Step 9: Verifying deployment..."
echo "Waiting 15 seconds for services to start..."
sleep 15

ssh -i ~/.ssh/devtinder_key -o StrictHostKeyChecking=no ec2-user@$NEW_IP "cd /home/ec2-user/devtinder && docker-compose ps"
echo ""

# Step 10: Display access URLs
echo "=========================================="
echo "✅ DEPLOYMENT COMPLETE!"
echo "=========================================="
echo ""
echo "🌐 Access your application at:"
echo "   Frontend:  http://$NEW_IP:5173"
echo "   Backend:   http://$NEW_IP:3000"
echo "   Nagios:    http://$NEW_IP:8080/nagios"
echo ""
echo "🔐 Nagios credentials:"
echo "   Username: nagiosadmin"
echo "   Password: admin"
echo ""
echo "📝 EC2 SSH access:"
echo "   ssh -i ~/.ssh/devtinder_key ec2-user@$NEW_IP"
echo ""

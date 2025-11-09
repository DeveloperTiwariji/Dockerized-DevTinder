# Complete Redeployment Script for DevTinder (Windows PowerShell)
# This script handles full infrastructure teardown and redeployment

$ErrorActionPreference = "Stop"

Write-Host "🚀 DevTinder Complete Redeployment Script" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Destroy existing infrastructure
Write-Host "📦 Step 1: Destroying existing infrastructure..." -ForegroundColor Yellow
Set-Location infra/terraform
terraform destroy -auto-approve
Set-Location ../..
Write-Host "✅ Infrastructure destroyed" -ForegroundColor Green
Write-Host ""

# Step 2: Deploy new infrastructure
Write-Host "📦 Step 2: Deploying new infrastructure..." -ForegroundColor Yellow
Set-Location infra/terraform
terraform init
terraform apply -auto-approve
Set-Location ../..
Write-Host "✅ New infrastructure deployed" -ForegroundColor Green
Write-Host ""

# Step 3: Get new EC2 IP
Write-Host "📦 Step 3: Retrieving new EC2 public IP..." -ForegroundColor Yellow
Set-Location infra/terraform
$NEW_IP = terraform output -raw ec2_public_ip
Write-Host "New EC2 IP: $NEW_IP" -ForegroundColor Cyan
Set-Location ../..
Write-Host ""

# Step 4: Update Ansible inventory
Write-Host "📦 Step 4: Updating Ansible inventory with new IP..." -ForegroundColor Yellow
@"
[devtinder]
$NEW_IP ansible_user=ec2-user ansible_ssh_private_key_file=~/.ssh/devtinder_key ansible_ssh_common_args='-o StrictHostKeyChecking=no'
"@ | Out-File -FilePath "infra/ansible/inventory.ini" -Encoding ASCII
Write-Host "✅ Inventory updated" -ForegroundColor Green
Write-Host ""

# Step 5: Update backend CORS configuration
Write-Host "📦 Step 5: Updating backend CORS configuration..." -ForegroundColor Yellow
$appJsPath = "DevTinder/src/app.js"
$content = Get-Content $appJsPath -Raw
$content = $content -replace 'http://\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:5173', "http://$NEW_IP:5173"
$content = $content -replace 'http://\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"', "http://$NEW_IP`""
$content | Out-File -FilePath $appJsPath -Encoding UTF8 -NoNewline
Write-Host "✅ CORS updated" -ForegroundColor Green
Write-Host ""

# Step 6: Rebuild and push Docker images
Write-Host "📦 Step 6: Rebuilding Docker images..." -ForegroundColor Yellow
docker build --platform linux/amd64 -t 12207441/backend-image:latest -f DevTinder/Dockerfile DevTinder --no-cache
docker push 12207441/backend-image:latest
Write-Host "✅ Backend image pushed" -ForegroundColor Green
Write-Host ""

# Step 7: Wait for EC2 to be ready
Write-Host "📦 Step 7: Waiting for EC2 to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 30
Write-Host "✅ EC2 should be ready" -ForegroundColor Green
Write-Host ""

# Step 8: Run Ansible deployment
Write-Host "📦 Step 8: Running Ansible deployment..." -ForegroundColor Yellow
Set-Location infra/ansible
ansible-playbook -i inventory.ini deploy.yml
Set-Location ../..
Write-Host "✅ Ansible deployment complete" -ForegroundColor Green
Write-Host ""

# Step 9: Verify deployment
Write-Host "📦 Step 9: Verifying deployment..." -ForegroundColor Yellow
Write-Host "Waiting 15 seconds for services to start..."
Start-Sleep -Seconds 15

ssh -i ~/.ssh/devtinder_key -o StrictHostKeyChecking=no "ec2-user@$NEW_IP" "cd /home/ec2-user/devtinder && docker-compose ps"
Write-Host ""

# Step 10: Display access URLs
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 Access your application at:" -ForegroundColor Yellow
Write-Host "   Frontend:  http://$NEW_IP:5173"
Write-Host "   Backend:   http://$NEW_IP:3000"
Write-Host "   Nagios:    http://$NEW_IP:8080/nagios"
Write-Host ""
Write-Host "🔐 Nagios credentials:" -ForegroundColor Yellow
Write-Host "   Username: nagiosadmin"
Write-Host "   Password: admin"
Write-Host ""
Write-Host "📝 EC2 SSH access:" -ForegroundColor Yellow
Write-Host "   ssh -i ~/.ssh/devtinder_key ec2-user@$NEW_IP"
Write-Host ""

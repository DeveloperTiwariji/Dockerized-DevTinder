# DevTinder Redeployment Guide

## 🔄 Complete Redeployment Process

If you need to destroy and recreate your infrastructure (new EC2 instance), follow this guide.

### 📋 Prerequisites

Before running the redeployment script, ensure you have:
- ✅ Terraform installed
- ✅ Ansible installed
- ✅ Docker installed and running
- ✅ AWS credentials configured
- ✅ Logged into Docker Hub (`docker login`)

### 🚀 Quick Redeployment (Automated)

#### For Windows (PowerShell):
```powershell
.\redeploy.ps1
```

#### For Linux/Mac (Bash):
```bash
chmod +x redeploy.sh
./redeploy.sh
```

### 📝 Manual Redeployment Steps

If you prefer to run steps manually:

#### Step 1: Destroy Infrastructure
```bash
cd infra/terraform
terraform destroy -auto-approve
cd ../..
```

#### Step 2: Deploy New Infrastructure
```bash
cd infra/terraform
terraform init
terraform apply -auto-approve
NEW_IP=$(terraform output -raw ec2_public_ip)
echo "New IP: $NEW_IP"
cd ../..
```

#### Step 3: Update Ansible Inventory
Edit `infra/ansible/inventory.ini`:
```ini
[devtinder]
<NEW_IP> ansible_user=ec2-user ansible_ssh_private_key_file=~/.ssh/devtinder_key ansible_ssh_common_args='-o StrictHostKeyChecking=no'
```

#### Step 4: Update Backend CORS
Edit `DevTinder/src/app.js` and replace old IPs with new IP in the CORS configuration:
```javascript
app.use(cors({
    origin: ["http://localhost:5173", "http://<NEW_IP>:5173", "http://<NEW_IP>"],
    credentials: true
}));
```

#### Step 5: Rebuild Docker Images
```bash
docker build --platform linux/amd64 -t 12207441/backend-image:latest -f DevTinder/Dockerfile DevTinder --no-cache
docker push 12207441/backend-image:latest
```

#### Step 6: Deploy with Ansible
```bash
cd infra/ansible
ansible-playbook -i inventory.ini deploy.yml
cd ../..
```

#### Step 7: Verify Deployment
```bash
ssh -i ~/.ssh/devtinder_key ec2-user@<NEW_IP> "cd /home/ec2-user/devtinder && docker-compose ps"
```

### 🌐 Access Points

After successful deployment:
- **Frontend**: `http://<NEW_IP>:5173`
- **Backend API**: `http://<NEW_IP>:3000`
- **Nagios Monitoring**: `http://<NEW_IP>:8080/nagios`

### 🔐 Credentials

**Nagios Login:**
- Username: `nagiosadmin`
- Password: `admin`

### 🛠️ What the Script Does

1. **Destroys** existing Terraform infrastructure
2. **Creates** new EC2 instance with fresh IP
3. **Updates** Ansible inventory with new IP
4. **Updates** backend CORS configuration
5. **Rebuilds** Docker images with updated configuration
6. **Pushes** images to Docker Hub
7. **Deploys** application using Ansible
8. **Verifies** all services are running

### ⚠️ Important Notes

- **IP Address Changes**: Every time you destroy and recreate, you get a new public IP
- **DNS**: If using a domain name, update your DNS records with the new IP
- **SSL**: If using SSL certificates, they may need to be regenerated
- **Data Loss**: All data in MongoDB will be lost (consider backup/restore if needed)
- **Downtime**: Application will be unavailable during redeployment (~5-10 minutes)

### 🔧 Troubleshooting

#### SSH Connection Refused
Wait 30 seconds after `terraform apply` for EC2 to fully boot:
```bash
sleep 30
```

#### Ansible Fails
Check if EC2 is accessible:
```bash
ssh -i ~/.ssh/devtinder_key ec2-user@<NEW_IP>
```

#### Backend Still Has Old IP
Verify CORS update in `DevTinder/src/app.js` and rebuild the image.

#### Services Not Starting
Check Docker Compose logs:
```bash
ssh -i ~/.ssh/devtinder_key ec2-user@<NEW_IP>
cd /home/ec2-user/devtinder
docker-compose logs
```

### 📊 Expected Timeline

- Terraform Destroy: ~2 minutes
- Terraform Apply: ~3 minutes  
- Docker Build & Push: ~2 minutes
- Ansible Deployment: ~2 minutes
- Service Startup: ~1 minute

**Total: ~10 minutes**

---

## 🎯 Best Practices

1. **Always commit** code changes before destroying infrastructure
2. **Backup MongoDB data** if it contains important information
3. **Update documentation** with new IP after redeployment
4. **Test thoroughly** after redeployment before announcing to users
5. **Consider Elastic IP** for production to keep same IP across recreations

# 🎯 Nagios Setup - Deployment Steps

## ✅ What's Been Configured

1. ✅ **Nagios Docker container** added to docker-compose.yml
2. ✅ **Monitoring configuration** for all DevTinder services
3. ✅ **Port 8080** added to Terraform security group
4. ✅ **Nagios web interface** with authentication

## 🚀 Deployment Steps

### Step 1: Update Security Group (Add Port 8080)

```bash
cd /mnt/c/Users/ASUS/Desktop/Dockerized-DevTinder/infra/terraform
terraform apply -auto-approve
```

### Step 2: Build and Push Nagios Image

```bash
cd /mnt/c/Users/ASUS/Desktop/Dockerized-DevTinder

# Build Nagios image
docker build -t 12207441/nagios-image:latest ./nagios

# Push to Docker Hub
docker push 12207441/nagios-image:latest
```

**OR** build it directly on EC2 (recommended since Nagios config is custom):

### Step 3: Deploy on EC2

```bash
# SSH into your EC2
ssh -i ~/.ssh/devtinder_key ec2-user@13.235.214.25

# Navigate to project
cd /home/ec2-user/devtinder

# Pull latest code
git pull origin main

# Stop current containers
docker-compose down

# Build Nagios locally (since it uses custom configs)
docker-compose build nagios

# Start all services including Nagios
docker-compose up -d

# Verify all containers are running
docker-compose ps
```

### Step 4: Access Nagios Dashboard

**URL:** `http://13.235.214.25:8080/nagios`

**Credentials:**
- Username: `nagiosadmin`
- Password: `admin`

## 📊 What Will Be Monitored

| Service | Check Type | Port | Frequency |
|---------|-----------|------|-----------|
| **Frontend** | HTTP check | 80 | Every 2 min |
| **Backend** | API health + port | 3000 | Every 2 min |
| **MongoDB** | Port connectivity | 27017 | Every 2 min |
| **Redis** | Port connectivity | 6379 | Every 2 min |

## 🔍 Verifying Monitoring

Once deployed, you should see in Nagios:

### Hosts Tab:
- ✅ devtinder-frontend (UP)
- ✅ devtinder-backend (UP)
- ✅ mongodb (UP)
- ✅ redis (UP)

### Services Tab:
- ✅ HTTP Service (devtinder-frontend)
- ✅ API Health Check (devtinder-backend)
- ✅ Backend Port 3000 (devtinder-backend)
- ✅ MongoDB Port 27017 (mongodb)
- ✅ Redis Port 6379 (redis)

## 🛠️ Troubleshooting

### If Nagios shows services as DOWN:

1. **Check container networking:**
   ```bash
   docker exec nagios ping -c 3 backend-image
   docker exec nagios ping -c 3 web-image
   ```

2. **Check if services are responding:**
   ```bash
   docker exec nagios curl http://backend-image:3000/api/health
   docker exec nagios curl http://web-image:80
   ```

3. **View Nagios logs:**
   ```bash
   docker logs nagios
   ```

4. **Verify configuration:**
   ```bash
   docker exec nagios /opt/nagios/bin/nagios -v /opt/nagios/etc/nagios.cfg
   ```

### If Nagios web interface is not accessible:

1. **Check security group has port 8080:**
   ```bash
   # From local machine
   curl -I http://13.235.214.25:8080/nagios
   ```

2. **Check Nagios container:**
   ```bash
   docker ps | grep nagios
   docker logs nagios
   ```

3. **Re-apply Terraform:**
   ```bash
   cd infra/terraform
   terraform apply -auto-approve
   ```

## 📝 Files Modified/Created

```
docker-compose.yml              # Added Nagios service
infra/terraform/main.tf         # Added port 8080 to security group
nagios/
├── Dockerfile                  # Nagios container
├── README.md                   # Nagios documentation
└── etc/
    ├── nagios.cfg              # Main config
    ├── cgi.cfg                 # Web interface
    ├── htpasswd.users          # Auth file
    └── objects/
        └── devtinder-services.cfg  # Service checks
```

## 🔐 Security Notes

⚠️ **Important:**
- Default password is `admin` - **CHANGE IT** after first login!
- Port 8080 is open to the internet (0.0.0.0/0)
- Consider restricting access to specific IPs in production

### Change Password:
```bash
docker exec -it nagios htpasswd -c /opt/nagios/etc/htpasswd.users nagiosadmin
docker-compose restart nagios
```

## ✨ Next Steps

1. Apply Terraform changes (add port 8080)
2. Deploy to EC2 with docker-compose
3. Access Nagios at `http://13.235.214.25:8080/nagios`
4. Change default password
5. Monitor your services! 🎉

---

**Questions?** Check `nagios/README.md` for detailed documentation.

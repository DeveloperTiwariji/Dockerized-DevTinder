# Required GitHub Secrets (Updated)

Go to: https://github.com/DeveloperTiwariji/Dockerized-DevTinder/settings/secrets/actions

---

## ✅ ONLY 5 Secrets Needed (EC2_HOST removed!)

### 1. Docker Hub (2 secrets)

| Secret Name | Value | How to Get |
|------------|-------|------------|
| `DOCKER_USERNAME` | `12207441` | Your Docker Hub username |
| `DOCKER_PASSWORD` | `dckr_pat_xxxxx` | Create at https://hub.docker.com/settings/security |

---

### 2. AWS Credentials (2 secrets)

| Secret Name | Value | How to Get |
|------------|-------|------------|
| `AWS_ACCESS_KEY_ID` | `AKIA...` | AWS Console → IAM → Users → Security Credentials |
| `AWS_SECRET_ACCESS_KEY` | `wJalr...` | Created together with Access Key ID |

---

### 3. EC2 SSH Key (1 secret)

| Secret Name | Value | How to Get |
|------------|-------|------------|
| `EC2_SSH_PRIVATE_KEY` | Full SSH key content | `cat ~/.ssh/devtinder_key` |

**Important:** Include the entire key:
```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA...
... (all lines)
-----END RSA PRIVATE KEY-----
```

---

## 🎯 What Changed?

### ❌ Removed (No longer needed):
- `EC2_HOST` - Now automatically retrieved from Terraform
- `EC2_USER` - Hardcoded as `ec2-user`

### ✅ Benefits:
- **No manual updates** when EC2 IP changes
- **Works automatically** after `terraform destroy` and recreate
- **Fewer secrets to manage**

---

## 🚀 How It Works Now

```yaml
# Old way (manual update required)
EC2_HOST: ${{ secrets.EC2_HOST }}  # Had to update every time!

# New way (automatic)
EC2_HOST: ${{ steps.terraform.outputs.ec2_ip }}  # Reads from Terraform!
```

The workflow now:
1. Runs `terraform init` in GitHub Actions
2. Gets EC2 IP with `terraform output -raw ec2_public_ip`
3. Uses that IP for SSH and health checks
4. **No manual intervention needed!**

---

## 📋 Quick Checklist

After adding secrets, verify you have:

- [x] `DOCKER_USERNAME` = `12207441`
- [x] `DOCKER_PASSWORD` = Docker Hub access token
- [x] `AWS_ACCESS_KEY_ID` = AWS Access Key
- [x] `AWS_SECRET_ACCESS_KEY` = AWS Secret Key  
- [x] `EC2_SSH_PRIVATE_KEY` = Full SSH private key content

**Total: 5 secrets** (was 7 before)

---

## 🔍 Test Your Setup

Push a commit to `main` branch and watch the workflow:

```bash
git commit --allow-empty -m "Test workflow with new secrets"
git push origin main
```

Check: https://github.com/DeveloperTiwariji/Dockerized-DevTinder/actions

### Expected Results:
1. ✅ Backend - Build & Test
2. ✅ Frontend - Build & Test  
3. ✅ Docker - Build & Push (needs Docker Hub secrets)
4. ✅ Deploy to EC2 (needs AWS + SSH secrets, EC2 IP retrieved automatically)
5. ✅ Health Check

---

## 💡 Pro Tips

1. **Docker Password**: Use access token, not your actual password
2. **AWS Keys**: Create IAM user specifically for CI/CD with minimal permissions
3. **SSH Key**: Make sure it's the PRIVATE key (the one WITHOUT `.pub`)
4. **No spaces**: Don't add extra spaces before/after values
5. **Copy exact format**: Especially for multi-line SSH key

---

## 🆘 Still Having Issues?

See detailed examples in: `.github/SECRETS_EXAMPLE.md`

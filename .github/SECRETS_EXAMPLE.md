# 🔐 GitHub Secrets - Complete Examples

This guide shows you **exactly** what each secret should look like with real examples.

---

## 1️⃣ DOCKER_USERNAME

**What it is:** Your Docker Hub account username

### Example:
```
developertiwari
```

### How to get it:
1. Go to https://hub.docker.com
2. Login to your account
3. Your username is shown in top-right corner
4. Or check your Docker Hub profile URL: `hub.docker.com/u/YOUR_USERNAME`

### ✅ Correct Format:
```
DOCKER_USERNAME = developertiwari
```

### ❌ Wrong Format:
```
DOCKER_USERNAME = developertiwari@gmail.com  (Don't use email!)
DOCKER_USERNAME = DeveloperTiwari            (Case matters!)
```

---

## 2️⃣ DOCKER_PASSWORD

**What it is:** Docker Hub Access Token (NOT your password!)

### Example:
```
dckr_pat_x7K9mN2pQ8vL5wR3tY6zB4nF1jD0sH8
```

### How to get it:
1. Login to https://hub.docker.com
2. Click your profile → **Account Settings**
3. Go to **Security** tab
4. Click **New Access Token**
5. Token description: `github-actions-cicd`
6. Access permissions: **Read, Write, Delete**
7. Click **Generate**
8. **COPY THE TOKEN IMMEDIATELY** (you can't see it again!)

### ✅ Correct Format:
```
DOCKER_PASSWORD = dckr_pat_x7K9mN2pQ8vL5wR3tY6zB4nF1jD0sH8
```

### ❌ Wrong Format:
```
DOCKER_PASSWORD = MyDockerHubPassword123  (Don't use actual password!)
DOCKER_PASSWORD = dckr_pat_***********    (Don't hide it in GitHub secrets)
```

---

## 3️⃣ AWS_ACCESS_KEY_ID

**What it is:** AWS IAM User Access Key ID

### Example:
```
AKIAIOSFODNN7EXAMPLE
```

### How to get it:
1. Login to **AWS Console**
2. Go to **IAM** → **Users** → Your username
3. Click **Security credentials** tab
4. Scroll to **Access keys** section
5. Click **Create access key**
6. Use case: Select **Command Line Interface (CLI)**
7. Check the acknowledgement box
8. Click **Next** → **Create access key**
9. **COPY THE ACCESS KEY ID** (starts with `AKIA`)

### ✅ Correct Format:
```
AWS_ACCESS_KEY_ID = AKIAIOSFODNN7EXAMPLE
```

### ❌ Wrong Format:
```
AWS_ACCESS_KEY_ID = arn:aws:iam::123456789012:user/myuser  (This is ARN, not key!)
AWS_ACCESS_KEY_ID = ASIA...                                 (This is temporary, need permanent)
```

---

## 4️⃣ AWS_SECRET_ACCESS_KEY

**What it is:** AWS IAM User Secret Access Key

### Example:
```
wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

### How to get it:
1. **Same process as Access Key ID** (they're created together)
2. After creating access key, you'll see both:
   - Access Key ID
   - Secret Access Key
3. **COPY BOTH IMMEDIATELY** (secret is shown only once!)

### ✅ Correct Format:
```
AWS_SECRET_ACCESS_KEY = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

### ❌ Wrong Format:
```
AWS_SECRET_ACCESS_KEY = ****************************************  (Don't hide it!)
AWS_SECRET_ACCESS_KEY = AKIAIOSFODNN7EXAMPLE                     (This is Access Key, not Secret!)
```

---

## 5️⃣ EC2_SSH_PRIVATE_KEY

**What it is:** Your entire SSH private key content (the one you use to SSH into EC2)

### Example:
```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAy8Dbv8prpJ/0kKhlGeJYozo2t60EG8L0561g13R29LvMR5hy
vGZlGJpmn65+A4xHXWUU1PF31tVuZQjSeC3omR8C9W7MdVz3Jk3F2C+MRTd8qIlJ
CtP1hPP5QEy8fHZW7dUhFcWFVXd+IhKwVpDlDqAR7rO3qNfWqUz0JLCCvEDnbOQu
sEf5M8tR2xVyHvCN4tA/dN3/YqQE5dH8M8Rb3ZrQx+hX0S9p7qLGTWvQRTFPnLNL
z6MvTJBN8MRLMxJHT3TRmqJdJ4bX0ItJQiZq7SgqX2cvbM3W2NFWV5SqZS9DpCv/
nTaHdVxqWM6RQLT1vKv8dKpDJPU5RyQbVFCJKQIDAQABAoIBAEDg7cJGPjxKvT3X
9tJ7e3sFslQcNxAq7iR6kzMJJ8bqGCPfLfmVpUjy1h3RvUB+lXqCgdJ3dE7fJQtL
a2WLLkV8yPqSvC7QJ0J6zCM0vGDdFtLNFe1KHZGLmDqWgZgdpFLO9qXCXKDL1p1I
wNTMZS4XQKp8aMRYxfP5DbJPXGVbvMdNvgW1A4WxVNYq9C1PHpKWwlWj3LrCPSxe
4DlRGZQXR8p9qjT7BjPQhLLdB7ZqFOJBVNZsGxPEKBvJmQXHWPQyVXKLBDGKRdqJ
ILNmGX8Gp3qmPJ0dLj6pKRMvOXvIVFBW0jfbRdvbDBqPfCDMhZwm6DPbLoJqCQzy
yUnChAECgYEA8JFMY3JLDCQWwdvMPrG7ViPJ0I5v3YxmvGaVlJ3hP3G1mJBnHFbT
aA9LnHqBH2KwRvLXb0zCuMnBZ1SqZH5FqYhQvCE6Iy8fVSPNYkVfKLDsYBQdG8Km
aPQFPXdGFdKlcXGKT3qV7sNmD5LfMQW8gPqLnKHV5hFVL6J8kTjP3GkCgYEA2K3l
qPTCVKjPqFJf8mVqp8dJxD2N3TcPgLWvHBLfN6EqVXCJPdLwWQgZF5kRfPPHMmC2
/F3qJLvPOCJLVGC8qYL0pKnBFMrQJMCGJ0GaEG3BrC7DqDW1UtYXWpCJjvMJNJDJ
aGWPKCqf3yS9WqZYPKBPdkqNpDJEQTEDkxNZ5YECgYEAwE0QJVvJZNqQJCGQdJBP
lJE5tKLQ9jQJr8MLRxL1vYL6Lg7Dv2aPZLXvDLCZGLPqVmBUCKJvEPdWvbN3GlEH
9NHPqWwmNPqJyZjBPGQVKFWCJ1hWGQdRVxBPqTJNLLvYGGqBxPqLhJfVVBm7hGlJ
kMJNPqGdN3LlPqVJLlGxZmkCgYBxlJvJlPqLGQdRVxBJKJvJLlYGGqBPdLwWQgZF
5kRfPPHMmC2/F3qJLvPOCJLVGC8qYL0pKnBFMrQJMCGJ0GaEG3BrC7DqDW1UtYXW
pCJjvMJNJDJaGWPKCqf3yS9WqZYPKBPdkqNpDJEQTEDkxNZ5YECgYAwE0QJVvJZN
qQJCGQdJBPlJE5tKLQ9jQJr8MLRxL1vYL6Lg7Dv2aPZLXvDLCZGLPqVmBUCKJvEP
-----END RSA PRIVATE KEY-----
```

### How to get it:
```bash
# Display your private key
cat ~/.ssh/devtinder_key

# Or if you named it differently
cat ~/.ssh/id_rsa
cat ~/.ssh/my_ec2_key.pem
```

### ✅ Correct Format:
```
EC2_SSH_PRIVATE_KEY = -----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAy8Dbv8prpJ/0kKhlGeJYozo2t60EG8L0561g13R29LvMR5hy
vGZlGJpmn65+A4xHXWUU1PF31tVuZQjSeC3omR8C9W7MdVz3Jk3F2C+MRTd8qIlJ
... (many more lines)
-----END RSA PRIVATE KEY-----
```

**Important:**
- Include `-----BEGIN RSA PRIVATE KEY-----` at the start
- Include `-----END RSA PRIVATE KEY-----` at the end
- Include ALL lines in between
- Don't add extra spaces or line breaks
- Copy the ENTIRE key content

### ❌ Wrong Format:
```
EC2_SSH_PRIVATE_KEY = ~/.ssh/devtinder_key              (Don't use file path!)
EC2_SSH_PRIVATE_KEY = MIIEpAIBAAKCAQEAy8Dbv8...       (Missing BEGIN/END markers)
EC2_SSH_PRIVATE_KEY = ********                          (Don't hide it!)
```

---

## 6️⃣ EC2_HOST

**What it is:** Your EC2 instance public IP address or DNS name

### Example:
```
3.6.150.204
```

### How to get it:
1. Login to **AWS Console**
2. Go to **EC2** → **Instances**
3. Click on your instance
4. Copy **Public IPv4 address** from details

Or use command:
```bash
# Get from your SSH command
ssh -i ~/.ssh/devtinder_key ec2-user@3.6.150.204
                                      ^^^^^^^^^^^
                                      This is EC2_HOST
```

### ✅ Correct Format:
```
EC2_HOST = 3.6.150.204
```

Or with DNS:
```
EC2_HOST = ec2-3-6-150-204.ap-south-1.compute.amazonaws.com
```

### ❌ Wrong Format:
```
EC2_HOST = http://3.6.150.204     (Don't include protocol!)
EC2_HOST = 3.6.150.204:22         (Don't include port!)
EC2_HOST = ec2-user@3.6.150.204   (Don't include username!)
```

---

## 7️⃣ EC2_USER

**What it is:** SSH username for your EC2 instance

### Example:
```
ec2-user
```

### Common values by OS:
- **Amazon Linux 2/2023**: `ec2-user`
- **Ubuntu**: `ubuntu`
- **Debian**: `admin` or `ubuntu`
- **RHEL**: `ec2-user`
- **Fedora**: `fedora`
- **CentOS**: `centos`

### How to verify:
```bash
# Check your SSH command
ssh -i ~/.ssh/devtinder_key ec2-user@3.6.150.204
                            ^^^^^^^^
                            This is EC2_USER
```

### ✅ Correct Format:
```
EC2_USER = ec2-user
```

### ❌ Wrong Format:
```
EC2_USER = root                           (Usually not allowed)
EC2_USER = ec2-user@3.6.150.204          (Don't include @host!)
EC2_USER = /home/ec2-user                (Don't use path!)
```

---

## 📝 Complete Example Summary

Here's what your GitHub secrets should look like:

```
Name                      | Value
--------------------------|----------------------------------------------------
DOCKER_USERNAME           | developertiwari
DOCKER_PASSWORD           | dckr_pat_x7K9mN2pQ8vL5wR3tY6zB4nF1jD0sH8
AWS_ACCESS_KEY_ID         | AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY     | wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
EC2_SSH_PRIVATE_KEY       | -----BEGIN RSA PRIVATE KEY-----
                          | MIIEpAIBAAKCAQEAy8Dbv8prpJ/0kKhl...
                          | (entire key content)
                          | -----END RSA PRIVATE KEY-----
EC2_HOST                  | 3.6.150.204
EC2_USER                  | ec2-user
```

---

## 🛠️ Step-by-Step: Adding to GitHub

### 1. Navigate to Secrets
```
GitHub Repository → Settings → Secrets and variables → Actions
```

### 2. Add Each Secret
For each secret:
1. Click **"New repository secret"**
2. Enter **Name** (exact name from above)
3. Paste **Value** (from examples above)
4. Click **"Add secret"**

### 3. Verify All Secrets
After adding all 7, you should see:
```
Repository secrets (7)
├── AWS_ACCESS_KEY_ID
├── AWS_SECRET_ACCESS_KEY
├── DOCKER_PASSWORD
├── DOCKER_USERNAME
├── EC2_HOST
├── EC2_SSH_PRIVATE_KEY
└── EC2_USER
```

---

## 🧪 Test Your Secrets

### Test 1: Docker Hub Login
```yaml
# This runs in your workflow
- name: Login to Docker Hub
  uses: docker/login-action@v3
  with:
    username: ${{ secrets.DOCKER_USERNAME }}
    password: ${{ secrets.DOCKER_PASSWORD }}
```

If successful: ✅ "Login Succeeded"
If failed: ❌ Check username/password

### Test 2: AWS Credentials
```yaml
# This runs in your workflow
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: ap-south-1
```

If successful: ✅ AWS CLI configured
If failed: ❌ Check access key/secret

### Test 3: SSH Connection
```yaml
# This runs in your workflow
- name: Deploy to EC2
  uses: appleboy/ssh-action@v1.0.3
  with:
    host: ${{ secrets.EC2_HOST }}
    username: ${{ secrets.EC2_USER }}
    key: ${{ secrets.EC2_SSH_PRIVATE_KEY }}
    script: echo "Connected!"
```

If successful: ✅ "Connected!"
If failed: ❌ Check SSH key/host/user

---

## 🔒 Security Best Practices

### ✅ DO:
- Use access tokens instead of passwords
- Rotate secrets every 90 days
- Use least-privilege IAM policies
- Keep private keys secure
- Never commit secrets to Git

### ❌ DON'T:
- Share secrets in chat/email
- Use root AWS credentials
- Reuse passwords across services
- Store secrets in code
- Screenshot secrets

---

## 🆘 Common Errors

### Error: "Invalid credentials"
**Fix:** Regenerate Docker Hub token, ensure no extra spaces

### Error: "Permission denied (publickey)"
**Fix:** Copy entire SSH key including BEGIN/END lines

### Error: "The security token included in the request is invalid"
**Fix:** Create new AWS access key from IAM console

### Error: "Connection timed out"
**Fix:** Check EC2_HOST IP address, verify instance is running

---

## 📞 Need Help?

If secrets still not working:

1. **Verify format** - Compare with examples above
2. **Regenerate credentials** - Create fresh tokens/keys
3. **Check AWS/Docker status** - Ensure services are active
4. **View workflow logs** - Check GitHub Actions output
5. **Test locally** - Verify credentials work on your machine first

---

**🎯 Pro Tip:** After adding all secrets, trigger a test workflow to verify everything works before deploying to production!

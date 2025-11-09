# 🔍 Nagios Monitoring Setup

This directory contains the Nagios monitoring configuration for the DevTinder application stack.

## 📊 What's Being Monitored

### Services:
- ✅ **Frontend (web-image)** - HTTP service on port 80
- ✅ **Backend (backend-image)** - API health check and port 3000
- ✅ **MongoDB** - Database connectivity on port 27017
- ✅ **Redis** - Cache service on port 6379

### Checks Performed:
1. **HTTP Service** - Checks if frontend is responding
2. **API Health Check** - Checks backend `/api/health` endpoint
3. **Port Monitoring** - Ensures all services are listening on correct ports
4. **Host Availability** - Ping checks for all containers

## 🚀 Access Nagios

**URL:** `http://13.235.214.25:8080/nagios`

**Login Credentials:**
- **Username:** `nagiosadmin`
- **Password:** `admin`

⚠️ **Important:** Change the default password in production!

## 📁 Configuration Files

```
nagios/
├── Dockerfile                          # Nagios container build
├── etc/
│   ├── nagios.cfg                      # Main Nagios config
│   ├── cgi.cfg                         # Web interface config
│   ├── htpasswd.users                  # Authentication file
│   └── objects/
│       └── devtinder-services.cfg      # Service monitoring definitions
```

## 🔧 Customizing Monitoring

### Add New Service Check

Edit `nagios/etc/objects/devtinder-services.cfg`:

```cfg
define service {
    use                     generic-service
    host_name               devtinder-backend
    service_description     Custom Check
    check_command           check_http!-p 3000 -u /api/custom
    max_check_attempts      3
    check_interval          2
}
```

### Modify Check Intervals

- `check_interval`: How often to check (in minutes)
- `retry_interval`: How often to retry after failure
- `max_check_attempts`: Failures before alert

### Change Web Password

```bash
# Generate new password
docker exec -it nagios htpasswd -c /opt/nagios/etc/htpasswd.users nagiosadmin

# Restart Nagios
docker-compose restart nagios
```

## 📈 Nagios Dashboard Features

### Main Views:
1. **Service Detail** - Status of all monitored services
2. **Host Detail** - Status of all hosts (containers)
3. **Service Groups** - Grouped view of services
4. **Network Outages** - Network topology view
5. **Event Log** - Historical events and alerts

### Status Indicators:
- 🟢 **OK** - Service is working
- 🟡 **WARNING** - Service is degraded
- 🔴 **CRITICAL** - Service is down
- ⚪ **UNKNOWN** - Cannot determine status
- 🔵 **PENDING** - Check in progress

## 🛠️ Troubleshooting

### Nagios not accessible?

1. **Check container is running:**
   ```bash
   docker ps | grep nagios
   ```

2. **Check logs:**
   ```bash
   docker logs nagios
   ```

3. **Verify port 8080 is open:**
   ```bash
   curl http://localhost:8080/nagios
   ```

### Services showing as DOWN?

1. **Verify service names match container names:**
   ```bash
   docker ps --format "{{.Names}}"
   ```

2. **Test connectivity from Nagios container:**
   ```bash
   docker exec nagios ping -c 3 backend-image
   docker exec nagios curl http://backend-image:3000/api/health
   ```

3. **Check Nagios configuration:**
   ```bash
   docker exec nagios /opt/nagios/bin/nagios -v /opt/nagios/etc/nagios.cfg
   ```

## 📧 Notifications (Optional)

To enable email alerts, add to `nagios/etc/objects/contacts.cfg`:

```cfg
define contact {
    contact_name            devops
    alias                   DevOps Team
    email                   your-email@example.com
    service_notification_commands   notify-service-by-email
    host_notification_commands      notify-host-by-email
}
```

## 🔐 Security Considerations

1. **Change default password** immediately
2. **Use HTTPS** in production (configure reverse proxy)
3. **Restrict access** to monitoring dashboard
4. **Regular updates** of Nagios image

## 📖 Monitoring Best Practices

- ✅ Set appropriate check intervals (not too frequent)
- ✅ Configure notification escalations
- ✅ Maintain service dependencies
- ✅ Document custom checks
- ✅ Regular configuration backups
- ✅ Monitor Nagios itself

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| "Connection refused" errors | Check if target service is running |
| High CPU usage | Increase check intervals |
| False positives | Adjust retry intervals and max attempts |
| Missing graphs | Install PNP4Nagios plugin |

## 📚 Resources

- [Nagios Documentation](https://www.nagios.org/documentation/)
- [Nagios Plugins](https://www.nagios.org/downloads/nagios-plugins/)
- [Monitoring Best Practices](https://assets.nagios.com/downloads/nagioscore/docs/nagioscore/4/en/monitoring-overview.html)

---

**Note:** This setup uses the `jasonrivers/nagios` Docker image with custom configurations for DevTinder stack monitoring.

# Production Deployment Guide

This guide will help you deploy the Technology Pillars under construction page to a production server with Docker, Traefik, and automatic SSL certificates.

## Prerequisites

- A server with Docker and Docker Compose installed
- A domain name pointing to your server's IP address
- Ports 80, 443, and 8080 open on your server

## Step 1: Clone the Repository

```bash
# On your production server
git clone <your-repo-url>
cd Underconstraction
```

## Step 2: Update Domain Configuration

Edit `docker-compose.yml` and update the following:

1. **Lines 30-31**: Replace with your actual domain
   ```yaml
   - "traefik.http.routers.web.rule=Host(`yourdomain.com`) || Host(`www.yourdomain.com`)"
   - "traefik.http.routers.web-secure.rule=Host(`yourdomain.com`) || Host(`www.yourdomain.com`)"
   ```

2. **Line 11**: Verify your email is correct (already set to mohamed.ahmed@technologypillars.com)
   ```yaml
   - "--certificatesresolvers.myresolver.acme.email=mohamed.ahmed@technologypillars.com"
   ```

## Step 3: Create SSL Certificate Directory

Create the directory where Let's Encrypt will store SSL certificates:

```bash
mkdir -p letsencrypt
chmod 700 letsencrypt
```

This directory is already in `.gitignore` so certificates won't be committed to the repository.

## Step 4: Test with Staging Certificates (Optional but Recommended)

Before using production SSL certificates, test with Let's Encrypt staging to avoid rate limits:

1. Uncomment line 14 in `docker-compose.yml`:
   ```yaml
   - "--certificatesresolvers.myresolver.acme.caserver=https://acme-staging-v02.api.letsencrypt.org/directory"
   ```

2. Build and start the containers:
   ```bash
   docker-compose up --build -d
   ```

3. Check the logs:
   ```bash
   docker-compose logs -f traefik
   docker-compose logs -f web
   ```

4. Test your domain in a browser (you'll see a certificate warning - this is expected with staging)

5. If everything works, stop the containers:
   ```bash
   docker-compose down
   ```

6. Remove the staging certificates:
   ```bash
   rm -rf letsencrypt/*
   ```

7. Comment out line 14 again in `docker-compose.yml`

## Step 5: Deploy with Production Certificates

```bash
# Build and start all services
docker-compose up --build -d

# Monitor logs
docker-compose logs -f
```

## Step 6: Verify Deployment

1. Check running containers:
   ```bash
   docker-compose ps
   ```

2. Access your website:
   - HTTP: `http://yourdomain.com` (will redirect to HTTPS)
   - HTTPS: `https://yourdomain.com`
   - Traefik Dashboard: `http://your-server-ip:8080`

3. Verify SSL certificate:
   - Browser should show a secure padlock icon
   - Certificate should be issued by Let's Encrypt

## Step 7: Set Up Auto-Restart

Ensure containers restart automatically if the server reboots:

```bash
# This is already configured with "restart: unless-stopped" in docker-compose.yml
# But you can verify:
docker ps --filter "name=traefik" --filter "name=web"
```

## Monitoring and Maintenance

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f web
docker-compose logs -f traefik
```

### Restart Services
```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart web
```

### Stop Services
```bash
docker-compose down
```

### Update Deployment
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose up --build -d
```

## SSL Certificate Renewal

Let's Encrypt certificates are valid for 90 days. Traefik automatically renews them when they're about to expire (typically 30 days before expiration).

To check certificate expiration:
```bash
# Check logs for renewal attempts
docker-compose logs traefik | grep -i "acme\|certificate"
```

## Troubleshooting

### Issue: Cannot connect to HTTPS

**Solution:**
- Verify ports 80 and 443 are open: `sudo ufw status` or check firewall rules
- Check DNS: `dig yourdomain.com` or `nslookup yourdomain.com`
- Check Traefik logs: `docker-compose logs traefik`

### Issue: SSL certificate not working

**Solution:**
- Ensure domain is pointing to your server IP
- Check ACME storage: `ls -la letsencrypt/acme.json`
- Verify email in docker-compose.yml is correct
- Try with staging certificates first

### Issue: Container won't start

**Solution:**
- Check logs: `docker-compose logs web`
- Verify build completed: `docker-compose build web`
- Check disk space: `df -h`

### Issue: "Rate limit exceeded" error

**Solution:**
- Let's Encrypt has rate limits (5 certificates per domain per week)
- Use staging certificates for testing
- Wait for rate limit to reset
- Check: https://letsencrypt.org/docs/rate-limits/

## Security Recommendations

1. **Secure Traefik Dashboard**: The dashboard is currently open on port 8080. For production, either:
   - Close port 8080 in firewall
   - Remove `"--api.insecure=true"` and configure authentication
   - Block external access with firewall rules

2. **Regular Updates**: Keep Docker images updated:
   ```bash
   docker-compose pull
   docker-compose up -d
   ```

3. **Backup SSL Certificates**:
   ```bash
   # Backup letsencrypt directory periodically
   tar -czf letsencrypt-backup-$(date +%Y%m%d).tar.gz letsencrypt/
   ```

## Environment Variables (Optional)

For sensitive configuration, you can use environment variables:

1. Create `.env` file (already in .gitignore):
   ```env
   DOMAIN=yourdomain.com
   EMAIL=your-email@domain.com
   ```

2. Update docker-compose.yml to use variables:
   ```yaml
   - "traefik.http.routers.web.rule=Host(`${DOMAIN}`) || Host(`www.${DOMAIN}`)"
   ```

## Useful Commands

```bash
# Check service status
docker-compose ps

# View resource usage
docker stats

# Clean up unused images
docker system prune -a

# View all logs
docker-compose logs --tail=100

# Follow logs in real-time
docker-compose logs -f

# Restart specific service
docker-compose restart web
```

## Support

For issues or questions:
- Check logs: `docker-compose logs`
- Verify DNS: `nslookup yourdomain.com`
- Check SSL: `https://www.ssllabs.com/ssltest/`
- Traefik docs: https://doc.traefik.io/traefik/

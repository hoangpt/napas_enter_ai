# VKS Flask API - Docker Deployment Guide

## 🐳 Docker Files Overview

| File | Purpose |
|------|---------|
| `Dockerfile` | Main application container |
| `docker-compose.yml` | Production deployment |
| `docker-compose.dev.yml` | Development environment |
| `.dockerignore` | Files to exclude from build |

## 📁 Directory Structure

```
vks_flask/
├── Dockerfile
├── docker-compose.yml
├── docker-compose.dev.yml
├── .dockerignore
├── requirements.txt
├── app_swagger.py
├── .env
└── data/                    # External mount point
    ├── instance/            # SQLite database
    │   └── vks_app.db
    └── uploads/             # Uploaded files
        └── *.jpg
```

## 🚀 Quick Start

### 1. Preparation
```bash
# Create external mount directories
mkdir -p data/instance data/uploads

# Copy environment file
cp .env.example .env
# Edit .env with your Azure OpenAI credentials
```

### 2. Production Deployment
```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 3. Development Mode
```bash
# Run with hot reload
docker-compose -f docker-compose.dev.yml up

# Rebuild after changes
docker-compose -f docker-compose.dev.yml up --build
```

## 🔧 Configuration

### Environment Variables

Create `.env` file:
```bash
# Azure OpenAI Configuration
AZURE_OPENAI_API_KEY=your_api_key_here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_VERSION=2024-02-15-preview
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4-vision-preview

# Flask Configuration
FLASK_ENV=production
FLASK_DEBUG=0
```

### Volume Mounts

**Production (`docker-compose.yml`):**
```yaml
volumes:
  - ./data/instance:/app/instance    # Database persistence
  - ./data/uploads:/app/uploads      # File uploads
  - ./.env:/app/.env:ro              # Environment config
```

**Development (`docker-compose.dev.yml`):**
```yaml
volumes:
  - .:/app                           # Source code hot reload
  - ./data/instance:/app/instance    # Database persistence
  - ./data/uploads:/app/uploads      # File uploads
```

## 🌐 Access Points

After deployment:
- **API**: http://localhost:5000
- **Swagger Docs**: http://localhost:5000/swagger/
- **Health Check**: http://localhost:5000/

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/nguyen-don` | GET/POST | Nguyên đơn management |
| `/api/bi-don` | GET/POST | Bị đơn management |
| `/api/ho-so` | GET/POST | Hồ sơ thụ lý management |
| `/api/upload/document` | POST | Upload & process documents |
| `/api/upload/extract-only` | POST | Extract without saving |
| `/api/statistics` | GET | System statistics |

## 🛠️ Management Commands

### Container Management
```bash
# View running containers
docker ps

# Enter container shell
docker exec -it vks-flask-api bash

# View container logs
docker logs vks-flask-api

# Restart container
docker restart vks-flask-api
```

### Database Management
```bash
# Backup database
docker exec vks-flask-api cp /app/instance/vks_app.db /tmp/backup.db
docker cp vks-flask-api:/tmp/backup.db ./backup.db

# Restore database
docker cp ./backup.db vks-flask-api:/app/instance/vks_app.db
docker restart vks-flask-api
```

### File Management
```bash
# Check uploaded files
ls -la data/uploads/

# Clean old uploads
find data/uploads -type f -mtime +30 -delete

# Monitor disk usage
du -sh data/
```

## 🔍 Troubleshooting

### Common Issues

**1. Database Connection Error**
```bash
# Check if instance directory exists
ls -la data/instance/

# Check permissions
chmod 755 data/instance
```

**2. File Upload Issues**
```bash
# Check uploads directory
ls -la data/uploads/

# Check permissions
chmod 755 data/uploads
```

**3. Azure OpenAI Configuration**
```bash
# Check environment variables
docker exec vks-flask-api env | grep AZURE

# Test API endpoint
docker exec vks-flask-api curl -f http://localhost:5000/api/upload/test
```

### Debug Commands

```bash
# Check container health
docker inspect vks-flask-api | grep -A 5 '"Health"'

# View resource usage
docker stats vks-flask-api

# Check network connectivity
docker exec vks-flask-api ping google.com
```

## 🔒 Security Considerations

### Production Security
```yaml
# Use specific image versions
FROM python:3.12-slim

# Run as non-root user
RUN useradd -m -u 1000 vks
USER vks

# Limit container resources
deploy:
  resources:
    limits:
      cpus: '1.0'
      memory: 512M
```

### Environment Security
```bash
# Secure .env file
chmod 600 .env

# Use Docker secrets for sensitive data
echo "api_key_here" | docker secret create azure_api_key -
```

## 📈 Monitoring

### Health Checks
```bash
# Built-in health check
curl -f http://localhost:5000/

# Detailed status
curl http://localhost:5000/api/upload/test
```

### Log Analysis
```bash
# Follow logs
docker-compose logs -f

# Search logs
docker-compose logs | grep ERROR

# Export logs
docker-compose logs > vks_app.log
```

## 🔄 Updates & Maintenance

### Application Updates
```bash
# Pull latest changes
git pull origin main

# Rebuild and redeploy
docker-compose down
docker-compose up -d --build
```

### Database Migration
```bash
# Backup before update
docker exec vks-flask-api cp /app/instance/vks_app.db /tmp/backup.db

# Update and restart
docker-compose up -d --build
```

## 📝 Example Usage

### Upload Document
```bash
# Upload with mock data
curl -X POST http://localhost:5000/api/upload/document \
  -F "file=@test_document.jpg" \
  -F "use_fixtures=true"

# Upload with Azure OpenAI
curl -X POST http://localhost:5000/api/upload/document \
  -F "file=@test_document.jpg" \
  -F "use_fixtures=false"
```

### Get Statistics
```bash
curl http://localhost:5000/api/statistics
```

This Docker setup provides a complete containerized solution for the VKS Flask API with persistent data storage and easy deployment!

# SSL Certificates

This directory should contain SSL certificates for HTTPS support in production.

## Required Files

- `key.pem` - Private key
- `cert.pem` - Certificate

## Generating Self-Signed Certificates (for testing)

For development/testing purposes, you can generate self-signed certificates:

```bash
# Create the certs directory if it doesn't exist
mkdir -p certs

# Generate self-signed certificate (valid for 365 days)
openssl req -x509 -newkey rsa:4096 -keyout certs/key.pem -out certs/cert.pem -days 365 -nodes -subj "/CN=localhost"
```

**Note:** Self-signed certificates will show security warnings in browsers. For production, use certificates from a trusted Certificate Authority (CA) like Let's Encrypt.

## Production Certificates

For production deployments, obtain certificates from a trusted CA:

### Using Let's Encrypt (Certbot)

```bash
# Install certbot
sudo apt-get install certbot

# Obtain certificate (replace example.com with your domain)
sudo certbot certonly --standalone -d example.com

# Copy certificates to certs directory
sudo cp /etc/letsencrypt/live/example.com/privkey.pem certs/key.pem
sudo cp /etc/letsencrypt/live/example.com/fullchain.pem certs/cert.pem
```

## Security Notes

- **Never commit certificates to version control**
- The `certs/` directory is in `.gitignore` to prevent accidental commits
- Keep your private key secure and restrict file permissions:
  ```bash
  chmod 600 certs/key.pem
  chmod 644 certs/cert.pem
  ```
- Rotate certificates before they expire
- Use strong encryption (RSA 2048-bit minimum, 4096-bit recommended)

## Disabling HTTPS

If you don't need HTTPS in production, you can disable it by setting the environment variable:

```bash
USE_HTTPS=false npm start
```

The server will only run on HTTP in this case.

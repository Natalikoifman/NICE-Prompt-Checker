# Security Notes

## Current Status

This project has been scanned for security vulnerabilities and updated to use secure dependency versions.

### Dependency Security

✅ **Axios updated to 1.12.0** - Addresses DoS and SSRF vulnerabilities
✅ **Bot Framework SDK 4.20.0** - Latest stable version
✅ **Dotenv 16.3.1** - No known vulnerabilities

### Known Issues

The current version uses `restify@11.1.0` which has some transitive dependencies with known vulnerabilities:

1. **fast-redact** - Prototype pollution (Low severity)
2. **find-my-way** - ReDoS in multiparametric routes (High severity)
3. **send** - Template injection (High severity)

### Mitigation

These vulnerabilities are in the HTTP server dependencies. For production use:

**Option 1: Use Express.js instead**
```javascript
// Replace restify with express in package.json and src/index.js
npm install express
```

**Option 2: Update to latest restify**
```bash
npm audit fix --force
# Note: This may introduce breaking changes
```

**Option 3: Deploy behind a reverse proxy**
- Use Azure App Service with built-in protections
- Use Application Gateway or API Management
- Enable Web Application Firewall (WAF)

### Recommendations for Production

1. ✅ Deploy behind Azure App Service (includes protections)
2. ✅ Use Azure Bot Service (handles authentication)
3. ✅ Enable HTTPS only
4. ✅ Use Azure Key Vault for secrets
5. ✅ Enable logging and monitoring
6. ⚠️ Consider migrating to Express.js
7. ⚠️ Keep dependencies updated regularly

### Testing Environment

For testing purposes, these vulnerabilities have minimal impact because:
- Bot only handles Teams messages (authenticated via Bot Framework)
- No user-uploaded files or templates
- No direct HTTP routes exposed to users
- Azure Bot Service provides additional security layer

### Checking Security

Run security scan:
```bash
npm audit
```

Update dependencies:
```bash
npm update
npm audit fix
```

For breaking changes:
```bash
npm audit fix --force
```

### Reporting Security Issues

If you discover a security issue, please:
1. Do NOT open a public GitHub issue
2. Email the maintainers directly
3. Provide details of the vulnerability
4. Allow time for a fix before public disclosure

---

**Last Updated**: October 2025

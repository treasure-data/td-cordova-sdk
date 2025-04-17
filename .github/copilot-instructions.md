# GitHub Copilot Security Instructions

## General Security Guidelines

* Do not hardcode sensitive information (passwords, API keys, tokens)
* Sanitize all user inputs to prevent injection attacks
* Use parameterized queries for database operations
* Implement proper error handling without exposing sensitive details
* Validate and sanitize all data before processing or storing
* Use secure communication protocols (HTTPS, SSH) for data transmission
* Implement proper access controls and authentication mechanisms

## Code Review Checklist

* Check for hardcoded credentials or sensitive data
* Verify input validation and sanitization
* Look for potential SQL injection vulnerabilities
* Identify possible cross-site scripting (XSS) issues
* Review error handling and logging practices
* Examine file handling and uploads for security risks
* Assess the use of third-party libraries and their versions

## Security Best Practices

* Use environment variables for sensitive configuration
* Implement proper session management
* Apply the principle of least privilege
* Use secure random number generators for cryptographic operations
* Implement proper password hashing and storage techniques
* Regularly update dependencies and apply security patches
* Use content security policies to mitigate XSS attacks

## Commit Guidelines

* Review all changes before committing
* Use meaningful commit messages that describe security-related changes
* Double-check for accidentally committed sensitive information
* Consider using pre-commit hooks for automated security checks
* Remember to adapt and expand these guidelines based on your specific project requirements and technologies used.

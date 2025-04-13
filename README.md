# Secure Messaging API

A NestJS implementation of a secure messaging system with AES-256 encryption.

## Features
- Store encrypted messages per user
- Retrieve decrypted messages for authenticated users
- Debug endpoint to compare broken vs fixed decryption
- SQLite database for local development

## Table of Contents
1. [Installation](#installation)
2. [Running the API](#running-the-api)
3. [API Endpoints](#api-endpoints)
4. [Testing](#testing)
5. [Design Decisions](#design-decisions)
6. [Production Considerations](#production-considerations)
7. [Postman Collection](#postman-collection)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/secure-messaging-api.git
   cd secure-messaging-api
Install dependencies:

bash
Copy
npm install
Set up environment variables (create .env file):

env
Copy
# Encryption
ENCRYPTION_ALGORITHM=aes-256-cbc
ENCRYPTION_IV_LENGTH=16
ENCRYPT  ION_KEY_LENGTH=32
ENCRYPTION_SALT=secure-salt-change-me
Running the API
Development mode:

npm run start:dev
The API will be available at http://localhost:3000

API Endpoints
1. Store Message
POST /messages

json
{
  "content": "Your secret message",
  "userId": "123e4567-e89b-12d3-a456-426614174000" // Must be UUIDv4
}
2. Retrieve Messages
GET /messages/:userId

Replace :userId with the UUID used during message creation

3. Debug Decryption
POST /debug/decrypt

json
{
  "encryptedText": "base64IV:base64Data", // From POST /messages response
  "userSecret": "same-user-id-used-for-encryption" 
}

Testing

Test sequence:

POST /messages - Store a message

GET /messages/:userId - Retrieve messages

POST /debug/decrypt - Test decryption

Design Decisions
Encryption Method
Algorithm: AES-256-CBC

Why:

Industry standard for symmetric encryption

CBC mode provides better security than ECB

IV is randomly generated per message

Security
User Access Control:

Messages encrypted with user-specific keys

Even with database access, messages can't be decrypted without the original user ID

IV Handling:

Random IV generated per message

Stored as base64Iv:base64Data format

Anti-Spoofing:

Authentication guard verifies requests

In production: JWT with user ID claim

Production Considerations
Recommended Improvements
Database:

Switch to PostgreSQL/MySQL

Implement proper migrations

Disable synchronize in production

Security:

Add JWT authentication

Implement rate limiting

Use HTTPS

Rotate encryption keys periodically

Performance:

Add caching layer

Implement connection pooling

Add message pagination

Monitoring:

Health checks

Request logging

Performance metrics

Postman Collection
Collection JSON
json
Copy
{
  "info": {
    "name": "Secure Messaging API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Store Message",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"content\": \"Test message\",\n  \"userId\": \"{{testUserId}}\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/messages",
          "host": ["{{baseUrl}}"],
          "path": ["messages"]
        }
      }
    },
    {
      "name": "Get Messages",
      "request": {
        "method": "GET",
        "url": {
          "raw": "{{baseUrl}}/messages/{{testUserId}}",
          "host": ["{{baseUrl}}"],
          "path": ["messages", "{{testUserId}}"]
        }
      }
    }
  ]
}
Test Data
json
{
  "testMessages": [
    {
      "content": "First test message",
      "userId": "123e4567-e89b-12d3-a456-426614174000"
    },
    {
      "content": "Second test message",
      "userId": "123e4567-e89b-12d3-a456-426614174000"
    }
  ]
}
# 🕵️ SpyBase

**SpyBase** is a secure backend API built with Node.js, Express, and PostgreSQL that manages secret agents, missions, and encrypted mission files.

## 🔐 Features

- Agent creation with encrypted real names (AES-256-CBC)
- Mission assignment to agents
- Upload and decrypt mission files
- PostgreSQL connection pooling
- Input validation with `express-validator`

---

## 📦 Technologies

- Node.js
- Express.js
- PostgreSQL (`pg`)
- AES encryption (`crypto`)
- dotenv for environment config
- express-validator for input validation

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/justimagineusername/SpyBase.git
cd SpyBase

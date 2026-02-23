# Quickstart: Unmanned Key Management

## Admin Operations (CLI)

1. **Upload Passwords**:
   ```bash
   mgmt-cli passwords upload --file passwords.txt
   ```

2. **Manage Vehicles**:
   ```bash
   mgmt-cli items add --plate "沪A88888" --type vehicle_key
   ```

3. **Audit Logs**:
   ```bash
   mgmt-cli logs --last 24h
   ```

## Local Development

1. **Install Core Library**:
   ```bash
   cd packages/management-core
   npm install
   npm test # Run TDD suite
   ```

2. **Mini Program Setup**:
   - Open in WeChat DevTools.
   - Initialize CloudBase environment.
   - Run `npm install` in `miniprogram/`.

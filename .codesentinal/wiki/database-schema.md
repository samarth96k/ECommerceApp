# Database Schema and Data Contracts

Please provide the **Contract Files** (or the source code/schema definitions) you would like me to document. 

Once you provide the content (e.g., TypeScript interfaces, JSON schemas, Protobuf definitions, or database migration files), I will generate the `database-schema.md` file following your rules.

***

### Template Example
*If you provide your files, I will structure the output like this:*

# Database Schema & Data Contracts

This document outlines the core data structures and validation contracts used within the system.

## 1. Core Interfaces
### `UserAccount`
Represents the user entity structure across the authentication and profile services.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary key |
| `email` | `String` | Unique identifier; validated via Regex |
| `metadata` | `Object` | Arbitrary JSON payload |

## 2. Validation Schemas
### `CreateOrderRequest`
The expected payload shape for the `/orders` POST endpoint.

```json
{
  "type": "object",
  "required": ["productId", "quantity"],
  "properties": {
    "productId": { "type": "string" },
    "quantity": { "type": "integer", "minimum": 1 }
  }
}
```

## 3. Database Constraints
*   **Table:** `transactions`
    *   `status` must be one of: `['PENDING', 'COMPLETED', 'FAILED']`
    *   `created_at` defaults to `CURRENT_TIMESTAMP`

***

**Please paste your contract files below to begin.**

---

## Repository Memory Entry

Memory ID: 9516d118ab58

Created At: 2026-06-06T09:51:15.660Z

### Reason

Interface changes for order processing.

### Knowledge

Payment provider process methods now return standardized objects: { success: boolean, message?: string, orderId?: string, session_url?: string, order?: object }.

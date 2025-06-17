
---
##  Login

### POST `/users`
Cria um novo usuário.

**Body:**
```json
{
  "userName": "string",
  "userEmail": "string",
  "userPassword": "string"
}
```

**Resposta:** 

```json
{ 
    "message": "User registered successfully"
}
```

---
### PUT `/users`
Autentica o usuário e retorna tokens JWT.

**Body:**
```json
{
  "userEmail": "string",
  "userPassword": "string"
}
```

**Resposta:**
```json
{
  "token": "jwt_access_token",
}
```

---
## 👤 Usuário

### GET `/users/me`
Retorna os dados do usuário logado.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Resposta:**
```json
{
  "userId": "string",
  "userName": "string",
  "userEmail": "string"
}
```


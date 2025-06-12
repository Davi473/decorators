
---
##  Login

### POST `/users`
Cria um novo usuário.

**Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Resposta:** 

```json
{ 
    "id": "string"
}
```

---
### PUT `/users`
Autentica o usuário e retorna tokens JWT.

**Body:**
```json
{
  "email": "string",
  "password": "string"
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
  "id": "string",
  "name": "string",
  "email": "string"
}
```


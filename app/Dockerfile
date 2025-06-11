# Rotas da API:
# POST   /users      - Cria um novo usuário
# PUT    /users      - Autentica o usuário e retorna tokens JWT
# GET    /users/me   - Retorna os dados do usuário logado

FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
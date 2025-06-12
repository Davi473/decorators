import React, { useState } from "react";

const Login: any = ({ onTrocarPagina }: any) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: senha }),
      });
      
      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        onTrocarPagina("home");
      } else {
        alert("Login inválido!");
      }
    } catch (error) {
      alert("Erro ao fazer login!");
    }
  };

    React.useEffect(() => {
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.background = "#181818";
        return () => {
            document.body.style.margin = "";
            document.body.style.padding = "";
            document.body.style.background = "";
        };
    }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#181818",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#232323",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          minWidth: "320px",
        }}
      >
        <h2 style={{ color: "#fff", textAlign: "center", marginBottom: "1.5rem" }}>
          Login
        </h2>
        <input
          type="email"
          placeholder="Seu Gmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            marginBottom: "1rem",
            padding: "0.75rem",
            borderRadius: "4px",
            border: "none",
            background: "#2c2c2c",
            color: "#fff",
            fontSize: "1rem",
          }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          style={{
            marginBottom: "1.5rem",
            padding: "0.75rem",
            borderRadius: "4px",
            border: "none",
            background: "#2c2c2c",
            color: "#fff",
            fontSize: "1rem",
          }}
        />
        <button
          type="submit"
          style={{
            background: "#111",
            color: "#fff",
            padding: "0.75rem",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "background 0.2s",
          }}
        >
          Entrar
        </button>
        <span
          style={{
            color: "#bbb",
            marginTop: "1rem",
            textAlign: "center",
            fontSize: "0.95rem",
            cursor: "pointer",
            display: "block",
          }}
        >
          Não tem conta? Registre-se{" "}
          <a
            onClick={(e) => {
              e.preventDefault();
              onTrocarPagina("register");
            }}
            style={{ color: "#4fa3ff", textDecoration: "underline", cursor: "pointer" }}
          >
            aqui
          </a>
        </span>
      </form>
    </div>
  );
};

export default Login;
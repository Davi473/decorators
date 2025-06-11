import React from "react";

const Navbar: React.FC = () => (
  <nav
    style={{
      width: "50%",
      minWidth: 320,
      maxWidth: 600,
      margin: "40px auto 0 auto",
      padding: "16px 32px",
      background: "#222",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      borderRadius: 12,
    }}
  >
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <span style={{ fontWeight: "bold", fontSize: 18 }}>Home</span>
      <span style={{ fontSize: 16 }}>Calendário</span>
    </div>
  </nav>
);

const Home: React.FC = () => {
  const userName = "Usuário";

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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Navbar />
      <div
        style={{
          width: "50%",
          minWidth: 320,
          maxWidth: 600,
          margin: "32px auto 0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", // Alinha à esquerda, igual à navbar
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: 32,
            marginBottom: 4,
            textAlign: "left", // Alinha o texto à esquerda
          }}
        >
          Bom dia,
        </h1>
        <h2
          style={{
            color: "#fff",
            fontSize: 28,
            marginBottom: 10,
            textAlign: "left",
            fontWeight: "normal",
          }}
        >
          Fulano
        </h2>
      </div>
      {/* Lista de tarefas */}
      <div
        style={{
          width: "50%",
          minWidth: 320,
          maxWidth: 600,
          margin: "24px auto 0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <span style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>
          Gastos
        </span>
        {/* Card Gasto 1 */}
        <div
          style={{
            background: "#222",
            color: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            padding: "16px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: 16 }}>Mercado</span>
          <span style={{ fontWeight: "bold", color: "#ff7675" }}>R$ 150,00</span>
        </div>
        {/* Card Gasto 2 */}
        <div
          style={{
            background: "#222",
            color: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            padding: "16px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: 16 }}>Internet</span>
          <span style={{ fontWeight: "bold", color: "#ff7675" }}>R$ 99,90</span>
        </div>
        {/* Card Gasto 3 */}
        <div
          style={{
            background: "#222",
            color: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            padding: "16px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: 16 }}>Transporte</span>
          <span style={{ fontWeight: "bold", color: "#ff7675" }}>R$ 45,00</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
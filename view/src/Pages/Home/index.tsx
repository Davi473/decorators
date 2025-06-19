import React from "react";
import Table from "./components/Table";
import Greenting from "./components/Greeting";
import Navbar from "../../components/Navbar";

const Home: any = ({ onTrocarPagina }: any) => {
  const [loading, setLoading] = React.useState(false); // true
  const [userName, setUserName] = React.useState<string>("Usuario");

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

  React.useEffect(() => {
    const verificarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        onTrocarPagina("login");
        return;
      }
      try {
        const response = await fetch("http://localhost:3000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Não autorizado");
        }
        const data = await response.json();
        console.log(data);
        setUserName(data.name);
        setLoading(false);
      } catch (error) {
        onTrocarPagina("login");
      }
    };
    verificarUsuario();
  }, [onTrocarPagina]);

  return (
    loading ? (
      <div
        style={{
          minHeight: "100vh",
          background: "#181818",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontSize: "4rem",
            letterSpacing: "0.2em",
            fontFamily: "monospace",
          }}
          className="dot-typing"
        >
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </span>
        <style>
          {`
            .dot-typing .dot {
              opacity: 0.2;
              animation: blink 1.4s infinite both;
            }
            .dot-typing .dot:nth-child(2) {
              animation-delay: 0.2s;
            }
            .dot-typing .dot:nth-child(3) {
              animation-delay: 0.4s;
            }
            @keyframes blink {
              0%, 80%, 100% { opacity: 0.2; }
              40% { opacity: 1; }
            }
          `}
        </style>
      </div>
    ) : (
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
        {/* Navbar */}
        <Navbar onTrocarPagina={onTrocarPagina} paginaAtual="home" />
        {/* Saudação */}
        <Greenting name={userName} />
        {/* Lista de tarefas */}
        <Table />
      </div>
    )
  );
};

export default Home;
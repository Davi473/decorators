const Navbar: any = ({ onTrocarPagina, paginaAtual }: any) => (
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
        <span
            style={paginaAtual === "home"
            ? { fontWeight: "bold", fontSize: 18 }
            : { fontSize: 16, cursor: "pointer" }
            }
            onClick={() => onTrocarPagina("home")}
        >
            Home
        </span>
        <span
            style={paginaAtual === "calendario"
            ? { fontWeight: "bold", fontSize: 18 }
            : { fontSize: 16, cursor: "pointer" }
            }
            onClick={() => onTrocarPagina("calendario")}
        >
            Calendário
        </span>
        <span
            style={paginaAtual === "kanban"
            ? { fontWeight: "bold", fontSize: 18 }
            : { fontSize: 16, cursor: "pointer" }
            }
            onClick={() => onTrocarPagina("kanban")}
        >
            Kanban
        </span>
        </div>
        <button
            style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 24,
                cursor: "pointer",
                marginLeft: 16,
            }}
            title="Configurações"
            onClick={() => alert("Abrir configurações")}
        >
            ⚙️
        </button>
    </nav>
);

export default Navbar;

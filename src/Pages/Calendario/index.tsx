import React from "react";
import Navbar from "../../components/Navbar";

const formatCurrency = (value: number, currency: string) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const anos = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);

const dadosExemplo = [
  { mes: 0, ano: 2025, despesa: 1200, receita: 2500 },
  { mes: 1, ano: 2025, despesa: 900, receita: 2100 },
  { mes: 2, ano: 2025, despesa: 1500, receita: 2000 },
  // Adicione mais dados conforme necessário
];

const Calendario: any = ({ onTrocarPagina }: any) => {
  const [mes, setMes] = React.useState(new Date().getMonth());
  const [ano, setAno] = React.useState(new Date().getFullYear());

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
      <Navbar onTrocarPagina={onTrocarPagina} paginaAtual="calendario" />
      <div
        style={{
          marginTop: 32,
          marginBottom: 16,
          display: "flex",
          gap: 16,
          background: "#222",
          padding: 16,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
        }}
      >
        <select
          value={mes}
          onChange={e => setMes(Number(e.target.value))}
          style={{
            padding: 8,
            borderRadius: 4,
            fontSize: 16,
            background: "#181818",
            color: "#fff",
            border: "1px solid #444",
          }}
        >
          {meses.map((nome, idx) => (
            <option key={idx} value={idx}>{nome}</option>
          ))}
        </select>
        <select
          value={ano}
          onChange={e => setAno(Number(e.target.value))}
          style={{
            padding: 8,
            borderRadius: 4,
            fontSize: 16,
            background: "#181818",
            color: "#fff",
            border: "1px solid #444",
          }}
        >
          {anos.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* Lista de meses/anos no estilo da Home */}
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
        <span style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8, color: "#fff" }}>
          Resumo Mensal
        </span>
        {/* Cabeçalho */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 32px",
            color: "#bbb",
            fontWeight: "bold",
            fontSize: 15,
            marginBottom: 4,
          }}
        >
          <span style={{ flex: 1 }}>Mês/Ano</span>
          <span style={{ flex: 1, textAlign: "center" }}>Despesa</span>
          <span style={{ flex: 1, textAlign: "center" }}>Receita</span>
          <span style={{ flex: 1, textAlign: "right" }}>Sobra</span>
        </div>
        {dadosExemplo.map((item, idx) => (
          <div
            key={idx}
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
            <span style={{ flex: 1, fontSize: 16 }}>
              {meses[item.mes]}/{item.ano}
            </span>
            <span style={{ flex: 1, fontWeight: "bold", color: "#ff7675", textAlign: "center" }}>
              {formatCurrency(item.despesa, "BRL")}
            </span>
            <span style={{ flex: 1, fontWeight: "bold", color: "#00b894", textAlign: "center" }}>
              {formatCurrency(item.receita, "BRL")}
            </span>
            <span style={{ flex: 1, fontWeight: "bold", color: "#fff", textAlign: "right" }}>
              {formatCurrency(item.receita - item.despesa, "BRL")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendario;
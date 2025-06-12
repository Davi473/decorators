import React, { useEffect, useState } from "react";

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

const Table: React.FC = () => {
    const [dados, setDados] = useState<any[]>([]);
    const token = "SEU_TOKEN_AQUI"; // Substitua pelo seu token

    useEffect(() => {
        fetch("http://localhost:3000/entry/month", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                // Transforma o objeto em array
                const dadosArray = Object.values(data.month).map((item: any) => ({
                    mes: item.month,
                    ano: item.year,
                    despesa: item.valueExpenses,
                    receita: item.valueIncome,
                }));
                setDados(dadosArray);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
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
            {(dados.length > 0 ? dados : []).map((item, idx) => (
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
    );
};

export default Table;
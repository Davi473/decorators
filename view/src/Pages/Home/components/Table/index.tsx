import React from "react";

const gastos = [
	{
		name: "Mercado",
		value: 150,
		currency: "USD",
		dayToPay: "06/06/2025",
	},
	{
		name: "Internet",
		value: 99.9,
		currency: "BRL",
		dayToPay: "10/06/2025",
	},
	{
		name: "Transporte",
		value: 45,
		currency: "BRL",
		dayToPay: "15/06/2025",
	},
];

const formatCurrency = (value: number, currency: string) =>
	value.toLocaleString("pt-BR", {
		style: "currency",
		currency,
		minimumFractionDigits: 2,
	});

const Table: React.FC = () => {
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
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<span
					style={{
						fontWeight: "bold",
						fontSize: 18,
						marginBottom: 8,
						color: "#fff",
					}}
				>
					Gastos em aberto
				</span>
				<button
					style={{
						padding: "6px 16px",
						borderRadius: 6,
						border: "none",
						background: "#333", // cinza escuro
						color: "#fff",
						fontWeight: "bold",
						fontSize: 14,
						cursor: "pointer",
						marginBottom: 8,
						boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
						transition: "background 0.2s",
					}}
					onMouseOver={(e) => (e.currentTarget.style.background = "#444")}
					onMouseOut={(e) => (e.currentTarget.style.background = "#333")}
					onClick={() => alert("Botão clicado!")}
				>
					Novo Gasto
				</button>
			</div>
			{/* Cabeçalho da "tabela" */}
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
				<span style={{ flex: 1 }}>Nome</span>
				<span style={{ flex: 1, textAlign: "center" }}>Valor</span>
				<span
					style={{
						flex: 1,
						textAlign: "right",
					}}
				>
					Data de Pagamento
				</span>
			</div>
			{gastos.map((gasto) => (
				<div
					key={gasto.name}
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
					<span style={{ flex: 1, fontSize: 16 }}>{gasto.name}</span>
					<span
						style={{
							flex: 1,
							fontWeight: "bold",
							color: "#ff7675",
							textAlign: "center",
						}}
					>
						{formatCurrency(gasto.value, gasto.currency)}
					</span>
					<span
						style={{
							flex: 1,
							fontSize: 14,
							color: "#bbb",
							textAlign: "center",
						}}
					>
						{gasto.dayToPay}
					</span>
				</div>
			))}
		</div>
	);
};

export default Table;
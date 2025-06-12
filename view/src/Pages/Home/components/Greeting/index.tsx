
function saudacaoPorHorario(): string {
  const hora = new Date().getHours();
  if (hora >= 5 && hora < 12) {
    return "Bom dia";
  } else if (hora >= 12 && hora < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}

const Greenting: any = (user: {name: string}) => {
    const userName: string = user.name;

    return (
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
                {saudacaoPorHorario()},
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
                {userName}
            </h2>
        </div>
    );
};

export default Greenting;
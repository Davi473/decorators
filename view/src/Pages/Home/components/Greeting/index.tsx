
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

const Greenting: any = (user: any) => {
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
            <small
                style={{
                color: "#fff",
                fontSize: 32,
                marginBottom: 4,
                textAlign: "left", // Alinha o texto à esquerda
                }}
            >
                {saudacaoPorHorario()},
            </small>
            <small
                style={{
                color: "#fff",
                fontSize: 28,
                marginBottom: 10,
                textAlign: "left",
                fontWeight: "normal",
                }}
            >
                {userName}
            </small>
        </div>
    );
};

export default Greenting;
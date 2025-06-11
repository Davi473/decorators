import React, { useState } from "react";
import Navbar from "../../components/Navbar";

const initialData = [
  {
    id: "col-1",
    title: "A Fazer",
    cards: [
      { id: "card-1", content: "Estudar React" },
      { id: "card-2", content: "Ler documentação do projeto" },
    ],
  },
  {
    id: "col-2",
    title: "Fazendo",
    cards: [
      { id: "card-3", content: "Implementar Kanban" },
    ],
  },
  {
    id: "col-3",
    title: "Feito",
    cards: [
      { id: "card-4", content: "Configurar ambiente" },
    ],
  },
];

const Kanban: any = ({ onTrocarPagina }: any) => {
  const [columns, setColumns] = useState(initialData);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [newCardText, setNewCardText] = useState<{ [key: string]: string }>({});
  const [draggedCard, setDraggedCard] = useState<{
    card: any;
    fromColIdx: number;
    fromCardIdx: number;
  } | null>(null);
  const [draggedColIdx, setDraggedColIdx] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<{ card: any; colIdx: number } | null>(null);

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

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Reordering within the same column
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const startColumn = columns[source.droppableId];
    const finishColumn = columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newCards = Array.from(startColumn.cards);
      newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, columns[source.droppableId].cards[source.index]);

      const newColumn = {
        ...startColumn,
        cards: newCards,
      };

      const newState = {
        ...columns,
        [newColumn.id]: newColumn,
      };

      setColumns(newState);
    } else {
      const startCards = Array.from(startColumn.cards);
      startCards.splice(source.index, 1);
      const newStartColumn = {
        ...startColumn,
        cards: startCards,
      };

      const finishCards = Array.from(finishColumn.cards);
      finishCards.splice(destination.index, 0, columns[source.droppableId].cards[source.index]);
      const newFinishColumn = {
        ...finishColumn,
        cards: finishCards,
      };

      const newState = {
        ...columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      };

      setColumns(newState);
    }
  };

  const handleAddColumn = () => {
    if (!newColumnTitle.trim()) return;
    setColumns([
      ...columns,
      {
        id: `col-${columns.length + 1}`,
        title: newColumnTitle,
        cards: [],
      },
    ]);
    setNewColumnTitle("");
  };

  const handleAddCard = (colIdx: number) => {
    const text = newCardText[columns[colIdx].id];
    if (!text || !text.trim()) return;
    const newCard = {
      id: `card-${Date.now()}`,
      content: text,
    };
    const newCols = [...columns];
    newCols[colIdx].cards = [...newCols[colIdx].cards, newCard];
    setColumns(newCols);
    setNewCardText({ ...newCardText, [columns[colIdx].id]: "" });
  };

  const moveCard = (colIdx: number, cardIdx: number, direction: "left" | "right") => {
    const targetColIdx = direction === "left" ? colIdx - 1 : colIdx + 1;
    if (targetColIdx < 0 || targetColIdx >= columns.length) return;
    const newCols = [...columns];
    const [card] = newCols[colIdx].cards.splice(cardIdx, 1);
    newCols[targetColIdx].cards.push(card);
    setColumns(newCols);
  };

  const handleDragStart = (colIdx: number, cardIdx: number) => {
    setDraggedCard({
      card: columns[colIdx].cards[cardIdx],
      fromColIdx: colIdx,
      fromCardIdx: cardIdx,
    });
  };

  const handleDrop = (colIdx: number, cardIdx?: number) => {
    if (!draggedCard) return;
    const newCols = [...columns];
    // Remove o card da coluna de origem
    newCols[draggedCard.fromColIdx].cards.splice(draggedCard.fromCardIdx, 1);
    // Adiciona na posição correta da coluna de destino
    if (typeof cardIdx === "number") {
      newCols[colIdx].cards.splice(cardIdx, 0, draggedCard.card);
    } else {
      newCols[colIdx].cards.push(draggedCard.card);
    }
    setColumns(newCols);
    setDraggedCard(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleColumnDragStart = (colIdx: number) => {
    setDraggedColIdx(colIdx);
  };

  const handleColumnDrop = (targetColIdx: number) => {
    if (draggedColIdx === null || draggedColIdx === targetColIdx) {
      setDraggedColIdx(null);
      return;
    }
    const newColumns = [...columns];
    const [removed] = newColumns.splice(draggedColIdx, 1);
    newColumns.splice(targetColIdx, 0, removed);
    setColumns(newColumns);
    setDraggedColIdx(null);
  };

  const handleColumnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleCloseModal = () => setSelectedCard(null);

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
      <Navbar onTrocarPagina={onTrocarPagina} paginaAtual="kanban" />

      {/* Kanban Board */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          marginTop: "32px",
          width: "90%",
          maxWidth: 1000,
          justifyContent: "center",
        }}
      >
        {columns.map((column, colIdx) => (
          <div
            key={column.id}
            draggable
            onDragStart={() => handleColumnDragStart(colIdx)}
            onDragOver={handleColumnDragOver}
            onDrop={() => handleColumnDrop(colIdx)}
            style={{
              background: "#23272f",
              borderRadius: 10,
              padding: 16,
              minWidth: 220,
              flex: 1,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              opacity: draggedColIdx === colIdx ? 0.5 : 1,
              cursor: "grab",
              transition: "opacity 0.2s",
            }}
          >
            <h3 style={{ color: "#fff", marginBottom: 12 }}>{column.title}</h3>
            {column.cards.map((card, cardIdx) => (
              <div
                key={card.id}
                draggable
                onDragStart={() => handleDragStart(colIdx, cardIdx)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(colIdx, cardIdx)}
                onClick={() => setSelectedCard({ card, colIdx })}
                style={{
                  background: "#2d333b",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 10,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                  opacity: draggedCard && draggedCard.card.id === card.id ? 0.5 : 1,
                  cursor: "pointer", // mudou para pointer
                }}
              >
                <span>{card.content}</span>
              </div>
            ))}
            <div style={{ marginTop: 10 }}>
              <input
                type="text"
                value={newCardText[column.id] || ""}
                onChange={(e) => setNewCardText({ ...newCardText, [column.id]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddCard(colIdx);
                }}
                placeholder="Novo card"
                style={{
                  background: "#2d333b",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 10,
                  color: "#fff",
                  border: "none",
                  outline: "none",
                  fontSize: "1rem",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Adicionar Nova Coluna */}
      <div style={{ marginTop: "32px", width: "90%", maxWidth: 600 }}>
        <h3 style={{ color: "#fff", marginBottom: 12 }}>Adicionar Nova Coluna</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            placeholder="Título da coluna"
            style={{
              padding: "8px",
              borderRadius: 4,
              border: "1px solid #444",
              width: "100%", // igual ao input de card
              marginBottom: 8, // igual ao input de card
              background: "#2d333b",
              color: "#fff",
            }}
          />
          <button
            onClick={handleAddColumn}
            style={{
              padding: "8px 16px",
              borderRadius: 4,
              border: "none",
              background: "#007bff",
              color: "#fff",
              cursor: "pointer",
              width: "100%", // <-- ajuste aqui para ocupar toda a largura
            }}
          >
            Adicionar Coluna
          </button>
        </div>
      </div>

      {/* Modal de Detalhes do Card */}
      {selectedCard && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              background: "#23272f",
              borderRadius: 10,
              padding: 32,
              minWidth: 300,
              color: "#fff",
              boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
              position: "relative",
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2>Detalhes do Card</h2>
            <p><b>Conteúdo:</b> {selectedCard.card.content}</p>
            <button
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "4px 12px",
                cursor: "pointer"
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kanban;
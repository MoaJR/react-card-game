import React from "react";
import Card from "./Card";

export function List({ filteredCards, handleDeleteCard }) {
  return (
    <ul>
      {filteredCards.map((card, index) => (
        <li key={`${index}${card.cardName}`}>
          <Card
            cardName={card.name}
            cardDescription={card.description}
            cardAttr1={card.attr1}
            cardAttr2={card.attr2}
            cardAttr3={card.attr3}
            cardImage={card.image}
            cardRare={card.rare}
            cardTrunfo={card.trunfo}
            cardColor={card.color}
            className={card.class}
            cardRarityColor={card.rarityColor}
          />
          <button
            className="deleteButton"
            type="button"
            data-testid="delete-button"
            value={card.name}
            onClick={handleDeleteCard}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
}

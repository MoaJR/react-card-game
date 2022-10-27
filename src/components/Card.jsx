import React from 'react';

import '../style/Card.scss';

function Card({
  cardName,
  cardDescription,
  cardAttr1,
  cardAttr2,
  cardAttr3,
  cardImage,
  cardRare,
  cardTrunfo,
  cardColor,
  cardRarityColor,
  className = 'cardContainer',
}) {
  const firstLetterUpper = (string) => {
    const splittedString = string.split(' ');
    return splittedString
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };



  return (
    <div 
      className={className}
      style={{ 
        background: cardColor.background,
        border: `5px solid ${cardRarityColor}`,
        color: cardColor.color,
      }}
    >
      <div>
      <p data-testid="rare-card" style={{ color: cardRarityColor }}>{cardRare && firstLetterUpper(cardRare)}</p>
          {cardTrunfo ? <h4 data-testid="trunfo-card">Super Carta</h4> : null}
        <h2 data-testid="name-card">
          {
            cardName && firstLetterUpper(cardName)
          }
        </h2>        
       {
        cardImage &&  <img
        className="image"
        src={ cardImage }
        alt={ cardName }
        data-testid="image-card"
      />
       }
        <p data-testid="attr1-card">{`HP: ${cardAttr1}`}</p>
        <p data-testid="attr2-card">{`Ataque: ${cardAttr2}`}</p>
        <p data-testid="attr3-card">{`Defesa: ${cardAttr3}`}</p>
        <p data-testid="description-card" className='cardType'>
          {
            cardDescription && firstLetterUpper(cardDescription)
          }
        </p>
      </div>
    </div>
  );
}

export default Card;

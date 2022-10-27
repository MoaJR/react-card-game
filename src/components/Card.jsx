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
}) {
  const firstLetterUpper = (string) => {
    const splittedString = string.split(' ');
    return splittedString
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };



  return (
    <div 
      className='cardContainer'
      style={{ 
        backgroundColor: cardColor.background,
        border: `5px solid ${cardColor.color}`,
        color: cardColor.color,
      }}
    >
      <div>
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
        <p data-testid="description-card">
          {
            cardDescription && firstLetterUpper(cardDescription)
          }
        </p>
        <p data-testid="attr1-card">{`HP: ${cardAttr1}`}</p>
        <p data-testid="attr2-card">{`Ataque: ${cardAttr2}`}</p>
        <p data-testid="attr3-card">{`Defesa: ${cardAttr3}`}</p>
        <p data-testid="rare-card">{cardRare && firstLetterUpper(cardRare)}</p>
        {cardTrunfo ? <h4 data-testid="trunfo-card">Super Carta</h4> : null}
      </div>
    </div>
  );
}

export default Card;

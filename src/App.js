import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import Form from './components/Form';

function App() {
  const [cardName, setCardName] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [cardAttr1, setCardAttr1] = useState(0);
  const [cardAttr2, setCardAttr2] = useState(0);
  const [cardAttr3, setCardAttr3] = useState(0);
  const [cardImage, setCardImage] = useState('https://iili.io/DsQ0qg.png');
  const [cardRare, setCardRare] = useState('normal');
  const [cardTrunfo, setCardTrunfo] = useState(false);
  const [cardSaved, setCardSaved] = useState([]);
  const [hasTrunfoState, setHasTrunfoState] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterRare, setFilterRare] = useState('todas');

  const hasTrunfo = () => {
    if (cardSaved.length === 0) setHasTrunfoState(false);
    if (cardSaved.some((card) => card.trunfo === true)) {
      setHasTrunfoState(true);
    } else {
      setHasTrunfoState(false);
    }
  };

  const onInputChange = (event) => {
    const { name, value, checked } = event.target;
    hasTrunfo();
    if (name === 'cardName') {
      setCardName(value);
    }
    if (name === 'cardDescription') {
      setCardDescription(value);
    }
    if (name === 'cardAttr1') {
      setCardAttr1(value);
    }
    if (name === 'cardAttr2') {
      setCardAttr2(value);
    }
    if (name === 'cardAttr3') {
      setCardAttr3(value);
    }
    if (name === 'cardImage') {
      setCardImage(value);
    }
    if (name === 'cardRare') {
      setCardRare(value);
    }
    if (name === 'cardTrunfo') {
      setCardTrunfo(checked);
    }
    hasTrunfo();
  };

  const onSaveButtonClick = () => {
    const card = {
      name: cardName,
      description: cardDescription,
      attr1: cardAttr1,
      attr2: cardAttr2,
      attr3: cardAttr3,
      image: cardImage,
      rare: cardRare,
      trunfo: cardTrunfo,
    };
    setCardSaved((prev) => [...prev, card]);
    setCardAttr1(0);
    setCardAttr2(0);
    setCardAttr3(0);
    setCardImage('');
    setCardName('');
    setCardDescription('');
    setCardRare('normal');
  };

  const handleDeleteCard = (element) => {
    const cards = cardSaved.filter((card) => card.name !== element.target.value);
    setCardSaved(cards);
    hasTrunfo();
  };

  const filteredCardsName = cardSaved.filter((card) => card.name.toLowerCase().includes(filterName.toLowerCase()));

  const filteredCardsRare = filteredCardsName.filter(
    (card) => card.rare === filterRare || filterRare === 'todas',
  );

  const filteredCards = filteredCardsRare;

  const maxSumValue = 210;
  const maxIndividualValue = 90;

  useEffect(() => {
    hasTrunfo();
  }, [cardSaved]);

  return (
    <div>
      <Form
        onInputChange={ onInputChange }
        cardName={ cardName }
        cardDescription={ cardDescription }
        cardAttr1={ cardAttr1 }
        cardAttr2={ cardAttr2 }
        cardAttr3={ cardAttr3 }
        cardImage={ cardImage }
        cardRare={ cardRare }
        cardTrunfo={ cardTrunfo }
        isSaveButtonDisabled={
          !cardName
          || !cardImage
          || !cardDescription
          || parseInt(cardAttr1, 10) + parseInt(cardAttr2, 10) + parseInt(cardAttr3, 10)
            > maxSumValue
          || [cardAttr1, cardAttr2, cardAttr3].some((attr) => attr < 0)
          || [cardAttr1, cardAttr2, cardAttr3].some((attr) => attr > maxIndividualValue)
        }
        onSaveButtonClick={ onSaveButtonClick }
        hasTrunfo={ hasTrunfoState }
      />
      <Card
        cardName={ cardName }
        cardDescription={ cardDescription }
        cardAttr1={ cardAttr1 }
        cardAttr2={ cardAttr2 }
        cardAttr3={ cardAttr3 }
        cardImage={ cardImage }
        cardRare={ cardRare }
        cardTrunfo={ cardTrunfo }
      />
      <input
        placeholder="Filtrar por nome"
        type="text"
        data-testid="name-filter"
        value={ filterName }
        onChange={ (e) => setFilterName(e.target.value) }
      />
      <select
        value={ filterRare }
        onChange={ (e) => setFilterRare(e.target.value) }
        data-testid="rare-filter"
      >
        <option value="todas">Todas</option>
        <option value="normal">Normal</option>
        <option value="raro">Raro</option>
        <option value="muito raro">Muito Raro</option>
      </select>
      {cardSaved.length > 0 ? (
        <ul>
          {filteredCards.map((card, index) => (
            <li key={ `${index}${card.cardName}` }>
              <Card
                cardName={ card.name }
                cardDescription={ card.description }
                cardAttr1={ card.attr1 }
                cardAttr2={ card.attr2 }
                cardAttr3={ card.attr3 }
                cardImage={ card.image }
                cardRare={ card.rare }
                cardTrunfo={ card.trunfo }
              />
              <button
                type="button"
                data-testid="delete-button"
                value={ card.name }
                onClick={ handleDeleteCard }
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default App;

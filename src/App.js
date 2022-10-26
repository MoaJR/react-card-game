import React, { useState } from 'react';
import Card from './components/Card';
import Form from './components/Form';

function App() {
  const [cardName, setCardName] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const [cardAttr1, setCardAttr1] = useState(0);
  const [cardAttr2, setCardAttr2] = useState(0);
  const [cardAttr3, setCardAttr3] = useState(0);
  const [cardImage, setCardImage] = useState('https://iili.io/DsQ0qg.png');
  const [cardRare, setCardRare] = useState();
  const [cardTrunfo, setCardTrunfo] = useState(false);
  const [cardSaved, setCardSaved] = useState([]);

  const onInputChange = (event) => {
    const { name, value, checked } = event.target;
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
    setCardSaved([...cardSaved, card]);

    setCardAttr1(0);
    setCardAttr2(0);
    setCardAttr3(0);
    setCardImage('');
    setCardName('');
    setCardDescription('');
    setCardRare('normal');
  };

  const maxSumValue = 210;
  const maxIndividualValue = 90;

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
          || ((parseInt(cardAttr1, 10)
          + parseInt(cardAttr2, 10)
          + parseInt(cardAttr3, 10)) > maxSumValue)
          || [cardAttr1, cardAttr2, cardAttr3].some((attr) => attr < 0)
          || [cardAttr1, cardAttr2, cardAttr3].some((attr) => attr > maxIndividualValue)
        }
        onSaveButtonClick={ onSaveButtonClick }
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
    </div>
  );
}

export default App;

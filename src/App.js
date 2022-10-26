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
  const [cardRare, setCardRare] = useState('normal');
  const [cardTrunfo, setCardTrunfo] = useState(false);

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

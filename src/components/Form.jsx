import React from 'react';

import '../style/Form.scss';

function Form({
  cardName,
  cardDescription,
  cardAttr1,
  cardAttr2,
  cardAttr3,
  cardImage,
  cardRare,
  cardTrunfo,
  hasTrunfo,
  isSaveButtonDisabled,
  onInputChange,
  onSaveButtonClick,
  handleSearchButton,
  handleRandomButton,
}) {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <form
        method="get"
        className="Form"
        onSubmit={ onSubmit }
      >
        <label htmlFor="cardName">
          Nome
          <input
            data-testid="name-input"
            type="text"
            name="cardName"
            value={ cardName }
            onChange={ onInputChange }
          />
        </label>
        <div className="searchButtonsContainer">
          <button type="button" onClick={ handleSearchButton }>Pesquisar</button>
          <button type="button" onClick={ handleRandomButton }>Random</button>
        </div>
        <label htmlFor="cardDescription">
          Tipo(s)
          <textarea
            name="cardDescription"
            data-testid="description-input"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardAttr1">
          HP
          <input
            type="number"
            name="cardAttr1"
            min={ 0 }
            data-testid="attr1-input"
            value={ cardAttr1 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardAttr2">
          Ataque
          <input
            type="number"
            name="cardAttr2"
            min={ 0 }
            data-testid="attr2-input"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardAttr3">
          Defesa
          <input
            type="number"
            name="cardAttr3"
            min={ 0 }
            data-testid="attr3-input"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardRare">
          Raridade
          <select
            name="cardRare"
            data-testid="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito Raro</option>
          </select>
        </label>
        {
          hasTrunfo ? (
            <p>Você já tem uma Super Carta em seu baralho</p>
          ) : (
            <label htmlFor="cardTrunfo">
              Super Carta
              <input
                type="checkbox"
                name="cardTrunfo"
                data-testid="trunfo-input"
                checked={ cardTrunfo }
                onChange={ onInputChange }
              />
            </label>
          )
        }
        <button
          type="submit"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    </div>
  );
}

export default Form;

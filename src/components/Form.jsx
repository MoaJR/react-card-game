import React from "react";

import "../style/Form.scss";

function Form({
  cardName,
  cardDescription,
  cardAttr1,
  cardAttr2,
  cardAttr3,
  cardRare,
  cardTrunfo,
  hasTrunfo,
  isSaveButtonDisabled,
  onInputChange,
  onSaveButtonClick,
  handleSearchButton,
  handleRandomButton,
  rareDisabled,
}) {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <form
        method="get"
        className="Form"
        onSubmit={onSubmit}>
        <label className="nome" htmlFor="cardName">Nome</label>
        <input
          data-testid="name-input"
          type="text"
          name="cardName"
          value={cardName}
          onChange={onInputChange}
        />
        <div className="searchButtonsContainer">
          <button
            type="button"
            onClick={handleSearchButton}>
            Pesquisar
          </button>
          <button
            type="button"
            onClick={handleRandomButton}>
            Random
          </button>
        </div>
        <div className="tipoContainer">
          <div>
          <label htmlFor="cardDescription">Tipo</label>
          <input
            name="cardDescription"
            type="text"
            data-testid="description-input"
            value={cardDescription}
            onChange={onInputChange}
          />
          </div>
        </div>
        <div className="attributesContainer">
          <div>
            <label htmlFor="cardAttr1">HP</label>
            <input
              type="number"
              name="cardAttr1"
              min={0}
              data-testid="attr1-input"
              value={cardAttr1}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label htmlFor="cardAttr2">Ataque</label>
            <input
              type="number"
              name="cardAttr2"
              min={0}
              data-testid="attr2-input"
              value={cardAttr2}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label htmlFor="cardAttr3">Defesa</label>
            <input
              type="number"
              name="cardAttr3"
              min={0}
              data-testid="attr3-input"
              value={cardAttr3}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="rarityContainer">
          <label htmlFor="cardRare">
            Raridade
          </label>
            <select
            disabled={rareDisabled}
              name="cardRare"
              data-testid="rare-input"
              value={cardRare}
              onChange={onInputChange}>
              <option value="comum">Comum</option>
              <option value="incomum">Incomum</option>
              <option value="rara">Rara</option>
              <option value="épica">Épica</option>
              <option value="lendária">Lendária</option>
            </select>
        </div>
        {hasTrunfo ? (
          <p>Você já tem uma Super Carta em seu baralho</p>
        ) : (
          <div className="superCartaContainer">
            <label htmlFor="cardTrunfo">
              Super Carta
            </label>
            <input
              type="checkbox"
              id="cardTrunfo"
              name="cardTrunfo"
              data-testid="trunfo-input"
              checked={cardTrunfo}
              onChange={onInputChange}
            />
          </div>
        )}
        <button
          type="submit"
          data-testid="save-button"
          disabled={isSaveButtonDisabled}
          onClick={onSaveButtonClick}>
          Salvar
        </button>
      </form>
    </div>
  );
}

export default Form;

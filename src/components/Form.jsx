import React from 'react';

import '../style/Form.scss';

function Form() {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <form method="get" className="Form" onSubmit={ onSubmit }>
        <label htmlFor="name">
          Nome
          <input data-testid="name-input" type="text" name="name" />
        </label>
        <label htmlFor="description">
          Descrição
          <textarea name="description" data-testid="description-input" />
        </label>
        <label htmlFor="attr1">
          Atributo 1
          <input type="number" name="attr1" min={ 0 } data-testid="attr1-input" />
        </label>
        <label htmlFor="attr2">
          Atributo 2
          <input type="number" name="attr2" min={ 0 } data-testid="attr2-input" />
        </label>
        <label htmlFor="attr3">
          Atributo 3
          <input type="number" name="attr3" min={ 0 } data-testid="attr3-input" />
        </label>
        <label htmlFor="image">
          Imagem
          <input type="text" name="image" data-testid="image-input" />
        </label>
        <label htmlFor="rarity">
          Raridade
          <select name="rarity" data-testid="rare-input">
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito Raro</option>
          </select>
        </label>
        <label htmlFor="superTrunfo">
          Super Trunfo
          <input type="checkbox" name="superTrunfo" data-testid="trunfo-input" />
        </label>
        <button type="submit" data-testid="save-button">Salvar</button>
      </form>
    </div>
  );
}

export default Form;

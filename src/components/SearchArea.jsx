import React from "react";
export function SearchArea({
  filterTrunfo,
  filterName,
  setFilterName,
  filterRare,
  setFilterRare,
  setFilterTrunfo,
  filterTypes,
  setFilterTypes,
  typesList,
}) {
  return (
    <div className="searchContainer">
      <input
        placeholder="Filtrar por nome"
        disabled={filterTrunfo}
        type="text"
        data-testid="name-filter"
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
      />
      <select
        value={filterRare}
        disabled={filterTrunfo}
        onChange={(e) => setFilterRare(e.target.value)}
        data-testid="rare-filter">
        <option value="todas">Todas</option>
        <option value="comum">Comum</option>
        <option value="incomum">Incomum</option>
        <option value="rara">Rara</option>
        <option value="epica">Épica</option>
        <option value="lendaria">Lendária</option>
      </select>
      <select
      value={filterTypes}
      disabled={filterTrunfo}
      onChange={(e) => setFilterTypes(e.target.value)}
      >
        <option value="todos">Todos</option>
        {typesList && typesList.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <div className="searchSuperCartaContainer">
        <label
          htmlFor="superTrunfo"
          for="superTrunfo">
          Pesquisar Super Carta
        </label>
          <input
            type="checkbox"
            data-testid="trunfo-filter"
            id="superTrunfo"
            checked={filterTrunfo}
            onChange={(e) => setFilterTrunfo(e.target.checked)}
          />
      </div>
    </div>
  );
}

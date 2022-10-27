import React from "react";
export function SearchArea({
  filterTrunfo,
  filterName,
  setFilterName,
  filterRare,
  setFilterRare,
  setFilterTrunfo,
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
        <option value="normal">Normal</option>
        <option value="raro">Raro</option>
        <option value="muito raro">Muito Raro</option>
      </select>
      <label
        htmlFor="superTrunfo"
        for="superTrunfo">
        Pesquisar Super Trunfo
        <input
          type="checkbox"
          data-testid="trunfo-filter"
          id="superTrunfo"
          checked={filterTrunfo}
          onChange={(e) => setFilterTrunfo(e.target.checked)}
        />
      </label>
    </div>
  );
}

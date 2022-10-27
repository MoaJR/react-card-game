import { SearchArea } from "./components/SearchArea";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { colors } from "./settings/colors";
import { List } from "./components/List";
import Card from "./components/Card";
import Form from "./components/Form";
import "./style/App.scss";

function App() {
  const [cardName, setCardName] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [cardAttr1, setCardAttr1] = useState(0);
  const [cardAttr2, setCardAttr2] = useState(0);
  const [cardAttr3, setCardAttr3] = useState(0);
  const [cardImage, setCardImage] = useState(null);
  const [cardRare, setCardRare] = useState("normal");
  const [cardTrunfo, setCardTrunfo] = useState(false);
  const [cardSaved, setCardSaved] = useState([]);
  const [hasTrunfoState, setHasTrunfoState] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterRare, setFilterRare] = useState("todas");
  const [filterTrunfo, setFilterTrunfo] = useState(false);
  const [data, setData] = useState([]);
  const [randomData, setRandomData] = useState([]);
  const [cardColor, setCardColor] = useState({ background: "#fff", color: "#000" });

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
    if (name === "cardName") {
      setCardName(value);
    }
    if (name === "cardDescription") {
      setCardDescription(value);
    }
    if (name === "cardAttr1") {
      setCardAttr1(value);
    }
    if (name === "cardAttr2") {
      setCardAttr2(value);
    }
    if (name === "cardAttr3") {
      setCardAttr3(value);
    }
    if (name === "cardImage") {
      setCardImage(value);
    }
    if (name === "cardRare") {
      setCardRare(value);
    }
    if (name === "cardTrunfo") {
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
      color: cardColor,
    };
    setCardSaved((prev) => [...prev, card]);
    setCardAttr1(0);
    setCardAttr2(0);
    setCardAttr3(0);
    setCardName("");
    setCardDescription("");
    setCardImage("");
    setCardRare("normal");
    setCardTrunfo(false);
    setCardColor({ background: "#fff", color: "#fff" });
  };

  const handleDeleteCard = (element) => {
    const cards = cardSaved.filter((card) => card.name !== element.target.value);
    setCardSaved(cards);
  };

  const filteredCardsName = cardSaved.filter((card) =>
    card.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const filteredCardsRare = filteredCardsName.filter(
    (card) => card.rare === filterRare || filterRare === "todas"
  );

  const filteredCardsTrunfo = cardSaved.filter((card) => card.trunfo === true);

  const filteredCards = filterTrunfo ? filteredCardsTrunfo : filteredCardsRare;

  useEffect(() => {
    hasTrunfo();
  }, [cardSaved]);

  const handleSearchButton = async () => {
    const fetchData = async (name) => {
      name = cardName.toLocaleLowerCase();
      const result = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setData(result.data);
    };
    fetchData().catch((error) => {
      alert("Pokemon não encontrado\nTente novamente");
      console.log(error);
    });
  };

  const handleRandomButton = async () => {
    const fetchData = async () => {
      const result = await axios(
        "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
      );
      setRandomData(result.data);
    };
    fetchData().catch((error) => {
      alert("Erro, Tente novamente");
      console.log(error);
    });
  };

  const handleNullSprites = (dataFunc) => {
    let imgSprite = dataFunc.sprites.front_default;
    if (dataFunc.sprites.other.dream_world.front_default !== null) {
      imgSprite = dataFunc.sprites.other.dream_world.front_default;
    }
    if (dataFunc.sprites.other["official-artwork"].front_default !== null) {
      imgSprite = dataFunc.sprites.other["official-artwork"].front_default;
    }
    return imgSprite;
  };

  const getColor = (info) => {
    const infos = info.split(" ");
    if (colors[infos[0]]) setCardColor(colors[infos[0].toLowerCase()]);
    else setCardColor({ background: "#fff", color: "#000" });
  };

  const fetchedPokemon = () => {
    if (data.name) {
      setCardImage(handleNullSprites(data));
      setCardAttr1(data.stats[0].base_stat);
      setCardAttr2(data.stats[1].base_stat);
      setCardAttr3(data.stats[2].base_stat);
      data.types.forEach((type) => {
        setCardDescription((`${type.type.name}`));
      });
      getColor(data.types[0].type.name);
    }
  };

  const fetchedRandomPokemon = () => {
    if (randomData.results) {
      const random = Math.floor(Math.random() * randomData.results.length);
      setCardName(randomData.results[random].name);
      setCardImage(null);
    }
  };

  useEffect(() => {
    getColor(cardDescription);
  }, [cardDescription]);

  useEffect(() => {
    setCardColor({ background: "#fff", color: "#000" });
    setCardDescription("");
    fetchedRandomPokemon();
  }, [randomData]);

  useEffect(() => {
    setCardColor({ background: "#fff", color: "#000" });
    setCardDescription("");
    fetchedPokemon();
  }, [data]);

  return (
    <div className="App">
      <div className="masterContaienr">
        <div className="topContainer">
          <Form
            onInputChange={onInputChange}
            cardName={cardName}
            cardDescription={cardDescription}
            cardAttr1={cardAttr1}
            cardAttr2={cardAttr2}
            cardAttr3={cardAttr3}
            cardImage={cardImage}
            cardRare={cardRare}
            cardTrunfo={cardTrunfo}
            isSaveButtonDisabled={!cardName || !cardDescription}
            onSaveButtonClick={onSaveButtonClick}
            hasTrunfo={hasTrunfoState}
            handleSearchButton={handleSearchButton}
            handleRandomButton={handleRandomButton}
          />
          <Card
            cardName={cardName}
            cardDescription={cardDescription}
            cardAttr1={cardAttr1}
            cardAttr2={cardAttr2}
            cardAttr3={cardAttr3}
            cardImage={cardImage}
            cardRare={cardRare}
            cardTrunfo={cardTrunfo}
            cardColor={cardColor}
          />
        </div>
        <SearchArea
          filterTrunfo={filterTrunfo}
          filterName={filterName}
          setFilterName={setFilterName}
          filterRare={filterRare}
          setFilterRare={setFilterRare}
          setFilterTrunfo={setFilterTrunfo}
        />
        {cardSaved.length > 0 ? (
          <List
            filteredCards={filteredCards}
            handleDeleteCard={handleDeleteCard}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;

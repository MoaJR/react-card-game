import { SearchArea } from "./components/SearchArea";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { colors } from "./settings/colors";
import { rarityColors } from "./settings/rarityColors";
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
  const [cardRare, setCardRare] = useState("comum");
  const [cardTrunfo, setCardTrunfo] = useState(false);
  const [cardSaved, setCardSaved] = useState([]);
  const [hasTrunfoState, setHasTrunfoState] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [filterRare, setFilterRare] = useState("todas");
  const [filterTrunfo, setFilterTrunfo] = useState(false);
  const [filterTypes, setFilterTypes] = useState("todos");
  const [data, setData] = useState([]);
  const [randomData, setRandomData] = useState([]);
  const [cardColor, setCardColor] = useState({ background: "#fff", color: "#000" });
  const [cardRarityColor, setCardRarityColor] = useState('#9e9e9e');
  const [className , setClassName] = useState("cardContainer");
  const [rareDisabled, setRareDisabled] = useState(false);
  const [typesList, setTypesList] = useState([]);

  const hasTrunfo = () => {
    if (cardSaved.length === 0) setHasTrunfoState(false);
    if (cardSaved.some((card) => card.trunfo === true)) {
      setHasTrunfoState(true);
    } else {
      setHasTrunfoState(false);
    }
  };

  const setAttrPercentsPlus = (percent) => {
    setCardAttr1((prev) => Math.floor(prev + prev * (percent / 100)));
    setCardAttr2((prev) => Math.floor(prev + prev * (percent / 100)));
    setCardAttr3((prev) => Math.floor(prev + prev * (percent / 100)));
  };

  const setAttrPercentsReset = (percent) => {
    setCardAttr1((prev) => Math.floor(prev - prev * (percent / 100)));
    setCardAttr2((prev) => Math.floor(prev - prev * (percent / 100)));
    setCardAttr3((prev) => Math.floor(prev - prev * (percent / 100)));
  };

  const handleTrunfo = () => {
    if (cardTrunfo) {
      setClassName("superCarta")
      setCardRare('')
      setRareDisabled(true);
      setAttrPercentsPlus(15);
    } else {
      setCardRarityColor('#9e9e9e');
      setRareDisabled(false);
      setCardRare('comum');
      getColor(cardDescription);
      setClassName("cardContainer")
      setAttrPercentsReset(11);
    } 
  };

  const onInputChange = (event) => {
    const { name, value, checked, label } = event.target;
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

  const handleResetStates = () => {
    setCardAttr1(0);
    setCardAttr2(0);
    setCardAttr3(0);
    setCardName("");
    setCardDescription("");
    setCardImage("");
    setCardRare("comum");
    setCardTrunfo(false);
    setCardColor({ background: "#fff", color: "#fff" });
    setClassName("cardContainer");
    setRareDisabled(false);
    setCardRarityColor('#9e9e9e');
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
      class: className,
      rarityColor: cardRarityColor,
    };
    setCardSaved((prev) => [...prev, card]);
    handleResetStates();
  };

  const handleDeleteCard = (element) => {
    const cards = cardSaved.filter((card) => card.name !== element.target.value);
    setCardSaved(cards);
  };

  const filteredCardsName = cardSaved.filter((card) =>
    card.name.toLowerCase().includes(filterName.toLowerCase())
  );
  
  const filteredCardsType = filteredCardsName.filter(
    (card) => card.description === filterTypes || filterTypes === "todos"
    );
    
    const filteredCardsRare = filteredCardsType.filter(
      (card) => card.rare === filterRare || filterRare === "todas"
    );

  const filteredCardsTrunfo = cardSaved.filter((card) => card.trunfo === true);

  const filteredCards = filterTrunfo ? filteredCardsTrunfo : filteredCardsRare;

  const getTypesList = () => {
    const types = cardSaved.map((card) => card.description);
    const typesList = types.filter((type, index) => types.indexOf(type) === index);
    setTypesList(typesList);
  };

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

  const getRarityColor = (rare) => {
    if (rare) setCardRarityColor(rarityColors[rare]);
    else setCardRarityColor('#9e9e9e');
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
      getColor(cardDescription);
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
    getTypesList();
    hasTrunfo();
  }, [cardSaved]);

  useEffect(() => {
    handleTrunfo();
  }, [cardTrunfo]);

  useEffect(() => {
    getRarityColor(cardRare);
  }, [cardRare]);

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
            rareDisabled={rareDisabled}
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
            className={className}
            cardRarityColor={cardRarityColor}
          />
        </div>
        <SearchArea
          filterName={filterName}
          setFilterName={setFilterName}
          filterRare={filterRare}
          setFilterRare={setFilterRare}
          filterTrunfo={filterTrunfo}
          setFilterTrunfo={setFilterTrunfo}
          filterTypes={filterTypes}
          setFilterTypes={setFilterTypes}
          typesList={typesList}
        />
        {cardSaved.length > 0 ? (
          <div className="deckContainer">
            <h3>Cartas no Baralho: {filteredCards.length}</h3>
            <List
              filteredCards={filteredCards}
              handleDeleteCard={handleDeleteCard}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;

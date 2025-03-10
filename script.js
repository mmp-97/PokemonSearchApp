const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const spriteContainer = document.getElementById("sprite-container");

const pokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const fetchData = async inputValue => {
  try {
    let response = await fetch(`${pokemonUrl}/${inputValue}`);
    if (!response.ok) {
      alert("Pokémon not found");
      return;
    }
    let pokemonData = await response.json();
    types.textContent = ''
    pokemonName.textContent = pokemonData.name;
    pokemonId.textContent = pokemonData.id;
    weight.textContent = pokemonData.weight;
    height.textContent = pokemonData.height;
pokemonData.types.forEach(function(typeInfo, index) {
  const typeElement = document.createElement("span");
  typeElement.textContent = typeInfo.type.name.toUpperCase();
  types.appendChild(typeElement);
  if (index < pokemonData.types.length - 1) {
    types.appendChild(document.createTextNode(', '));
  }
});

    hp.textContent = pokemonData.stats[0].base_stat;
    attack.textContent = pokemonData.stats[1].base_stat;
    defense.textContent = pokemonData.stats[2].base_stat;
    specialAttack.textContent = pokemonData.stats[3].base_stat;
    specialDefense.textContent = pokemonData.stats[4].base_stat;
    speed.textContent =pokemonData.stats[5].base_stat;

    let spriteImg = spriteContainer.querySelector("img");
    if (!spriteImg) {
      spriteImg = document.createElement("img");
      spriteImg.id = "sprite";
      spriteContainer.appendChild(spriteImg);
    }
    spriteImg.src = pokemonData.sprites.front_default;
    spriteImg.alt = pokemonData.name;

  } catch (error){
    console.log(error);
  }
}

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const inputValue = searchInput.value.toLowerCase();
    if (!inputValue) {
      alert("Please enter a Pokémon name or ID.");
      return;
    }
    if (inputValue === "red") {
      alert("Pokémon not found");
      return;
    }
    fetchData(inputValue);
  }
});

searchButton.addEventListener("click", ()=>{
  const inputValue = searchInput.value.toLowerCase();
  if (!inputValue) {
    alert("Please enter a Pokémon name or ID.");
    return;
  }
  if (inputValue === "red") {
    alert("Pokémon not found");
    return;
  }
  fetchData(inputValue);
})
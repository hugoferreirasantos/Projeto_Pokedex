const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

// Atiributos do Formulário no HTML
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

//Classes dos Butões:
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

//Variavél global que inicia com um número:
let searchPokemon = 1;

//Função de pesquisa ascincrona de pokemons:
const fetchPokemon = async (pokemon) =>{

    //Constante vai buscar uma resposta da API_Pokemon:
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200){
    //Constante que vai extrair o JSON:
    const data = await APIResponse.json();

    return data;
    }

    
};

//Funcão ascincrona para renderizar os dados do Pokemon:
const renderPokemon = async (pokemon) =>{
     
    //Mostrar que esta procurando uma busca:
    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";

    //Procurar os dados do Pokemon:
    const data = await fetchPokemon(pokemon)

    if (data){
    //Dados dos Pokemons:
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
    } else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = "Not Found :c"
        pokemonNumber.innerHTML = "";
    }
    
};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    input.value = '';
});

buttonPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
    
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
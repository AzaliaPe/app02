const urlList = JSON.parse(sessionStorage.getItem('urlList'));
const sprite = sessionStorage.getItem('sprite');
const pokemon = {
    sprite: document.getElementById('pokemon-image'),
    name: document.getElementById('pokemon-name'),
    types: document.getElementById('pokemon-types'),
    abilities: document.getElementById('pokemon-abilities')
}
//console.log(urlList);

const GetPokemon = ()=>
{
    const spriteName = sprite.replace('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/', '');
    const spriteNumber = spriteName.replace('.png', '');
    console.log(spriteNumber);
    urlList.forEach(element => 
    {
        let pokemonNumber = element.replace('https://pokeapi.co/api/v2/pokemon/', '');
        pokemonNumber = pokemonNumber.replace('/', '');
        if(spriteNumber == pokemonNumber)
        {
            console.log(element);
            GetInfo(element);
        }
    });
}

const GetInfo = async (url) =>
{
    const data = await fetch(url);
    const dataJson = await data.json();

    const {sprites, name, types, abilities} = dataJson;

    types.forEach(element => 
    {
        const {type} = element;
        //console.log(type.name);
        pokemon.types.innerHTML += `<li>${type.name}</li>`;
    });

    abilities.forEach(element => 
    {
        const{ability} = element;
        //pokemon.abilities.innerHTML += `<li>${ability.name}</li>`;
        //console.log(ability.url);
        GetAbilityInfo(ability.url,  ability.name);

        //console.log(pokemonAbilitesInfo);
    });
    pokemon.sprite.src = await sprites.front_default;
    pokemon.name.innerHTML = await `Name: ${name}`;

    return await sprites.front_default;
}
const GetAbilityInfo= async (url, abilityName)=>
{
    const data = await fetch(url);
    const dataJson = await data.json();
    const{effect_entries} = dataJson;

    let effectsList = '';

    effect_entries.forEach(element => {

        const{effect, language} = element;

        if(language.name === 'en'){
            //console.log(effect);
            effectsList += `<li>${effect}</li>`;
        }
    });
    pokemon.abilities.innerHTML += 
    `<li>
        ${abilityName}
        <div>effect</div>
        <ul>
            ${effectsList}
        </ul>
    </li>`;

    // const abilitiesPokemon = effect_entries.map( element =>
    //     {
    //     const{effect, language} = element;

    //     if(language.name === 'en')
    //     {
    //         //console.log(effect);
    //         return effect;
    //     }
    // });

    //console.log(abilitiesPokemon);
}
GetPokemon();




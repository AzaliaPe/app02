const baseUrl = 'https://pokeapi.co/api/v2';
const pokemonImages = document.getElementById('pokemon-images');

const GetPokemon = async url=>
{
    const data = await fetch(url);
    const dataJson = await data.json();

    const {sprites} = dataJson;

    return await sprites.front_default;
}

const GetPokemonList = async ()=>
{
    const url = `${baseUrl}/pokemon`;
    fetch(url).then(data => data.json()).then(json =>
    {
        //console.log(json.results);
        const urlList = json.results.map(element => element.url);
        //console.log(urlList);
        const spriteList = urlList.map(pokemonUrl => GetPokemon(pokemonUrl));
        spriteList.forEach(async sprite => 
        {
            await sprite;
            const currentPokemonImg = document.createElement('img');
            currentPokemonImg.src = await sprite;
            currentPokemonImg.className = 'pokemonImage';
            pokemonImages.appendChild(currentPokemonImg);

            currentPokemonImg.onclick = ()=> 
            {
                sessionStorage.setItem('urlList', JSON.stringify(urlList));
                sessionStorage.setItem('sprite', currentPokemonImg.src);
                window.location.href = 'file:///D:/Documentos/programacion-hipermedia/app02/pokemon.htm';
            }
            //console.log(await sprite);
        });
    });
}
GetPokemonList();
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

 

document.addEventListener('DOMContentLoaded', (event) => {
        
    const mainDiv = document.querySelector("main") 

    const init = () => {
        fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then( renderTrainers )
     }

//card render
    const renderTrainers = (trainers) => {
        trainers.forEach(trainer => {
            let pokString = ""
            trainer.pokemons.forEach(pokemon => {
                pokString += `<li> ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
            })
            mainDiv.innerHTML += `
            <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
            <button data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul>${pokString}</ul>
            </div>`
        })
     }

    mainDiv.addEventListener('click', e => {
        if (e.target.dataset.trainerId !== undefined){
            fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    trainer_id: e.target.dataset.trainerId
                })
            })
            .then(res => res.json())
            .then(addPokemon)
        } 
        if (e.target.dataset.pokemonId !== undefined){
            e.target.parentElement.remove()
            fetch(POKEMONS_URL + "/" + e.target.dataset.pokemonId, {method : "DELETE"})
        }
    })
    

    function addPokemon(pokemon){
        mainDiv.children[pokemon.trainer_id-1].lastElementChild.innerHTML +=
      `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
    }
     


    init()

})
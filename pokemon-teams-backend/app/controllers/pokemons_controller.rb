class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons).to_serialized_json
    end


      def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end

    def create
    pokemon = Pokemon.new(pokemon_params)
    
        if pokemon.valid?
            pokemon.save
            render json: pokemon
        else
            render json: { errors: user.errors.full_messages }, status: :not_acceptable    
    end


    private

    def pokemon_params
        params.requrie(:pokemon).permit(:nickname, :species)
    end

end

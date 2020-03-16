class TrainersController < ApplicationController

    

    def index
      trainer = Trainer.all
      render json: trainer, include: [:pokemons]
    end

end

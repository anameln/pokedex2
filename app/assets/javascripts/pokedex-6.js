Pokedex.Router = Backbone.Router.extend({
  routes: {
    "": "pokemonIndex",
    "pokemon/:id": "pokemonDetail"

  },

  pokemonDetail: function (id, callback) {
    if (typeof this._pokemonIndex === "undefined") {
      this.pokemonIndex(this.pokemonDetail.bind(this, id, callback));
      return;
    }
    var pokemon = this._pokemonIndex.pokes.get(id);
    var pokemonDetail = new Pokedex.Views.PokemonDetail( {model: pokemon });
    $("#pokedex .pokemon-detail").html(pokemonDetail.$el);
    pokemonDetail.refreshPokemon();
  },

  pokemonIndex: function (callback) {
    var pokemonIndex = new Pokedex.Views.PokemonIndex();
    this._pokemonIndex = pokemonIndex;
    pokemonIndex.refreshPokemon({success: callback});
    $("#pokedex .pokemon-list").html(pokemonIndex.$el);
  },

  toyDetail: function (pokemonId, toyId) {
  },

  pokemonForm: function () {
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});

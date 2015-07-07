Pokedex.Router = Backbone.Router.extend({
  routes: {
    "": "pokemonIndex"
  },

  pokemonDetail: function (id, callback) {
  },

  pokemonIndex: function (callback) {
    var pokemonIndex = new Pokedex.Views.PokemonIndex();
    pokemonIndex.refreshPokemon();
    $("#pokedex .pokemon-list").html(pokemonIndex.$el);
  },

  toyDetail: function (pokemonId, toyId) {
  },

  pokemonForm: function () {
  }
});

/*
$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});
*/

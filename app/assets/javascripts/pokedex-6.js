Pokedex.Router = Backbone.Router.extend({
  routes: {
    "": "pokemonIndex",
    "pokemon/:id": "pokemonDetail",
    "pokemon/:pokemonId/toys/:toyId": "toyDetail"

  },

  pokemonDetail: function (id, callback) {
    if (typeof this._pokemonIndex === "undefined") {
      this.pokemonIndex(this.pokemonDetail.bind(this, id, callback));
      return;
    }

    var pokemon = this._pokemonIndex.pokes.get(id);
    var pokemonDetail = new Pokedex.Views.PokemonDetail( {model: pokemon });
    this._pokemonDetail = pokemonDetail;
    $("#pokedex .pokemon-detail").html(pokemonDetail.$el);
    pokemonDetail.refreshPokemon({success: callback});
  },

  pokemonIndex: function (callback) {
    var pokemonIndex = new Pokedex.Views.PokemonIndex();
    this._pokemonIndex = pokemonIndex;
    pokemonIndex.refreshPokemon({success: callback});
    $("#pokedex .pokemon-list").html(pokemonIndex.$el);
  },

  toyDetail: function (pokemonId, toyId) {
    if (typeof this._pokemonDetail === "undefined") {
      this.pokemonDetail(pokemonId, this.toyDetail.bind(this, pokemonId, toyId));
      return
    }
    var toy = this._pokemonDetail.model.toys().get(toyId);
    var toyDetail = new Pokedex.Views.ToyDetail({ model: toy });
    toyDetail.render();
  },

  pokemonForm: function () {
  }
});


$(function () {
  new Pokedex.Router();
  Backbone.history.start();
});

Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
  },

  initialize: function () {
    this.pokes = new Pokedex.Collections.Pokemon();
    this.listenTo(this.pokes, "sync add", this.render);
    this.pokes.fetch();
  },

  addPokemonToList: function (pokemon) {
    var content = JST["pokemonListItem"]({pokemon: pokemon});
    this.$el.append(content);
  },

  refreshPokemon: function (options) {
  },

  render: function () {
    // debugger
    this.$el.empty();
    // this.pokes.fetch();
    this.pokes.forEach(function(poke) {
      this.addPokemonToList(poke);
    }.bind(this));
    return this;
  },

  selectPokemonFromList: function (event) {
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
  },

  refreshPokemon: function (options) {
  },

  render: function () {

  },

  selectToyFromList: function (event) {
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
  }
});


$(function () {
  var pokemonIndex = new Pokedex.Views.PokemonIndex();
  pokemonIndex.refreshPokemon();
  $("#pokedex .pokemon-list").html(pokemonIndex.$el);
});

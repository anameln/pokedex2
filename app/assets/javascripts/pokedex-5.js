Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li.poke-list-item": "selectPokemonFromList"
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
    var pokemonId = $(event.currentTarget).data("id");
    var pokemon = this.pokes.get(pokemonId);
    console.log(pokemon.get("name"));
    var pokemonDetail =
      new Pokedex.Views.PokemonDetail({ model: pokemon })
    $("#pokedex .pokemon-detail").html(pokemonDetail.$el);
    pokemonDetail.render();
  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
  },

  refreshPokemon: function (options) {
  },

  render: function () {
    var content = JST["pokemonDetail"]({ pokemon: this.model })
    this.$el.html(content);
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

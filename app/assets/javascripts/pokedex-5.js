Pokedex.Views = {}

Pokedex.Views.PokemonIndex = Backbone.View.extend({
  events: {
    "click li.poke-list-item": "selectPokemonFromList"
  },

  initialize: function () {
    this.pokes = new Pokedex.Collections.Pokemon();
    this.listenTo(this.pokes, "sync add", this.render);
  },

  addPokemonToList: function (pokemon) {
    var content = JST["pokemonListItem"]({pokemon: pokemon});
    this.$el.append(content);
  },

  refreshPokemon: function (options) {
    this.pokes.fetch(options);
  },

  render: function () {
    this.$el.empty();
    this.pokes.forEach(this.addPokemonToList.bind(this));
    return this;
  },

  selectPokemonFromList: function (event) {
    var pokemonId = $(event.currentTarget).data("id");
    Backbone.history.navigate("/pokemon/" + pokemonId, { trigger: true });
    // var pokemonDetail =
    //   new Pokedex.Views.PokemonDetail( {model: pokemon} )

  }
});

Pokedex.Views.PokemonDetail = Backbone.View.extend({
  events: {
    "click .toys li" : "selectToyFromList"
  },

  initialize: function() {
    this.listenTo(this.model, "sync add", this.render);
  },

  refreshPokemon: function (options) {
    this.model.fetch(options);
  },

  render: function () {
    var content = JST["pokemonDetail"]({ pokemon: this.model })
    this.$el.html(content);
    this.model.toys().forEach(function(toy) {
      this.$("ul.toys").append(JST["toyListItem"]({ toy: toy }))
    }.bind(this));
  },

  selectToyFromList: function (event) {
    var toyId = $(event.currentTarget).data("id");
    var toy = this.model.toys().get(toyId);
    Backbone.history.navigate("/pokemon/" + toy.get("pokemon_id") + "/toys/" + toyId, { trigger: true })
    // var toyDetail = new Pokedex.Views.ToyDetail({ model: toy });
    // toyDetail.render([]);
  }
});

Pokedex.Views.ToyDetail = Backbone.View.extend({
  render: function () {
    var content = JST["toyDetail"]({ toy: this.model })
    // var select = JST["pokemonForm"]({toy: this.model, pokes: this.pokes})
    $("#pokedex .toy-detail").html(content)
  }
});


// $(function () {
//   var pokemonIndex = new Pokedex.Views.PokemonIndex();
//   pokemonIndex.refreshPokemon();
//   $("#pokedex .pokemon-list").html(pokemonIndex.$el);
// });

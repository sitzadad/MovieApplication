//Model View
var MovieView = Backbone.View.extend({
  template: _.template($('#movieTmpl').html()),//why do we need .html() at the end
  tagName: 'article',
  initialize: function () {
    console.log('MovieView initialized');
  },
  events: {
    'click .fa-times': 'removeMovie',
    'click .fa-pencil-square-o': 'toggleEditMovie',
    'submit .editMovieForm': 'updateMovie'
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  removeMovie: function () {
    this.$el.remove();
    this.model.destroy();
  },
  toggleEditMovie: function () {
    this.$el.find('.editMovieForm').toggleClass('show');
    this.$el.find('.movieListing').toggleClass('hide');
    this.$el.find('input[name="updateTitle"]').val(this.model.attributes.title);
    this.$el.find('input[name="updateImage"]').val(this.model.attributes.imageURL);
    this.$el.find('input[name="updateReleaseDate"]').val(this.model.attributes.releaseDate);
    this.$el.find('textarea[name="updateSynopsis"]').val(this.model.attributes.synopsis);
  },
  updateMovie: function (e) {
    e.preventDefault();
    this.model.attributes.title = $('.editMovieForm').find('input[name="updateTitle"]').val();
    this.model.attributes.imageURL = $('.editMovieForm').find('input[name="updateImage"]').val();
    this.model.attributes.releaseDate = $('.editMovieForm').find('input[name="updateReleaseDate"]').val();
    this.model.attributes.synopsis = $('.editMovieForm').find('textarea[name="updateSynopsis"]').val();
    this.model.save();
    this.renderUpdatedMovie();
    this.$el.find('.editMovieForm').find('input, textarea').val('');
    this.toggleEditMovie();
  },
  renderUpdatedMovie: function () {
    this.$el.find('.title').html(this.model.attributes.title);
    this.$el.find('.imageURL').html(this.model.attributes.imageURL);
    this.$el.find('.releaseDate').html(this.model.attributes.releaseDate);
    this.$el.find('.synopsis').html(this.model.attributes.synopsis);
  }
});

// Collection View

var CollectionView = Backbone.View.extend({
  el: $('section'),
  initialize: function () {
    this.addAllMovies();
    console.log('CollectionView initialized');
  },
  events: {
    'click .toggleAddMovie': 'toggleAddMovie',
    'submit #addMovieForm': 'addMovie'
  },
  toggleAddMovie: function () {
    this.$el.find('#addMovieForm').toggleClass('show');
  },
  addMovie: function (e) {
    e.preventDefault();
    var newMovie = {
      title: $('#addMovieForm').find('input[name="newTitle"]').val(),
      imageURL: $('#addMovieForm').find('input[name="newImage"]').val(),
      releaseDate: $('#addMovieForm').find('input[name="newReleaseDate"]').val(),
      synopsis: $('#addMovieForm').find('textarea[name="newSynopsis"]').val()
    };
    var newModelMovie = new MovieModel(newMovie);
    newModelMovie.save();
    this.collection.add(newModelMovie);
    this.addAllMovies();
    this.$el.find('#addMovieForm').find('input, textarea').val('');
    this.toggleAddMovie();


  },
  addOneMovie: function (movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render().el);
  },
  addAllMovies: function () {
    this.$el.html(_.template($('#addMovieTmpl').html()));
    _.each(this.collection.models, this.addOneMovie, this)
  }
});

var MovieModel = Backbone.Model.extend({
  urlRoot: 'http://tiy-fee-rest.herokuapp.com/collections/bbbb',
  idAttribute: '_id',
  defaults: function () {
    return {
      imageURL: 'http://placehold.it/300x500'
    };
  },
  initialize: function () {
    console.log('MovieModel initialized');
  }
});

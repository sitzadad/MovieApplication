$(function () {

  var movieCollection = new MovieCollection();

   movieCollection.fetch().then(function () {
     var collectionView = new CollectionView({collection: movieCollection});
   });
});

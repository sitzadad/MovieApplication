// testing movie model

describe("Movie Model", function () {
  beforeEach(function () {
    this.movieModel = new MovieModel();
    this.movieStub = sinon.stub(this.movieModel, 'save');
  });
  it("should be an instance of MovieModel Class", function () {
    expect(this.movieModel).is.instanceof(MovieModel);
  });
  it("should have correct urlRoot", function () {
    expect(this.movieModel.urlRoot).to.be.ok;
    expect(this.movieModel.urlRoot).to.be.equal("http://tiy-fee-rest.herokuapp.com/collections/bbbb");
  });
  it("should be able to add property to model", function () {
    expect(this.movieModel.attributes.director).to.not.be.ok;
    this.movieModel.set({director: 'Nicholas Meyer'});
    expect(this.movieModel.attributes.director).to.equal('Nicholas Meyer');
  });
  it("should save my model when i call save", function () {
    this.movieModel.set({director: 'this is not a real director'});
    this.movieModel.save();
    expect(this.movieStub).to.have.been.calledOnce;
    this.movieModel.set({title: 'this is not a real title'});
    this.movieModel.save();
    expect(this.movieStub).to.have.been.calledTwice;
  })

  it("should have a default photo", function () {
    expect(this.movieModel.attributes.imageURL).to.equal('http://placehold.it/300x500');
  })
});

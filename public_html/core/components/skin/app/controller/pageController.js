// THE MODEL
Page = can.Model({
  findOne : 'GET /pages/{id}',
  findAll : 'GET /pages',
  create  : "POST /pages",
  update  : "PUT /pages/{id}",
  destroy : "DELETE /pages/{id}"
},{});

var PAGES = [
  {
    id: 1,
    data: '<page>a page</page>'
  },
  {
    id: 2,
    data: '<page>another page</page>'
  },
  {
    id: 3,
    data: '<page>yet another page</page>'
  }
];

var id= 1;
can.fixture("GET /pages/{id}", function(){
  return {};
});
can.fixture('GET /pages', function(){
  return [PAGES];
});
var id= 4;
can.fixture("POST /pages", function(){
  return {id: (id++)}
});
can.fixture("PUT /pages/{id}", function(){
  return {};
});
can.fixture("DELETE /pages/{id}", function(){
  return {};
});
// THE CONTROLLER
Pages = can.Control({
	init: function() {
		this.element.html(can.view('view/pageView.ejs', {
			pages: this.options.pages
		}));
	}
})
Footer = can.Model({
  findOne : 'GET /footers/{id}',
  findAll : 'GET /footers',
  create  : "POST /footers",
  update  : "PUT /footers/{id}",
  destroy : "DELETE /footers/{id}"
},{});

var FOOTERS = [
  {
    id: 1,
    data: '<footer>a footer</footer>'
  },
  {
    id: 2,
    data: '<footer>another footer</footer>'
  },
  {
    id: 3,
    data: '<footer>yet another footer</footer>'
  }
];

var id= 1;
can.fixture("GET /footers/{id}", function(){
  return {};
});
can.fixture('GET /footers', function(){
  return [FOOTERS];
});
var id= 4;
can.fixture("POST /footers", function(){
  return {id: (id++)}
});
can.fixture("PUT /footers/{id}", function(){
  return {};
});
can.fixture("DELETE /footers/{id}", function(){
  return {};
});
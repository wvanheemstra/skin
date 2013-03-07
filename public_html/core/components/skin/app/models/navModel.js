Nav = can.Model({
  findOne : 'GET /navs/{id}',
  findAll : 'GET /navs',
  create  : "POST /navs",
  update  : "PUT /navs/{id}",
  destroy : "DELETE /navs/{id}"
},{});

var NAVS = [
  {
    id: 1,
    data: '<nav>a nav</nav>'
  },
  {
    id: 2,
    data: '<nav>another nav</nav>'
  },
  {
    id: 3,
    data: '<nav>yet another nav</nav>'
  }
];

var id= 1;
can.fixture("GET /navs/{id}", function(){
  return {};
});
can.fixture('GET /navs', function(){
  return [NAVS];
});
var id= 4;
can.fixture("POST /navs", function(){
  return {id: (id++)}
});
can.fixture("PUT /navs/{id}", function(){
  return {};
});
can.fixture("DELETE /navs/{id}", function(){
  return {};
});
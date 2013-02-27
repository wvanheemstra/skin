Section = can.Model({
  findOne: 'GET /sections/{id}',
  findAll: 'GET /sections',
  create  : "POST /sections",
  update  : "PUT /sections/{id}",
  destroy : "DELETE /sections/{id}"
},{});

var SECTIONS = [
  {
    id: 1,
    data: '<section>a section</section>'
  },
  {
    id: 2,
    data: '<section>another section</section>'
  },
  {
    id: 3,
    data: '<section>yet another section</section>'
  }
];

var id= 1;
can.fixture("GET /sections/{id}", function(){
  return {};
});
can.fixture('GET /sections', function(){
  return [SECTIONS];
});
var id= 4;
can.fixture("POST /sections", function(){
  return {id: (id++)}
});
can.fixture("PUT /sections/{id}", function(){
  return {};
});
can.fixture("DELETE /sections/{id}", function(){
  return {};
});
//challenge 1 
let students = [
    {name: 'Remy', cohort: 'Jan'},
    {name: 'Genevieve', cohort: 'March'},
    {name: 'Chuck', cohort: 'Jan'},
    {name: 'Osmund', cohort: 'June'},
    {name: 'Nikki', cohort: 'June'},
    {name: 'Boris', cohort: 'June'}
];
function challenge1(arr) {
  for (var i=0; i<students.length; i++) {
    console.log ('name: ' + students[i]['name'], 'cohort: ' + students[i]['cohort']);
  }
}
//challenge1(students);


let users = {
    employees: [
        {'first_name':  'Miguel', 'last_name' : 'Jones'},
        {'first_name' : 'Ernie', 'last_name' : 'Bertson'},
        {'first_name' : 'Nora', 'last_name' : 'Lu'},
        {'first_name' : 'Sally', 'last_name' : 'Barkyoumb'}
    ],
    managers: [
       {'first_name' : 'Lillian', 'last_name' : 'Chambers'},
       {'first_name' : 'Gordon', 'last_name' : 'Poe'}
    ]
 };

function challenge2(obj) {
  for (var key in obj) {
    console.log(key);
    for (var i=0; i<obj[key].length; i++){
      console.log(obj[key][i]['first_name'],obj[key][i]['last_name']);
      
      //console.log(key['first_name']);
    }
  }
  }
challenge2(users);
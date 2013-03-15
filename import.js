
module.exports = function (db) {

  var raw  = [
    {
       "first":"John",
       "last":"Doe",
       "office":"Toronto",
       "team":"Marketing",
       "phone":"555-203-3002",
       "email": "john@company.com"
    },
    {
       "first":"Jane",
       "last":"Doe",
       "office":"Milwaukee",
       "team":"Human Resources",
       "phone":"555-203-3007",
       "email": "jane@company.com"     
    },  
    {
       "first":"Chuck",
       "last":"Smith",
       "office":"Milwaukee",
       "team":"Development",
       "phone":"555-203-3003",
       "email": "chuck@company.com"     
    },    
  ];


  // Iterate over raw data objects
  raw.forEach(function(item){

    // Instantiate our index string
    var index = "";

    // Iterate over the object keys
    for (var key in item) {
       if (item.hasOwnProperty(key)) {
          var obj = item[key];
        
            // append the value to the index
            index += item[key];
        
       }
    }

    // Add the index attribute to the object
    item.index = index;

  });

  // Once all the data is processed lets insert it into mongo
  
  // Clear any existing data
  db.employees.drop();

  // Because we are passing an array of objects
  // mongo knows to create a new document for each one
  console.log('import', raw);
  db.employees.insert(raw);

}
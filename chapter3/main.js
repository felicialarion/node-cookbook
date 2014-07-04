var profiles = require('./profiles');
var replace_profiles = JSON.stringify(profiles).replace(/name/g, 'fullname');
console.log(replace_profiles);
replace_profiles = JSON.parse(replace_profiles);
replace_profiles.ryan.fullname = 'Ryan Dahl';
console.log(replace_profiles.ryan);
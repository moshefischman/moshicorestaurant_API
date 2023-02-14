// Randomly generate a fake allTables JSON file

const fs = require("fs");
const numTables = Math.floor(Math.random() * 15) + 10; // 10 - 25 

let fakeTables = [];
for (i = 1; i < numTables; i++) {
  const chairs = Math.floor(Math.random() * 6) + 2; // 2-8 | Detailed in requirements
  const name = `Table ${i}`;
  // const availability = [true, false][Math.round(Math.random())];
  const location = ["1st Floor", "2nd Floor", "Garden"][Math.floor(Math.random() * 3)]; // 0-3 
  fakeTables.push({
    name: name,
    capacity: chairs,
    // isAvailable: availability,
    isAvailable: true,
    location: location
  });
}

let data = JSON.stringify({
  tables: fakeTables
});
fs.writeFileSync(__dirname + "/allTables.json", data);

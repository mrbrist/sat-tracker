const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./parse/satlist.json", "utf-8"));

let newArr = []

for (const sat in data) {
    let newData = { label: data[sat].OBJECT_NAME, id: data[sat].NORAD_CAT_ID }
    newArr.push(newData);
}

fs.writeFileSync("./parse/sats.json", JSON.stringify(newArr), "utf-8")
console.log(newArr);
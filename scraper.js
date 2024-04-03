#!/usr/bin/env node

const cheerio = require('cheerio');
const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs');
const program = require('commander');

program.version('0.1.0').parse(process.argv);

var inputFiles = [];

fs.readdirSync("inputs").forEach(file => {
  inputFiles.push("inputs/" + file);
  console.log(file);
});


const outputFile = "outputs/" + program.args[program.args.length - 1];
console.log(outputFile);

let Persons = [];
let $ = null;

function GetName(text) {
  const titleAndFullName = text.split(' ').slice(0,3)
  let name = {
    title: titleAndFullName[0],
    firstName: titleAndFullName[1],
    lastName: titleAndFullName[2]
  }
  return name
}

function ScrapePerson(row) {
  let person = {};
  for (let cell = 0; cell <= 10; cell++) {
    let cellText = $(`#search-results-data-table-row-${row}-cell-${cell}`)
      .first()
      .text();
    person[`cell${cell}`] = cellText.substring(0, 100);
  }
  return person;
}


inputFiles.forEach(inputFile => {
  console.log(Persons.length)
  console.log('processing' + inputFile);
  const file = fs.readFileSync(__dirname + '/' + inputFile).toString();
  $ = cheerio.load(file);
  for (let i = 0; i < 300; i++) {
    let person = ScrapePerson(i);
    if(Object.values(person).every(x => x === '')) {
      break;
    }
    Persons.push(person);
  }
});

console.log(Persons.length);

let csv = new ObjectsToCsv(Persons);

csv.toDisk(outputFile);

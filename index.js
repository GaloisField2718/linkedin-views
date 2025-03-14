// NPM Plugins
const fs = require('fs')
const decodeEntities = require('decode-entities')
const cheerio = require('cheerio')
const chalk = require('chalk')

// Start scraping
let rawHtml = fs.readFileSync('./raw/LinkedIn.html').toString()
let $ = cheerio.load(rawHtml)
let searchString = 'code[id^="bpr"]:contains("fs_wvmpCard")'
let data = JSON.parse(decodeEntities($(searchString).html()))

// Write extracted data json to separate file
fs.writeFileSync('./raw/data.json', JSON.stringify(data, null, 2), 'utf-8')

// Show user data
function showUser(userData) {
 return `${chalk.yellow(userData.firstName)} ${chalk.yellow(decodeEntities(userData.lastName))}
 ${chalk.blue(userData.occupation)}
 URL: https://www.linkedin.com/in/${userData.publicIdentifier}/
`
}

// Start itterating through object
let objects = Object.keys(data.included).length
let no = 0

console.log(`
${chalk.blue('---------------------------------------------------------')}

${chalk.yellow('Display hidden LinkedIn profile views')}
by Vladimir Jovanović <vladimir@bitersen.com>

${chalk.blue('---------------------------------------------------------')}
`)

for (let i = 0; i < objects; i++) {
 if (data.included[i].firstName) {
   no += 1;
   console.log(`${no}. ${showUser(data.included[i])}`)
 }
}

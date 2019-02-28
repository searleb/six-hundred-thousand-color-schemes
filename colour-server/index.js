// const express = require('express')
// const colorable = require('colorable')
// const changeCase = require('change-case')
// var fs = require('fs')
// const pantoneColors = require('./pantone-colors.json')
const colorCombinations = require('./color-combinations.json')

// const port = parseInt(process.env.PORT, 10) || 3000

// const app = express()

// app.get('/get-theme', (req, res) => {
//   function randomNumber(max, min = 0) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
//   }

//   function pantoneTheme() {
//     const first = colorCombinations.colors[randomNumber(colorCombinations.colors.length - 1)]
//     const second = first.combinations[randomNumber(first.combinations.length - 1)]
//     return {
//       first: {
//         hex: first.hex,
//         name: first.name,
//       },
//       second: {
//         hex: second.hex,
//         name: second.name
//       },
//       count: colorCombinations.count
//     }
//   }
//   return res.json(pantoneTheme())
// })

// app.get('/build-colors', (req, res) => {
//   const colors = {}
//   pantoneColors.names.forEach((name, i) => {
//     colors[name] = pantoneColors.values[i]
//   }); 

//   let result = colorable(colors, {
//     compact: true,
//     threshold: 4.5,
//     uniq: true
//   })
//   result = result.filter(color => color.combinations.length)

//   let count = 0
//   const numberOfColors = result.length
//   result.forEach((color, i) => {
//     count += color.combinations.length
//     result[i] = {
//       name: changeCase.titleCase(color.name),
//       hex: color.hex,
//       combinations: color.combinations.map(combo => ({
//         name: changeCase.titleCase(combo.name),
//         hex: combo.hex,
//       }))
//     }
//   })

//   count += numberOfColors
//   result.count = count
//   console.log(count)
//   const build = {
//     colors: result,
//     count
//   }
//   fs.writeFile('./color-combinations.json', JSON.stringify(build), err => console.log(err))
// })

// app.get('*', (req, res) => {
//   return res.status(404).send('404')
// })

// app.listen(port, (err) => {
//   if (err) throw err
//   console.log(`> Ready on http://localhost:${port}`)
// })

module.exports = (req, res) => {
  function randomNumber(max, min = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  function pantoneTheme() {
    const index = randomNumber(colorCombinations.colors.length - 1);
    // const first = colorCombinations.colors[randomNumber(colorCombinations.colors.length - 1)]
    // const second = first.combinations[randomNumber(first.combinations.length - 1)]
    const base = colorCombinations.colors[index];
    return {
      index: `Base colour ${base.name} is ${index} of ${colorCombinations.colors.length}, with ${base.combinations.length} combination${base.combinations.length > 1 ? 's' : '' }.`,
      colour: base,
      totalCombinations: colorCombinations.count,
    }
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json')
  res.writeHead(200, 'success')
  res.end(JSON.stringify(pantoneTheme()))
}

const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('initial')
})

app.get('/major', (req, res) => {
  return res.render('major', { age: req.query.idade })
})

app.get('/minor', (req, res) => {
  return res.render('minor', { age: req.query.idade })
})

app.post('/check', (req, res) => {
  const { age } = req.body
  return age >= 18 ? res.redirect(`/major?idade=${age}`) : res.redirect(`/minor?idade=${age}`)
})

app.listen(3000)

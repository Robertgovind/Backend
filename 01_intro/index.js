require('dotenv').config()
const express = require('express')
const app = express()


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/login', (req,res) => {
    res.send("Login Page")
})
app.get('/signup', (req,res) => {
    res.send('<h1>Sign Up page</h1>')
})
app.get('/about',(req,res) => {
    res.send("<h2>Govind Kr Yadav</h2>")
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})




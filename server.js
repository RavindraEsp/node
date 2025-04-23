//import express from 'express'

const express = require('express');
const app = express()

app.get('/', (req, res) => {
  res.send('Wlcome to hotel how can i help you Hello World')
})


app.get('/message', (req, res) => {
    res.send('Wlcome to hotel yadav ji How can we help You.')
  })



  app.get('/idli', (req, res) => {
    var customized_idli = {
        name : "rava itli",
        size: "10 cm diameter",
        is_samber: true,
        is_chutny:false
    }
    res.send(customized_idli)
  })

app.listen(3000,()=> console.log("listining on port 3000"))
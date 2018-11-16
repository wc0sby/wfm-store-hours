const express = require('express')
const parser = require('body-parser')
const fs = require('fs')
const rp = require('request-promise')
const getData = require('./getInfor')
const statesUrl = 'https://www.wholefoodsmarket.com/stores/list/state?page='
const canadaUrl = 'https://www.wholefoodsmarket.com/stores/list/canada?page='

const app = express()

app.use(parser.json())
//Input routes here


app.get('/states',(req, res)=>{
  res.set('Access-Control-Allow-Origin','*')
    rp(statesUrl)
      .then((html)=>{
        const wfmPages = []
        for(let i = 0; i<=22; i++){
          wfmPages.push(`${statesUrl}${i}`)
        }
        return Promise.all(
          wfmPages.map(url=>getData(url))
        )
      })
      .then((data)=>{
        res.json(data)
      })
      .catch(err=>console.log(err))
    }) 

    app.get('/canada',(req, res)=>{
      rp(canadaUrl)
        .then((html)=>{
          const wfmPages = []
          for(let i = 0; i<=23; i++){
            wfmPages.push(`${canadaUrl}${i}`)
          }
          return Promise.all(
            wfmPages.map(url=>getData(url))
          )
        })
        .then((data)=>{
          res.json(data)
        })
        .catch(err=>console.log(err))
      }) 

app.listen(3001, () => console.log('Listening on port 3001!'))
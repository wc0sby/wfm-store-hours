const rp = require('request-promise')
const cheerio = require('cheerio')

const getData = (url) =>{
    return rp(url)
    .then((html)=>{
        const myArr = []
        const $ = cheerio.load(html)
          $('.views-row').each((i, data)=>{
            const hours = $(data).find('.views-field-field-store-hours').children('.field-content').text().match(/\b((?:0?[1-9]|1[0-2])(?!\d| (?![ap]))[:.]?(?:(?:[0-5][0-9]))?(?:\s?[ap]m)?(?: [ap])?)\b/gi)
            const storeName = $(data).find('.views-field-title a').text()
            const id = $(data).find('.views-field-store-make-users-store .field-content').children().attr('id')
            const street = $(data).find('.street-block').text()
            const city = $(data).find('.locality').text()
            const state = $(data).find('.state').text()
            const zip = $(data).find('.postal-code').text()
            
            const myStore = id && storeName 
              ? {id,storeName,street,city,state,zip,hours}
              : ''
            myStore ? myArr.push(myStore) : ''
          })
        return myArr
      })
      .catch(()=>{
        console.log(`Error occurred at page ${url}`)
      })
    }
 
    module.exports = getData
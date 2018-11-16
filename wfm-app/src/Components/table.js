import React, { Component } from 'react'

export default class Table extends Component{

  getRows=(data)=>{
    return data.map((i,key)=>{
      return i.map(row=>{
      const cnt = row.hours ? row.hours.length - 1 : 0
       return <tr>
          <td>{row.id}</td>
          <td>{row.city}</td>
          <td>{row.hours ? row.hours[cnt] : ''}</td>
        </tr>

      })
    })
  }

  render(){
    return(
      <div>
        <table>
          {this.getRows(this.props.data)}
        </table>
      </div>
    )
  }
}
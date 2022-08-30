import { DatePicker } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { Loader } from '../layout/Loader'


export const Records = ({detail,loading,horseimg}) => {
  
   
  return (
    <>
    {
  loading?<Loader/>:(
<>
<div>
        <div className="container-fluid upcomming-sec">
          <div className="container">
            <h3>Upcoming Races</h3>
            <div className="upcomming-table">
              <table>
                <tr>
                  <th className="first-border">Category</th>
                  <th>Time</th>
                  <th>Track Name</th>
                  <th>Race No.</th>
                  <th className="first-border2">Win Odds</th>
                </tr>
{  detail.map((items,index)=>{
    
    const date = new Date(items.RaceDate).toDateString()
 const trimlocation = items.RaceLocation.replace(/ +/g, "-").toLowerCase()

    return(
      <tr  key = {index}>
      <td>
        <img src = {horseimg} alt="horse image" />
      </td>
      <td>{date}</td>
      <td>{items.RaceLocation}</td>
      <td>
      <Link to = {`/horsedetails/${items.id}/${trimlocation}`}>

<button className="btn btn-1">Race  {items.RaceNumber}</button>
</Link>
      </td>
      <td>6.7</td>
    </tr>
    )
  })}

          </table>
            </div>
          </div>
        </div>
      </div>
</>
  )
}
<input onChange={(e)=>{console.log(e.target.value);}} name="min" id="min" type="date"/>
     
    </>
  )
}

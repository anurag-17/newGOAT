import React from 'react'
import './Sports.css'
import { useState,useEffect } from "react";
import axios from "axios"
import { Pagination } from './Pagination';
import { Link } from 'react-router-dom';
import { Loader } from '../layout/Loader';

export const Timetable = ({detail,loading}) => {



  //getting today date
   
  const currentday = new Date()
  const currentdaystring = new Date(currentday).toDateString()
  const thisday = new Date("7/22/12")
  console.log(thisday.toDateString())
  console.log(currentdaystring)
  const nextday  = new Date(currentday)
 nextday.setDate(nextday.getDate()+1)



   const filtereddate = detail.filter((items,index)=>{
    return items.RaceDate === thisday
  
  })
   console.log(filtereddate)

  return (
    <>
    <div className='container-fluid raceup-sec'>
          <div className='container'>
            <h3 className="free-title">Today,{currentday.toDateString()}</h3>
            <div className='upcomming-table'>
            <table>

              <tbody>
              <tr>
                  <th className='first-border'>Track Namey</th>
                  <th>Time</th>
                  <th>Race No.</th>
                  <th>Favourite No.</th>
                  <th className='first-border2'>Win Odds</th>
                </tr>

{
  filtereddate.map((items,index)=>{
    return(
      <>

<tr>
                  <td>{items.RaceLocation}</td>
                  <td>{items.RaceTime}</td>
                  <td>{items.RaceNumber}</td>
                  <td> 5</td>
                  <td>6.7</td>  
                </tr>

      </>
    )
  })
}


           
              </tbody>
                       
              </table>
            </div>
          </div>
        </div>

        <div className='container-fluid raceup-sec'>
          <div className='container'>
            <h3 className="free-title">Tomorrow, {nextday.toDateString()}</h3>


            {
               loading?<Loader/>:
               <div className='upcomming-table'>
               <table>
                 <tbody>
   
                   <tr>
                     <th className='first-border'>Track Namey</th>
                     <th>Time</th>
                     <th>Race No.</th>
                     <th>Favourite No.</th>
                     <th className='first-border2'>Win Odds</th>
                   </tr>
   
   {
    
     detail.map((items,index)=>{
 
   return (
     <tr  key = {index}>
     <td>
       <img src="../left-Vector.png" alt="horse image" />
     </td>
     <td>{items.RaceTime}</td>
     <td>{items.RaceLocation}</td>
     <td>
       <Link to ={`/greydetails/${items.id}`}>
   
       <button className="btn btn-1">Race       {items.RaceNumber}</button>
       </Link>
     </td>
     <td>6.7</td>
   </tr>
   )
     })
   }
   
   
                </tbody>
                 </table>
             
               </div>
            }
           
          </div>
        </div>
    
    </>
  )
}

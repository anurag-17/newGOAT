import React, { useDebugValue, useEffect, useState } from "react";
import "./Main.css";
import { Link, useNavigate } from "react-router-dom";
import { Metadata } from "../layout/Metadata";
import Footer from "../Footer/Footer";
import { Header } from "../Header/Header";
import store from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { loaduser } from "../../actions/userAction";
import axios from "axios";
import { Records } from "./Records";
import { Pagination } from "./Pagination";
import { apidata } from "../../actions/apiAction";
import { Loader } from "../layout/Loader";

export const Main = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.data);
  const [detail, setDetail] = useState([]);
  const [todayrace, setTodayRace] = useState([]);
  const [placename,setPlaceName] = useState("")
  const [dogdetail, setDogdetail] = useState([]);
  const [finaldetail, setFinaldetail] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const formatDate = (date) => {
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var now = new Date();
    var month = months[now.getMonth() + 1];
    var date = now.getDate();

    var hour = now.getHours();
    var min = now.getMinutes();
    var year = now.getFullYear();
    var period = "am";
    if (hour > 11) {
      period = "pm";
      if (hour > 12) {
        hour -= 12;
      }
    }
    if (min < 10) {
      min = "0" + min;
    }
    return `${date}    ${month}    ${year}`;
   
  };

  const getdata = async () => {
    const res = await axios.get(
      "https://script.googleusercontent.com/macros/echo?user_content_key=JxTR_CmO6LOwDEY7gYj8mh-6N5klsFTfRxZBd1zAUaSlLfloCVG1VYeAl4mKdepsjisvchrhrId-zj_OKuJ8Ztfr9h0fILoXm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnM5Ekl7EwoTMsxbGD7Mk6JPN3Ls7Oyxjmrsr3ZQwRD52M_vMAqczDkXfnrBBGFFHff8VMKaSWAE-WxUrUSiQwyHxctBCURm4-9z9Jw9Md8uu&lib=MBii240CyOZU5TRkVZr_iMkwZJcFcrlZl"
    );
    let finaldata = await res.data.data;

    setLoading(!loading);

    

    //getting next 5 days
    const today = new Date();
    console.log(today)
    const start = today.getTime();
    const end = today.getTime()+5
    console.log(start);
    console.log(end);

    //UPCOMING RACES 
    const filtereddata = finaldata.filter((items, index) => {
      //adding key and value to the object
      items.id = index;
      items.RaceDate = new Date(items.RaceDate);
      const time = new Date(items.RaceDate).getTime();
      setPlaceName(items.RaceLocation)
      return time <= end && start <= time;
    });
    setDetail(filtereddata);

    console.log(filtereddata)
    //getting today date

    const todaydate = new Date();

    console.log(finaldata);
    const racetoday = filtereddata.filter((items, index) => {

      return items.raceDate === todaydate;
    });
    setTodayRace(racetoday);
  };

  const getDogdata = async () => {
    const res = await axios.get(
      "https://script.googleusercontent.com/macros/echo?user_content_key=jDoChie6LqLG6ElHDz5XnSp5xbRzBGY7boopl67X51Y-MgBXn3qY9IykJM3v2v8gEiKx0RCnFEBRpeCaaI4b-91ukFetCelMm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnF9OXc95fD23eDvAhF7wtmVRghiF34032X6xCyWzrqMkLu9JIXnQGOCkJaLaMp569JzQoN6xAOTwYcScU6dDSajx9N_XZM_k49z9Jw9Md8uu&lib=MBii240CyOZU5TRkVZr_iMkwZJcFcrlZl"
    );
    let finaldata = await res.data.data;
    setDogdetail(finaldata);
  };


  useEffect(() => {
    apidata(dispatch);
    getdata();
    getDogdata();
  }, []);



  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = detail.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(detail.length / recordsPerPage);
  console.log(currentRecords);


  function getTime(date){
    var now = new Date(date);

    var hour = now.getHours();
    var min = now.getMinutes();


    var period = "am"
    if (hour > 11) {
        period = "pm"
        if (hour > 12) {
            hour -= 12
        }
    }
    if (min < 10) {
        min = "0" + min
    }

    return  `${hour}:${min}   ${period}`

  }

  return (
    <>
      <Header />
      {/* main image */}

      <div className="slide">
        <section className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="main-sec">
                <div className="main-content">
                  <h2>The Goat Tips</h2>
                  <p>
                    The Goat Tips - Betting made easy! Your guide for sports
                    betting, The Goat’s Tips caters to your needs with different
                    packages, provides tips and guidance for betting on
                    Thoroughbreds, Greyhounds and much more with real-time data
                    on upcoming races and a great ROI. Sign up now!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* free tips section */}

      <div>
        <div className="container-fluid" id="freetip-sec">
          <div className="container section">
            <h3>Today’s Free Tips</h3>
          </div>

          <div className="container main-freetips">
            <div className="main_1">
              <div className="main-grid 1">
                <div className="tip-grid">
              {todayrace.map((items, index) => {
                return (
                  <>
                      <div className="tips-colum1">
                        <img src="../Vector.png" alt="iage" />
                      </div>
                      <div className="tips-colum1">
                        <h3>{items.RaceLocation}</h3>
                        <div className="space">
                          <Link to={`horseDetails/${items.id}/${items.RaceLocation}`}>
                            <button className="btn">
                              Race {items.RaceNumber}
                            </button>
                          </Link>
                          <p>{getTime(items.RaceDate)}</p>
                        </div>
                      </div>
                  </>
                );
              })}

                    </div>
              </div>
              </div>
            <div className="main_1 main-img">
              <div className="main_cont">
                <h3>Sign up to The Goat Tips Today!</h3>
                <p>And get the hottest tips that can earn you up to </p>
                <h4>
                  <span>678% in returns</span> on your initial investment.
                </h4>
                <Link to="/packages">
                  <button className="btn freetips-btn">SIGN ME UP!</button>
                </Link>
              </div>
            </div>
              </div>
            </div>
              </div>
      <Records loading={loading} detail={currentRecords} />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Footer />
    </>
  );
};

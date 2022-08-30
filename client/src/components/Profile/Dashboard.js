import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Loader } from "../layout/Loader";
import { Profile } from "./Profile";

import { ProfileNav } from "./ProfileNav";
export const Dashboard = () => {
  const navigation = useNavigate();
  let { isAuthenticated, loading } = useSelector((state) => state.user);
  useEffect(() => {}, [loading, navigation]);

  return (
    <>
    {loading&& (<Loader/>)}
      <>
      <div style={{zIndex:-10}}>

      <Header />
    </div>
      <div className="main-body">
        <section>
          <div class="container profile-sec" style={{ zIndex: "-5" }}>
            <div
              class="flexbox"
              style={{ height: "730px", margin: "100px auto" }}
            >
              <ProfileNav />
              <Outlet />
            </div>
          </div>
          <div style={{ zIndex:111}}>
            <Footer />
          </div>
        </section>
      </div>
      </>
    
    </>
  );
};

/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useForm, useStep } from "react-hooks-helper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors, register } from "../actions/userAction";
import { Email } from "./Stepform/Email";
import { Names } from "./Stepform/Names";
import { Password } from "./Stepform/Password";

export const Multilf = () => {
  const dispatch =useDispatch()
  const [defaultData, setDefaultData] = useState({
    username : "",
    email: "",
    dob: "",
    password: "",
    gender: "",
    packages: "",
    paymentstatus:"",
    phoneno:"",
    residientialaddress:"",
  })
  const steps = [
    { id: "name" },
    { id: "address" },
    { id: "contact" },
    
  ];
    const [formData, setForm] = useForm(defaultData);
    const { step, navigation } = useStep({
      steps,
      initialStep: 0,
    });
    
    if(formData.packages==="Free"){
      formData.paymentstatus="true"
    }
    
    const navigate = useNavigate();

  console.log(formData);

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {

    if (isAuthenticated) {
      navigate("/main");
    }
    
  }, [navigate, isAuthenticated, loading, ]);
    const props = { formData, setForm, navigation };
    switch (step.id) {
      case "name":
        return <Names {...props} />;
        case "address":
          return <Email {...props} />;
        
    }
  
    return (
      <></>
    );
};

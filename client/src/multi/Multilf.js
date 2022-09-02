/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useForm, useStep } from "react-hooks-helper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearErrors } from "../actions/userAction";
import { Email } from "./Stepform/Email";
import { Names } from "./Stepform/Names";
import { Password } from "./Stepform/Password";

export const Multilf = () => {
  const [defaultData, setDefaultData] = useState({
    username : "",
    email: "",
    dob: "",
    password: "",
    gender: "",
    packages: "",
    Name_of_card: "",
    card_no: "",
    Expiry: "",
    cvc: "",
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
  
    
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {

    if (isAuthenticated) {
      alert.success("Signup Successfull");
      navigate("/");
    }
  }, [navigate, isAuthenticated, loading, error, formData,alert, dispatch]);
    const props = { formData, setForm, navigation };
    
    switch (step.id) {
      case "name":
        return <Names {...props} />;
        case "address":
          return <Email {...props} />;
        case "contact":
          return <Password {...props} />;
    }
  
    return (
      <></>
    );
};

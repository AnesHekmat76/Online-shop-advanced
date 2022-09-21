import { TextField } from "@mui/material";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import "./AuthenticationForm.css";
import axios from "axios";
import { useEffect } from "react";

const AuthenticationForm = ({ hideAuthForm }) => {
  const [isAuthInputInvalid, setIsAuthInputInvalid] = useState(false);
  const [authInputValue, setAuthInputValue] = useState("");
  // const [responseMessage, setResponseMessage] = useState("");
  const [authInputErrorMessage, setAuthInputErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      hideAuthForm();
    };
  }, []);

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (authInputValue.length < 6) {
      setIsAuthInputInvalid(true);
      setAuthInputErrorMessage("Authentication code must be 6 digit");
      return;
    }
    const signUp = async () => {
      setIsLoading(true);
      let response;
      try {
        response = await axios.get(
          `http://localhost:8080/user/verifying?verifyingCode=${authInputValue}`
        );
        setIsLoading(false);
        if (response.status < 400) {
          hideAuthForm();
          navigate("../signIn");
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsAuthInputInvalid(true);
        if (error.response.status === 401) {
          setAuthInputErrorMessage("Entered code is not valid");
        }
        if (error.response.status === 400) {
          setAuthInputErrorMessage("Bad request");
        }
        if (error.response.status === 0) {
          setAuthInputErrorMessage("Network error");
        }
      }
    };
    signUp();
  };

  const onAuthInputChange = (e) => {
    if (e.target.value.length > 6) {
      return;
    }
    setIsAuthInputInvalid(false);
    setAuthInputValue(e.target.value);
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="px-1 sm:p-8 py-6 sm:border sm:border-gray-300 rounded-lg sm:shadow-sm"
    >
      <h2 className="text-2xl text-gray-600 text-center">Authentication</h2>
      <p className="text-gray-700 mt-8">
        Please enter the 6-digit code sent to your email
      </p>
      <div className="flex flex-col mt-6 lg:mt-8">
        <div>
          <TextField
            type="number"
            error={isAuthInputInvalid}
            className="w-full auth-input"
            variant="outlined"
            label="Authentication"
            helperText={isAuthInputInvalid ? authInputErrorMessage : " "}
            value={authInputValue}
            onChange={onAuthInputChange}
          />
        </div>
        <div className="mt-2 lg:mt-3">
          <LoadingButton
            loading={isLoading}
            className="w-full h-11"
            variant="contained"
            type="submit"
          >
            Confirm
          </LoadingButton>
        </div>
      </div>
    </form>
  );
};
export default AuthenticationForm;

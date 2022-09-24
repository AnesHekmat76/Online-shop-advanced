import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASED_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth-slice";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userNameValue, setUserNameValue] = useState("");
  const [isUserNameInvalid, setIsUserNameInvalid] = useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit = (event) => {
    event.preventDefault();
    setResponseMessage("");
    setUserNameErrorMessage("");
    setIsUserNameInvalid(false);
    setPasswordErrorMessage("");
    setIsPasswordInvalid(false);
    if (
      userNameValue.trim().length === 0 ||
      passwordValue.trim().length === 0
    ) {
      if (userNameValue.trim().length === 0) {
        setUserNameErrorMessage("Can not be empty");
        setIsUserNameInvalid(true);
      }
      if (passwordValue.trim().length === 0) {
        setIsPasswordInvalid(true);
        setPasswordErrorMessage("Can not be empty");
      }
      return;
    }

    const signIn = async () => {
      setIsLoading(true);
      try {
        const response = await axios(
          `http://localhost:8080/signing?username=${userNameValue}&password=${passwordValue}`,
          {
            method: "POST",
          }
        );
        setIsLoading(false);
        setIsUserNameInvalid(false);
        setIsPasswordInvalid(false);
        setResponseMessage("");
        dispatch(authAction.loginHandler(response.data));
        navigate("../products");
      } catch (err) {
        setIsLoading(false);
        setUserNameErrorMessage("Incorrect username");
        setPasswordErrorMessage("Incorrect password");
        setIsUserNameInvalid(true);
        setIsPasswordInvalid(true);
        if (err.response.status === 403 || err.response.status === 404) {
          setResponseMessage("Username or password is incorrect");
          return;
        }
        setResponseMessage("Something went wrong");
      }
    };
    signIn();
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="px-1 sm:p-8 py-6 sm:border sm:border-gray-300 rounded-lg sm:shadow-sm"
    >
      <h2 className="text-2xl text-gray-600 text-center">Sign-in</h2>
      <div className="flex flex-col mt-6 lg:mt-8">
        <div>
          <TextField
            error={isUserNameInvalid}
            className="w-full"
            label="UserName"
            variant="outlined"
            helperText={isUserNameInvalid ? userNameErrorMessage : " "}
            value={userNameValue}
            onChange={(e) => {
              setIsUserNameInvalid(false);
              setUserNameValue(e.target.value);
            }}
          />
        </div>
        <div className="mt-4">
          <TextField
            error={isPasswordInvalid}
            className="w-full"
            label="Password"
            variant="outlined"
            type="password"
            helperText={isPasswordInvalid ? passwordErrorMessage : " "}
            value={passwordValue}
            onChange={(e) => {
              setIsPasswordInvalid(false);
              setPasswordValue(e.target.value);
            }}
          />
        </div>
        <Link className="text-purple-800 underline mt-4" to="/passwordRecovery">
          Forgot password?
        </Link>
        <div className="flex mt-2">
          <p className="mr-3 text-gray-700">Don't have an account?</p>
          <Link className="text-purple-800 underline" to="/signUp">
            Create account
          </Link>
        </div>
        <div className="mt-2 lg:mt-3">
          <LoadingButton
            loading={isLoading}
            className="w-full h-11"
            variant="contained"
            type="submit"
          >
            Sing in
          </LoadingButton>
        </div>
        <p className="text-error-red mt-4">{responseMessage}</p>
      </div>
    </form>
  );
};
export default SignInForm;

import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASED_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth-slice";
import LoadingButton from "@mui/lab/LoadingButton";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstNameValue, setFirstNameValue] = useState("");
  const [isUserNameInvalid, setIsUserNameInvalid] = useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (
      firstNameValue.trim().length === 0 ||
      passwordValue.trim().length === 0
    ) {
      if (firstNameValue.trim().length === 0) {
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
        const response = await fetch(
          `http://${BASED_URL}/user/signing?username=${firstNameValue}&password=${passwordValue}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsLoading(false);
        if (response.status > 399) {
          setUserNameErrorMessage("Incorrect username");
          setPasswordErrorMessage("Incorrect password");
          setIsUserNameInvalid(true);
          setIsPasswordInvalid(true);
          throw new Error("Username or password is incorrect");
        }

        const data = await response.text();
        dispatch(authAction.loginHandler(data));
        setIsUserNameInvalid(false);
        setIsPasswordInvalid(false);
        setResponseMessage("");
        navigate("../products");
      } catch (err) {
        setIsLoading(false);
        setResponseMessage(err.message);
      }
    };
    signIn();
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="px-1 sm:p-6 py-6 lg:pb-4 sm:border sm:border-gray-300 rounded-lg sm:shadow-sm"
    >
      <h2 className="text-2xl text-gray-600 text-center">Sign-Up</h2>
      <div className="flex flex-col mt-6 lg:mt-8">
        <div className="flex">
          <div className="mr-2 w-1/2">
            <TextField
              error={isUserNameInvalid}
              className="w-full"
              label="First Name"
              variant="outlined"
              helperText={isUserNameInvalid ? userNameErrorMessage : " "}
              value={firstNameValue}
              onChange={(e) => {
                setIsUserNameInvalid(false);
                setFirstNameValue(e.target.value);
              }}
            />
          </div>
          <div className="ml-2 w-1/2">
            <TextField
              error={isPasswordInvalid}
              className="w-full"
              label="Last Name"
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
        </div>
        <div className="mt-2">
          <TextField
            error={isPasswordInvalid}
            className="w-full"
            label="Email"
            variant="outlined"
            type="email"
            helperText={isPasswordInvalid ? passwordErrorMessage : " "}
            value={passwordValue}
            onChange={(e) => {
              setIsPasswordInvalid(false);
              setPasswordValue(e.target.value);
            }}
          />
        </div>
        <div className="mt-2">
          <TextField
            error={isPasswordInvalid}
            className="w-full"
            label="User Name"
            variant="outlined"
            type="text"
            helperText={isPasswordInvalid ? passwordErrorMessage : " "}
            value={passwordValue}
            onChange={(e) => {
              setIsPasswordInvalid(false);
              setPasswordValue(e.target.value);
            }}
          />
        </div>
        <div className="flex mt-2">
          <div className="mr-2 w-1/2">
            <TextField
              error={isUserNameInvalid}
              className="w-full"
              label="Password"
              variant="outlined"
              helperText={isUserNameInvalid ? userNameErrorMessage : " "}
              value={firstNameValue}
              onChange={(e) => {
                setIsUserNameInvalid(false);
                setFirstNameValue(e.target.value);
              }}
            />
          </div>
          <div className="ml-2 w-1/2">
            <TextField
              error={isPasswordInvalid}
              className="w-full"
              label="Confirm Password"
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
        </div>
        <div className="flex mt-2">
          <div className="mr-2 w-1/2">
            <TextField
              error={isUserNameInvalid}
              className="w-full"
              label="City"
              variant="outlined"
              type="text"
              helperText={isUserNameInvalid ? userNameErrorMessage : " "}
              value={firstNameValue}
              onChange={(e) => {
                setIsUserNameInvalid(false);
                setFirstNameValue(e.target.value);
              }}
            />
          </div>
          <div className="ml-2 w-1/2">
            <TextField
              error={isPasswordInvalid}
              className="w-full"
              label="Age"
              variant="outlined"
              type="text"
              helperText={isPasswordInvalid ? passwordErrorMessage : " "}
              value={passwordValue}
              onChange={(e) => {
                setIsPasswordInvalid(false);
                setPasswordValue(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="mt-2">
          <TextField
            error={isPasswordInvalid}
            helperText={isPasswordInvalid ? passwordErrorMessage : " "}
            className="w-full"
            id="outlined-multiline-flexible"
            label="Address"
            multiline
            maxRows={4}
            //   value={}
            //   onChange={}
          />
        </div>
        <div className="flex mt-2">
          <p className="mr-3 text-gray-700">Already have an account?</p>
          <Link className="text-purple-800 underline" to="/signIn">
            Sign in
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
        <p className="text-error-red mt-4">
          {responseMessage}
          &nbsp;
        </p>
      </div>
    </form>
  );
};
export default SignUpForm;

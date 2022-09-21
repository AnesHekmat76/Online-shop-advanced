import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASED_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth-slice";
import LoadingButton from "@mui/lab/LoadingButton";
import ErrorIcon from "@mui/icons-material/Error";
import axios from "axios";

const SignUpForm = ({ displayAuthForm }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [userNameValue, setUserNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [ageValue, setAgeValue] = useState("");
  const [addressValue, setAddressValue] = useState("");

  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [confirmPassWordError, setConfirmPassWordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [userNameDuplicateError, setUserNameDuplicateError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onFormSubmit = (event) => {
    event.preventDefault();
    //Hide all errors before sending request:
    setEmptyFieldsError(false);
    setConfirmPassWordError(false);
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setUserNameError(false);
    setPasswordError(false);
    setUserNameDuplicateError(false);
    if (
      firstNameValue.trim().length === 0 ||
      lastNameValue.trim().length === 0 ||
      emailValue.trim().length === 0 ||
      userNameValue.trim().length === 0 ||
      passwordValue.trim().length === 0 ||
      confirmPasswordValue.trim().length === 0 ||
      cityValue.trim().length === 0 ||
      ageValue.trim().length === 0 ||
      addressValue.trim().length === 0
    ) {
      setEmptyFieldsError(true);
      return;
    }
    if (passwordValue !== confirmPasswordValue) {
      setConfirmPassWordError(true);
      return;
    }

    const signUp = async () => {
      setIsLoading(true);
      let response;
      try {
        response = await axios("http://localhost:8080/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            username: userNameValue,
            password: passwordValue,
            firstname: firstNameValue,
            lastname: lastNameValue,
            email: emailValue,
            city: cityValue,
            address: addressValue,
            age: ageValue,
          }),
        });
        setIsLoading(false);
        setResponseMessage("");
        if (response.status < 400) {
          displayAuthForm();
        }
      } catch (err) {
        const responseErrorMessage = err.response.data;
        console.log(responseErrorMessage);
        if (responseErrorMessage.includes("Firstname")) setFirstNameError(true);
        if (responseErrorMessage.includes("Lastname")) setLastNameError(true);
        if (responseErrorMessage.includes("email")) setEmailError(true);
        if (responseErrorMessage.includes("Username")) setUserNameError(true);
        if (responseErrorMessage.includes("Password")) setPasswordError(true);
        if (
          responseErrorMessage.includes("duplicate") &&
          responseErrorMessage.includes("username")
        ) {
          setUserNameDuplicateError(true);
        }

        setIsLoading(false);
      }
    };
    signUp();
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className="px-1 sm:p-6 py-6 sm:border sm:border-gray-300 rounded-lg sm:shadow-sm"
    >
      <h2 className="text-2xl text-gray-600 text-center">Sign-Up</h2>
      <div className="flex flex-col mt-6 lg:mt-8">
        <div className="flex">
          <div className="mr-2 w-1/2">
            <TextField
              error={firstNameError}
              className="w-full"
              label="First Name"
              variant="outlined"
              value={firstNameValue}
              onChange={(e) => {
                setFirstNameValue(e.target.value);
              }}
            />
          </div>
          <div className="ml-2 w-1/2">
            <TextField
              error={lastNameError}
              className="w-full"
              label="Last Name"
              variant="outlined"
              type="text"
              value={lastNameValue}
              onChange={(e) => {
                setLastNameValue(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="mt-4">
          <TextField
            error={emailError}
            className="w-full"
            label="Email"
            variant="outlined"
            type="email"
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
            }}
          />
        </div>
        <div className="mt-4">
          <TextField
            error={userNameError}
            className="w-full"
            label="User Name"
            variant="outlined"
            type="text"
            value={userNameValue}
            onChange={(e) => {
              setUserNameValue(e.target.value);
            }}
          />
        </div>
        <div className="flex mt-4">
          <div className="mr-2 w-1/2">
            <TextField
              error={passwordError}
              className="w-full"
              label="Password"
              variant="outlined"
              type="password"
              value={passwordValue}
              onChange={(e) => {
                setPasswordValue(e.target.value);
              }}
            />
          </div>
          <div className="ml-2 w-1/2">
            <TextField
              error={confirmPassWordError}
              className="w-full"
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPasswordValue}
              onChange={(e) => {
                setConfirmPasswordValue(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex mt-4">
          <div className="mr-2 w-1/2">
            <TextField
              className="w-full"
              label="City"
              variant="outlined"
              type="text"
              value={cityValue}
              onChange={(e) => {
                setCityValue(e.target.value);
              }}
            />
          </div>
          <div className="ml-2 w-1/2">
            <TextField
              className="w-full"
              label="Age"
              variant="outlined"
              type="number"
              value={ageValue}
              onChange={(e) => {
                setAgeValue(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="mt-4">
          <TextField
            className="w-full"
            id="outlined-multiline-flexible"
            label="Address"
            multiline
            maxRows={4}
            value={addressValue}
            onChange={(e) => {
              setAddressValue(e.target.value);
            }}
          />
        </div>
        <div className="flex mt-2">
          <p className="mr-3 text-gray-700">Already have an account?</p>
          <Link className="text-purple-800 underline" to="/signIn">
            Sign in
          </Link>
        </div>
        <div className="mt-4">
          {emptyFieldsError && (
            <p className="text-red-700 text-sm mt-2.5">
              <ErrorIcon className="mb-1 mr-2" fontSize="small" />
              All the Above Fields Required And Can't Be Empty!
            </p>
          )}
          {confirmPassWordError && (
            <p className="text-red-700 text-sm mt-2.5">
              <ErrorIcon className="mb-1 mr-2" fontSize="small" />
              The password confirmation does not match
            </p>
          )}
          {firstNameError && (
            <p className="text-red-700 text-sm mt-2.5">
              <ErrorIcon className="mb-1 mr-2" fontSize="small" />
              First name length should be between 3,10 without number or special
              character
            </p>
          )}
          {lastNameError && (
            <p className="text-red-700 text-sm mt-2.5">
              <ErrorIcon className="mb-1 mr-2" fontSize="small" />
              Lastname length should be between 3,10 without number or special
              character
            </p>
          )}
          {emailError && (
            <p className="text-red-700 text-sm mt-2.5">
              <ErrorIcon className="mb-1 mr-2" fontSize="small" />
              This email has already been registered
            </p>
          )}
          {userNameError && (
            <p className="text-red-700 text-sm mt-2.5">
              <ErrorIcon className="mb-1 mr-2" fontSize="small" />
              Username length should be between 3,10 without number or special
              character
            </p>
          )}
          {userNameDuplicateError && (
            <p className="text-red-700 text-sm mt-2.5">
              <ErrorIcon className="mb-1 mr-2" fontSize="small" />
              This username has already been registered
            </p>
          )}
          {passwordError && (
            <p className="text-red-700 text-sm mt-2.5">
              <ErrorIcon className="mb-1 mr-2" fontSize="small" />
              Password should be at least 8 character and contains at least one
              capital letter and one special character
            </p>
          )}
        </div>
        <div className="mt-4 lg:mt-3">
          <LoadingButton
            loading={isLoading}
            className="w-full h-11"
            variant="contained"
            type="submit"
          >
            Sing up
          </LoadingButton>
        </div>
      </div>
    </form>
  );
};
export default SignUpForm;

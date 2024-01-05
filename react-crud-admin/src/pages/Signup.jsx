import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const initialState = {
  formData: {},
  error: false,
  errorMessage: "",
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.id]: action.payload.value,
        },
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, errorMessage: action.errorMessage };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

function useForm(initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;

    if (id === "username") {
      const specialChars = /[ !@#$%^&*(),.?":{}|<>]/;
      if (specialChars.test(value) || value.length < 4) {
        // display an error message
        dispatch({ type: "SET_ERROR", payload: true, errorMessage: "Invalid username" });
        return;
      }
      if (state.error) {
        dispatch({ type: "SET_ERROR", payload: false });
      }
    }
    if (id === "password") {
      if (value.length < 8) {
        // display an error message
        dispatch({ type: "SET_ERROR", payload: true, errorMessage: "Password should be at least 8 characters long" });
        return;
      }
      if (state.error) {
        dispatch({ type: "SET_ERROR", payload: false });
      }
    }
    dispatch({
      type: "SET_FORM_DATA",
      payload: { id: e.target.id, value: e.target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.formData),
      });
      const data = await res.json();
      dispatch({ type: "SET_LOADING", payload: false });
      if (data.success === false) {
        dispatch({ type: "SET_ERROR", payload: true, errorMessage: "Something went wrong. try again!" });
        return;
      }
      // toast.success('Account registered successfully!', {
      //   position: toast.POSITION.TOP_RIGHT,
      //   autoClose: 3000,
      // });
      navigate('/signin')
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      throw error;
    }
  };

  return {
    formData: state.formData,
    error: state.error,
    errorMessage: state.errorMessage,
    loading: state.loading,
    handleChange,
    handleSubmit,
  };
}

export default function Signup() {
  const { formData, error, errorMessage, loading, handleChange, handleSubmit } = useForm({});

  return (
    <>
      <h1 className="flex justify-center text-3xl mt-10 font-bold">Sign Up</h1>
      <div className="flex justify-center mt-5">
        <form
          className="w-full flex max-w-md flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div>
            {error && (
              <div
                className="mt-2 rounded-lg bg-red-100 py-4 px-6 text-base text-red-700"
                role="alert"
              >
                {errorMessage}
              </div>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="Your username"
              onChange={handleChange}
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="Your Email"
              onChange={handleChange}
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="Your password"
              onChange={handleChange}
              required
              shadow
            />
          </div>
          {/* <div className="flex items-center gap-2">
          <Checkbox id="agree" />
          <Label htmlFor="agree" className="flex">
            I agree with the&nbsp;
            <Link to="/" className="text-cyan-600 hover:underline dark:text-cyan-500">
              terms and conditions
            </Link>
          </Label>
        </div> */}
          <button
            className="border py-2 rounded-lg font-semibold border-gray-500 transition ease-in-out text-gray-800 hover:bg-gray-800 hover:text-white hover:border-gray-800 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading ? true : false}
          >
            {loading ? (
              <div
                className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            ) : (
              <span>Sign Up</span>
            )}
          </button>
          <OAuth />
        </form>
      </div>
      <div className="flex justify-center p-3">
        <p className="text-sm">Already have an account?&nbsp;&nbsp;</p>
        <Link to="/signin" className="text-sm hover:underline text-indigo-900">
          Sign in
        </Link>
      </div>
    </>
  );
}

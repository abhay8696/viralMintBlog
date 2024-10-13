import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//backend function
import { loginRequest } from "../../functions/backendFunctions";
import { saveToLocal } from "../../functions/helperFunctions";

const Login = () => {
    //states
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    //router
    const navigate = useNavigate();

    //functions
    const handleChange = (event) => {
        const { value, name } = event.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        serverRequest();
    };

    const serverRequest = async () => {
        try {
            const loginData = await loginRequest(data.email, data.password);
            if (loginData.status === 200) {
                //save user data to localstorage
                saveToLocal("token", loginData?.data?.tokens?.access?.token);
                saveToLocal("user", loginData?.data?.user);

                alert("Login Successfull!");
                navigate("/");
            }
        } catch (err) {
            console.log(err);
            if (
                err.message === "Incorrect contact or password" ||
                err.message === "User Not Found."
            ) {
                alert("Incorrect contact or password");
            } else alert("Internal server error, please try again later");
        }
    };

    return (
        <div className="Login flex flex-col items-center justify-center gap-4 h-[100vh]">
            <h2 className="text-3xl">Login</h2>
            <form
                onSubmit={handleSubmit}
                className=" flex flex-col p-4 gap-4 w-[500px]  max-w-[95vw]"
            >
                <span className="flex flex-col items-start gap-1">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        placeholder="Email"
                        onChange={handleChange}
                        className="p-2 w-[100%]"
                        required
                    />
                </span>
                <span className="flex flex-col items-start gap-1">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        value={data.password}
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="p-2 w-[100%]"
                        required
                    />
                </span>
                <button>submit</button>
            </form>
        </div>
    );
};

export default Login;

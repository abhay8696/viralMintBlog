import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//styles
import "./Register.css";
import { registerUserRequest } from "../../functions/backendFunctions";

const Register = () => {
    //states
    const [data, setData] = useState({
        name: "",
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
        serverRequest(data);
    };

    const serverRequest = async () => {
        try {
            const registerData = await registerUserRequest(data);
            if (registerData.status === 201) {
                alert("Registration Successfull!");
                navigate("/login");
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="Register flex flex-col gap-4">
            <h2 className="text-3xl">Register</h2>
            <form
                onSubmit={handleSubmit}
                className=" flex flex-col p-4 gap-4 w-[500px]"
            >
                <span className="flex flex-col items-start gap-1">
                    <label htmlFor="name">Name</label>
                    <input
                        required
                        id="name"
                        name="name"
                        value={data.name}
                        placeholder="Name"
                        onChange={handleChange}
                        className="p-2 w-[100%]"
                    />
                </span>
                <span className="flex flex-col items-start gap-1">
                    <label htmlFor="email">Email</label>
                    <input
                        required
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        placeholder="Email"
                        onChange={handleChange}
                        className="p-2 w-[100%]"
                    />
                </span>
                <span className="flex flex-col items-start gap-1">
                    <label htmlFor="password">Password</label>
                    <input
                        required
                        id="password"
                        name="password"
                        value={data.password}
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="p-2 w-[100%]"
                    />
                </span>
                <button>submit</button>
            </form>
        </div>
    );
};

export default Register;

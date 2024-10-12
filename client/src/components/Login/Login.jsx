import React, { useState } from "react";

const Login = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    //functions
    const handleChange = (event) => {
        const { value, name } = event.target;
        setData({ ...data, [name]: value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(data);
    };

    return (
        <div className="Login flex flex-col gap-4">
            <h2 className="text-3xl">Login</h2>
            <form
                onSubmit={handleSubmit}
                className=" flex flex-col p-4 gap-4 w-[500px]"
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

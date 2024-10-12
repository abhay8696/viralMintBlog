import axios from "axios";
//variables
const serverUrl = import.meta.env; // development/production backend url

//function for login
export const loginRequest = async (email, password) => {
    const endPoint = `${serverUrl.VITE_REACT_APP_serverURL}/auth/login`;

    try {
        const res = await axios.post(endPoint, { email, password });
        return res;
    } catch (err) {
        throw new Error(
            err?.response?.data?.message || "Internal Server Error"
        );
    }
};

//function to register new user
export const registerUserRequest = async (data) => {
    const endPoint = `${serverUrl.VITE_REACT_APP_serverURL}/auth/register`;

    try {
        const res = await axios.post(endPoint, data);
        return res;
    } catch (err) {
        // console.log(err);
        throw new Error(
            err?.response?.data?.message || "Internal Server Error"
        );
    }
};

export const fetchLocationBlogs = async (token) => {
    const endPoint = `${serverUrl.VITE_REACT_APP_serverURL}/blog/location`;

    try {
        const res = await axios.get(endPoint, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        });
        return res;
    } catch (err) {
        throw new Error(
            err?.response?.data?.message || "Internal Server Error"
        );
    }
};

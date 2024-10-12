import axios from "axios";
//variables
const serverUrl = import.meta.env; // development/production backend url

export const loginRequest = async (email, password) => {
    const loginEndpoint = `${serverUrl.VITE_REACT_APP_serverURL}/auth/login`;

    try {
        const res = await axios.post(loginEndpoint, { email, password });
        return res;
    } catch (err) {
        throw new Error(
            err?.response?.data?.message || "Internal Server Error"
        );
    }
};

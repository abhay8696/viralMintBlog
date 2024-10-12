import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLocationBlogs } from "../../functions/backendFunctions";
import BlogComp from "../BlogComp/BlogComp";

const Home = () => {
    const [blogsList, setBlogsList] = useState([]);
    //router
    const navigate = useNavigate();

    useEffect(() => {
        //redirect to login page if user is not logged in
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");

        getBlogs();
    }, []);

    //functions
    const getBlogs = async () => {
        //get location based blogs
        const blogsRequest = await fetchLocationBlogs(
            localStorage.getItem("token")
        );
        setBlogsList(blogsRequest.data);
    };

    //display all blogs in div
    const displayBlogs = () => {
        if (!blogsList.length) return <h2>{"No BLogs Found :("}</h2>;
        return blogsList.map((blog) => <BlogComp blogData={blog} />);
    };

    return (
        <div className="flex flex-col items-start gap-8">
            <h1>The Blog App</h1>
            <div className="flex flex-col gap-8">{displayBlogs()}</div>
        </div>
    );
};

export default Home;

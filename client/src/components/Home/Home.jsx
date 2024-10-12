import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        if (blogsRequest.data) {
            setBlogsList([...blogsRequest.data]);
        }
    };

    //display all blogs in div
    const displayBlogs = () => {
        if (!blogsList.length) return <h2>{"No BLogs Found :("}</h2>;
        if (blogsList && blogsList.length)
            return blogsList?.map((blog) => <BlogComp blogData={blog} />);
    };

    return (
        <div className="flex flex-col items-start gap-8">
            <h1>The Blog App</h1>
            {/* <div className="flex flex-col gap-8">{displayBlogs()}</div> */}
            <Link to="/editor">
                <div className="text-white font-extrabold fixed bottom-[1rem] right-[1rem] cursor-pointer w-[100px] h-[100px] bg-red-500 flex items-center justify-center rounded-[50%]">
                    New Blog
                </div>
            </Link>
        </div>
    );
};

export default Home;

// Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque cum possimus ipsa in placeat debitis? Voluptates quidem vel, maiores nobis ullam totam. Consequuntur consectetur quaerat, velit error neque ea eaque nemo accusantium impedit repellat quam eius quidem aut tempora exercitationem non nobis officiis alias reiciendis odit delectus. Dignissimos praesentium perferendis natus molestiae reprehenderit necessitatibus iste rem delectus, sunt, minus ratione! Laudantium, doloremque odit. Ut repellat ducimus laboriosam, dolorum nam asperiores tempore in tempora eaque ex nulla vitae libero exercitationem placeat facere amet quod magnam inventore autem quaerat tenetur optio incidunt? Natus consequatur deserunt consequuntur neque quibusdam veritatis iure ipsum nulla?

import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header"; // Title
import Paragraph from "@editorjs/paragraph"; // Paragraph
// import ImageTool from "@editorjs/image"; // Image
import ImageTool from "@editorjs/simple-image"; // Image
import { createNewBlogRequest } from "../../functions/backendFunctions";

const tools = {
    title: {
        class: Header,
        inlineToolbar: ["link"],
        config: {
            placeholder: "Enter the title...",
            levels: [1], // Force title to use <h1> only
            defaultLevel: 1,
        },
    },
    image: {
        class: ImageTool,
    },
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        config: {
            placeholder: "Write a short introduction...",
        },
    },
};

const BlogEditor = () => {
    //router
    const navigate = useNavigate();

    const ejInstance = useRef();

    const initEditor = () => {
        const editor = new EditorJS({
            holder: "editorjs",
            onReady: () => {
                ejInstance.current = editor;
            },
            autofocus: true,
            onChange: async () => {
                let content = await editor.save();
                console.log(content);
            },
            tools: tools,
            placeholder: "Start writing...",
        });
        ejInstance.current = editor;
    };

    useEffect(() => {
        //redirect to login page if user is not logged in
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");

        //launch editorjs
        if (ejInstance.current === null) {
            initEditor();
            ejInstance.current = true;
        }

        return () => {
            ejInstance?.current?.destroy();
            ejInstance.current = null;
        };
    }, []);

    const handleSubmit = async () => {
        if (!ejInstance.current) return; // Ensure the editor instance exists
        try {
            const outputData = await ejInstance.current.save();
            const res = await createNewBlogRequest(
                { editorJs: outputData },
                JSON.parse(localStorage.getItem("token"))
            );
            console.log("Submitted Data:", res); // Handle submitted data

            if (res.status === 201 || res.status === 200) {
                alert("Blog posted succesfully!");
                navigate("/");
            }
        } catch (error) {
            console.error("Saving failed:", error);
        }
    };

    return (
        <div className="w-[100vw] flex flex-col items-center gap-4 mt-4">
            <h1>New Post</h1>
            <div id="editorjs" className="bg-white text-black w-[75%]"></div>
            <button id="submit-btn" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum nam nisi repellendus id deserunt facere facilis ut beatae dolorem ipsum. Ipsum voluptate suscipit consequuntur iusto doloribus qui corrupti deserunt atque ducimus aliquam assumenda minus officiis repellendus cum cumque sit, fuga nisi obcaecati dolorum nostrum illo itaque voluptates consequatur? Vitae, minima quis nisi repudiandae perferendis in repellendus pariatur. Cupiditate quia cumque autem provident. Dignissimos ab debitis consequuntur facilis porro ad praesentium aliquid ex, quo et magni! Eum quasi iste recusandae rem perferendis et dolor, porro maxime, vel sint similique soluta harum delectus sed repellendus quibusdam, eos aperiam doloribus. Perferendis, asperiores quasi?

export default BlogEditor;

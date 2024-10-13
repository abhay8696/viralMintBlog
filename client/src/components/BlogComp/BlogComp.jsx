import React, { useEffect, useState } from "react";

const BlogComp = (props) => {
    const { blogData } = props;
    const [content, setContent] = useState([]);

    useEffect(() => {
        setItems();
    }, []);

    const setItems = () => {
        const elements = blogData.editorJs.blocks.map((item, index) => {
            if (item.type === "title") {
                return <h1 key={index}>{item.data.text}</h1>;
            } else if (item.type === "paragraph") {
                return <p key={index}>{item.data.text}</p>;
            }
            return null; // Handle other block types if needed
        });

        setContent(elements); // Update the content state with generated elements
    };

    return (
        <div className="flex flex-col items-start gap-2" id="blogComp">
            {content}
        </div>
    );
};

export default BlogComp;

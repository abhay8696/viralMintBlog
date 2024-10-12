import React from "react";

const BlogComp = (props) => {
    const { blogData } = props;
    console.log(blogData);
    return (
        <div className="flex flex-col items-start gap-2">
            <h2 className="text-4xl">{blogData.title}</h2>
            <div>
                Creator:{" "}
                <span className="font-bold">{blogData.creatorName}</span>
            </div>
            <img
                src={"https://picsum.photos/seed/picsum/500/350"}
                alt="blog image"
            />
            <div className="flex gap-2 font-light">
                {blogData.tags.map((tag) => (
                    <span>#{tag}</span>
                ))}
            </div>
            <p>{blogData.text}</p>
        </div>
    );
};

export default BlogComp;

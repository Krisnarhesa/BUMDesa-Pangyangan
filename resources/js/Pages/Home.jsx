import React from "react";

export default function Home({ title, description }) {
    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
}

"use client";

import { useState } from "react";
import { createExample } from "@/database/example";

export default function HomePage() {
    const [value, setValue] = useState("");
    async function example() {
        createExample(value);
        // console.log(value);
    }

    return (
        <>
            <h1>Home</h1>
            <form
                onSubmit={() => {
                    example();
                }}
            >
                <label htmlFor="input">Input</label>
                <input type="text" name="input" id="input" value={value} onChange={(e) => setValue(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

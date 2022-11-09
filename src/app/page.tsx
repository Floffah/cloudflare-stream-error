"use client";

import { Stream } from "@cloudflare/stream-react";
import { useState } from "react";

export default function RootPage() {
    const [videoId, setVideoId] = useState("ee8ba1607a7e641d232afa95fad4a631");

    const runRerenderTest = () => {
        setVideoId("ee8ba1607a7e641d232afa95fad4a631");

        let loops = 0;
        const interval = setInterval(() => {
            // these numbers are excessively high but its to simulate the stress of loading a massive app where actually its max 5 rerenders
            if (loops > 25) {
                try {
                    clearInterval(interval);
                } catch (e) {
                    console.error(e);
                }
            } else if (loops > 10) {
                setVideoId("9d3e0ffc62a759d7a07f6dfca5e1c78f");
            } else {
                setVideoId("ee8ba1607a7e641d232afa95fad4a631");
            }

            loops++;
        }, 10);
    };

    const runNormalTest = () => {
        setVideoId("9d3e0ffc62a759d7a07f6dfca5e1c78f");
    };

    return (
        <>
            <div className="inset-0 w-full h-full fixed">
                <Stream src={videoId} autoplay loop muted />
            </div>

            <div className="top-0 left-0 fixed bg-white p-2">
                <button
                    className="px-4 py-1 bg-gray-200 rounded block"
                    onClick={runRerenderTest}
                >
                    Run multiple rerenders
                </button>
                <p>
                    Set your network throttling to Fast 3G and it&apos;ll happen
                    every time
                </p>
                <button
                    className="px-4 py-1 bg-gray-200 rounded block mt-1"
                    onClick={runNormalTest}
                >
                    Run single rerender
                </button>
                <p>
                    After running multiple rerenders check network tab and
                    you&apos;ll see 302 redirect or cancelled requests
                </p>
            </div>
        </>
    );
}

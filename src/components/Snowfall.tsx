"use client";

import Snowfall from "react-snowfall";

const SnowfallEffect = () => {
    return (
        <div
            className="fixed inset-0 pointer-events-none z-50"
            style={{ overflow: "hidden" }}
        >
            <Snowfall
                color="#dce7efff"
                snowflakeCount={200}
                radius={[1, 2]}
                speed={[0.5, 2.5]}
                wind={[-0.5, 1.5]}
                style={{
                    position: "fixed",
                    width: "100vw",
                    height: "100vh",
                    zIndex: 9999,
                    filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.4))",
                }}
            />
        </div>
    );
};

export default SnowfallEffect;

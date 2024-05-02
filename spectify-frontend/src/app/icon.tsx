import { ImageResponse } from "next/og";

export const size = {
    width: 32,
    height: 32,
};
export const contentType = "image/png";

const Icon = () => (
    <div
        style={{
            fontSize: 24,
            background: "",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
        }}
    >
        A
    </div>
);

export default Icon;
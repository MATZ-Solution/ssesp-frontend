import React from 'react'
import { useState } from "react";
import { ArrowLeft, ChevronLeft, MoveLeft } from "lucide-react";

function BackButton({ onClick }) {
    const [hovered, setHovered] = useState(false);
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase relative pb-1"
            style={{
                background: "none",
                border: "none",
                color: "#0f172a",
                cursor: "pointer",
                letterSpacing: "0.1em",
            }}
        >
            <ArrowLeft
                size={15}
                style={{
                    transform: hovered ? "translateX(-4px)" : "translateX(0)",
                    transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1)",
                }}
            />
            Back To Applications
            <span
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "1.5px",
                    width: hovered ? "100%" : "0%",
                    background: "#0f172a",
                    transition: "width 0.3s ease",
                }}
            />
        </button>
    )
}

export default BackButton 
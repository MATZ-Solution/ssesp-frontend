import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.glowContainer}>
          <h1 style={styles.heading}>404</h1>
          <div style={styles.glow}></div>
        </div>
        
        <h2 style={styles.subHeading}>Page Not Found</h2>
        <p style={styles.text}>
          The page you're looking for seems to have wandered off into the digital void.
        </p>
        
        <button 
          style={styles.button} 
          onClick={() => navigate("/")}
          onMouseEnter={(e) => {
            // e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
            e.target.style.transform = styles.buttonHover.transform;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = styles.button.backgroundColor;
            e.target.style.transform = styles.button.transform;
          }}
        >
          <span style={styles.buttonIcon}>←</span>
          Return Home
        </button>
      </div>
      
      <div style={styles.decorativeCircle1}></div>
      <div style={styles.decorativeCircle2}></div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0a1f1a 0%, #1a3a2e 50%, #0f2820 100%)",
    textAlign: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },
  content: {
    position: "relative",
    zIndex: 2,
  },
  glowContainer: {
    position: "relative",
    display: "inline-block",
    marginBottom: "30px",
  },
  heading: {
    fontSize: "clamp(5rem, 15vw, 10rem)",
    fontWeight: "800",
    background: "linear-gradient(135deg, #2ecc71 0%, #27ae60 50%, #1e8449 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    margin: "0",
    letterSpacing: "0.05em",
    textShadow: "0 0 80px rgba(46, 204, 113, 0.5)",
  },
  glow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "150%",
    height: "150%",
    background: "radial-gradient(circle, rgba(46, 204, 113, 0.2) 0%, transparent 70%)",
    filter: "blur(40px)",
    zIndex: -1,
    animation: "pulse 3s ease-in-out infinite",
  },
  subHeading: {
    fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
    margin: "0 0 20px 0",
    color: "#a8e6cf",
    fontWeight: "600",
    letterSpacing: "0.02em",
  },
  text: {
    fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
    color: "#7fb89e",
    marginBottom: "40px",
    maxWidth: "500px",
    lineHeight: "1.6",
    fontWeight: "300",
  },
  button: {
    padding: "14px 32px",
    fontSize: "1rem",
    fontWeight: "600",
    backgroundColor: "rgba(46, 204, 113, 0.15)",
    color: "#2ecc71",
    border: "2px solid #2ecc71",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 20px rgba(46, 204, 113, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    transform: "translateY(0)",
  },
  buttonHover: {
    backgroundColor: "#2ecc71",
    transform: "translateY(-2px)",
  },
  buttonIcon: {
    fontSize: "1.2rem",
    transition: "transform 0.3s ease",
  },
  decorativeCircle1: {
    position: "absolute",
    top: "10%",
    right: "15%",
    width: "300px",
    height: "300px",
    background: "radial-gradient(circle, rgba(46, 204, 113, 0.1) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(60px)",
    zIndex: 1,
  },
  decorativeCircle2: {
    position: "absolute",
    bottom: "15%",
    left: "10%",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(39, 174, 96, 0.08) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(80px)",
    zIndex: 1,
  },
};

export default NotFound;
import React from "react";
import { useState, useEffect } from "react";
import "./Popup.css";

const Popup = ({ movie, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Smooth open animation
    useEffect(() => {
        if (movie) {
            setIsVisible(true);
        }
    }, [movie]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose(); // Trigger onClose after fade-out
        }, 300); // Match the fade-out duration in CSS
    };

    if (!movie) return null;

    // Prevent event bubbling for inner popup clicks
    const handlePopupClick = (e) => e.stopPropagation();

    return (
        <div className={`popup-overlay ${isVisible ? "fade-in" : "fade-out"}`} onClick={handleClose}>
            <div className="popup-content" onClick={handlePopupClick}>
                <button className="close-btn" onClick={handleClose}>
                    &times;
                </button>
                <div className="popup-header">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                        alt={movie.title}
                        className="popup-banner"
                    />
                    <div className="popup-info">
                        <h2 className="popup-title">{movie.title}</h2>
                        <p className="popup-subtitle">Return to Hawkins for the Final Season</p>
                        <div className="popup-buttons">
                            <button className="btn play-btn">Play</button>
                            <button className="btn like-btn">&#9825;</button>
                        </div>
                    </div>
                </div>
                <div className="popup-details">
                    <p>
                        <strong>Release Year:</strong> {movie.release_date.split("-")[0]}
                    </p>
                    <p>
                        <strong>Genres:</strong> {movie.genre_ids.join(", ")}
                    </p>
                    <p>
                        <strong>Rating:</strong> {movie.vote_average}/10
                    </p>
                    <p>{movie.overview}</p>
                </div>
                <div className="popup-episodes">
                    <h3>Episodes</h3>
                    <ul>
                        <li>S1:E1 - "Chapter One: The Vanishing of Will Byers"</li>
                        <li>S1:E2 - "Chapter Two: The Weirdo on Maple Street"</li>
                        {/* Add more dynamically */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Popup;

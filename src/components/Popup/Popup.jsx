import React, { useState, useEffect } from "react";

const Popup = ({ movieId, closePopup }) => {
    const [movieData, setMovieData] = useState(null);
    const [movieCredits, setMovieCredits] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch movie data from TMDB API
    const fetchMovieData = async () => {
        try {
            if (!movieId) {
                throw new Error("Movie ID is undefined");
            }

            const movieResponse = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=606c3d033f24adbc9e4bc31450dd186f&language=en-US`
            );
            const movieData = await movieResponse.json();

            const creditsResponse = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=606c3d033f24adbc9e4bc31450dd186f&language=en-US`
            );
            const creditsData = await creditsResponse.json();

            setMovieData(movieData);
            setMovieCredits(creditsData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching movie data: ", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovieData();
    }, [movieId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!movieData || !movieCredits) {
        return <div>Movie data not available</div>;
    }

    return (
        <div className="popup">
            <div className="popup-content">
                <button className="close" onClick={closePopup}>
                    X
                </button>
                <h2>{movieData.title}</h2>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                    alt={movieData.title}
                />
                <p>{movieData.overview}</p>
                <h3>Cast</h3>
                <ul>
                    {movieCredits.cast.slice(0, 5).map((actor) => (
                        <li key={actor.cast_id}>{actor.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Popup;

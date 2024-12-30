import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitileCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import Popup from '../../components/Popup/Popup';
import { TMDB_Access_Key } from '../../config';

const Home = () => {
    const [heroMovie, setHeroMovie] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const fetchHeroMovie = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_Access_Key}`,
            },
        };

        const response = await fetch(
            'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
            options
        );
        const data = await response.json();
        setHeroMovie(data.results[0]); // Use the first movie from popular list as the hero movie
    };

    useEffect(() => {
        fetchHeroMovie();
    }, []);

    return (
        <div className="home">
            <Navbar />
            <div className="hero">
                {heroMovie && (
                    <>
                        <img
                            src={`https://image.tmdb.org/t/p/w1280${heroMovie.backdrop_path}`}
                            alt=""
                            className="banner-img"
                        />
                        <div className="hero-caption">
                            <h1 className="caption-title">{heroMovie.title}</h1>
                            <p>{heroMovie.overview}</p>
                            <div className="hero-btns">
                                <button className="btn">
                                    <img src={play_icon} alt="" />
                                    Play
                                </button>
                                <button
                                    className="btn dark-btn"
                                    onClick={() => setShowPopup(true)}
                                >
                                    <img src={info_icon} alt="" />
                                    More Info
                                </button>
                            </div>
                            <TitleCards />
                        </div>
                    </>
                )}
            </div>
            <div className="more-cards">
                <TitleCards title={'Blockbuster Movies'} category={'top_rated'} />
                <TitleCards title={'Only on Netflix'} category={'popular'} />
                <TitleCards title={'Upcoming'} category={'upcoming'} />
                <TitleCards title={'Top Picks for You'} category={'now_playing'} />
            </div>
            <Footer />
            {showPopup && heroMovie && (
                <Popup movie={heroMovie} onClose={() => setShowPopup(false)} />
            )}
        </div>
    );
};

export default Home;

import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import settings from "./SliderSettings";
import SingleCard from "./SingleCard";
import { Link } from "react-router-dom";
import  FetchTrend from "./FetchTrend"; 
import SpinnerWait from "./SpinnerWait";
import { useDispatch, useSelector } from 'react-redux';
import { addMovie } from '../actions/Actions';
import Slider from "react-slick";


function Main () {
 const [trend, setTrend] = useState([])
 const [isHovered, setIsHovered] = useState(null)
 const [isLoading, setIsLoading] = useState(true)
 const movieList = useSelector(state => state.movieList);
 const dispatch = useDispatch();
 


 

 useEffect(() =>{
    FetchTrend({url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en&page=1&sort_by=popularity.desc', setData: setTrend});
    setIsLoading(false);
 },[]);


 const handleMouseOver = (movie) => {
    setIsHovered(movie.id);
    const openDiv = document.getElementById("open");
    openDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
    openDiv.style.backgroundSize = "cover";
    openDiv.style.minHeight= '100%';
};


const handleMouseOut = () => {
    setIsHovered(null);
    const openDiv = document.getElementById("open");
    openDiv.style.backgroundImage = '';
}


const handleButtonClick = (movie) => {
    const isMovieAlreadyAdded = movieList.some((item) => item.id === movie.id);
    if (!isMovieAlreadyAdded) {
        dispatch(addMovie(movie));
    }
}

    return (
        <>
           {isLoading ?( 
            <SpinnerWait />
            ):(
                <Container fluid className="px-5 " style={{paddingTop:'20%'}}> 
                <h2 className="text-warning bg-dark ms-5 mb-3" style={{width:'230px'}}>Current Movies</h2>
                <Slider {...settings}>
                {trend.results && trend.results.map((movie) => (
                  
                    <div key={movie.id} className="card-trend " onMouseOut={() => handleMouseOut()}  onMouseOver={() => handleMouseOver(movie)}>
                         {isHovered === movie.id ? (
                            <>
                                <Link to={`/movie-detail/${movie.id}`}>
                                    <SingleCard img={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                    title={movie.title}
                                    description = {movie.overview}
                                    releasedate={movie.release_date}
                                    />
                                </Link>
                                <div className="buttonoverlink">
                                <button  onClick={() => handleButtonClick(movie)}  className="w-100 h-100 border-0" style={{backgroundColor: 'transparent'}}>
                                    <svg xmlns="http://www.w3.org/2000/svg"  fill= 'white' className="bi bi-heart-fill" viewBox="0 0 16 16" >
                                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                    </svg>
                                </button>
                                </div>
                            </>
                        ):(
                        <Link to={`/movie-detail/${movie.id}`}>
                            <img 
                            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} 
                            alt={movie.title} 
                            width={'100%'}
                            /> 
                        </Link>
                        )}
                       
                    </div>
                
                    ))} 
                </Slider>
                
            </Container>
            )}
            
          
            

        </>
    )
}

export default Main

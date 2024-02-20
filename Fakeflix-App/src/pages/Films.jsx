import FetchTrend from "../components/FetchTrend";
import { useEffect,useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import settings from "../components/SliderSettings";
import NavbarHome from "../components/Navbar";
import { Link } from "react-router-dom";
import SpinnerWait from "../components/SpinnerWait";
import SingleCard from "../components/SingleCard";
import { useDispatch, useSelector } from 'react-redux';
import { addMovie } from '../actions/Actions';

function Films(){
    const [moreVote, setMoreVote]= useState([]);
    const [thisYear, setThisYear] = useState([]);
    const [isHovered, setIsHovered] = useState(null);
    const [isLoading,setIsLoading] = useState(true);

    const movieList = useSelector(state => state.movieList);
    const dispatch = useDispatch();
    
 
    useEffect(() =>{
        FetchTrend({url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc', setData: setMoreVote });
        FetchTrend ({url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&year=2024', setData: setThisYear});
       setIsLoading (false) ;
    },[]);
 
 
   const handleMouseOver= (movie) => {
    setIsHovered(movie.id);
   }


    const handleMouseOut= () => {
    setIsHovered(null) ; 
    }
  
    
const handleButtonClick = (movie) => {
    const isMovieAlreadyAdded = movieList.some((item) => item.id === movie.id);
    if (!isMovieAlreadyAdded) {
        dispatch(addMovie(movie));
    }
}


    return(
        <>
        <NavbarHome/>
        {isLoading? (<SpinnerWait/>):(
            <>
        <h2 className="mt-5 mb-3 text-white display-5">Top Rated Movies</h2>
        <div className="px-5">
        <Slider {...settings}>
        {moreVote.results && moreVote.results.map((movie) => (
            <div key={movie.id}  className="card-trend" onMouseOut={() => handleMouseOut()}  onMouseOver={() => handleMouseOver(movie)}>
                {isHovered === movie.id ? ( <>
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
                <img  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="img"  width={'100%'} />
                </Link>
                )}
               
            </div>
        ))}
        </Slider>
        </div>
        <h2 className="mt-5 mb-3 text-white display-5">Films This Year</h2>
        <div className="px-5">
        <Slider {...settings}>
        {thisYear.results && thisYear.results.map((movie) => (
            <div key={movie.id}  className="card-trend " onMouseOut={() => handleMouseOut()}  onMouseOver={() => handleMouseOver(movie)}>
                  {isHovered === movie.id ? ( <>
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
                <img  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="img"  width={'100%'} />
                </Link>
                 )}
            </div>
        ))}
        </Slider>
        </div>
        </>
        )}
        </>
    )
}
export default Films;
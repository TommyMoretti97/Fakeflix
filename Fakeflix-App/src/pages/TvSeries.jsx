import  Slider  from "react-slick";
import settings from "../components/SliderSettings";
import { useEffect,useState } from "react";
import NavbarHome from "../components/Navbar";
import { Link } from "react-router-dom";
import FetchTrend from "../components/FetchTrend";
import SpinnerWait from "../components/SpinnerWait";
import SingleCard from "../components/SingleCard";
import { useDispatch, useSelector } from 'react-redux';
import { addMovie } from '../actions/Actions';

function TvSeries() {
    const [moreVoteSeries, setMoreVoteSeries]= useState([]);
    const [thisYearSeries, setThisYearSeries] = useState([]);
    const [isHovered, setIsHovered] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const movieList = useSelector(state => state.movieList);
    const dispatch = useDispatch();

    useEffect(() =>{
        
        FetchTrend({url: 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=vote_count.desc', setData: setMoreVoteSeries });
        FetchTrend ({url: 'https://api.themoviedb.org/3/discover/tv?first_air_date_year=2024&include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc', setData: setThisYearSeries, });
        setLoading(false);
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
         {isLoading?(<SpinnerWait/>):(<>
        <h2 className="mt-5 mb-3 text-white display-5">Top Rated Series</h2>
        <div className="px-5">
        <Slider {...settings}>
        {moreVoteSeries.results && moreVoteSeries.results.map((movie) => (
            <div key={movie.id}  className="card-trend " onMouseOut={() => handleMouseOut()}  onMouseOver={() => handleMouseOver(movie)}>
                {isHovered === movie.id ? ( <>
                    <Link to={`/series-detail/${movie.id}`}>
                    <SingleCard img={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    title={movie.name}
                    description = {movie.overview}
                    releasedate={movie.first_air_date}
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
                <Link to={`/series-detail/${movie.id}`}>
                <img  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="img"  width={'100%'} />
                </Link>
                 )}
            </div>
        ))}
        </Slider>
        </div>
        <h2 className="mt-5 mb-3 text-white display-5">Series This Years</h2>
        <div className="px-5">
        <Slider {...settings}>
        {thisYearSeries.results && thisYearSeries.results.map((movie) => (
            <div key={movie.id}  className="card-trend " onMouseOut={() => handleMouseOut()}  onMouseOver={() => handleMouseOver(movie)}>
                 {isHovered === movie.id ? ( <>
                    <Link to={`/series-detail/${movie.id}`}>
                    <SingleCard img={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    title={movie.name}
                    description = {movie.overview}
                    releasedate={movie.first_air_date}
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
                <Link to={`/series-detail/${movie.id}`}>
                <img  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="img"  width={'100%'} />
                </Link>
                 )}
            </div>
        ))}
        </Slider>
        </div>
        </>)}
        </>
    )
}

 export default TvSeries;
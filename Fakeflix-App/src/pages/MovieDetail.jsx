import FetchTrend from "../components/FetchTrend";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarHome from "../components/Navbar";
import SpinnerWait from "../components/SpinnerWait";

function MovieDetail() {
const [movie, setMovie] = useState([]);
const [isLoading,setIsLoading] = useState(true);

const {movieID} = useParams();

useEffect(() =>{
    FetchTrend({url: `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`, setData: setMovie }); 
   
   
},[])

useEffect(()=>{
    
    setTimeout(() =>{
        setIsLoading(false);
     const bgMovie = document.getElementById('bg-details');
    bgMovie.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
    bgMovie.style.backgroundSize = 'cover';
    bgMovie.style.height = '105vh';
    bgMovie.style.position = 'relative';
    bgMovie.style.opacity= '0.4';
    bgMovie.style.transform = 'translateY(-80px)';
    },500)
},[movie])

    return(
        <>
        <NavbarHome />
      < div id="bg-details"></div>
        {isLoading ? (
            <div className="text-center mt-5">
                <SpinnerWait />
            </div>  
        ):(
        <div className="text-white text-over-img">
            <h1 className="display-4 pb-3 special">{movie.title}</h1>
            <h5  className="w-75">{movie.overview}</h5>
            <div className="d-flex text-danger pt-2 h5">
                <div className="pe-4"> IMBd {movie.vote_average.toFixed(1)} </div> 
                <div className="pe-4">{movie.runtime}min</div> 
                <div> {movie.release_date}</div>
            </div>
            <div className="d-flex pt-2">
                {movie.genres && movie.genres.map((movie) => (
                    <div className="d-flex" key={movie.id}>
                        <div className="pe-3 h5 text-decoration-underline">{movie.name} </div>
                    </div>
                ))}
            </div>
            <div className="py-3">View: {movie.popularity}</div>
            <div>Vote Count: {movie.vote_count}</div>
        </div>
        )}
        
        </>
       
    )
}
export default MovieDetail;
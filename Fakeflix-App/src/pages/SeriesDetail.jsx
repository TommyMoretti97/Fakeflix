import FetchTrend from "../components/FetchTrend";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarHome from "../components/Navbar";
import SpinnerWait from "../components/SpinnerWait";
 

function SeriesDetail(){
const [series, setSeries] = useState([]);
const [isLoading,setIsLoading] = useState(true);

const {seriesID} = useParams();

useEffect(() =>{
    FetchTrend({url: `https://api.themoviedb.org/3/tv/${seriesID}?language=en-US`, setData: setSeries}); 
   
},[])


useEffect(()=>{
    
    setTimeout(() =>{
        setIsLoading(false);
     const bgMovie = document.getElementById('bg-details');
    bgMovie.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${series.backdrop_path})`;
    bgMovie.style.backgroundSize = 'cover';
    bgMovie.style.height = '105vh';
    bgMovie.style.position = 'relative';
    bgMovie.style.opacity= '0.4';
    bgMovie.style.transform = 'translateY(-80px)';
    },500)
},[series])


return (
    <>
    <NavbarHome/>
    < div id="bg-details"></div>
    <div className="text-white text-over-img">
            <h1 className="display-4 pb-3 special">{series.name}</h1>
            <h5 >Season: {series.number_of_seasons}</h5>
            <h5>{series.overview}</h5>
            <div className="d-flex text-danger pt-2 h5">
                <div className="pe-4"> IMBd {series.vote_average} </div> 
                <div className="pe-4">{series.number_of_episodes} Episode</div> 
                <div> {series.first_air_date}</div>
            </div>
            <div className="d-flex pt-2">
                {series.genres && series.genres.map((serie) => (
                    <div className="d-flex" key={serie.id}>
                        <div className="pe-3 h5 text-decoration-underline">{serie.name} </div>
                    </div>
                ))}
            </div>
            <div className="py-3">View: {series.popularity}</div>
            <div>Vote Count: {series.vote_count}</div>
        </div>
    </>
)
}

export default SeriesDetail;
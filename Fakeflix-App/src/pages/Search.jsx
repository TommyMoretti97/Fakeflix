import NavbarHome from "../components/Navbar";
import { useState } from "react";
import FetchTrend from "../components/FetchTrend";
import SearchCard from "../components/SearchCard";
import Slider from "react-slick";
import settings from "../components/SliderSettings";

function Search (){
const [movies, setMovies] = useState(false);
const [series, setSeries]= useState(false);
const [movieName, setMovieName] = useState('');
const [seriesName, setSeriesName] = useState('');
const [dataMovies, setDataMovies] = useState([]);
const [dataSeries, setDataSeries] = useState([]);


function MovieOn(){
    setSeries(false);
    setMovies(true);
}

function SeriesOn(){
    setMovies(false);
    setSeries(true);
}

function handleMovieSearch(e) {
    e.preventDefault();
    if(movieName === ''){
        alert('Please enter the name of a movie to continue.');
    }else{
   FetchTrend ({url:`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US`, setData:setDataMovies});
    let movie = document.querySelector('.slick-slider');
    movie.classList.remove('d-none');
    }
}

function handleSeriesSearch(e) {
    e.preventDefault();
    if(seriesName === ''){
        alert('Please enter the name of a tv series to continue');
    }else{
    FetchTrend ({url:`https://api.themoviedb.org/3/search/tv?query=${seriesName}&include_adult=false&language=en-US`, setData:setDataSeries});
    let movie = document.querySelector('.slick-slider');
    movie.classList.remove('d-none');
    }
}



    return (
        <>
        <NavbarHome/>
        <div className="text-center my-5">
            <h3 className="text-white">Choice if you wanna search a Movie or a TvSeries</h3>
            <button onClick={MovieOn}  className="btn-search"><span className="text-visible h5">Movies</span></button>
            <button onClick={SeriesOn}  className="btn-search"><span className="text-visible h5">Tv Series</span></button>
        </div>
        {movies ? (
            <>
                <form  className="text-center text-white" >
                    <label htmlFor="film">Write the name of a Movies</label><br />
                    <input type="text" id="film" name="film" placeholder="Search Movie"  value={movieName} onChange={(e) => setMovieName(e.target.value)} />
                    <button type="submit"  className="btn-search" onClick={handleMovieSearch}> <span className="text-visible h5">Search Movie</span></button>
                </form>
                {dataMovies ?( 
                <>
                    <Slider {...settings} className="mx-5 my-5 px-5 m-auto d-none">
                                {dataMovies.results && dataMovies.results.map(movie => (
                                    <SearchCard
                                        key={movie.id}
                                        img={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                                        title={movie.title}
                                        releasedate={movie.release_date}
                                        id={movie.id}
                                        type="movie"
                                    />
                                ))}
                    </Slider>
                </>
                ):null }
            </>
        ):null }
        {series ? (
            <>
                <form  className="text-center text-white">
                    <label htmlFor="film">Write the name of a TvSeries</label><br />
                    <input type="text" id="film" name="film" placeholder="Search TvSeries" value={seriesName} onChange={(e) => setSeriesName(e.target.value)} />
                    <button type="submit" className="btn-search" onClick={handleSeriesSearch}><span className="text-visible h5">Search TvSeries</span></button>
                </form>
                {dataSeries ? (
                    <>
                    <Slider {...settings} className="mx-5 my-5 px-5 m-auto d-none">
                    {dataSeries.results && dataSeries.results.map(series => (
                        
                    <SearchCard key={series.id}
                                img={`https://image.tmdb.org/t/p/original/${series.backdrop_path}`}
                                    title={series.name}
                                    releasedate={series.first_air_date}
                                    id={series.id}
                                    type="series"/>
                                    
                    ))}
                    </Slider>
                    </>
                ):null }
            </>
        ) : null}
        </>
    )
}

export default Search;
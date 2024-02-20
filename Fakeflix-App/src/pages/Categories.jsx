import NavbarHome from "../components/Navbar";
import { useState,useEffect } from "react";
import Container from 'react-bootstrap/Container';
import FetchTrend from '../components/FetchTrend';
import { Col, Row} from "react-bootstrap";
import { Link } from "react-router-dom";

function Categories(){
    const [movies, setMovies] = useState(false);
    const [series, setSeries]= useState(false);
    const [movieCategories, setMovieCategories] = useState([]);
    const [seriesCategories, setSeriesCategories] = useState([]);

    
function MovieOn(){
    setSeries(false);
    setMovies(true);
}

function SeriesOn(){
    setMovies(false);
    setSeries(true);
}

useEffect(()=>{
    FetchTrend({url:'https://api.themoviedb.org/3/genre/movie/list?language=en', setData: setMovieCategories })
    FetchTrend({url:'https://api.themoviedb.org/3/genre/tv/list?language=en', setData: setSeriesCategories })
},[])

    return (
        <>
        <NavbarHome/>
        <div className="text-center my-5">
            <h3 className="text-white">Choice if you wanna search a Movie or a TvSeries</h3>
            <button onClick={MovieOn}  className="btn-search"><span className="text-visible h5">Movies</span></button>
            <button onClick={SeriesOn}  className="btn-search"><span className="text-visible h5">Tv Series</span></button>
        </div>
        {movies ?(
            <Container fluid>
                <h2 className="text-white">Genres</h2>
                <Row className="justify-content-around px-5">
                {movieCategories?.genres.map((categories)=>(
                
                    <Col lg={2} key={categories.id} className="categories-card  px-0" >
                     <Link to={`/categories/movie/${categories.id}`} state={{categoryName: categories.name}}>
                    <div className=" div-opacity"></div>
                    <h3 className=" name-category">{categories.name}</h3>
                    </Link> 
                    </Col>
                   
                ))}
                </Row>
            </Container>
        ):(<></>)}
        {series ?(
             <Container fluid>
             <h2 className="text-white">Genres</h2>
             <Row className="justify-content-around px-5">
             {seriesCategories?.genres.map((categories)=>(
                 <Col lg={2} key={categories.id} className="categories-card  px-0" >
                      <Link to={`/categories/series/${categories.id}`} state={{categoryName: categories.name}}>
                     <div className=" div-opacity"></div>
                     <h3 className=" name-category">{categories.name}</h3>
                     </Link>
                    </Col>
             ))}
             </Row>
         </Container>
        ):(<></>)}
        </>
    )
}

export default Categories;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchTrend from "../components/FetchTrend";
import { useLocation } from 'react-router-dom';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from '../components/Dropdown';
import SingleCard from "../components/SingleCard";


function MovieCategory ({buttonTitle}) {
    const [allMovies, setAllMovies] = useState([]);
    const [movies, setMovies] = useState([]) ;
    const [movies1, setMovies1] = useState([]) ;
    const [movies2, setMovies2] = useState([]) ;
    const [movies3, setMovies3] = useState([]) ;
    const [movies4, setMovies4] = useState([]) ;
    const [isHovered, setIsHovered] = useState(null);

    const location = useLocation();
    const categoryName = location.state?.categoryName;

    const {movieID} = useParams();


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                  FetchTrend({ url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${movieID}`,setData: setMovies});
                 FetchTrend({ url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=${movieID}`,setData: setMovies1 });
                 FetchTrend({ url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=3&sort_by=popularity.desc&with_genres=${movieID}`,setData: setMovies2 });
                 FetchTrend({ url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=4&sort_by=popularity.desc&with_genres=${movieID}`,setData: setMovies3 });
                 FetchTrend({ url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=5&sort_by=popularity.desc&with_genres=${movieID}`,setData: setMovies4 });
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

       fetchMovies()
    }, []);

   
    useEffect(() => {
        // Combina i risultati delle due chiamate fetch solo se entrambe sono state completate
        if (movies?.results?.length === 20 && movies1?.results?.length === 20 && movies2?.results?.length === 20 && movies3?.results?.length === 20 && movies4?.results?.length === 20) {
            const combinedResults = [...movies.results, ...movies1.results, ...movies2.results, ...movies3.results, ...movies4.results];
        
            // Set per tenere traccia degli id dei film già aggiunti
            const idSet = new Set();
        
            // Filtra i risultati combinati per rimuovere film duplicati
            const filteredResults = combinedResults.filter(movie => {
                if (idSet.has(movie.id)) {
                    return false; // Film duplicato, non lo aggiungiamo
                } else {
                    idSet.add(movie.id);
                    return true; // Film unico, lo aggiungiamo
                }
            });
        
            setAllMovies(filteredResults);
        }
    }, [movies.results, movies1.results, movies2.results, movies3.results, movies4.results]);

   
    return ( 
        <>
        <Navbar  className="bg-dark w-75 m-auto" id='navbar'>
      
      <Navbar.Brand ><Link to={'/'}><img src="../../src/assets/img/Fakeflix1.png" alt="netflix-logo" width='130px' height='50px'/></Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
  <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Link to={'/films' }className='nav-link text-white a-nav'>Films</Link>
          <Link to={'/tv-series'} className='nav-link text-white a-nav'>TV Series</Link>
          <Link to={'/categories'} className='nav-link text-white a-nav'>Categories</Link>
         <Link to={'/search' }className='nav-link text-white a-nav'>Search</Link>
         <Link to={`/my-list/${buttonTitle}`} className='nav-link text-white a-nav'>My List</Link>
        </Nav>
        <Form className="d-flex mx-4 align-items-center">
          <Dropdown></Dropdown>
        </Form>
      </Navbar.Collapse>
    
  </Navbar>

        <h2 className="text-white display-4 pt-5">{categoryName}</h2>
        <Container fluid>
        <Row className="justify-content-around ">
        {/* {movies?.results.map((movie) => (
            <Col lg={3} key={movie.id}>ciao</Col>

        ))} */}
         {allMovies.map((movie, index) => (
           <Col lg={2} key={movie.id} className="p-4" onMouseOver={() => setIsHovered(movie.id)} onMouseOut={() => setIsHovered(null)}>
                {isHovered === movie.id ? (
                    <div style={{ position: 'relative',
                    left: index % 6 === 5 ? '-150%' : (index % 6 === 4 ? '-50%' : '0')
                    }}>
                   <Link to={`/movie-detail/${movie.id}`}>
                        <SingleCard img={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                        title={movie.title}
                        description = {movie.overview}
                        releasedate={movie.release_date}
                        
                        />
                    </Link>
                    </div>
                ):(<Link to={`/movie-detail/${movie.id}`}>
                <img 
                            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} 
                            alt={movie.title} 
                            width={'100%'}
                            /> 
               </Link>)}
               
                </Col>
        ))}
        </Row>
        </Container>
        </>
    )
}
export default MovieCategory;
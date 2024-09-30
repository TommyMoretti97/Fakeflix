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

function SeriesCategory ({buttonTitle}) {
    const [allSeries, setAllSeries] = useState([]);
    const [series, setSeries] = useState([]) ;
    const [series1, setSeries1] = useState([]) ;
    const [series2, setSeries2] = useState([]) ;
    const [series3, setSeries3] = useState([]) ;
    const [series4, setSeries4] = useState([]) ;
    const [isHovered, setIsHovered] = useState(null);

    const location = useLocation();
    const categoryName = location.state?.categoryName;

    const {seriesID} = useParams();

    
    useEffect(() => {
        const fetchSeries = async () => {
            try {
                  FetchTrend({ url: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${seriesID}`,setData: setSeries});
                 FetchTrend({ url: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=2&sort_by=popularity.desc&with_genres=${seriesID}`,setData: setSeries1 });
                 FetchTrend({ url: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=3&sort_by=popularity.desc&with_genres=${seriesID}`,setData: setSeries2 });
                 FetchTrend({ url: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=4&sort_by=popularity.desc&with_genres=${seriesID}`,setData: setSeries3 });
                 FetchTrend({ url: `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=5&sort_by=popularity.desc&with_genres=${seriesID}`,setData: setSeries4 });
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

       fetchSeries()
    }, []);


    useEffect(() => {
        // Combina i risultati delle due chiamate fetch solo se entrambe sono state completate
        if (series?.results?.length === 20 && series1?.results?.length === 20 && series2?.results?.length === 20 && series3?.results?.length === 20 && series4?.results?.length === 20) {
            const combinedResults = [...series.results, ...series1.results, ...series2.results, ...series3.results, ...series4.results];
        
            const idSet = new Set();
            
            const filteredResults = combinedResults.filter(movie => {
                if (idSet.has(movie.id)) {
                    return false; 
                } else {
                    idSet.add(movie.id);
                    return true; 
                }
            });
        
            setAllSeries(filteredResults);
        }
    }, [series.results,series1.results, series2.results, series3.results, series4.results]);

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

        <h2 className='text-white display-4 pt-5'>{categoryName}</h2>
        <Container fluid>
        <Row className="justify-content-around ">
         {allSeries.map((serie, index) => (
             <Col lg={2} key={serie.id} className="p-4" onMouseOver={() => setIsHovered(serie.id)} onMouseOut={() => setIsHovered(null)}>
                {isHovered === serie.id ? (
                    <div style={{ position: 'relative',
                    left: index % 6 === 5 ? '-150%' : (index % 6 === 4 ? '-50%' : '0')
                    }}>
                   <Link to={`/series-detail/${serie.id}`}>
                        <SingleCard img={`https://image.tmdb.org/t/p/original/${serie.backdrop_path}`}
                        title={serie.name}
                        description = {serie.overview}
                        releasedate={serie.first_air_date}
                        
                        />
                    </Link>
                    </div>
                ):(
                <Link to={`/series-detail/${serie.id}`}>
                    <img 
                                src={`https://image.tmdb.org/t/p/original/${serie.poster_path}`} 
                                alt={serie.name} 
                                width={'100%'}
                                /> 
                </Link>
                )}
                </Col>
        ))}
        </Row>
        </Container>
        </>
    )
}
export default SeriesCategory;
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Homepage from './pages/Homepage'
import MovieDetail from './pages/MovieDetail';
import MyList from './pages/MyList';
import Films from './pages/Films';
import TvSeries from './pages/TvSeries';
import SeriesDetail from './pages/SeriesDetail';
import Search from './pages/Search';
import Categories from './pages/Categories';
import MovieCategory from './pages/MovieCategory';
import SeriesCategory from './pages/SeriesCategory';




function App() {
  
 
  return (
    <>
    
      <Routes>
        <Route path='/'element={<Homepage/>}/>
        <Route path='/movie-detail/:movieID' element={<MovieDetail/>}/>
        <Route path='/series-detail/:seriesID' element={<SeriesDetail/>}/>
        <Route path='/my-list' element={<MyList  />} />
        <Route path='/my-list/:buttonTitle' element={<MyList/>}/>
        <Route path='/films'element={<Films />}/>
        <Route path='/tv-series' element={<TvSeries />}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/categories' element={<Categories />}/>
        <Route path='/categories/movie/:movieID' element={<MovieCategory/>}/>
        <Route path='/categories/series/:seriesID' element={<SeriesCategory/>}/>
        
      </Routes>
      
    </>
  )
}

export default App

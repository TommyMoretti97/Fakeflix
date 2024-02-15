import { useSelector,useDispatch } from 'react-redux';
import NavbarHome from '../components/Navbar';
import { Link } from 'react-router-dom';
import { removeMovie } from '../actions/Actions';

function MyList (){
    const movieList = useSelector(state => state.movieList);
    const dispatch = useDispatch();

   

return(
    <div id='bg-mylist'>
    <NavbarHome/>
    <div className='text-center mt-5'>
    <h1  className='my-5'>My Favorite List</h1>
    <div className='w-50 m-auto bg-dark'>
        <div className='d-flex  h3'>
            <div className='col-5 text-success'>Title</div>
            <div className='col-3 text-warning'>Release Data</div>
            <div className='col-2 text-info'>See Detail</div>
            <div className='col-2 text-danger'>Eliminate</div>
        </div>
      <ul style={{listStyle:'none'}} className='ps-0 bg-dark' >
        {movieList.map((movie,index) => (
          <li key={index} className='text-white d-flex '>
            <div className='col-5 h3 border border-white m-0'>{movie.title}{movie.name}</div> 
            <div className='col-3 border border-white'>{movie.release_date}{movie.first_air_date}</div>
            <div className='col-2 border border-white'>
                <Link to={movie.title ? `/movie-detail/${movie.id}` : `/series-detail/${movie.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                    </svg>
                </Link> 
            </div>
            <div className='col-2 border border-white'>
                <button onClick={() => dispatch(removeMovie(movie.id))}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="red" className="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                </svg>
                </button>
            </div>
          </li>
        ))}
      </ul>
      </div>
      </div>
    </div>
)
} 
 
export default MyList;
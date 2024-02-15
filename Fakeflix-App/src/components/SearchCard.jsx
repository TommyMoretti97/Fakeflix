import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function SearchCard( {img, title, releasedate, id, type }) {
    let path = '';
  if (type === 'movie') {
    path = `/movie-detail/${id}`;
  } else if (type === 'series') {
    path = `/series-detail/${id}`;
  }

  return (
    <Card style={{ width: '16rem', height:'350px'}} >
      <Card.Img variant="top" src={img} style={{height:'50%'}} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{releasedate}</Card.Text>
        <Link to={path}>
        <Button variant="primary">See Details </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default SearchCard;
import Card from 'react-bootstrap/Card';


function SingleCard({img,title,description,releasedate}) {
 

  
  return (
    <Card className="bg-dark text-white cardhover">
      <Card.Img src={img} alt="img" height={'110%'}/>
      <Card.ImgOverlay className="overlay d-flex flex-column">
        <h2 >{title}</h2>
        <div className='h4'>{releasedate}</div>
        <Card.Text className='pt-5 h6 description ' >{description} </Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}

export default SingleCard;
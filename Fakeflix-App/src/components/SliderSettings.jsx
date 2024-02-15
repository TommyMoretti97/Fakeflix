import { ArrowRightSquareFill, ArrowLeftSquareFill} from 'react-bootstrap-icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


 
     
    const  settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 2,
      initialSlide: 0,
      nextArrow: <ArrowRightSquareFill fill='yellow'  />,
      prevArrow: <ArrowLeftSquareFill fill='yellow' /> ,
      responsive: [
          {
            breakpoint: 650,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 950,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
        {
          breakpoint: 1250,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
            breakpoint: 1500,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2,
              infinite: true,
              dots: true
            }
          },
        {
            breakpoint: 1800,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 2,
              infinite: true,
              dots: true
            }
          }
      ]
    };

export default settings;
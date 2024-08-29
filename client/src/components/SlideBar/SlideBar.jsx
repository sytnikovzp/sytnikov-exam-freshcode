import Flickity from 'react-flickity-component';
// =============================================
import CONSTANTS from '../../constants';
// =============================================
import style from './SlideBar.module.sass';
import './flickity.css';

const SliderBar = (props) => {
  const options = {
    draggable: true,
    wrapAround: true,
    pageDots: false,
    prevNextButtons: true,
    autoPlay: true,
    groupCells: true,
    lazyLoad: true,
  };

  const getStyleName = () => {
    const { carouselType } = props;
    switch (carouselType) {
      case CONSTANTS.SLIDER_TYPES.MAIN:
        return style.mainCarousel;
      case CONSTANTS.SLIDER_TYPES.EXAMPLE:
        return style.exampleCarousel;
      case CONSTANTS.SLIDER_TYPES.FEEDBACK:
        return style.feedbackCarousel;
    }
  };

  const renderSlides = () => {
    const { carouselType } = props;
    switch (carouselType) {
      case CONSTANTS.SLIDER_TYPES.MAIN: {
        return Object.keys(props.images).map((key, index) => (
          <img
            src={props.images[key]}
            alt="slide"
            key={index}
            className={style['carousel-cell']}
          />
        ));
      }
      case CONSTANTS.SLIDER_TYPES.EXAMPLE: {
        return Object.keys(props.images).map((key, index) => (
          <div className={style['example-cell']} key={index}>
            <img src={props.images[key]} alt="slide" />
            <p>{CONSTANTS.EXAMPLE_SLIDER_TEXT[index]}</p>
          </div>
        ));
      }
      case CONSTANTS.SLIDER_TYPES.FEEDBACK: {
        return Object.keys(props.images).map((key, index) => (
          <div className={style['feedback-cell']} key={index}>
            <img src={props.images[key]} alt="slide" />
            <p>{CONSTANTS.FEEDBACK_SLIDER_TEXT[index].feedback}</p>
            <span>{CONSTANTS.FEEDBACK_SLIDER_TEXT[index].name}</span>
          </div>
        ));
      }
    }
  };
  return (
    <Flickity className={getStyleName()} elementType="div" options={options}>
      {renderSlides()}
    </Flickity>
  );
};

export default SliderBar;

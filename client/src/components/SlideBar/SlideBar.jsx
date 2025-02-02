import Flickity from 'react-flickity-component';
// =============================================
import constants from '../../constants';
// =============================================
import style from './SlideBar.module.sass';
import './flickity.css';

function SliderBar(props) {
  const options = {
    draggable: true,
    wrapAround: true,
    pageDots: false,
    prevNextButtons: true,
    autoPlay: true,
    groupCells: true,
    lazyLoad: true,
  };

  function getStyleName() {
    const { carouselType } = props;
    switch (carouselType) {
      case constants.SLIDER_TYPES.MAIN:
        return style.mainCarousel;
      case constants.SLIDER_TYPES.EXAMPLE:
        return style.exampleCarousel;
      case constants.SLIDER_TYPES.FEEDBACK:
        return style.feedbackCarousel;
      default:
        return '';
    }
  }

  function renderSlides() {
    const { carouselType, images } = props;
    switch (carouselType) {
      case constants.SLIDER_TYPES.MAIN:
        return Object.keys(images).map((key, index) => (
          <img
            src={images[key]}
            alt="slide"
            key={index}
            className={style['carousel-cell']}
          />
        ));
      case constants.SLIDER_TYPES.EXAMPLE:
        return Object.keys(images).map((key, index) => (
          <div className={style['example-cell']} key={index}>
            <img src={images[key]} alt="slide" />
            <p>{constants.EXAMPLE_SLIDER_TEXT[index]}</p>
          </div>
        ));
      case constants.SLIDER_TYPES.FEEDBACK:
        return Object.keys(images).map((key, index) => (
          <div className={style['feedback-cell']} key={index}>
            <img src={images[key]} alt="slide" />
            <p>{constants.FEEDBACK_SLIDER_TEXT[index].feedback}</p>
            <span>{constants.FEEDBACK_SLIDER_TEXT[index].name}</span>
          </div>
        ));
      default:
        return null;
    }
  }

  return (
    <Flickity className={getStyleName()} elementType="div" options={options}>
      {renderSlides()}
    </Flickity>
  );
}

export default SliderBar;

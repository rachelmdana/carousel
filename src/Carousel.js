import { useState } from "react";
import "./Carousel.css";
import Card from "./Card";


/** Carousel: displays images and arrows to navigate through them
 * 
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 * 
 * State:
 * - currCardIdx: integer for current card index
 * 
 * App --> Carousel --> Card
 */
function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);

  const currCard = photos[currCardIdx];
  const total = photos.length;

  function goForward(direction) {
    if (direction === 'left') {
      if (currCardIdx > 0) {
        setCurrCardIdx(currCardIdx - 1);
      }
    } else if (direction === 'right') {
      if (currCardIdx < total - 1) {
        setCurrCardIdx(currCardIdx + 1);
      }
    }
  }

  return (
    <div className="Carousel">
      <h1>{title}</h1>
     <div className="Carousel-main">
        <i
          className="bi bi-arrow-left-circle"
          onClick={() => goForward('left')}
          data-testid="leftArrow"
          disabled={currCardIdx === 0}
        />
        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        <i
          className="bi bi-arrow-right-circle"
          onClick={() => goForward('right')}
          data-testid="rightArrow"
          disabled={currCardIdx === total - 1}
        />
      </div>
    </div>
  );
}

export default Carousel;

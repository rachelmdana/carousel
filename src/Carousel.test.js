import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import Carousel from "./Carousel";
import photos from "./photos.js";
// import '@testing-library/jest-dom/extend-expect';
import TEST_IMAGES from "./_testCommon.js";


it('renders Carousel without crashing', () => {
  render(<Carousel photos={photos} title="Test Carousel" />);
});

test('renders Carousel correctly', () => {
  const { asFragment } = render(<Carousel photos={photos} title="Test Carousel" />);
  expect(asFragment()).toMatchSnapshot();
});

it('left arrow moves to the previous image', () => {
  const photos = [
    { src: 'image1.jpg', caption: 'Image 1' },
    { src: 'image2.jpg', caption: 'Image 2' },
    { src: 'image3.jpg', caption: 'Image 3' },
  ];

  const { getByTestId } = render(<Carousel photos={photos} title="Test Carousel" />);


  // Initially on the first image (index 0)
  expect(getByTestId('Card-title').textContent).toBe('Image 1');

  // Click the left arrow to move to the second image (index 1)
  fireEvent.click(getByTestId('leftArrow'));

  // Now test expects to be on the second image
  expect(getByTestId('Card-title').textContent).toBe('Image 2');
});

it('left arrow is missing on the first image and right arrow is missing on the last image', () => {
  const photos = [
    { src: 'image1.jpg', caption: 'Image 1' },
    { src: 'image2.jpg', caption: 'Image 2' },
    { src: 'image3.jpg', caption: 'Image 3' },
  ];

  const { getByTestId } = render(<Carousel photos={photos} title="Test Carousel" />);

  // Initially on the first image
  expect(getByTestId('leftArrow')).toHaveAttribute('disabled');
  expect(getByTestId('rightArrow')).not.toHaveAttribute('disabled');

  // Click the right arrow to move to the second image
  fireEvent.click(getByTestId('rightArrow'));

  // Now on the second image
  expect(getByTestId('leftArrow')).not.toHaveAttribute('disabled');
  expect(getByTestId('rightArrow')).not.toHaveAttribute('disabled');

  // Click the right arrow to move to the third image
  fireEvent.click(getByTestId('rightArrow'));

  // Now on the third image
  expect(getByTestId('leftArrow')).not.toHaveAttribute('disabled');
  expect(getByTestId('rightArrow')).toHaveAttribute('disabled');
});

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

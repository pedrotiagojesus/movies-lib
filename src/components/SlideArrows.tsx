const SlideArrows = () => {
    return (
        <div className="splide__arrows">
            <button
                className="splide__arrow splide__arrow--prev"
                type="button"
                aria-label="Previous slide"
                aria-controls="splide01-track"
            >
                <i className="bi bi-chevron-left"></i>
            </button>
            <button
                className="splide__arrow splide__arrow--next"
                type="button"
                aria-label="Next slide"
                aria-controls="splide01-track"
            >
                <i className="bi bi-chevron-right"></i>
            </button>
        </div>
    );
};

export default SlideArrows;

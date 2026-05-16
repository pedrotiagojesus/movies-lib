import { useState } from "react";

// CSS
import "./MovieImageModal.css";

// Components
import Modal from "./Modal/Modal";

// Hooks
import { useDominantColor } from "@hooks/useDominantColor";

interface MovieImageModalProps {
    movie: Movie;
}

const MovieImageModal = ({ movie }: MovieImageModalProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? movie.images.length - 1 : prev - 1));
    const nextImage = () => setCurrentIndex((prev) => (prev === movie.images.length - 1 ? 0 : prev + 1));

    const dominantColor = useDominantColor(movie?.poster_url);

    return (
        <>
            <img
                src={`${movie.poster_url}`}
                alt={movie.title}
                className="img-fluid mb-3 mb-md-0"
                style={{ cursor: "pointer", boxShadow: `0 0 25px 10px ${dominantColor}` }}
                data-bs-toggle="modal"
                data-bs-target="#imageModal"
            />

            <Modal id="imageModal" title={movie.title}>
                <button className="btn btn-primary left" onClick={prevImage}>
                    <i className="bi bi-chevron-left"></i>
                </button>

                <img
                    src={`${movie.images[currentIndex].image}`}
                    alt={`movie-image-${currentIndex}`}
                    className="img-fluid"
                />

                <button className="btn btn-primary right" onClick={nextImage}>
                    <i className="bi bi-chevron-right"></i>
                </button>
            </Modal>
        </>
    );
};

export default MovieImageModal;

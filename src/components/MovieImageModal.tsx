import { useState } from "react";

// CSS
import "./MovieImageModal.css";

// Components
import Modal from "../components/Modal";

// Config
import { IMAGE_SIZE_W500 } from "../config/tmbd";

interface MovieImageModalProps {
    movie: Movie;
    movieImages: MovieImageBackdrop[];
}

const MovieImageModal = ({ movie, movieImages }: MovieImageModalProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevImage = () => setCurrentIndex((prev) => (prev === 0 ? movieImages.length - 1 : prev - 1));
    const nextImage = () => setCurrentIndex((prev) => (prev === movieImages.length - 1 ? 0 : prev + 1));

    return (
        <>
            {/* Imagem principal do filme */}
            <img
                src={`${IMAGE_SIZE_W500}${movie.poster_path}`}
                alt={movie.title}
                className="img-fluid mb-3 mb-md-0"
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target="#imageModal"
            />

            <Modal id="imageModal" title={movie.title}>
                <button className="btn btn-primary left" onClick={prevImage}>
                    <i className="bi bi-chevron-left"></i>
                </button>

                <img
                    src={`${IMAGE_SIZE_W500}${movieImages[currentIndex].file_path}`}
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

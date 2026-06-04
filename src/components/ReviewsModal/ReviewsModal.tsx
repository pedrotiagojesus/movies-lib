import Modal from "@components/Modal/Modal";
import ReviewCard from "@components/ReviewCard/ReviewCard";

// CSS
import "./ReviewsModal.css";

// Types
import { MovieReviewMapped } from "@typesLocal/movie.types";

interface ReviewsModalProps {
    id: string;
    title: string;
    reviews: MovieReviewMapped[] | null;
}

const ReviewsModal = ({ id, title, reviews }: ReviewsModalProps) => {
    if (!reviews || reviews.length === 0) {
        return "";
    }

    return (
        <Modal id={id} title={title} size="lg" className={["modal-dialog-scrollable reviews-modal-content"]}>
            <div className="reviews-modal-content">
                {reviews.length === 0 && <p>No reviews available.</p>}

                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </Modal>
    );
};

export default ReviewsModal;

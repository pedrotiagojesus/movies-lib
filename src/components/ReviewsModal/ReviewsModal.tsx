import Modal from "@components/Modal/Modal";
import ReviewCard from "@components/ReviewCard/ReviewCard";

// CSS
import "./ReviewsModal.css"

interface ReviewsModalProps {
    id: string;
    title: string;
    reviews: MovieReview[];
}

const ReviewsModal = ({ id, title, reviews }: ReviewsModalProps) => {
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

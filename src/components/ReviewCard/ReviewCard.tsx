import "./ReviewCard.css";

interface ReviewCardProps {
    review: MovieReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    const avatar = review.avatar_path
        ? review.avatar_path.startsWith("http")
            ? review.avatar_path
            : `https://image.tmdb.org/t/p/w185${review.avatar_path}`
        : null;

    const date = new Date(review.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <div className="review-card">
            <div className="review-header">
                <div className="review-avatar">
                    {avatar ? (
                        <img src={avatar} alt={review.author} />
                    ) : (
                        <i className="bi bi-person-circle avatar-placeholder"></i>
                    )}
                </div>

                <div className="review-meta">
                    <h4 className="review-author">{review.author}</h4>
                    <span className="review-date">{date}</span>
                </div>
            </div>

            <div className="review-content">
                {review.content}
            </div>
        </div>
    );
};

export default ReviewCard;

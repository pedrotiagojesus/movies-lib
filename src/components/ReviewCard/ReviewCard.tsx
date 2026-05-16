import { useRef, useState, useEffect } from "react";
import "./ReviewCard.css";

interface ReviewCardProps {
    review: MovieReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    const [expanded, setExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            setIsTruncated(contentRef.current.scrollHeight > contentRef.current.clientHeight);
        }
    }, [review.content]);

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

            <div ref={contentRef} className={`review-content ${expanded ? "expanded" : ""}`}>
                {review.content}
            </div>

            {(isTruncated || expanded) && (
                <button className="btn btn-link review-toggle p-0 mt-1" onClick={() => setExpanded((e) => !e)}>
                    {expanded ? "Read less" : "Read more"} <i className={`bi bi-chevron-${expanded ? "up" : "down"}`}></i>
                </button>
            )}
        </div>
    );
};

export default ReviewCard;

type RatingProps = {
    rating: number;
};

export function Rating({ rating }: RatingProps) {
    const max = 10;
    const maxStars = 5;
    const normalized = rating / 2;
    const full = Math.floor(normalized);
    const half = normalized % 1 >= 0.5 ? 1 : 0;
    const empty = maxStars - full - half;

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div className="stars">
                {[...Array(full)].map((_, i) => (
                    <i key={"f" + i} className="bi bi-star-fill" />
                ))}

                {[...Array(half)].map((_, i) => (
                    <i key={"h" + i} className="bi bi-star-half" />
                ))}

                {[...Array(empty)].map((_, i) => (
                    <i key={"e" + i} className="bi bi-star" />
                ))}
            </div>

            <span style={{ fontWeight: 600 }}>
                {rating.toFixed(1)}/{max}
            </span>
        </div>
    );
}

import "./MovieSkeleton.css";

const MovieSkeleton = () => {
    return (
        <div id="movie-page">
            {/* Banner */}
            <div id="movie-banner" className="skeleton-banner">
                <div className="container banner-content">
                    <div className="banner-header"></div>
                    <div className="banner-footer">
                        <div className="skeleton skeleton-title-lg"></div>
                        <div className="skeleton skeleton-text w-50 mt-2"></div>
                        <div className="d-flex gap-2 mt-3">
                            <div className="skeleton skeleton-pill"></div>
                            <div className="skeleton skeleton-pill"></div>
                            <div className="skeleton skeleton-pill"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container content">
                {/* Mobile title */}
                <div className="d-md-none">
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-text w-75 mt-2"></div>
                </div>

                <div className="row mb-3 mt-3">
                    {/* Poster */}
                    <div className="col-sm-3">
                        <div className="skeleton skeleton-poster"></div>

                        <div className="skeleton skeleton-button mt-4"></div>
                    </div>

                    {/* Metadata + Overview */}
                    <div className="col-sm-6">
                        <div className="d-flex align-items-center gap-2">
                            <div className="skeleton skeleton-text w-25"></div>
                            <span className="separator">•</span>
                            <div className="skeleton skeleton-text w-25"></div>
                            <span className="separator">•</span>
                            <div className="skeleton skeleton-text w-25"></div>
                        </div>

                        <div className="mt-3">
                            <div className="skeleton skeleton-text"></div>
                            <div className="skeleton skeleton-text w-75 mt-2"></div>
                            <div className="skeleton skeleton-text w-50 mt-2"></div>
                        </div>

                        {/* Reviews skeleton */}
                        <div className="mt-4">
                            <div className="skeleton skeleton-pill w-50 mt-3"></div>

                            <div className="skeleton skeleton-review mt-3"></div>
                            <div className="skeleton skeleton-review mt-3"></div>
                        </div>
                    </div>

                    {/* Credits */}
                    <div className="col-sm-3">
                        <div className="skeleton skeleton-pill w-25 mt-3"></div>

                        <div className="mt-3">
                            <div className="skeleton skeleton-list-item"></div>
                            <div className="skeleton skeleton-list-item mt-2"></div>
                            <div className="skeleton skeleton-list-item mt-2"></div>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="skeleton skeleton-pill w-50 mt-3"></div>
                <div className="d-flex gap-3 mt-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="skeleton skeleton-card"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieSkeleton;

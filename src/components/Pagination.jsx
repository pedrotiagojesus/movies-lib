import { Link } from "react-router-dom";
import "./Pagination.css";

const Pagination = ({ urlRoute, totalPages, currentNumPage }) => {
    if (totalPages == 0) {
        return;
    }

    const buildUrl = (route, page) => {
        if (route.includes("?")) {
            return `${route}&page=${page}`;
        } else {
            return `${route}?page=${page}`;
        }
    };

    currentNumPage = parseInt(currentNumPage) || 1;
    let startPage, endPage;

    const pageItem = [];

    if (totalPages <= 5) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentNumPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentNumPage + 2 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = currentNumPage - 3;
            endPage = currentNumPage + 2;
        }
    }

    // Previous button
    const previousPageNum = currentNumPage - parseInt(1);

    const previousPageLink =
        previousPageNum >= 0 ? buildUrl(urlRoute, previousPageNum) : "";
    const previousPageDisabled = previousPageNum <= 0 ? "disabled" : "";

    pageItem.push(
        <li className="page-item" key={0}>
            <Link
                className={`page-link ${previousPageDisabled}`}
                to={previousPageLink}
                disabled={previousPageDisabled}
            >
                Previous
            </Link>
        </li>
    );

    // Build pagination items

    for (let i = startPage; i <= endPage; i++) {
        let active = currentNumPage == i ? "active" : "";

        pageItem.push(
            <li className="page-item" key={i}>
                <Link
                    className={`page-link ${active}`}
                    to={buildUrl(urlRoute, i)}
                >
                    {i}
                </Link>
            </li>
        );
    }

    // Next button
    const nextPageNum = currentNumPage + parseInt(1);

    const nextPageLink =
        nextPageNum <= totalPages ? buildUrl(urlRoute, nextPageNum) : "";
    const nextPageDisabled = nextPageNum >= totalPages ? "disabled" : "";

    pageItem.push(
        <li className="page-item" key={999999999}>
            <Link
                className={`page-link ${nextPageDisabled}`}
                to={nextPageLink}
                disabled={nextPageDisabled}
            >
                Next
            </Link>
        </li>
    );

    return (
        <nav
            className="movie-list-pagination"
            aria-label="Movie list navigation"
        >
            <ul className="pagination">{pageItem}</ul>
        </nav>
    );
};

export default Pagination;

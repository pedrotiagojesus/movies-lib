import { useLocation, useParams, useSearchParams } from "react-router-dom";

export const useCurrentURL = () => {
    const location = useLocation();
    const params = useParams();

    const [searchParams] = useSearchParams();

    return {
        pathname: location.pathname,
        search: location.search,
        searchParams: searchParams,
        params,
    };
};

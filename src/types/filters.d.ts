type SortOption = "original_title" | "popularity" | "revenue" | "primary_release_date" | "title" | "vote_average" | "vote_count";
type SortDirection = "asc" | "desc";

interface SelectBoxSortProps {
    selected: SortOption;
    handleSelect: (value: SortOption) => void;
    sortDirection: SortDirection;
    handleDirection: (value: SortDirection) => void;
}

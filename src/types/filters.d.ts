type SortOption = "popularity" | "title" | "primary_release_date" | "vote_average" | "vote_count";
type SortDirection = "asc" | "desc";

interface SelectBoxSortProps {
    selected: SortOption;
    handleSelect: (value: SortOption) => void;
    sortDirection: SortDirection;
    handleDirection: (value: SortDirection) => void;
}

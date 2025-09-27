const SelectBoxSortBy = ({ selected, handleSelect, sortDirection, handleDirection }: SelectBoxSortProps) => {
    const sortByArr = [
        {
            name: "Popularidade",
            value: "popularity",
        },
        {
            name: "Título",
            value: "title",
        },
        {
            name: "Data de lançamento",
            value: "primary_release_date",
        },
        {
            name: "Média de votos",
            value: "vote_average",
        },
        {
            name: "Nº. de votos",
            value: "vote_count",
        },
    ];

    return (
        <>
            <select
                className="form-select"
                value={selected}
                onChange={(e) => handleSelect(e.target.value as SortOption)}
            >
                {sortByArr.map((sortByRow) => (
                    <option key={sortByRow.value} value={sortByRow.value}>
                        {sortByRow.name}
                    </option>
                ))}
            </select>
            <div className="btn btn-primary">
                {sortDirection === "asc" && <i className="bi bi-sort-up" onClick={() => handleDirection("desc")}></i>}
                {sortDirection === "desc" && <i className="bi bi-sort-down" onClick={() => handleDirection("asc")}></i>}
            </div>
        </>
    );
};

export default SelectBoxSortBy;

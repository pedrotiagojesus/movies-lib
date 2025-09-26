import { FaSortDown, FaSortUp } from "react-icons/fa";

interface SelectBoxSortProps {
    selected: string;
    handleSelect: (value: string) => void;
    sortDirection: string;
    handleDirection: (value: string) => void;
}

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
            <select className="form-select" value={selected} onChange={(e) => handleSelect(e.target.value)}>
                {sortByArr.map((sortByRow) => (
                    <option key={sortByRow.value} value={sortByRow.value}>
                        {sortByRow.name}
                    </option>
                ))}
            </select>
            <div className="btn btn-primary">
                {sortDirection === "asc" && <FaSortUp onClick={() => handleDirection("desc")} />}
                {sortDirection === "desc" && <FaSortDown onClick={() => handleDirection("asc")} />}
            </div>
        </>
    );
};

export default SelectBoxSortBy;

import React from "react";

const SelectBoxSortBy = ({ selected, handleSelect }) => {
    const sortByArr = [
        {
            name: "Popularidade Asc.",
            value: "popularity.asc",
        },
        {
            name: "Popularidade Desc.",
            value: "popularity.desc",
        },
        {
            name: "Título Asc.",
            value: "title.asc",
        },
        {
            name: "Título Desc.",
            value: "title.desc",
        },
        {
            name: "Data de lançamento Asc.",
            value: "primary_release_date.asc",
        },
        {
            name: "Data de lançamento Desc.",
            value: "primary_release_date.desc",
        },
        {
            name: "Média de votos Asc.",
            value: "vote_average.asc",
        },
        {
            name: "Média de votos Desc.",
            value: "vote_average.desc",
        },
        {
            name: "Nº. de votos Asc.",
            value: "vote_count.asc",
        },
        {
            name: "Nº.  de votos Desc.",
            value: "vote_count.desc",
        },
    ];

    return (
        <select
            className="form-select"
            value={selected}
            onChange={(e) => handleSelect(e.target.value)}
        >
            {sortByArr.map((sortByRow) => (
                <option key={sortByRow.value} value={sortByRow.value}>
                    {sortByRow.name}
                </option>
            ))}
        </select>
    );
};

export default SelectBoxSortBy;

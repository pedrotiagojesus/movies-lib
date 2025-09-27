import { BsFilter } from "react-icons/bs";

const FilterTrigger = () => {
    return (
        <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#filter-modal"
        >
            <BsFilter />
        </button>
    );
};

export default FilterTrigger;

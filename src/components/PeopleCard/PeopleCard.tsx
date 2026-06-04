import { Link } from "react-router-dom";

// CSS
import "./PeopleCard.css";

// Hooks
import { useCloseModal } from "@hooks/useCloseModal";

// Types
import { MovieCastMapped, MovieCrewMember } from "@typesLocal/movie.types";

type PersonCardData = MovieCrewMember | MovieCastMapped;

interface PeopleCardProps {
    person: PersonCardData;
}

const PeopleCard = ({ person }: PeopleCardProps) => {
    const closeModal = useCloseModal();
    const role = "character" in person ? person.character : person.department;

    return (
        <div className="person-card">
            <Link to={`/person/${person.id}`} className="person-image-wrapper" onClick={closeModal}>
                {person.image ? (
                    <img src={person.image} alt={person.name} className="person-image" />
                ) : (
                    <i className="bi bi-file-person person-placeholder"></i>
                )}
            </Link>

            <div className="person-info">
                <h5 className="person-name">{person.name}</h5>
                {role && <p className="person-role">{role}</p>}
            </div>
        </div>
    );
};

export default PeopleCard;

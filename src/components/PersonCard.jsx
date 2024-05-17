import { BsFilePerson } from "react-icons/bs";
import "./PersonCard.css";

const imageUrl = import.meta.env.VITE_IMG;

const PersonCard = ({ image, title, subtitle }) => {
    let cardImage = "";
    let emptyImage = <BsFilePerson />;

    if (image) {
        cardImage = `url(${imageUrl}${image})`;
        emptyImage = "";
    }

    return (
        <div className="card person-card">
            <div
                className="ratio img-wrapper"
                style={{
                    backgroundImage: cardImage,
                }}
            >
                {emptyImage}
            </div>
            <div className="card-body">
                <h4 className="card-title" title={title}>
                    {title}
                </h4>
                <h5 className="card-subtitle">{subtitle}</h5>
            </div>
        </div>
    );
};

export default PersonCard;

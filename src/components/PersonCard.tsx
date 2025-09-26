import { BsFilePerson } from "react-icons/bs";

// CSS
import "./PersonCard.css";

// Env
const imageUrl = import.meta.env.VITE_IMG;

interface PersonCardProps {
    image: string;
    title: string;
    subtitle: string;
}

const PersonCard = ({ image, title, subtitle }: PersonCardProps) => {
    const hasPoster = image !== null;
    const backgroundImage = hasPoster ? `url(${imageUrl}${image})` : undefined;

    return (
        <div className="card person-card">
            <div className="ratio img-wrapper" style={backgroundImage ? { backgroundImage } : {}}>
                {!hasPoster && <BsFilePerson />}
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

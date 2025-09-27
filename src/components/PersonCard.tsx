// CSS
import { IMAGE_SIZE_W500 } from "../config/tmbd";
import "./PersonCard.css";

interface PersonCardProps {
    image: string;
    title: string;
    subtitle: string;
}

const PersonCard = ({ image, title, subtitle }: PersonCardProps) => {
    const hasPoster = image !== null;
    const backgroundImage = hasPoster ? `url(${IMAGE_SIZE_W500}${image})` : undefined;

    return (
        <div className="card person-card">
            <div className="ratio img-wrapper" style={backgroundImage ? { backgroundImage } : {}}>
                {!hasPoster && <i className="bi bi-file-person"></i>}
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

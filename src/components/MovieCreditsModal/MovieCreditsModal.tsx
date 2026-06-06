// Css
import "./MovieCreditsModal.css";

// Components
import Modal from "@components/Modal/Modal";
import PeopleCard from "@components/PeopleCard/PeopleCard";

// Types
import { MovieCastMapped, MovieCreditsMapped, MovieCrewMember } from "@typesLocal/movie.types";

interface MovieCreditsModalProps {
    id: string;
    title: string;
    credits: MovieCreditsMapped;
    filterDepartment?: string;
    showCastOnly?: boolean;
}

const MovieCreditsModal = ({ id, title, credits, filterDepartment, showCastOnly }: MovieCreditsModalProps) => {
    if (showCastOnly) {
        return (
            <Modal id={id} className={["modal-dialog-scrollable", "credits-modal"]} title={title} size="lg">
                <div className="credits-content single">
                    <section id="cast">
                        <div className="people-grid">
                            {credits.cast.map((actor) => (
                                <PeopleCard person={actor} key={`cast-p.id-${actor.id}`} />
                            ))}
                        </div>
                    </section>
                </div>
            </Modal>
        );
    }

    if (filterDepartment) {
        const dept = credits.departments.find((d) => d.code === filterDepartment);

        if (!dept) {
            return;
        }

        return (
            <Modal id={id} className={["modal-dialog-scrollable", "credits-modal"]} title={title} size="lg">
                <div className="credits-content single">
                    <section id={dept.code}>
                        <div className="people-grid">
                            {credits.crew[dept.code].map((p) => (
                                <PeopleCard person={p} key={`${dept.code}-p.id-${p.id}`} />
                            ))}
                        </div>
                    </section>
                </div>
            </Modal>
        );
    }

    return (
        <Modal id={id} className={["modal-dialog-scrollable", "credits-modal"]} title={title} size="xl">
            <nav id="credits-nav" className="credits-sidebar nav flex-column">
                {credits.departments.map((d) => (
                    <a className="nav-link" href={`#${d.code}`} key={d.code}>
                        {d.name}
                    </a>
                ))}
                <a className="nav-link" href="#cast">
                    Cast
                </a>
            </nav>

            <div className="credits-content" data-bs-spy="scroll" data-bs-target="#credits-nav">
                {credits.departments.map((d) => (
                    <section id={d.code} key={`section-${d.code}`}>
                        <h3 className="title">{d.name}</h3>
                        <div className="people-grid">
                            {credits.crew[d.code].map((p: MovieCrewMember) => (
                                <PeopleCard person={p} key={`credits-crew-${d.code}-p.id-${p.id}`} />
                            ))}
                        </div>
                    </section>
                ))}

                <section id="cast">
                    <h3 className="title">Cast</h3>
                    <div className="people-grid">
                        {credits.cast.map((p: MovieCastMapped) => (
                            <PeopleCard person={p} key={`credits-cast-${p.id}`} />
                        ))}
                    </div>
                </section>
            </div>
        </Modal>
    );
};

export default MovieCreditsModal;

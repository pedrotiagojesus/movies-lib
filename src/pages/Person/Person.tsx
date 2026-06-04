import { Link, useParams } from "react-router-dom";

// CSS
import "./Person.css";

// Components
import MovieCard from "@components/MovieCard/MovieCard";
import SlideArrows from "@components/SlideArrows";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { moviesOptions } from "@config/splideOptions";

// Hooks
import { usePerson } from "@hooks/usePerson";

const Person = () => {
    const { id } = useParams();
    const personId = id || "";

    const { data: person, isLoading: isLoadingPerson } = usePerson(personId);
    const credits = person?.movie_credits ?? { cast: [], crew: [] };
    const images = person?.images || [];

    if (!person || isLoadingPerson) {
        return (
            <div id="person-page" className="container">
                <div className="row mt-4">
                    <div className="col-md-3">
                        <div className="skeleton skeleton-photo" />
                    </div>
                    <div className="col-md-9">
                        <div className="skeleton skeleton-title-lg" />
                        <div className="skeleton skeleton-text w-50 mt-2" />
                        <div className="skeleton skeleton-text w-75 mt-3" />
                        <div className="skeleton skeleton-text w-75 mt-1" />
                        <div className="skeleton skeleton-text w-50 mt-1" />
                    </div>
                </div>
            </div>
        );
    }

    const knownFor = (credits?.cast ?? [])
        .slice()
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 12);

    const castCredits = credits?.cast ?? [];
    const crewCredits = credits?.crew ?? [];

    return (
        <div id="person-page" className="container">
            {/* HEADER */}
            <section className="mt-4">
                <div className="row">
                    <div className="col-md-3">
                        {person.profile_image ? (
                            <img
                                src={person.profile_image}
                                alt={person.name}
                                className="img-fluid rounded person-photo"
                            />
                        ) : (
                            <div className="person-photo-placeholder">
                                <i className="bi bi-person-fill"></i>
                            </div>
                        )}
                    </div>
                    <div className="col-md-9">
                        <h1 className="title">{person.name}</h1>
                        {person.department && <p className="person-department">{person.department}</p>}

                        <div className="person-meta">
                            {person.birthday && (
                                <div className="meta-item">
                                    <span className="meta-label">Born</span>
                                    <span>
                                        {person.birthday}
                                        {person.place_of_birth && ` • ${person.place_of_birth}`}
                                    </span>
                                </div>
                            )}

                            {person.deathday && (
                                <div className="meta-item">
                                    <span className="meta-label">Died</span>
                                    <span>{person.deathday}</span>
                                </div>
                            )}

                            {person.popularity && (
                                <div className="meta-item">
                                    <span className="meta-label">Popularity</span>
                                    <span>{person.popularity.toFixed(1)}</span>
                                </div>
                            )}
                        </div>

                        {person.biography && (
                            <div className="person-biography mt-3">
                                <h3 className="subtitle">Biography</h3>
                                <p>{person.biography}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* KNOWN FOR */}
            {knownFor.length > 0 && (
                <section className="mt-5">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h2 className="title">Known For</h2>
                    </div>

                    <Splide options={moviesOptions} hasTrack={false} className="movie-slide">
                        <SplideTrack>
                            {knownFor.map((movie) => (
                                <SplideSlide key={movie.id}>
                                    <MovieCard movie={movie} />
                                </SplideSlide>
                            ))}
                        </SplideTrack>
                        <SlideArrows />
                    </Splide>
                </section>
            )}

            {/* FILMOGRAPHY */}
            <section className="mt-5">
                <h2 className="title">Filmography</h2>

                <div className="row mt-3">
                    <div className="col-md-6">
                        <h3 className="subtitle">Acting</h3>
                        {castCredits.length === 0 && <p>No acting credits.</p>}

                        <ul className="list-unstyled filmography-list">
                            {castCredits
                                .slice()
                                .sort((a, b) => (b.release_date || "").localeCompare(a.release_date || ""))
                                .map((item) => (
                                    <li key={`${item.credit_id}-${item.id}`} className="filmography-item">
                                        <span className="filmography-year">
                                            {item.release_date ? item.release_date.slice(0, 4) : "—"}
                                        </span>
                                        <Link to={`/movie/${item.id}`} className="filmography-title">
                                            {item.title}
                                        </Link>
                                        {item.character && (
                                            <span className="filmography-role">as {item.character}</span>
                                        )}
                                    </li>
                                ))}
                        </ul>
                    </div>

                    <div className="col-md-6">
                        <h3 className="subtitle">Crew</h3>
                        {crewCredits.length === 0 && <p>No crew credits.</p>}

                        <ul className="list-unstyled filmography-list">
                            {crewCredits
                                .slice()
                                .sort((a, b) => (b.release_date || "").localeCompare(a.release_date || ""))
                                .map((item) => (
                                    <li key={`${item.credit_id}-${item.id}`} className="filmography-item">
                                        <span className="filmography-year">
                                            {item.release_date ? item.release_date.slice(0, 4) : "—"}
                                        </span>
                                        <Link to={`/movie/${item.id}`} className="filmography-title">
                                            {item.title}
                                        </Link>
                                        {item.job && <span className="filmography-role">({item.job})</span>}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* IMAGES */}
            {images && images.length > 0 && (
                <section className="mt-5 mb-5">
                    <h2 className="title">Photos</h2>
                    <div className="row mt-3">
                        {images.slice(0, 12).map(
                            (img, i) =>
                                img.image && (
                                    <div key={i} className="col-6 col-md-3 mb-3">
                                        <img
                                            src={img.image}
                                            alt={`${person.name} ${i + 1}`}
                                            className="img-fluid rounded person-photo-grid"
                                        />
                                    </div>
                                ),
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Person;

import { Link } from "react-router-dom";

type DevPageProps = {
    title?: string;
    subtitle?: string;
};

const UnderConstruction = ({
    title = "Page under development",
    subtitle = "We're currently working on this section. New content will be available soon.",
}: DevPageProps) => {
    return (
        <section className="py-5">
            <div className="text-center mb-4">
                <h1 className="fw-bold">{title}</h1>
                <p className="text-muted">{subtitle}</p>
            </div>

            <div className="text-center mt-4">
                <Link className="btn btn-primary" type="button" to="/">
                    Go back
                </Link>
            </div>
        </section>
    );
};

export default UnderConstruction;

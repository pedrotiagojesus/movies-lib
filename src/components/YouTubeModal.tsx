import { useState, useEffect } from "react";

const YouTubeModal = ({ url, id }: { url: string; id: string }) => {
    const [src, setSrc] = useState("");

    useEffect(() => {
        const modal = document.getElementById(id);
        if (!modal) return;

        const handleShow = () => setSrc(url);
        const handleHide = () => setSrc("");

        modal.addEventListener("show.bs.modal", handleShow);
        modal.addEventListener("hidden.bs.modal", handleHide);

        return () => {
            modal.removeEventListener("show.bs.modal", handleShow);
            modal.removeEventListener("hidden.bs.modal", handleHide);
        };
    }, [id, url]);

    return (
        <iframe
            width="100%"
            height="500"
            src={src}
            title="Movie Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        />
    );
};

export default YouTubeModal;

import { useState, useEffect } from "react";

const YouTubeModal = ({ url, id }: { url: string; id: string }) => {
    const [src, setSrc] = useState("");

    useEffect(() => {
        const modal = document.getElementById(id);
        if (!modal) return;

        const handleShow = () => {
            const separator = url.includes("?") ? "&" : "?";
            setSrc(`${url}${separator}autoplay=1`);
            document.querySelector(".modal-backdrop")?.classList.add("modal-backdrop--dark");
        };
        const handleHide = () => {
            setSrc("");
            document.querySelector(".modal-backdrop")?.classList.remove("modal-backdrop--dark");
        };

        modal.addEventListener("shown.bs.modal", handleShow);
        modal.addEventListener("hidden.bs.modal", handleHide);

        return () => {
            modal.removeEventListener("show.bs.modal", handleShow);
            modal.removeEventListener("hidden.bs.modal", handleHide);
        };
    }, [id, url]);

    return (
        <iframe
            width="100%"
            height="100%"
            src={src}
            title="Movie Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
        />
    );
};

export default YouTubeModal;

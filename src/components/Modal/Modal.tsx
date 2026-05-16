import { ReactNode, useRef } from "react";

// CSS
import "./Modal.css";

type ModalProps = {
    id: string;
    className?: string[];
    title?: string;
    children: ReactNode;
    size?: "sm" | "lg" | "xl" | "";
    titleTag?: keyof JSX.IntrinsicElements;
};

const Modal = ({ id, className = [], title, children, size = "", titleTag }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const modalClass = ["modal", "fade", ...className].join(" ");
    const TitleTag = titleTag || "h5";

    return (
        <div
            className={modalClass}
            id={id}
            tabIndex={-1}
            aria-labelledby={`${id}Label`}
            aria-hidden="true"
            ref={modalRef}
        >
            <div className={`modal-dialog modal-dialog-centered modal-${size}`}>
                <div className="modal-content">
                    {title && (
                        <div className="modal-header">
                            <TitleTag className="modal-title" id={`${id}Label`}>
                                {title}
                            </TitleTag>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                    )}
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;

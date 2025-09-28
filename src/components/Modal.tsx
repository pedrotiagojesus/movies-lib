import { ReactNode, useEffect, useRef } from "react";

// CSS
import "./Modal.css";

type ModalProps = {
    id: string;
    title?: string;
    children: ReactNode;
    size?: "sm" | "lg" | "xl" | "";
};

const Modal = ({ id, title, children, size = ""}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    return (
        <div
            className="modal fade"
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
                            <h5 className="modal-title" id={`${id}Label`}>
                                {title}
                            </h5>
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

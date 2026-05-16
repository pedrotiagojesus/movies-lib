export const useCloseModal = () => {
    return () => {
        const modalEl = document.querySelector(".modal.show") as HTMLElement | null;
        if (modalEl) {
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal?.hide();
        }
    };
};

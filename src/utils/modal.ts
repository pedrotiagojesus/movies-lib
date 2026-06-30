export const closeBootstrapModal = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const BootstrapModal =
        (window as any).bootstrap?.Modal ||
        (window as any)["bootstrap"]?.Modal;

    if (!BootstrapModal) {
        console.error("Bootstrap Modal not found");
        return;
    }

    const modal = new BootstrapModal(el);
    modal.hide();
};

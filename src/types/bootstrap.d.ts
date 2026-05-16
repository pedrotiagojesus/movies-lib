declare namespace bootstrap {
    class Modal {
        constructor(element: HTMLElement);
        static getInstance(element: HTMLElement): Modal | null;
        hide(): void;
        show(): void;
    }
}

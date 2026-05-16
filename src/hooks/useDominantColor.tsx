import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";

export const useDominantColor = (imageUrl?: string | null) => {
    const [color, setColor] = useState("rgba(0,0,0,0.5)");

    useEffect(() => {
        if (!imageUrl) return;

        const fac = new FastAverageColor();
        const proxied = `https://images.weserv.nl/?url=${encodeURIComponent(imageUrl)}`;

        fac.getColorAsync(proxied)
            .then((res) => setColor(res.rgba))
            .catch(() => setColor("rgba(0,0,0,0.5)"));
    }, [imageUrl]);

    return color;
};

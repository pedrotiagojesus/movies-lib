import api from "./api";

// Types
import { PersonMapped } from "@typesLocal/person.types";

export const getPerson = async (id: string): Promise<PersonMapped> => {
    const res = await api.get(`person/${id}`, {
        params: {
            append_to_response: "images,movie_credits",
        },
    });
    return res.data;
};

import api from "./api";

export const getPerson = async (id: string): Promise<Person> => {
    const res = await api.get("person", {
        params: {
            id: id,
        },
    });
    return res.data;
};

import api from "./api";

// Types
import { CollectionMapped } from "@typesLocal/collection.type";

export const getCollection = async (id: string): Promise<CollectionMapped> => {
    const res = await api.get(`collection/${id}`);
    return res.data;
};

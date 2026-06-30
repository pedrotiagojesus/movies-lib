import { useQuery } from "@tanstack/react-query";

// Service
import { getCollection } from "@services/collectionService";

// Type
import { CollectionMapped } from "@typesLocal/collection.type";

export function useCollection(id: string) {
    return useQuery<CollectionMapped>({
        queryKey: ["collection-movies", id],
        queryFn: () => getCollection(id),
        staleTime: 1000 * 60 * 5,
    });
}

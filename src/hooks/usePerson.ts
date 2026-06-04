import { useQuery } from "@tanstack/react-query";

// Service
import { getPerson } from "@services/personService";

export function usePerson(personId: string) {
    return useQuery<Person>({
        queryKey: ["person", personId],
        queryFn: () =>
            getPerson(personId),
        staleTime: 1000 * 60 * 5,
    });
}

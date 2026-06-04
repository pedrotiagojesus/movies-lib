import { useQuery } from "@tanstack/react-query";

// Service
import { getPerson } from "@services/personService";

// Types
import { PersonMapped } from "@typesLocal/person.types";

export function usePerson(personId: string) {
    return useQuery<PersonMapped>({
        queryKey: ["person", personId],
        queryFn: () =>
            getPerson(personId),
        staleTime: 1000 * 60 * 5,
    });
}

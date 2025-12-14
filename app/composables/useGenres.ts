import type { FetchError } from "ofetch";

// later if we had bigger application we can centralize such constants
const TIME_OUT = 10000;

export function useGenres() {
  const {
    data: genres,
    error,
    pending,
    refresh,
  } = useAsyncData("genres", () => $fetch<SingaGenresResponse>("/api/genres"), {
    timeout: TIME_OUT,
    // since we don't have pagination implemented yet, we just fetch all genres at once
    transform: (data) => data.results,
  });

  return {
    genres,
    error,
    pending,
    refresh,
  };
}

export function useGenre(id: MaybeRefOrGetter<string>) {
  const {
    data: genre,
    error,
    pending,
    refresh,
  } = useAsyncData(`genre-${toValue(id)}`, () => $fetch<SingaGenre>(`/api/genres/${toValue(id)}`), {
    timeout: TIME_OUT,
  });

  const isNotFound = computed(() => {
    const fetchError = error.value as FetchError | null;
    return fetchError?.statusCode === 404;
  });

  return {
    genre,
    error,
    pending,
    refresh,
    isNotFound,
  };
}

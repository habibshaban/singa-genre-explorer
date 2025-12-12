export function useGenres() {
  const {
    data: genres,
    error,
    pending,
    refresh,
  } = useAsyncData("genres", () => $fetch<SingaGenresResponse>("/api/genres"), {
    timeout: 10000,
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

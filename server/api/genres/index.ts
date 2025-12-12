export default defineCachedEventHandler(
  async (event): Promise<SingaGenresResponse> => {
    const { apiBaseUrl } = useRuntimeConfig(event);
    const url = `${apiBaseUrl}/genres?page_size=1000`;
    try {
      const genresResponse = await $fetch<SingaGenresResponse>(url);
      return genresResponse;
    } catch {
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: "Failed to fetch genres",
      });
    }
  },
  {
    name: "genres-cache",
  }
);

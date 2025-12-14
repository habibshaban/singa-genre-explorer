import { CACHE_TTL } from "~~/server/constants/cache";

export default defineCachedEventHandler(
  async (event): Promise<SingaGenresResponse> => {
    const { apiBaseUrl } = useRuntimeConfig(event);
    const url = `${apiBaseUrl}/genres?page_size=1000`;
    try {
      const genresResponse = await $fetch<SingaGenresResponse>(url, {
        // since we are using caching here, we can have a shorter timeout and retries
        timeout: 5000,
        retry: 2,
        retryDelay: 500,
      });
      return genresResponse;
    } catch (error) {
      // Since we are fetching from external API, we should set status code to 502, for upstream errors
      throw createError({
        statusCode: 502,
        statusMessage: "Bad Gateway",
        message: "Invalid upstream response when fetching genres",
        cause: error,
      });
    }
  },
  {
    maxAge: CACHE_TTL,
    name: "genres-cache",
  }
);

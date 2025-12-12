import { FetchError } from "ofetch";

export default defineCachedEventHandler(
  async (event): Promise<SingaGenre> => {
    const { apiBaseUrl } = useRuntimeConfig(event);
    const id = getRouterParam(event, "id");

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Genre ID is required",
      });
    }
    const url = `${apiBaseUrl}/genres/${id}`;
    try {
      const genreResponse = await $fetch<SingaGenre>(url);
      return genreResponse;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 404) {
        throw createError({
          statusCode: 404,
          statusMessage: "Not Found",
          message: `Genre with ID "${id}" was not found`,
        });
      }
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: "Failed to fetch genre",
      });
    }
  },
  {
    name: "genre-cache",
    getKey: (event) => {
      const id = getRouterParam(event, "id");
      return `genre-${id}`;
    },
  }
);

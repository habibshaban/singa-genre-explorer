import { FetchError } from "ofetch";
import { CACHE_TTL } from "~~/server/constants/cache";
const POSITIVE_INT_RE = /^\d+$/;

export default defineCachedEventHandler(
  async (event): Promise<SingaGenre> => {
    const { apiBaseUrl } = useRuntimeConfig(event);
    const id = getRouterParam(event, "id");

    if (!id || Array.isArray(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Genre ID is required",
      });
    }

    if (!POSITIVE_INT_RE.test(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Genre ID must be a positive integer",
      });
    }

    const idNum = Number(id);
    const url = `${apiBaseUrl}/genres/${idNum}`;
    try {
      const genreResponse = await $fetch<SingaGenre>(url);
      return genreResponse;
    } catch (error) {
      if (error instanceof FetchError && error.statusCode === 404) {
        throw createError({
          statusCode: 404,
          statusMessage: "Not Found",
          message: `Genre with ID "${idNum}" was not found`,
          cause: error,
        });
      }
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: "Failed to fetch genre",
        cause: error,
      });
    }
  },
  {
    maxAge: CACHE_TTL,
    name: "genre-cache",
    getKey: (event) => {
      const id = getRouterParam(event, "id");
      return `genre-${id}`;
    },
  }
);

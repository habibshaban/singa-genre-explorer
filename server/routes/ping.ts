// This is simple health check endpoint and we would call it from external services to check
// if the server is up and running.
// and since we didn't want to have /api/ping, we create this route under /server/routes
export default defineEventHandler(() => ({ ping: "pong" }));

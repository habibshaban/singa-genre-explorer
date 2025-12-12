# Singa Senior Web Developer – Take-Home Assignment

This project is my solution for the Singa Senior Web Developer assignment.
The goal was to build a small Nuxt 4 application that lists karaoke genres from the Singa public API, allows searching, provides a detail page for each genre, renders a static About page, and exposes a `/ping` endpoint.

I tried to keep everything simple but still show my understanding of Nuxt 4, Nitro, Composition API patterns, TypeScript, and some good architecture thinking.

---

## How to Run the Project

To run the project locally:

```bash
pnpm install
pnpm run dev
```

After that, open the URL shown in the terminal (by default `http://localhost:3000`).

The application does not require any authentication or environment variables.
By default, it uses the public Singa API (`https://api.singa.com/v1.4`).

You can also test the health check endpoint by visiting:

```
http://localhost:3000/ping
```

It should return:

```json
{ "ping": "pong" }
```

---

## My Thought Process While Building

When I started the assignment, I wanted to make sure that the structure of the code is clear and easy to follow, and that every piece has a purpose. Because this is a small assignment, I didn’t want to over-engineer or add things that were not needed, but I still wanted the code to look like something I would feel comfortable shipping in a real production environment.

I began by setting up a clean Nuxt 4 app with TypeScript enabled.
I used **Nuxt UI** for a few small UI components (like inputs and buttons) and **TailwindCSS** only for layout and spacing. My goal was not to design anything fancy, but just to have a clean and readable UI. The important focus of the assignment was architecture and data handling, not styling.

---

## How I Approached Fetching and Caching the Data

The biggest architectural question for me was:
**"Where should the caching happen?"**

Nuxt 4 and Nitro give several options:

1. **Client-side caching**
   (e.g., `useAsyncData` cached keys, composables storing state)
2. **Page caching**
   (`routeRules`, prerendered pages, ISR, etc.)
3. **Function/Data caching**
   (`defineCachedFunction`, `cachedFetch`)
4. **Server route caching**
   (`defineCachedEventHandler`)

At the beginning, I considered all of them and asked myself what makes the most sense for this specific assignment and how Singa would probably structure such a feature.

### Why I did _not_ choose client-side caching

Client caching is simple, but it does not benefit SSR and does not reduce external API calls between users. Every new client session would still hit the external Singa API. Since genres are fairly static, this didn’t feel optimal.

### Why I did _not_ use page caching

Nuxt page caching works well for static content (like the About page), but the genre list and genre detail pages depend on dynamic API calls. The assignment also asked to use `useAsyncData`, which already implies data-driven rendering, so page-level caching didn’t feel like the right tool.

### Why I did _not_ use function-level caching

`defineCachedFunction` and similar tools are great, but they are usually best when the same function is reused in many contexts. In this assignment, the reuse happens through server API endpoints, not through shared functions, so it felt slightly less natural.

### Why I chose **server-side route caching with `defineCachedEventHandler`**

This option matched the problem perfectly for a few reasons:

- It keeps **all external API communication on the server**, not on the client.
- SSR and CSR both benefit from the same shared cache.
- It reduces external traffic significantly, which matters in scalable apps.
- It keeps the frontend simple: it only talks to `/api/genres` and `/api/genres/[id]`.
- Nuxt’s Nitro cache is very fast and easy to configure.

So in the end, server-side caching felt like the most realistic and elegant solution.

### How the caching works

- `/api/genres` fetches all genres from the Singa API and caches the result for one hour.
  Because genres rarely change, a 1-hour TTL felt like a reasonable balance between freshness and performance.

- `/api/genres/[id]` fetches each genre individually and also caches the result using a cache key like `genre-12`.

This way, both the list and detail endpoints benefit from caching, but each can be updated independently.
If I were building this for production, I could later move the cache to Redis or another shared store without changing the frontend code.

---

## Application Structure

### Genres List Page (`/`)

Here I use `useGenres()` which internally calls `/api/genres`.
The data is then filtered using a debounced search input. I added loading, error and empty states.
The list uses a reusable `GenreItem` component.

### Genre Detail Page (`/genres/[id]`)

This page uses `useGenre(id)`.
If the server rejects with 404, I show a nice “not found” view.
If the error is something else (like 500), I show a generic error state with retry button.

I also added SEO meta tags that update dynamically based on the genre name.

### About Page (`/about`)

This page is prerendered using `routeRules`.
It is fully static and has its own SEO meta tags.

### `/ping` Endpoint

Simple Nitro route at `server/routes/ping.ts` that returns `{ ping: "pong" }`.

### Error Page

Custom `error.vue` that handles 404, 500 and generic errors and provides a button to go home.

---

## UI and Accessibility Notes

I used semantic HTML elements such as `header`, `nav`, `main`, and `footer`.
I added a **Skip to main content** link to support keyboard navigation.
The list uses `<ul>` and `<li>` for accessibility.
Everything is spaced using Tailwind in a minimal way.

I didn’t want to over-style the app, so the design is intentionally simple and not distracting.

---

## Time Spent

It is hard to measure exactly because I like to double-check things, but roughly:

- Project setup and layout: ~20 minutes
- Composables + thinking about caching: ~35 minutes
- Server API endpoints + caching: ~25–30 minutes
- Pages (list + detail + about): ~45–50 minutes
- Error handling, polish, cleaning: ~20 minutes
- README: ~5 minutes

Total: ~2 hours (slightly more with refinement).

---

## AI Usage

Here is where I used AI:

- Generated an initial **layout** folder structure, then I manually improved accessibility and refined styling
- Used **Copilot** for some commit message suggestions
- Helped create a simple **genres routing/pages** structure
- Helped think about **caching edge cases** for the single-genre API (404 vs 500)
- Helped create an initial `useGenres` composable
- Helped with the initial design for the **list page** and the **GenreItem** component
- Helped draft the initial **search input** and filter logic
- Helped with the first version of **Empty / Error / Loading** state components
- Helped with the idea of using one `GenreItem` component for both list and detail view
- Helped with the “Genre not found” UI state
- Helped generate the initial text for SEO title/description on the single genre page
- Helped create the initial About page text/meta
- Helped create the initial `error.vue` page
- And In the End Helped me to create this nice Readme file:)

Final decisions, cleanup, and integration were done by me to match the assignment requirements and keep the code readable.

---

## Final Notes

I tried to keep the solution readable and structured, and I focused on a clean architecture rather than adding too many features. My goal was to show the way I think, how I organize a small codebase, and how I approach small design decisions like caching, data flow, state handling, and semantics.

If you have any questions, I’m happy to explain any detail.

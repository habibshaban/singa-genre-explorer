// since these can be used in multiple places within the app we created these types in a shared folder
// and nuxt will auto import them where needed

export interface SingaGenresResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SingaGenre[];
}

export interface SingaGenre {
  id: number;
  resource_id: string;
  name: string;
  created: string;
  updated: string;
  imagebank: {
    id: number;
    title: string;
    images: string;
  };
}

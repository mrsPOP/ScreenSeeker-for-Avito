interface MovieWithFilters {
  name?: string;
  id: string;
  year?: number;
  poster?: {
    url: string;
    previewUrl: string;
  };
  genres?: {
    name: string;
  };
  ageRating?: string;
};

interface Movie {
  id: number
  name: string
  alternativeName: string
  enName: string
  type: string
  year: number
  description: string
  shortDescription: string
  movieLength: number
  names: Name[]
  externalId: ExternalId
  logo: Logo
  poster: Poster
  backdrop: Backdrop
  rating: Rating
  votes: Votes
  genres: Genre[]
  countries: Country[]
  releaseYears: ReleaseYear[]
  isSeries: boolean
  ticketsOnSale: boolean
  totalSeriesLength: number
  seriesLength: number
  ratingMpaa: string
  ageRating: number
  top10: number
  top250: number
  typeNumber: number
  status: string
  persons: Person[]
}

interface Person {
  id: number
  photo: string
  name: string
  enName: string
  description: string
  profession: string
  enProfession: string
}

interface Name {
  name: string
  language: string
  type: string
}

interface ExternalId {
  kpHD: string
  imdb: string
  tmdb: number
}

interface Logo {
  url: string
}

interface Backdrop {
  url: string
  previewUrl: string
}

interface Rating {
  kp: number
  imdb: number
  tmdb: number
  filmCritics: number
  russianFilmCritics: number
  await: number
}

interface Votes {
  kp: string
  imdb: number
  tmdb: number
  filmCritics: number
  russianFilmCritics: number
  await: number
}

interface Genre {
  name: string
}

interface Country {
  name: string
}

interface ReleaseYear {
  start: number
  end: number
}

interface FieldValue {
  name: string;
  slug: string;
}

interface Season {
  movieId: number
  number: number
  episodesCount: number
  episodes: Episode[]
  poster: Poster
  name: string
}

interface Episode {
  number: number
  name: string
  enName: string
  description: string
  still: Still
  airDate: string
  enDescription: string
}

interface Still {
  url: string
  previewUrl: string
}

interface Poster {
  url: string
  previewUrl: string
}

interface Review {
  movieId: number;
  review: string;
  author: string;
}

interface MoviePoster {
  movieId: number;
  url: string;
}

interface SimilarMovie {
  id: number
  name: string
  enName: string
  alternativeName: string
  type: string
  poster: Poster
  year: number
  rating: Rating
}
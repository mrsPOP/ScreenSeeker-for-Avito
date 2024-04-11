export const movieDataMock = {
  title: "Властелин колец: Возвращение короля",
  description: "Последняя часть эпической трилогии о походе за уничтожением великой силы зла.",
  rating: 4.8,
  actors: [
    { name: "Элайджа Вуд", id: 1 },
    { name: "Иэн МакКеллен", id: 2 },
    { name: "Лив Тайлер", id: 3 },
  ],
  seasons: [
    {
      seasonNumber: 1,
      episodes: [
        { episodeNumber: 1, title: "Начало Пути" },
        { episodeNumber: 2, title: "Меч и камень" },
      ],
    },
  ],
  reviews: [
    { content: "Замечательное кино! Один из лучших фильмов всех времен.", author: "Джон Доу" },
    { content: "Эпическая сага с невероятными спецэффектами и глубоким сюжетом.", author: "Сара Коннор" },
  ],
  posters: [
    "https://example.com/posters/lord_of_the_rings_1.jpg",
    "https://example.com/posters/lord_of_the_rings_2.jpg",
  ],
};

export const similarMoviesMock = [
  {
    id: 1,
    title: "Хоббит: Нежданное путешествие",
    posterUrl: "https://example.com/posters/the_hobbit.jpg",
  },
  {
    id: 2,
    title: "Хоббит: Пустошь Смауга",
    posterUrl: "https://example.com/posters/the_hobbit2.jpg",
  },
  {
    id: 3,
    title: "Хоббит: Битва пяти воинств",
    posterUrl: "https://example.com/posters/the_hobbit3.jpg",
  },
];

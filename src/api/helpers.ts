export function findMostCommonHeightPosters(posters: MoviePoster[]): MoviePoster[] {
  const heightFrequency: Record<number, number> = {};
  let mostCommonHeight = 0;
  let mostCommonHeightFrequency = 0;

  posters.forEach(poster => {
    if (heightFrequency[poster.height]) {
      heightFrequency[poster.height]++;
    } else {
      heightFrequency[poster.height] = 1;
    }

    if (heightFrequency[poster.height] > mostCommonHeightFrequency) {
      mostCommonHeight = poster.height;
      mostCommonHeightFrequency = heightFrequency[poster.height];
    }
  });

  return posters.filter(poster => poster.height === mostCommonHeight);
}

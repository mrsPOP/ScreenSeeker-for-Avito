import { Descriptions, Rate } from "antd";

const ratingLabels: { [key in keyof Rating]: string } = {
  kp: "КиноПоиск",
  imdb: "IMDb",
  tmdb: "TMDb",
  filmCritics: "Критики",
  russianFilmCritics: "Российские критики",
  await: "Ожидание зрителей",
};

const Rating = ({ rating }: { rating: Rating | null }) => {
  return (
    <>
      {rating && (
        <Descriptions title="Рейтинг фильма" bordered column={1}>
          {Object.entries(rating).map(([key, value]) => {
            if (value === 0 || key === 'await' || value === undefined) {
              return null;
            }
            const label = ratingLabels[key as keyof Rating];
            const rateValue = value! > 10 ? undefined : value!;

            return (
              <Descriptions.Item label={label} key={key}>
                {value!.toFixed(1)}
                {rateValue !== undefined && (
                  <Rate
                    disabled
                    value={rateValue}
                    count={10}
                    style={{marginInlineStart: "10px"}}
                  />
                )}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      )}
    </>
  );
};

export default Rating;
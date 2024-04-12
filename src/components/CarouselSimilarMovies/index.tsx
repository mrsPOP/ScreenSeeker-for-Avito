import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";

const CarouselSimilarMovies = ({
  similarMovies,
}: {
  similarMovies: SimilarMovie[];
}) => {
  const navigate = useNavigate();

  return (
    <Carousel
      autoplay
      slidesToShow={4}
      dots={false}
      responsive={[
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 1,
          },
        },
      ]}
    >
      {similarMovies.map((similarMovie) => (
        <div
          key={similarMovie.id}
          onClick={() => {
            navigate(`/movie/${similarMovie.id}`);
            window.scrollTo(0, 0);
          }}
        >
          <div
            style={{
              cursor: "pointer",
            }}
          >
            <img
              src={similarMovie.poster.previewUrl}
              alt={`Похожий фильм: ${similarMovie.name}`}
              style={{
                aspectRatio: "291 / 436",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <h4>{similarMovie.name}</h4>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselSimilarMovies;

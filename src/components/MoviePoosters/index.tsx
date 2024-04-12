import { Carousel } from 'antd';

const MoviePostersCarousel = ({ posters }: { posters: MoviePoster[] }) => {
  return (
    <Carousel autoplay>
      {posters.map((poster, index) => (
        <div key={index} style={{ textAlign: 'center' }}>
          <img
            src={poster.url}
            alt={`Постер ${index + 1}`}
            style={{
              inlineSize: '100%',
              maxInlineSize: '90%',
              maxBlockSize: '400px',
              objectFit: 'contain',
              margin: '0 auto',
            }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default MoviePostersCarousel;
import { Card } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {
  id: string;
  name?: string;
  poster?: {
    url: string;
    previewUrl: string;
  };
  year?: number;
  countries?: {
    name: string;
  }[];
};

const MovieItem = (props: Props) => {
  const countriesString = props.countries
    ?.map((country) => country.name)
    .join(", ");

  const navigate = useNavigate();

  const handleClick = () => {
    props.id && navigate(`/movie/${props.id}`);
  };
  return (
    <Card
      onClick={handleClick}
      hoverable
      style={{
        inlineSize: "240px",
        margin: "20px auto",
        maxBlockSize: "500px",
        blockSize: "100%",
      }}
      cover={<img alt="постер" src={props?.poster?.previewUrl} />}
    >
      <Card.Meta
        title={props.name}
        description={
          <>
            <div>Год выхода: {props.year}</div>
            {countriesString && <div>Страна: {countriesString}</div>}
          </>
        }
        style={{ textAlign: "center" }}
      />
    </Card>
  );
};

export default MovieItem;

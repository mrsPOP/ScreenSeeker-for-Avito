import { Card } from "antd";

type Props = {
  id?: string;
  name?: string;
  poster?: {
    url: string;
    previewUrl: string;
  };
  year?: number;
};

const MovieItem = (props: Props) => {
  return (
    <Card
      hoverable
      style={{ width: 240, margin: '20px auto' }} // отцентровать саму карточку и добавить отступы сверху и снизу
      cover={<img alt="постер" src={props?.poster?.url} />}
    >
      <Card.Meta 
        title={props.name} 
        description={`Год выхода: ${props.year}`} 
        style={{ textAlign: 'center' }} // центрирование текста внутри Card.Meta
      />
    </Card>
  );
};

export default MovieItem;

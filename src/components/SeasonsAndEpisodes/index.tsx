import { List } from 'antd';

const SeasonsAndEpisodes = ({ seasons }: { seasons: Season[] }) => {
  return (
    <List
      itemLayout="vertical" 
      dataSource={seasons.slice().reverse()}
      renderItem={(season: Season) => (
        <>
          <List.Item>
            <b>{season.name}</b>
          </List.Item>
          {season.episodes.map((episode) => (
            <List.Item key={episode.number}>
              Серия {episode.number}: {episode.name}
            </List.Item>
          ))}
        </>
      )}
      pagination={{
        pageSize: 1,
        hideOnSinglePage: true,
      }}
    />
  );
};

export default SeasonsAndEpisodes;
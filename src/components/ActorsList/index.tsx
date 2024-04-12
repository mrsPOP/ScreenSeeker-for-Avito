import { List } from "antd";

const ActorsList = ({ persons }: { persons: Person[] }) => {
  const actors = persons.filter(
    (person) => person.profession === "актеры" && person.name
  );

  return (
    <List
      dataSource={actors}
      renderItem={(actor) => <List.Item>{`${actor.name} - ${actor.description}`}</List.Item>}
      pagination={{
        pageSize: 10,
        hideOnSinglePage: true,
      }}
    />
  );
};

export default ActorsList;

import React, { useState } from 'react';
import { List, Button } from 'antd';
import { maxLength } from './constants';

const ReviewItem = ({ author, review }: Review) => {
  const [expanded, setExpanded] = useState(false);

  const renderContent = (text: string) => {
    if (text.length <= maxLength) {
      return <span>{text}</span>;
    }
    return (
      <div>
        {expanded ? text : `${text.substring(0, maxLength)}... `}
        <Button type="link" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Скрыть' : 'Показать полностью'}
        </Button>
      </div>
    );
  };

  return (
    <List.Item>
      <List.Item.Meta
        title={author}
        description={renderContent(review)}
      />
    </List.Item>
  );
};

const ReviewsList = ({ reviews }: { reviews: Review[] }) => {
  return (
    <List
      dataSource={reviews}
      renderItem={(review) => <ReviewItem {...review} key={review.movieId} />}
      pagination={{
        pageSize: 3,
        hideOnSinglePage: true,
        align: 'start',
      }}
    />
  );
};

export default ReviewsList;
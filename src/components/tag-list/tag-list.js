import React from 'react';
import './tag-list.scss';

const TagList = ({ tags }) => {
  if (tags !== null) {
    const tagList = tags
      .filter((item) => item !== '')
      .map((item, idx) => {
        return (
          <div key={idx} className="main__article-tag">
            {item}
          </div>
        );
      });
    return <div className="main__article-tags">{tagList}</div>;
  }
};

export default TagList;

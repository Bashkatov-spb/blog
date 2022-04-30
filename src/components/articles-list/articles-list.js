import React from 'react';
import { Pagination } from 'antd';

import ArticlePreview from '../article-preview/article-preview';

const ArticlesList = ({ articlesData, isLoggedIn, updatePageNumber, currentPage, articlesCount, updateData }) => {
  const articles = articlesData.map((item, idx) => {
    return <ArticlePreview key={idx} data={item} isLoggedIn={isLoggedIn} updateData={updateData} />;
  });

  return (
    <>
      <div className="main__articles-list">{articles}</div>
      <div className="main__pagination">
        <Pagination
          showSizeChanger={false}
          onChange={(e) => updatePageNumber(e)}
          responsive={true}
          defaultCurrent={1}
          current={currentPage}
          defaultPageSize={10}
          total={articlesCount}
        />
      </div>
    </>
  );
};

export default ArticlesList;

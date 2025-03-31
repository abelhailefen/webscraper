import React from "react";

interface Article {
  title: string;
  url: string;
  source: string;
}

interface DataTableProps {
  data: Article[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Source</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {data.map((article, index) => (
            <tr key={index}>
              <td>{article.title}</td>
              <td>{article.source}</td>
              <td>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

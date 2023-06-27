import React from 'react';
import { IJoke } from '../interfaces/jokes';

const Table = ({ data }: { data: IJoke[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Created date</th>
          <th>Views</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index: number) => (
          <tr key={index}>
            <td>{row.title}</td>
            <td>{row.author}</td>
            <td>{row.createdAt}</td>
            <td>{row.views}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
import React, { CSSProperties } from 'react';
import { IJoke } from '../interfaces/jokes';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useMemo } from 'react'

const Table = ({ data }: { data: IJoke[] }) => {
  const history = useHistory();

  const getColor = (views: number) => {
    if (views <= 25) {
      return { color: 'tomato' }
    } else if (views >= 25 && views <= 50) {
      return { color: 'orange' }
    } else if (views >= 51 && views <= 75) {
      return { color: 'yellow' }
    } else if (views >= 76 && views <= 100) {
      return { color: 'green' }
    } 
  };

  return (
    <div className="App">
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
          {data.map((row) => (
            <tr key={row.id}>
              <td>
                <Link to={`/joke/${row.id}`}>{row.title}</Link>
              </td>
              <td>{row.author}</td>
              <td>{row.createdAt}</td>
              <td>
                <p style={getColor(row.views as number)}> {row.views}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => { history.push('/joke') }}>Add Joke</button>
    </div>

  );
};

export default Table;
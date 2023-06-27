import React from 'react';
import { IJoke } from '../interfaces/jokes';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Table = ({ data }: { data: IJoke[] }) => {
  const history = useHistory();

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
              <td>{row.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button  onClick={() => { history.push('/joke') }}>Add Joke</button>
    </div>

  );
};

export default Table;
import React, { CSSProperties, useEffect, useState } from 'react';
import { IJoke } from '../interfaces/jokes';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useMemo } from 'react'
import useJokes from '../hooks/jokes';

const getPageInfo = (target : string, def: number) : number => {
  const value = localStorage.getItem(target);
  if (value) {
    return parseInt(value)
  } else return def
}

const Table = () => {
  const history = useHistory();
  // const { jokes: data, error, setPage, limit, page, setLimit, fetchJokesPaginate } = useJokes(1, 5);
  const { jokes: data, error, fetchJokesPaginate } = useJokes();
  const [page, setPage] = useState<number>(getPageInfo('page', 1));
  const [limit, setLimit] = useState<number>(getPageInfo('limit', 5));

  useEffect(() => {
    fetchJokesPaginate(page, limit)
  }, [page, limit])

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

  const handlePage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setPage(1)
    setLimit(event.target.value as unknown as number)
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
        <tfoot>
          <tr>
            <td colSpan={4}>
              <div>
                <div>
                  <button onClick={() => { history.push('/joke') }}>Add Joke</button>
                </div>
                <div>
                  <p><label htmlFor="page_size">Page size:</label></p>
                  <select name="page_size" id="page_size" onChange={handlePage}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <div>
                  {page > 1 && <button onClick={() => setPage(page - 1)}>{'<'}</button>}
                  <p><label>Page {page}</label></p>
                  {data.length > 0 && <button onClick={() => setPage(page + 1)}>{'>'}</button>}
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

    </div>

  );
};

export default Table;
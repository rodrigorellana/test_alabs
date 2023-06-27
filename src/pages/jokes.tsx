import React from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom';

export const Jokes = ({ match }: RouteComponentProps<{ jokeId?: string}>) => {
  const history = useHistory();
  const { jokeId } = match.params;

  console.log({ jokeId })

  const handleSubmit = (event: any) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title"></input></div>
      <div>
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" name="author"></input></div>
      <div>
        <label htmlFor="date">Created date:</label>
        <input type="text" id="date" name="date"></input></div>
      <div>
        <label htmlFor="views">Views:</label>
        <input type="text" id="views" name="views"></input>
      </div>
      <div>
        <button type='submit'>Save</button>
        <button type='submit'>Delete</button>
        <button onClick={() => { history.push('/jokes') }} type='submit'>Close</button>
      </div>
    </form>
  )
}

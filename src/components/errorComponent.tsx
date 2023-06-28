import { FallbackProps } from 'react-error-boundary';

export default function ErrorComponent(props: FallbackProps) {
  const { error, resetErrorBoundary, } = props
  return (
    <div className="div_error">
      <h2>Acid Labs - Error</h2>
      <form>
        <p>{error.message}</p>
         <button onClick={resetErrorBoundary}>ReIntentar</button>
      </form>
    </div>
  )
}

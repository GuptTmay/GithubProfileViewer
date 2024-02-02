
export function ErrorFallback(props) {
    return <div role='alert'>
        <p>Something went wrong</p>
        <pre>{props.error.message}</pre>
        <button onClick={props.resetErrorBoundary}>Reset</button>
    </div>
  }
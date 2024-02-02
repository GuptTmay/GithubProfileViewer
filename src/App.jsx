import './App.css'
import { RecoilRoot } from 'recoil';
import { MainPage } from './components/MainPage';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorFallback';
function App() {

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
      <RecoilRoot>
          <div className='App'>
            <MainPage />
          </div>
      </RecoilRoot>
    </ErrorBoundary>

  )
}

export default App

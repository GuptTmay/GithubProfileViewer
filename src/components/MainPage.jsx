import { Suspense } from 'react'
import { InputBar } from './InputBar';
import { GithubProfile } from './GithubProfile';
import { renderProfileAtom, usernameAtom } from '../store/atom/Profile';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './ErrorFallback';

export const MainPage = () => {
    const setUsername = useSetRecoilState(usernameAtom);
    const [renderProfile, setRenderProfile] = useRecoilState(renderProfileAtom);


    const resetState = () => {
      setUsername("");
      setRenderProfile(false);
    };

  return (
    <div>
        <h1>Github User Profile</h1>
        <InputBar />
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={resetState}>
          <Suspense fallback={<div>Loading....</div>}>
            {renderProfile ? <GithubProfile /> : <div>Loading..</div>}
          </Suspense>
        </ErrorBoundary>
    </div>
  )
}

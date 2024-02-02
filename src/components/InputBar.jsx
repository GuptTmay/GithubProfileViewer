import { useSetRecoilState, useRecoilState } from 'recoil'
import { renderInfoAtom, renderProfileAtom, usernameAtom } from '../store/atom/Profile';

export const InputBar = () => {
    const [username, setUsername] = useRecoilState(usernameAtom);
    const setRenderProfile = useSetRecoilState(renderProfileAtom);
    const setRenderInfo = useSetRecoilState(renderInfoAtom);

    const handleOnClick = (e) => {
        e.preventDefault();
        if (username === "") return;
        setRenderProfile(true);
    }
  return (
    <div>
        <form>
            <input type="text" placeholder='Enter Profile Username'onChange={(e) => {
                setUsername(e.target.value);
                setRenderInfo(0);
                setRenderProfile(false);
            }}
            value = {username}
            />
            <button type="submit" onClick={(e) => handleOnClick(e)}>Submit</button>
        </form>
    </div>
  )
}

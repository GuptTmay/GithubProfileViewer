import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { profileInfoSelector } from '../store/selector/Profile'
import "../css/GithubProfile.css";
import axios from 'axios';
import { renderInfoAtom } from '../store/atom/Profile';
import { Suspense, useState } from 'react';

export function GithubProfile() {
  // const profileInfo = useRecoilValue(profileInfoSelector);
  const profileInfo = useRecoilValue(profileInfoSelector);
  const [renderInfo, setRenderInfo] = useRecoilState(renderInfoAtom);
  
  switch (renderInfo) {
    case 0:
      return ( 
        <div>
            <div id="card">
                <div id="background"></div>
                <a href={profileInfo.avatar_url} target='blank'><img id="image" src={profileInfo.avatar_url} alt="ProfilePic"/></a>
                <PersonalInfo ></PersonalInfo>
                <hr style={{marginTop: "240px"}} />
                <AccountInfo></AccountInfo>
            </div>
        </div> 
        )
    case 1: 
    return ( 
      <div id='repoCardBody'>
          <h3>Repositories</h3>
          <div id="repoCard" >
            <button className="closeButton" onClick={() => setRenderInfo(0)}>X</button>
            <div id="pInfo" style={{top: "38%"}}>
              <p>{profileInfo.name}</p>
              <p>{profileInfo.type}</p>
              <p>{profileInfo.location}</p>
            </div>
            <hr style={{"margin": "25px 0"}} />
            <Suspense fallback={<div>Loading...</div>}>
              <RepoCard />
            </Suspense>
          </div>
      </div> 
      )
      case 2: 
      return ( 
        <div id='repoCardBody'>
            <h3>Followers</h3>
            <div id="repoCard" >
              <button className="closeButton" onClick={() => setRenderInfo(0)}>X</button>
              <div id="pInfo" style={{top: "38%"}}>
                <p>{profileInfo.name}</p>
                <p>{profileInfo.type}</p>
                <p>{profileInfo.location}</p>
              </div>
              <hr style={{"margin": "25px 0"}} />
              <Suspense fallback={<div>Loading...</div>}>
                <FollowerCard />
              </Suspense>
            </div>
        </div> 
        )
    default:
        setRenderInfo(0);
      break;
  }
}

// function ShowData({type, info}) {
//   return info[type];
// }

function GetData(url=null) {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  fetchData();
  return data;
}

function PersonalInfo() {
  const profileInfo = useRecoilValue(profileInfoSelector);
    return <div id="pInfo">
        <p>{profileInfo.name}</p>
        <p>{profileInfo.type}</p>
        <p>{profileInfo.location}</p>
    </div>
}

function AccountInfo() {
  const profileInfo = useRecoilValue(profileInfoSelector);
  const setRenderInfo = useSetRecoilState(renderInfoAtom);
    return <div id="AInfo">
        <div>
          <button className='AccountButton' onClick={() => setRenderInfo(1)}>            
            <p>{profileInfo.public_repos}</p>
            <p>Public Repos</p>
          </button>
        </div>
        <div>
          <button className='AccountButton' onClick={() => setRenderInfo(2)}>
            <p>{profileInfo.followers}</p>
            <p>Follower</p>
          </button>         
        </div>
        <div>
          <button disabled className='AccountButton'>
            <p>{profileInfo.following}</p>
            <p>Following</p>
          </button>         
        </div>
        
    </div>
}

function RepoCard() {
  const profileInfo = useRecoilValue(profileInfoSelector);
  const data = GetData(profileInfo.repos_url);
  return <div>
    {data.map(d => {
      return <div key={d.id}>
        <pre>{d.name}</pre>
      </div>
    })}
    {data.length == 0 ? <pre>No Repos =C</pre>: <pre>-------end-------</pre>}
  </div>
}

function FollowerCard() {
  const profileInfo = useRecoilValue(profileInfoSelector);
  const data = GetData(profileInfo.followers_url);
  
  return <div>
    {data.map(d => {
      return <div key={d.id}>
        <pre>{d.login}</pre>
      </div>
    })}
    {data.length == 0 ? <pre>No Followers =C</pre>: <pre>-------end-------</pre>}
  </div>
}
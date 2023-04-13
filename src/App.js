import './App.css';
import {Header} from './components/Header/Header.js';
import LeftPanel from './components/LeftPanel/LeftPanel';


const testPlaylistsList2 = [
  {title: "obejrzane", size: 8},
  {title: "do obejrzenia", size: 39},
  {title: "coś", size: 50},
  {title: "horrory", size: 37}
]


function App(){
  return (
    <div style={{display:"flex"}}>
      <Header/>
      <div style={{width:"15%"}}>
        <LeftPanel userPlaylists={testPlaylistsList2}/>
      </div>
    </div>
  );
}

export default App;

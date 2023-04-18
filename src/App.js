import './App.css';
import {Header} from './components/Header/Header.js';
import LeftPanel from './components/LeftPanel/LeftPanel';
import Content from './components/content/content';import LibraryPanel from './components/LibraryPanel/LibraryPanel'


const testPlaylistsList2 = [
  {title: "obejrzane", size: 8},
  {title: "do obejrzenia", size: 39},
  {title: "coś", size: 50},
  {title: "horrory", size: 37}
]


function App(){
  return (
    <div>
      <Header/>
      <LeftPanel userPlaylists={testPlaylistsList2}/>
      <section className='col-lg-10 contents'>
        <LibraryPanel/>
      </section>
      <Content/>
    </div>
  );
}

export default App;

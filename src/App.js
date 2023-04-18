import './App.css';
import {Header} from './components/Header/Header.js';
import LeftPanel from './components/LeftPanel/LeftPanel';
import Content from './components/content/content';
import LibraryPanel from './components/LibraryPanel/LibraryPanel';
import MainDisplayPanel from './components/MainDisplayPanel/MainDisplayPanel'
import {React, useState} from "react";


const testPlaylistsList2 = [
  {title: "obejrzane", size: 8},
  {title: "do obejrzenia", size: 39},
  {title: "coś", size: 50},
  {title: "horrory", size: 37}
]


function App(){
  const [isPlaylistSelected, setIsPlaylistSelected] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);


  const handlePlaylistSelection = (id) => {
    console.log("selected display playlist " + id);
    setIsPlaylistSelected(true);
  }

  const SwitchToMainDisplay = () => {
    console.log('to main display')
    setIsPlaylistSelected(false);
  }

  return (
    <div>
      <Header onClick={SwitchToMainDisplay}/>
      <LeftPanel userPlaylists={testPlaylistsList2} handlePlaylistSelection={handlePlaylistSelection}/>
      <section className='col-lg-10 contents'>
        {isPlaylistSelected ? 
          <LibraryPanel 
            currentPlaylist={currentPlaylist}
          /> : 
          <MainDisplayPanel
            
          />}

      </section>
      <Content/>
    </div>
  );
}

export default App;

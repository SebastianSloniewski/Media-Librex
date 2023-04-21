import './App.css';
import {Header} from './components/Header/Header.js';
import SearchBar from './components/content/searchbar';
import LeftPanel from './components/LeftPanel/LeftPanel';
import LibraryPanel from './components/LibraryPanel/LibraryPanel';
import MainDisplayPanel from './components/MainDisplayPanel/MainDisplayPanel'
import {React, useState} from "react";
import { MainDisplayType } from './utils/dataTypes';


const testPlaylistsList2 = [
  {title: "obejrzane", size: 8, plID: 123, elems: []},
  {title: "do obejrzenia", size: 39, plID: 1,elems: []},
  {title: "coś", size: 50, plID: 2, elems: []},
  {title: "horrory", size: 37, plID: 50, elems: []}
]

const testCategories = [
  {title: "horror", elements: [], size: 2},
  {title: "akcja", elements: [], size: 15},
  {title: "dramat", elements: [], size: 15},
  {title: "komedia", elements: [], size: 15},
  {title: "komedia romantyczba", elements: [], size: 15},
  

]


function App(){
  const [plList, setplList] = useState(testPlaylistsList2);
  const [isPlaylistSelected, setIsPlaylistSelected] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);

  const [currentMainType, setCurrentMainType] = useState(MainDisplayType.Movies)


  const handlePlaylistSelection = (id) => {
    //console.log("selected display playlist " + id);
    setIsPlaylistSelected(true);
    //TODO WZIECIE Danych playlist o danym id
    //Albo
    const newPL = plList.filter(pl => pl.plID === id);

    
    setCurrentPlaylist(newPL[0]);
  }

  const SwitchToMainDisplay = () => {
    //console.log('to main display')
    setIsPlaylistSelected(false);
  }

  const HandleMainCategoryChange = (type) => {
    //console.log("SWITCHING CATEGORY TO " +type+ "APP");
    setCurrentMainType(type);
    SwitchToMainDisplay();
  }

  const handlePLchange = (newList) => {
    setplList(newList);
  }


  return (
    <div>
      <Header 
        handleChange={HandleMainCategoryChange}
        currentType={currentMainType}
      />
      <LeftPanel userPlaylists={plList} 
        handlePlaylistSelection={handlePlaylistSelection}
        handleListChange={handlePLchange}
        />
      <section className='col-lg-10 contents'>
        <SearchBar/>
        {isPlaylistSelected ? 
          <LibraryPanel 
            currentPlaylist={currentPlaylist}
          /> : 
          <MainDisplayPanel
            type={currentMainType}
            subCategories={testCategories}
            handleChange={HandleMainCategoryChange}
          />}

      </section>
    </div>
  );
}

export default App;

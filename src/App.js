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

const ItemSubDisplayList = [
  {title: "IndykMorderca", rating: 4.5},
  {title: "IndykMordera 2 Zaginiona Płyta", rating: 10},
  {title: "cos z indykiem", rating: 2.5}
]

const testCategories = [
  {title: "horror", elements: ItemSubDisplayList, size: 2},
  {title: "akcja", elements: ItemSubDisplayList, size: 15},
  {title: "dramat", elements: [{title: "indyk", rating : 6}], size: 15},
  {title: "komedia", elements: [], size: 15},
  {title: "komedia romantycza", elements: [], size: 15},
  

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
        <SearchBar searchType={currentMainType}/>
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

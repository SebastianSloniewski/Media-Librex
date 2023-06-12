import './App.css';
import {Header} from './components/Header/Header.js';
import SearchBar from './components/content/searchbar';
import LeftPanel from './components/LeftPanel/LeftPanel';
import LibraryPanel from './components/LibraryPanel/LibraryPanel';
import MainDisplayPanel from './components/MainDisplayPanel/MainDisplayPanel'
import {React, useEffect, useState} from "react";
import { MainDisplayType, ViewType } from './utils/dataTypes';
import SearchResultsPanel from './components/SearchResultsPanel.js/SearchResultsPanel';
import { getUserCollections, updateCollection } from './Axios/MLAxiosPlaylists';
import ItemView from './components/ItemView/ItemView';
import UserProfile from './components/UserProfile/UserProfile';
import {useCookies} from "react-cookie";
import { refresh } from './utils/GeneralUtils';



const ListHorror = [
  {id: "tt1129441", title: "ThanksKilling", rating: 4.5, url: "https://m.media-amazon.com/images/M/MV5BMTYwNDMzODI0Ml5BMl5BanBnXkFtZTgwNzMzODQyOTE@._V1_SX300.jpg"},
  {id: "tt2106675", title: "ThanksKilling 3", rating: 10, url: "https://m.media-amazon.com/images/M/MV5BMTU0NjEwNDQ5NF5BMl5BanBnXkFtZTgwMDYyODQyOTE@._V1_SX300.jpg"},
  {id: "tt0103874", title: "Dracula", rating: 2.5, url: "https://m.media-amazon.com/images/M/MV5BNjcyMDZlMTktYTIxOC00ZWFhLWJkYzgtNWNiYjAwYTFkNjIyXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"},
  {id: "tt0884328", title: "The Mist", rating: 2.5, url: "https://m.media-amazon.com/images/M/MV5BMTU2NjQyNDY1Ml5BMl5BanBnXkFtZTcwMTk1MDU1MQ@@._V1_SX300.jpg"},
  {id: "tt0068746", title: "Invasion of the Blood Farmers", rating: 5, url: "https://m.media-amazon.com/images/M/MV5BN2UyMjI1ZTUtNTFjOC00Y2YyLWFhZjQtNjIwMjFhNWU4ZjI1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},
  {id: "tt0113376", title: "Ice Cream Man", rating: 3, url: "https://m.media-amazon.com/images/M/MV5BNzAxN2Q0MTUtNWI4Yi00YjRiLWI2NjAtMTg3NTdiYjQ2NGVkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"}
]

const ListComedy = [
  {id: "tt0175142", title: "Scary Movie", rating:6, url: "https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},
  {id: "tt0257106", title: "Scary Movie 2", rating: 6, url: "https://m.media-amazon.com/images/M/MV5BMzQxYjU1OTUtYjRiOC00NDg2LWI4MWUtZGU5YzdkYTcwNTBlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},
  {id: "tt0163651", title: "American Pie", rating: 6, url: "https://m.media-amazon.com/images/M/MV5BMTg3ODY5ODI1NF5BMl5BanBnXkFtZTgwMTkxNTYxMTE@._V1_SX300.jpg"}
]

const ListAction = [
  {id: "tt0499549", title: "Avatar", rating: 6, url: "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg"},
  {id: "tt1630029", title: "Avatar 2: TWoW", rating: 6, url: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg"},
  {id: "tt0088247", title: "The Terminator", rating: 6, url: "https://m.media-amazon.com/images/M/MV5BYTViNzMxZjEtZGEwNy00MDNiLWIzNGQtZDY2MjQ1OWViZjFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"},
  {id: "tt0103064", title: "Terminator 2: Judgment Day", rating: 6, url: "https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"},
  {id: "tt1843303", title: "The VelociPastor", rating: 2, url: "https://m.media-amazon.com/images/M/MV5BZTJiZjFkNmYtNmU3My00MmE1LWI4YWEtNWFkZDJiOTgwMTNkXkEyXkFqcGdeQXVyMTg0MTI3Mg@@._V1_SX300.jpg"},
  {id: "tt1619880", title: "Sharktopus", rating: 1, url: "https://m.media-amazon.com/images/M/MV5BNTNlZTJhMWQtNDkwZS00MjhjLTk1M2UtMzNmNzgyMTg0YTVlXkEyXkFqcGdeQXVyODUzMjQxMTA@._V1_SX300.jpg"}


]

const testCategories = [
  {title: "Horror", elements: ListHorror, size: 2},
  {title: "Action", elements: ListAction, size: 15},
  {title: "Comedy", elements: ListComedy, size: 15},
  
]

export const testUser = {
  id: 1,
  login: "Userus Testerus",
  email: "grzetra@op.pl"
}


function App(){
  const [plList, setplList] = useState([]);
  
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [currentPlaylist, setCurrentPlaylist] = useState([]);

  const [currentMainType, setCurrentMainType] = useState(MainDisplayType.Movies)

  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentView, setCurrentView] = useState(ViewType.MainDisplay)

  //COOKIES
  const [cookies, setCookie] = useCookies();

  //fetching playlists data and user
  useEffect(() => {
    console.log("COOKIES",cookies)
    
    if(currentUser === undefined) {
      //get user from cookies
      if(cookies.id !== undefined && cookies.email !== undefined){
        const user = {
          id: cookies.id,
          login: cookies.firstname + " " + cookies.lastname,
          email: cookies.email
        }
        setCurrentUser(user);
        getUserPlaylists(user.id)
      }

    }
    else{
      if(currentUser.id !== undefined){
        getUserPlaylists(currentUser.id)
      }

    }

  }, [currentUser]);

  const getUserPlaylists = (id) => {
    const userPlaylists = getUserCollections(id);
      userPlaylists.then((resolve) => {
        setplList(resolve);
      }, (e) => {
        console.log("failed to get playlists: ", e)
      })
  }


  const logout = () => {
    console.log("LOG OUT")
    //ciastka
    document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

    //stan
    setCurrentUser(undefined);
    refresh();
  }


  const handlePlaylistSelection = (id) => {
    
    //Albo
    const newPL = plList.filter(pl => pl.id === id);

    
    setCurrentPlaylist(newPL[0]);
    setCurrentView(ViewType.Collection)
  }

  const handleDeletePlaylist = (id) => {

  }


  const SwitchToSearchResults = (query, items) => {
    setSearchQuery(query);
    setSearchResults(items);

    setCurrentView(ViewType.Search)
  }

  const SwitchToMainDisplay = () => {
    //console.log('to main display')
    setCurrentView(ViewType.MainDisplay)
  }

  const HandleMainCategoryChange = (type) => {
    //console.log("SWITCHING CATEGORY TO " +type+ "APP");
    setCurrentMainType(type);
    SwitchToMainDisplay();
  }

  const handlePLchange = (newList) => {
    setplList(newList);
  }
  const handleInCollectionChange = (changedCollection) => {
    //backend
    updateCollection(changedCollection.id, changedCollection)

    //front ale tak jeszcze do poprawy
    const newPlaylists = plList;

    const index = newPlaylists.findIndex(p => p.id === changedCollection.id)

    newPlaylists.splice(index, 1, changedCollection);
    
    handlePLchange(newPlaylists);

    console.log("AFTER: ", newPlaylists)
  }



  const switchToItemView = (elem) => {
    setSelectedItem(elem);

    setCurrentView(ViewType.Item)
  }

  const switchToUserProfile = () => {
    setCurrentView(ViewType.User)
  }

  



  return (
    <div>
      <Header 
        handleChange={HandleMainCategoryChange}
        currentType={currentMainType}
        currentUser={currentUser}
        handleSwitchToUser={switchToUserProfile}
        handleLogout={logout}
      />
      <LeftPanel userPlaylists={plList} 
        handlePlaylistSelection={handlePlaylistSelection}
        handleListChange={handlePLchange}
        currentUser={currentUser}
        />
      <SearchBar searchType={currentMainType} handleSearch={SwitchToSearchResults}/>
      <section className='col-lg-10 contents'>
        {currentView === ViewType.MainDisplay ? 
          <MainDisplayPanel
            type={currentMainType}
            subCategories={testCategories}
            handleChange={HandleMainCategoryChange}
            itemSwitch={switchToItemView}
        /> :
        currentView === ViewType.Collection ? 
          <LibraryPanel 
            currentPlaylist={currentPlaylist}
            switchToMainDisplay={SwitchToMainDisplay}
            itemSwitch={switchToItemView}
            handleChange={handleInCollectionChange}
        /> : 
        currentView === ViewType.Search ? 
          <SearchResultsPanel 
            items={searchResults}
            query={searchQuery}
            itemSwitch={switchToItemView}
        /> :
        currentView === ViewType.Item ? 
          <ItemView
            basicElem={selectedItem}
            playlists={plList}
            userData={currentUser}
        /> :
        currentView === ViewType.User ? 
          <UserProfile 
            userPlaylists={plList}
            userData={currentUser}
        /> :
        <></>
        }

      </section>
    </div>
  );
}

export default App;

import {Header} from '../Header/Header'


async function movieDataMount(){
    const response = await fetch("");
    const moviesData = await response.json();
}

export function Movies(){
    return (
        <>
            <Header></Header>
            <Container></Container>

        </>
    );
}

function Container(){
    return(
        <>
            <div className="col-lg-9" id="explore">
                
            </div>
        </>
    );
    
}



export default Movies;
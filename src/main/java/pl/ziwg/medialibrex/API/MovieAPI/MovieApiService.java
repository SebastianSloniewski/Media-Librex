package pl.ziwg.medialibrex.API.MovieAPI;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pl.ziwg.medialibrex.API.MediaItem;

import java.util.ArrayList;
import java.util.List;

@Service
public class MovieApiService {

    private static final String API_KEY = "705b0cf1";
    private static final String API_URL = String.format("http://www.omdbapi.com/?apikey=%s", API_KEY);
    private final RestTemplate restTemplate;

    @Autowired
    public MovieApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<MediaItem> search(String title) throws JsonProcessingException {
        String url = String.format("%s&s=%s", API_URL, title);
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode searchResults = mapper.readTree(response).get("Search");

        List<MediaItem> listMovies = new ArrayList<>();
        for (int i = 0; i < 9 && i < searchResults.size(); i++){
            JsonNode itemJson = searchResults.get(i);
            String titleMovie = itemJson.get("Title").asText();
            String year = itemJson.get("Year").asText();
            String imdbId = itemJson.get("imdbID").asText();
            String type = itemJson.get("Type").asText();
            String cover = itemJson.get("Poster").asText();

            MediaItem movie = new MediaItem();

            movie.setId(imdbId);
            movie.setTitle(titleMovie);
            movie.addCover(cover, null);
            movie.setMediaType(type);
            movie.setYear(year);

            listMovies.add(movie);
        }
        return listMovies;
    }

    public MediaItem getMovieByIMDb(String id) throws JsonProcessingException {
        String url = String.format("%s&i=%s", API_URL, id);
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(response);
        String title = jsonNode.get("Title").asText();
        String year = jsonNode.get("Year").asText();

        String genres = jsonNode.get("Genre").asText();
        String[] genresArray = genres.split(", ");

        String directors = jsonNode.get("Director").asText();
        String[] directorsArray = directors.split(", ");
        String writers = jsonNode.get("Writer").asText();
        String[] writersArray = writers.split(", ");
        String actors = jsonNode.get("Actors").asText();
        String[] actorsArray = actors.split(", ");

        String cover = jsonNode.get("Poster").asText();

        String imdbId = jsonNode.get("imdbID").asText();
        String type = jsonNode.get("Type").asText();

        MediaItem movie = new MediaItem();
        movie.setId(imdbId);
        movie.setTitle(title);
        for (String director : directorsArray) {
            movie.addPerson(director, "director");
        }
        for (String writer : writersArray) {
            movie.addPerson(writer, "writer");
        }
        for (String actor : actorsArray) {
            movie.addPerson(actor, "actor");
        }
        movie.addCover(cover, null);
        movie.setMediaType(type);
        for (String genre : genresArray) {
            movie.addSubject(genre);
        }
        movie.setYear(year);
        return movie;
    }

}

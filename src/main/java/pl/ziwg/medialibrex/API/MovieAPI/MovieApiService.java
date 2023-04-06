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
    private final RestTemplate restTemplate;
    private final String apiKey = "705b0cf1";
    private final String apiUrl = String.format("http://www.omdbapi.com/?apikey=%s", apiKey);

    @Autowired
    public MovieApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<MediaItem> search(String title) throws JsonProcessingException {
        String url = String.format("%s&s=%s", apiUrl, title);
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(response);
        int items = 9; // TODO
        List<MediaItem> listMovies = new ArrayList<MediaItem>();
        for (int i = 0; i < items; i++){
            JsonNode itemJson = jsonNode.get("Search").get(i);
            String imdbId = itemJson.get("imdbID").asText();
            String titleMovie = itemJson.get("Title").asText();
            String cover = itemJson.get("Poster").asText();
            String type = itemJson.get("Type").asText();
            String year = itemJson.get("Year").asText();

            MediaItem movie = new MediaItem();
            movie.setId(imdbId);
            movie.setTitle(titleMovie);
            movie.setCover(cover);
            movie.setMediaType("music");
            movie.setMediaType(type);
            movie.setYear(year);
            listMovies.add(movie);
        }
        return listMovies;
    }

    public MediaItem getMovieByIMDb(String id) throws JsonProcessingException {
        String url = String.format("%s&i=%s", apiUrl, id);
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(response);
        String imdbId = jsonNode.get("imdbID").asText();
        String artist = jsonNode.get("Director").asText();   // TODO
        String type = jsonNode.get("Type").asText();
        String title = jsonNode.get("Title").asText();
        String cover = jsonNode.get("Poster").asText();
        String genre = jsonNode.get("Genre").asText(); // TODO
        String year = jsonNode.get("Year").asText();

        MediaItem album = new MediaItem();
        album.setId(imdbId);
        album.setMediaType(type);
        album.setYear(year);
        album.setTitle(title);
        album.setAuthor(artist);
        album.setCover(cover);
        album.setMediaType("music");
        album.setGenre(genre);
        return album;
    }

}

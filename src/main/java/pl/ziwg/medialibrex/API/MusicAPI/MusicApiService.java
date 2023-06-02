package pl.ziwg.medialibrex.API.MusicAPI;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pl.ziwg.medialibrex.API.MediaItem;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class MusicApiService {
    private final RestTemplate restTemplate;
    private final String API_KEY = "b627771ebee652bad46a2e36b5ebc6ef";

    @Autowired
    public MusicApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<MediaItem> search(String title) {
        String url = String.format("https://ws.audioscrobbler.com/2.0/?method=album.search&album=%s&api_key=%s&format=json", title, API_KEY);
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode searchResults;
        try {
            searchResults = mapper.readTree(response).get("results");
        } catch (JsonProcessingException e){
            throw new RuntimeException("Error parsing JSON response from API", e);
        }

        int items = searchResults.get("opensearch:itemsPerPage").asInt();
        List<MediaItem> listAlbums = new ArrayList<MediaItem>();
        for (int i = 0; i < items; i++){
            JsonNode itemJson = searchResults.get("albummatches").get("album").get(i);
            String mbid = itemJson.get("mbid").asText();
            String artists = itemJson.get("artist").asText();
            String[] artistsArray = artists.split(", ");

            String titleAlbum = itemJson.get("name").asText();

            JsonNode covers = itemJson.get("image") != null ? itemJson.get("image") : null;
            List<String> coversList = new ArrayList<>();
            if (covers != null) {
                Iterator<JsonNode> coversIterator = covers.elements();
                while (coversIterator.hasNext()) {
                    JsonNode coversNode = coversIterator.next();
                    coversList.add(coversNode.get("#text").asText());
                }
            }

            MediaItem album = new MediaItem();
            album.setId(mbid);
            album.setTitle(titleAlbum);
            for (String artist : artistsArray) {
                album.addPerson(artist, "artist");
            }
            for (String cover : coversList) {
                album.addCover(cover, null);
            }
            album.setMediaType("music");
            listAlbums.add(album);
        }

        return listAlbums;
    }

    public MediaItem getAlbumByMbid(String mbid) {
        String url = String.format("https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=%s&mbid=%s&format=json", API_KEY, mbid);
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode;
        try {
            jsonNode = mapper.readTree(response);
        } catch (JsonProcessingException e){
            throw new RuntimeException("Error parsing JSON response from API", e);
        }

        String artist = jsonNode.get("album").get("artist").asText();
        String title = jsonNode.get("album").get("name").asText();
        JsonNode covers = jsonNode.get("album").get("image") != null ? jsonNode.get("album").get("image") : null;
        List<String> coversList = new ArrayList<>();
        if (covers != null) {
            Iterator<JsonNode> coversIterator = covers.elements();
            while (coversIterator.hasNext()) {
                JsonNode coversNode = coversIterator.next();
                coversList.add(coversNode.get("#text").asText());
            }
        }
        JsonNode genres = jsonNode.get("album").get("tags") != null ? jsonNode.get("album").get("tags") : null;
        List<String> genresList = new ArrayList<>();
        if (genres != null) {
            Iterator<JsonNode> genresIterator = genres.elements();
            while (genresIterator.hasNext()) {
                JsonNode genresNode = genresIterator.next();
                genresList.add(genresNode.get("name") != null ? genresNode.get("name").asText() : null);
            }
        }
        String description = jsonNode.get("album").get("wiki") != null ? (jsonNode.get("album").get("wiki").get("summary") != null  ? jsonNode.get("album").get("wiki").get("summary").asText() : null) : null;
        MediaItem album = new MediaItem();
        album.setId(mbid);
        album.setTitle(title);
        album.addPerson(artist, "artist");
        for (String cover : coversList) {
            album.addCover(cover, null);
        }
        album.setMediaType("music");
        for (String genre : genresList) {
            album.addSubject(genre);
        }
        album.setDescription(description);
        return album;
    }
    public List<MediaItem> searchByGenre(String genre) {
        String url = String.format("https://ws.audioscrobbler.com/2.0/?method=tag.getTopAlbums&tag=%s&api_key=%s&format=json", genre, API_KEY);
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode searchResults;
        try {
            searchResults = mapper.readTree(response).get("albums");
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error parsing JSON response from API", e);
        }

        int items = searchResults.get("album").size();
        List<MediaItem> listAlbums = new ArrayList<>();
        for (int i = 0; i < items; i++) {
            JsonNode itemJson = searchResults.get("album").get(i);
            String mbid = itemJson.get("mbid").asText();
            String artist = itemJson.get("artist").get("name").asText();
            String titleAlbum = itemJson.get("name").asText();

            JsonNode covers = itemJson.get("image") != null ? itemJson.get("image") : null;
            List<String> coversList = new ArrayList<>();
            if (covers != null) {
                Iterator<JsonNode> coversIterator = covers.elements();
                while (coversIterator.hasNext()) {
                    JsonNode coversNode = coversIterator.next();
                    coversList.add(coversNode.get("#text").asText());
                }
            }

            MediaItem album = new MediaItem();
            album.setId(mbid);
            album.setTitle(titleAlbum);
            album.addPerson(artist, "artist");
            for (String cover : coversList) {
                album.addCover(cover, null);
            }
            album.setMediaType("music");
            album.addSubject(genre);
            listAlbums.add(album);
        }

        return listAlbums;
    }
}

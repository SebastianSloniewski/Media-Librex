package pl.ziwg.medialibrex.API.MusicAPI;

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
public class MusicApiService {
    private final RestTemplate restTemplate;
    private final String apiKey = "b627771ebee652bad46a2e36b5ebc6ef";

    @Autowired
    public MusicApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public List<MediaItem> search(String title) throws JsonProcessingException {
        String url = String.format("https://ws.audioscrobbler.com/2.0/?method=album.search&album=%s&api_key=%s&format=json", title, apiKey);
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(response);
        int items = jsonNode.get("results").get("opensearch:itemsPerPage").asInt();
        List<MediaItem> listAlbums = new ArrayList<MediaItem>();
        for (int i = 0; i < items; i++){
            JsonNode itemJson = jsonNode.get("results").get("albummatches").get("album").get(i);
            String mbid = itemJson.get("mbid").asText();
            String artist = itemJson.get("artist").asText();
            String titleAlbum = itemJson.get("name").asText();
            String cover = itemJson.get("image").get(0).get("#text").asText(); // TODO

            MediaItem album = new MediaItem();
            album.setId(mbid);
            album.setTitle(titleAlbum);
            album.setAuthor(artist);
            album.setCover(cover);
            album.setMediaType("music");
            listAlbums.add(album);
        }

        return listAlbums;
    }

    public MediaItem getAlbumByMbid(String mbid) throws JsonProcessingException {
        String url = String.format("https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=%s&mbid=%s&format=json", apiKey, mbid);
        String response = restTemplate.getForObject(url, String.class);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(response);

        String artist = jsonNode.get("album").get("artist").asText();
        String title = jsonNode.get("album").get("name").asText();
        String cover = jsonNode.get("album").get("image").get(0).get("#text").asText(); // TODO
        String genre = jsonNode.get("album").get("tags").get("tag").get(0).get("name").asText(); // TODO

        MediaItem album = new MediaItem();
        album.setId(mbid);
        album.setTitle(title);
        album.setAuthor(artist);
        album.setCover(cover);
        album.setMediaType("music");
        album.setGenre(genre);
        return album;
    }
}

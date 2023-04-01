package pl.ziwg.medialibrex.API.MusicAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MusicApiService {
    private final RestTemplate restTemplate;
    private final String apiKey = "b627771ebee652bad46a2e36b5ebc6ef";

    @Autowired
    public MusicApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String search(String title) {
        String url = String.format("https://ws.audioscrobbler.com/2.0/?method=album.search&album=%s&api_key=%s&format=json", title, apiKey);
        return restTemplate.getForObject(url, String.class);
    }

    public String getAlbumByMbid(String mbid) {
        String url = String.format("https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=%s&mbid=%s&format=json", apiKey, mbid);
        return restTemplate.getForObject(url, String.class);
    }
}

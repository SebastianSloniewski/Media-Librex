package pl.ziwg.medialibrex.API.MovieAPI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MovieApiService {
    private final RestTemplate restTemplate;
    private final String apiKey = "705b0cf1";
    private final String apiUrl = String.format("http://www.omdbapi.com/?apikey=%s", apiKey);

    @Autowired
    public MovieApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String search(String title) {
        String url = String.format("%s&s=%s", apiUrl, title);
        return restTemplate.getForObject(url, String.class);
    }

    public String getMovieByIMDb(String id){
        String url = String.format("%s&i=%s", apiUrl, id);
        return restTemplate.getForObject(url, String.class);
    }

    public String getCoverImageUrl(String id){
        return String.format("http://img.omdbapi.com/?apikey=%s&i=%s", apiKey, id);
    }
}

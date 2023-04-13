package pl.ziwg.medialibrex.API.MovieAPI;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class MovieApiController {
    private final MovieApiService movieApiService;

    public MovieApiController(MovieApiService movieApiService) {
        this.movieApiService = movieApiService;
    }

    @GetMapping("/movies/search")
    public String searchMovies(@RequestParam String title) throws JsonProcessingException {
        MovieApiService movieApiService = new MovieApiService(new RestTemplate());
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(movieApiService.search(title));
    }

    @GetMapping("/movies/{id}")
    public String getMovie(@PathVariable String id) throws JsonProcessingException {
        MovieApiService movieApiService = new MovieApiService(new RestTemplate());
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(movieApiService.getMovieByIMDb(id));
    }

}

package pl.ziwg.medialibrex.API.MovieAPI;

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
    public String searchMovies(@RequestParam String title){
        MovieApiService movieApiService = new MovieApiService(new RestTemplate());
        return movieApiService.search(title);
    }

    @GetMapping("/movies/{id}")
    public String getMovie(@PathVariable String id){
        MovieApiService movieApiService = new MovieApiService(new RestTemplate());
        return movieApiService.getMovieByIMDb(id);
    }

    @GetMapping("/movie/cover")
    public String getCover(@RequestParam String id) {
        MovieApiService movieApiService = new MovieApiService(new RestTemplate());
        return movieApiService.getCoverImageUrl(id);
    }
}

package pl.ziwg.medialibrex.API.MusicAPI;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class MusicApiController {
    private final MusicApiService musicApiService;

    public MusicApiController(MusicApiService musicApiService) {
        this.musicApiService = musicApiService;
    }

    @GetMapping("/music/search")
    public String searchAlbum(@RequestParam String title) throws JsonProcessingException {
        MusicApiService musicApiService = new MusicApiService(new RestTemplate());

        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(musicApiService.search(title));
    }

    @GetMapping("/music/{mbid}")
    public String getAlbum(@PathVariable String mbid) throws JsonProcessingException {
        MusicApiService musicApiService = new MusicApiService(new RestTemplate());

        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(musicApiService.getAlbumByMbid(mbid));
    }

    @GetMapping("/music/genre/{genre}")
    public String searchAlbumByGenre(@PathVariable String genre) throws JsonProcessingException {
        MusicApiService musicApiService = new MusicApiService(new RestTemplate());

        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(musicApiService.searchByGenre(genre));
    }
}

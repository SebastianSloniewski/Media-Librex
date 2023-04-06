package pl.ziwg.medialibrex.API.MusicAPI;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

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
        String json = mapper.writeValueAsString(musicApiService.search(title));
        return json;
    }

    @GetMapping("/music/{mbid}")
    public String getAlbum(@PathVariable String mbid) throws JsonProcessingException {
        MusicApiService musicApiService = new MusicApiService(new RestTemplate());

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(musicApiService.getAlbumByMbid(mbid));
        return json;
    }
}

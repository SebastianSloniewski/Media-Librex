package pl.ziwg.medialibrex.API.MusicAPI;

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
    public String searchAlbum(@RequestParam String title){
        MusicApiService musicApiService = new MusicApiService(new RestTemplate());
        return musicApiService.search(title);
    }

    @GetMapping("/music/{mbid}")
    public String getAlbum(@PathVariable String mbid){
        MusicApiService musicApiService = new MusicApiService(new RestTemplate());
        return musicApiService.getAlbumByMbid(mbid);
    }
}

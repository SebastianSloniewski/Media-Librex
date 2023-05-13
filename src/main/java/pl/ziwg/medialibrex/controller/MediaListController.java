package pl.ziwg.medialibrex.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import pl.ziwg.medialibrex.API.BookAPI.BookApiService;
import pl.ziwg.medialibrex.service.MediaListService;
import pl.ziwg.medialibrex.service.impl.MediaListServiceImpl;

@RestController
@AllArgsConstructor
public class MediaListController {

    private final MediaListService mediaListService;

    @GetMapping("/{userID}/collections")
    public String getUserCollections(@PathVariable String userID) throws JsonProcessingException {
        MediaListService mediaListService = new MediaListServiceImpl();
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(mediaListService.getListsByUser(userID));
    }

}

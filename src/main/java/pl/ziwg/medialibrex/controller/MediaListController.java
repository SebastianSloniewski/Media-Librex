package pl.ziwg.medialibrex.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.ziwg.medialibrex.dto.MediaListDTO;
import pl.ziwg.medialibrex.dto.post.MediaListItemPostDTO;
import pl.ziwg.medialibrex.service.MediaListService;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
public class MediaListController {

    private MediaListService mediaListService;

    @PostMapping("/{userID}/collections/create")
    public void createCollection(@RequestBody MediaListDTO mediaListDTO, @PathVariable Long userID) throws JsonProcessingException {
        mediaListService.createMediaList(mediaListDTO, userID, false);
    }

    @PostMapping("/collections/{ID}/update")
    public void updateCollection(@RequestBody MediaListDTO mediaListDTO) throws JsonProcessingException {
        mediaListService.updateMediaList(mediaListDTO);
    }

    @DeleteMapping("/collections/{ID}/delete")
    public void deleteCollection(@PathVariable Long ID) throws JsonProcessingException {
        mediaListService.deleteMediaList(ID);
    }

    @GetMapping("/collections")
    public String gelAllCollections() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(mediaListService.getAllMediaLists());
    }

    @GetMapping("/collections/{ID}")
    public String getCollectionByID(@PathVariable Long ID) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(mediaListService.getListById(ID));
    }

    @GetMapping("/{userID}/collections")
    public String getUserCollections(@PathVariable String userID) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(mediaListService.getListsByUser(userID));
    }

    @GetMapping("/{userID}/collections/default")
    public String getUserDefaultCollection(@PathVariable String userID) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(mediaListService.getDefaultListForUser(userID));
    }

    @PostMapping("/{userID}/collections/default/add")
    public ResponseEntity addItemsToDefaultCollection(@PathVariable String userID, @RequestBody List<MediaListItemPostDTO> mediaListItems) throws JsonProcessingException {
        return mediaListService.addItemsToDefaultList(userID, mediaListItems);
    }

}

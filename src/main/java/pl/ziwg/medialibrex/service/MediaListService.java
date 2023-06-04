package pl.ziwg.medialibrex.service;

import org.springframework.http.ResponseEntity;
import pl.ziwg.medialibrex.dto.MediaListDTO;
import pl.ziwg.medialibrex.dto.post.MediaListItemPostDTO;

import java.util.List;

public interface MediaListService {

    void createMediaList(MediaListDTO mediaListDTO, Long userId, Boolean defaultList);

    void updateMediaList(MediaListDTO mediaListDTO);

    void deleteMediaList(Long listID);

    List<MediaListDTO> getAllMediaLists();

    List<MediaListDTO> getListsByUser(String userID);

    MediaListDTO getListById(Long listID);

    MediaListDTO getDefaultListForUser(String userID);

    ResponseEntity addItemsToDefaultList(String userID, List<MediaListItemPostDTO> mediaListItemPostDTOS);
}

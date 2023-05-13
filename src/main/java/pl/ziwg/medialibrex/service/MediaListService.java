package pl.ziwg.medialibrex.service;

import pl.ziwg.medialibrex.dto.MediaListDTO;

import java.util.List;

public interface MediaListService {

    void createMediaList(MediaListDTO mediaListDTO, Long userId);

    void updateMediaList(MediaListDTO mediaListDTO);

    void deleteMediaList(Long listID);

    List<MediaListDTO> getAllMediaLists();

    List<MediaListDTO> getListsByUser(String userID);

    MediaListDTO getListById(Long listID);
}

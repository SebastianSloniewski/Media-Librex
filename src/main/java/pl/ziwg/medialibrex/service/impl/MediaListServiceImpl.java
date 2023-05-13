package pl.ziwg.medialibrex.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.ziwg.medialibrex.dto.MediaListDTO;
import pl.ziwg.medialibrex.entity.MediaList;
import pl.ziwg.medialibrex.entity.User;
import pl.ziwg.medialibrex.mapper.MediaListMapper;
import pl.ziwg.medialibrex.repository.MediaListItemRepository;
import pl.ziwg.medialibrex.repository.MediaListRepository;
import pl.ziwg.medialibrex.repository.UserRepository;
import pl.ziwg.medialibrex.service.MediaListService;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


@AllArgsConstructor
@Service
public class MediaListServiceImpl implements MediaListService {

    private MediaListRepository mediaListRepository;
    private MediaListItemRepository mediaListItemRepository;
    private UserRepository userRepository;
    private MediaListMapper mediaListMapper;

    @Override
    public void createMediaList(MediaListDTO mediaListDTO, Long userId){
        MediaList mediaList = mediaListMapper.toMediaList(mediaListDTO);
        User user = userRepository.findById(userId).get();
        mediaList.setUsers(Collections.singletonList(user));
        mediaListRepository.save(mediaList);
    }

    @Override
    public void updateMediaList(MediaListDTO mediaListDTO){
        mediaListRepository.save(mediaListMapper.toMediaList(mediaListDTO));
    }

    @Override
    public void deleteMediaList(Long listID){
        mediaListRepository.deleteById(listID);
    }

    @Override
    public List<MediaListDTO> getAllMediaLists() {
        return mediaListMapper.toMediaListDTOList(mediaListRepository.findAll());
    }

    @Override
    public List<MediaListDTO> getListsByUser(String userID) {
        return mediaListMapper.toMediaListDTOList(mediaListRepository.findByUsers_Id(userID));
    }

    @Override
    public MediaListDTO getListById(Long listID) {
        Optional<MediaList> mediaList = mediaListRepository.findById(listID);
        if (mediaList.isPresent()) {
            return mediaListMapper.toMediaListDTO(mediaList.get());
        } else {
            return new MediaListDTO();
        }
    }

}

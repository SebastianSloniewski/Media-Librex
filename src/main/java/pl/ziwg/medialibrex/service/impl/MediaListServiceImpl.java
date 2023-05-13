package pl.ziwg.medialibrex.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.ziwg.medialibrex.entity.MediaList;
import pl.ziwg.medialibrex.repository.MediaListItemRepository;
import pl.ziwg.medialibrex.repository.MediaListRepository;
import pl.ziwg.medialibrex.service.MediaListService;

import java.util.List;

@Service
public class MediaListServiceImpl implements MediaListService {

    @Autowired
    private MediaListRepository mediaListRepository;

    @Autowired
    private MediaListItemRepository mediaListItemRepository;

    @Override
    public List<MediaList> getListsByUser(String userID) {
        return mediaListRepository.findByUsers_Id(userID);

    }

}

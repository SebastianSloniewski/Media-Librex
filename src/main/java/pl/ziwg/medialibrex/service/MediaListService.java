package pl.ziwg.medialibrex.service;

import org.springframework.stereotype.Service;
import pl.ziwg.medialibrex.entity.MediaList;

import java.util.List;

public interface MediaListService {
    List<MediaList> getListsByUser(String userID);
}

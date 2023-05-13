package pl.ziwg.medialibrex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.ziwg.medialibrex.entity.MediaList;

import java.util.List;

public interface MediaListRepository extends JpaRepository<MediaList, Long> {
    MediaList findByName(String name);

    List<MediaList> findByUsers_Id(String userID);
}

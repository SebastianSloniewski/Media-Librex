package pl.ziwg.medialibrex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.ziwg.medialibrex.entity.MediaList;

import java.util.List;
import java.util.Optional;

public interface MediaListRepository extends JpaRepository<MediaList, Long> {
    MediaList findByName(String name);

    Optional<MediaList> findByDefaultListAndCreatorId(Boolean defaultList, Long creatorId);

    List<MediaList> findByUsers_Id(String userID);
}

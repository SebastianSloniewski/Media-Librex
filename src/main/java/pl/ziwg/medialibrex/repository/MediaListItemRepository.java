package pl.ziwg.medialibrex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.ziwg.medialibrex.entity.MediaListItem;

public interface MediaListItemRepository extends JpaRepository<MediaListItem, Long> {
}

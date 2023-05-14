package pl.ziwg.medialibrex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.ziwg.medialibrex.entity.Review;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByUser_Id(String userID);

    List<Review> findByMediaItemId(String mediaItemId);
}

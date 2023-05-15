package pl.ziwg.medialibrex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.ziwg.medialibrex.entity.Review;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByUser_Id(String userID);

    List<Review> findByMediaItemId(String mediaItemId);

    @Query("SELECT AVG(review.reviewScore) FROM Review review WHERE review.mediaItemId=?1")
    Double getAvgScoreById(String mediaItemId);
}

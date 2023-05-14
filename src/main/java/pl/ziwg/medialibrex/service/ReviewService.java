package pl.ziwg.medialibrex.service;

import pl.ziwg.medialibrex.dto.ReviewDTO;

import java.util.List;

public interface ReviewService {
    void createReview(ReviewDTO reviewDTO, Long userId);

    void updateReview(ReviewDTO reviewDTO);

    void deleteReview(Long ReviewID);

    List<ReviewDTO> getAllReviews();

    ReviewDTO getReviewById(Long listID);

    List<ReviewDTO> getReviewsByUser(String userID);

    List<ReviewDTO> getReviewsByMediaItem(String mediaItemID);

    Double getAvgScoreById(String mediaItemId);
}

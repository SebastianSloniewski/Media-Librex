package pl.ziwg.medialibrex.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.ziwg.medialibrex.dto.ReviewDTO;
import pl.ziwg.medialibrex.entity.Review;
import pl.ziwg.medialibrex.entity.User;
import pl.ziwg.medialibrex.mapper.ReviewMapper;
import pl.ziwg.medialibrex.repository.ReviewRepository;
import pl.ziwg.medialibrex.repository.UserRepository;
import pl.ziwg.medialibrex.service.ReviewService;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService {

    private ReviewRepository reviewRepository;
    private UserRepository userRepository;
    private ReviewMapper reviewMapper;

    @Override
    public void createReview(ReviewDTO reviewDTO, Long userId){
        Review review = reviewMapper.toReview(reviewDTO);
        User user = userRepository.findById(userId).get();
        review.setUser(user);
        reviewRepository.save(review);
    }

    @Override
    public void updateReview(ReviewDTO reviewDTO){
        reviewRepository.save(reviewMapper.toReview(reviewDTO));
    }

    @Override
    public void deleteReview(Long ReviewID) {
        reviewRepository.deleteById(ReviewID);
    }

    @Override
    public List<ReviewDTO> getAllReviews() {
        return reviewMapper.toReviewDTOList(reviewRepository.findAll());
    }

    @Override
    public ReviewDTO getReviewById(Long listID) {
        Optional<Review> mediaList = reviewRepository.findById(listID);
        if (mediaList.isPresent()) {
            return reviewMapper.toReviewDTO(mediaList.get());
        } else {
            return new ReviewDTO();
        }
    }

    @Override
    public List<ReviewDTO> getReviewsByUser(String userID) {
        return reviewMapper.toReviewDTOList(reviewRepository.findByUser_Id(userID));
    }

    @Override
    public List<ReviewDTO> getReviewsByMediaItem(String mediaItemID) {
        return reviewMapper.toReviewDTOList(reviewRepository.findByMediaItemId(mediaItemID));
    }

    @Override
    public Double getAvgScoreById(String mediaItemId) {
        return reviewRepository.getAvgScoreById(mediaItemId);
    }

}

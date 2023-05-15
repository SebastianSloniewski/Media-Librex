package pl.ziwg.medialibrex.mapper;

import org.mapstruct.Mapper;
import pl.ziwg.medialibrex.dto.ReviewDTO;
import pl.ziwg.medialibrex.dto.UserGetDTO;
import pl.ziwg.medialibrex.entity.Review;
import pl.ziwg.medialibrex.entity.User;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    ReviewDTO toReviewDTO(Review review);

    Review toReview(ReviewDTO reviewDTO);

    List<ReviewDTO> toReviewDTOList(List<Review> reviewList);

    List<Review> toReviewList(List<ReviewDTO> reviewDTOList);

    UserGetDTO toUserGetDTO(User user);

    User toUser(UserGetDTO userGetDTO);
}

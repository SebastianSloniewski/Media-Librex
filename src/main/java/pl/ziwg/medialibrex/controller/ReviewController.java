package pl.ziwg.medialibrex.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.ziwg.medialibrex.dto.MediaListDTO;
import pl.ziwg.medialibrex.dto.ReviewDTO;
import pl.ziwg.medialibrex.service.MediaListService;
import pl.ziwg.medialibrex.service.ReviewService;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
public class ReviewController {

    private ReviewService reviewService;

    @PostMapping("/{mediaItemID}/reviews/create")
    public void createReview(@RequestBody ReviewDTO reviewDTO, @RequestParam Long userID) throws JsonProcessingException {
        reviewService.createReview(reviewDTO, userID);
    }

    @PostMapping("/reviews/{ID}/update")
    public void updateCollection(@RequestBody ReviewDTO reviewDTO) throws JsonProcessingException {
        reviewService.updateReview(reviewDTO);
    }

    @DeleteMapping("/reviews/{ID}/delete")
    public void deleteCollection(@PathVariable Long ID) throws JsonProcessingException {
        reviewService.deleteReview(ID);
    }

    @GetMapping("/reviews")
    public String gelAllReviews() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(reviewService.getAllReviews());
    }

    @GetMapping("/reviews/{ID}")
    public String getReviewByID(@PathVariable Long ID) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(reviewService.getReviewById(ID));
    }

    @GetMapping("/users/{userID}/reviews")
    public String getUserReviews(@PathVariable String userID) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(reviewService.getReviewsByUser(userID));
    }

    @GetMapping("/{mediaItemID}/reviews")
    public String getMediaItemReviews(@PathVariable String mediaItemID) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(reviewService.getReviewsByMediaItem(mediaItemID));
    }


}

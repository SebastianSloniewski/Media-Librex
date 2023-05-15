package pl.ziwg.medialibrex.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ReviewDTO {

    private Long id;

    private Date creationDate;

    private Date lastUpdateDate;

    @NotEmpty
    private String reviewText;

    @NotEmpty
    private Integer reviewScore;

    @NotEmpty
    private String mediaItemId;

    @NotEmpty
    private String mediaItemType;

    private UserGetDTO user;

}

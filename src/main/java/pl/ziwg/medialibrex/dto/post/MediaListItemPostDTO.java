package pl.ziwg.medialibrex.dto.post;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MediaListItemPostDTO {

    @NotEmpty
    private Long listPositionIndex;

    @NotEmpty
    private String mediaItemId;

    @NotEmpty
    private String mediaItemType;
}

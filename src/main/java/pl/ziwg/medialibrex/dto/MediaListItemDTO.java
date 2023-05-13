package pl.ziwg.medialibrex.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.ziwg.medialibrex.API.MediaItem;

import java.sql.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MediaListItemDTO {

    private Long id;

    @NotEmpty
    private Long listPositionIndex;

    private Date dateAdded;

    @NotEmpty
    private MediaItem mediaItem;
}

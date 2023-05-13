package pl.ziwg.medialibrex.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.ziwg.medialibrex.entity.MediaListItem;
import pl.ziwg.medialibrex.entity.User;

import java.sql.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MediaListDTO {
    private Long id;

    @NotEmpty
    private String name;

    @NotEmpty
    private Date creationDate;

    @NotEmpty
    private Date lastUpdateDate;

    @NotEmpty
    private List<UserDTO> users;

    private List<MediaListItem> mediaListItems;

}

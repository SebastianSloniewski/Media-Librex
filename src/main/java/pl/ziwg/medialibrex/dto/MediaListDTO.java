package pl.ziwg.medialibrex.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MediaListDTO {
    private Long id;

    @NotEmpty
    private String name;

    private Boolean defaultList;

    private Long creatorId;

    private Date creationDate;

    private Date lastUpdateDate;

    @NotEmpty
    private List<UserGetDTO> users;

    private List<MediaListItemDTO> mediaListItems;

}

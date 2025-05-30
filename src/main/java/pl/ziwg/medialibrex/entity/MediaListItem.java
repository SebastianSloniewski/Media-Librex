package pl.ziwg.medialibrex.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import pl.ziwg.medialibrex.API.MediaItem;

import java.sql.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="media_list_items")
public class MediaListItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private Long listPositionIndex;

    @CreationTimestamp
    @Column(nullable=false, updatable = false)
    private Date dateAdded;

    @Column(nullable=false)
    private String mediaItemId;

    @Column(nullable=false)
    private String mediaItemType;

}

package pl.ziwg.medialibrex.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="media_lists")
public class MediaList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String name;

    @CreationTimestamp
    @Column(nullable=false, updatable = false)
    private Date creationDate;

    @UpdateTimestamp
    @Column(nullable=false)
    private Date lastUpdateDate;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.REFRESH})
    @JoinTable(
            name="user_lists",
            joinColumns={@JoinColumn(name="LIST_ID", referencedColumnName="ID")},
            inverseJoinColumns={@JoinColumn(name="USER_ID", referencedColumnName="ID")})
    private List<User> users;

    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    @JoinTable(
            name="list_items",
            joinColumns={@JoinColumn(name="LIST_ID", referencedColumnName="ID")},
            inverseJoinColumns={@JoinColumn(name="LIST_ITEM_ID", referencedColumnName="ID")})
    private List<MediaListItem> mediaListItems = new ArrayList<>();

}

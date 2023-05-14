package pl.ziwg.medialibrex.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    @Column(nullable=false, updatable = false)
    private Date creationDate;

    @UpdateTimestamp
    @Column(nullable=false)
    private Date lastUpdateDate;

    @Column(nullable=false)
    private String reviewText;

    @Column(nullable=false)
    private Integer reviewScore;

    @Column(nullable=false)
    private String mediaItemId;

    @Column(nullable=false)
    private String mediaItemType;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.REFRESH})
    @JoinTable(
            name="user_reviews",
            joinColumns={@JoinColumn(name="REVIEW_ID", referencedColumnName="ID")},
            inverseJoinColumns={@JoinColumn(name="USER_ID", referencedColumnName="ID")})
    private User user;

}

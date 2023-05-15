package pl.ziwg.medialibrex.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "friendships")
public class Friendship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user1_id", referencedColumnName = "id")
    private User user1;

    @ManyToOne
    @JoinColumn(name = "user2_id", referencedColumnName = "id")
    private User user2;

    @Enumerated(EnumType.STRING)
    private FriendshipStatus status;

    private LocalDateTime timestamp;

    public Friendship(User user1, User user2) {
        this.user1 = user1;
        this.user2 = user2;
        this.status = FriendshipStatus.PENDING;
        this.timestamp = LocalDateTime.now();
    }
}
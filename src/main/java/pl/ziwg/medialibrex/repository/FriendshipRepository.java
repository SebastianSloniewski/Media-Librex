package pl.ziwg.medialibrex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.ziwg.medialibrex.entity.Friendship;
import pl.ziwg.medialibrex.entity.FriendshipStatus;
import pl.ziwg.medialibrex.entity.User;

import java.util.List;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    Friendship findByUser1AndUser2(User user1, User user2);
    List<Friendship> findByUser1AndStatus(User user1, FriendshipStatus status);
}

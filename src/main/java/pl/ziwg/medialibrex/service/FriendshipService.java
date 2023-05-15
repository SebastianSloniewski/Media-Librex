package pl.ziwg.medialibrex.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.ziwg.medialibrex.entity.Friendship;
import pl.ziwg.medialibrex.entity.FriendshipStatus;
import pl.ziwg.medialibrex.entity.User;
import pl.ziwg.medialibrex.repository.FriendshipRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FriendshipService {
    private FriendshipRepository friendshipRepository;

    @Autowired
    public FriendshipService(FriendshipRepository friendshipRepository) {
        this.friendshipRepository = friendshipRepository;
    }

    public void sendFriendRequest(User sender, User recipient) {
        Friendship existingFriendship = friendshipRepository.findByUser1AndUser2(sender, recipient);
        if (existingFriendship == null) {
            Friendship friendship = new Friendship(sender, recipient);
            friendshipRepository.save(friendship);
        }
    }

    public void acceptFriendRequest(User user1, User user2) {
        Friendship friendship = friendshipRepository.findByUser1AndUser2(user1, user2);
        if (friendship != null && friendship.getStatus() == FriendshipStatus.PENDING) {
            Friendship friendship1 = new Friendship(user2, user1);
            friendship.setStatus(FriendshipStatus.ACCEPTED);
            friendship1.setStatus(FriendshipStatus.ACCEPTED);
            friendshipRepository.save(friendship1);
            friendshipRepository.save(friendship);
        }
    }

    public void declineFriendRequest(User user1, User user2) {
        Friendship friendship = friendshipRepository.findByUser1AndUser2(user1, user2);
        if (friendship != null && friendship.getStatus() == FriendshipStatus.PENDING) {
            friendship.setStatus(FriendshipStatus.DECLINED);
            friendshipRepository.save(friendship);
        }
    }

    public void removeFriend(User user, User friend) {
        Friendship friendship = friendshipRepository.findByUser1AndUser2(user, friend);
        if (friendship != null) {
            friendshipRepository.delete(friendship);
        }
        Friendship friendship1 = friendshipRepository.findByUser1AndUser2(friend, user);
        if (friendship1 != null) {
            friendshipRepository.delete(friendship1);
        }
    }

    public List<User> getUserFriends(User user) {
        List<Friendship> friendships = friendshipRepository.findByUser1AndStatus(user, FriendshipStatus.ACCEPTED);
        return friendships.stream()
                .map(friendship -> friendship.getUser2())
                .collect(Collectors.toList());
    }
}
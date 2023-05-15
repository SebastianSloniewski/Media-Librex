package pl.ziwg.medialibrex.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.ziwg.medialibrex.entity.User;
import pl.ziwg.medialibrex.service.FriendshipService;
import pl.ziwg.medialibrex.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/friendships")
public class FriendshipController {
    private FriendshipService friendshipService;
    private UserService userService;

    @Autowired
    public FriendshipController(FriendshipService friendshipService, UserService userService) {
        this.friendshipService = friendshipService;
        this.userService = userService;
    }

    @PostMapping("/{userId}/request")
    public ResponseEntity<String> sendFriendRequest(
            @PathVariable("userId") Long userId,
            @RequestBody Long friendId
    ) {
        User sender = userService.findById(userId);
        User recipient = userService.findById(friendId);
        if (sender == null || recipient == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or friend not found");
        }
        friendshipService.sendFriendRequest(sender, recipient);
        return ResponseEntity.ok("Friend request sent successfully");
    }

    @PostMapping("/{userId}/accept")
    public ResponseEntity<String> acceptFriendRequest(
            @PathVariable("userId") Long userId,
            @RequestBody Long friendId
    ) {
        User user1 = userService.findById(friendId);
        User user2 = userService.findById(userId);
        if (user1 == null || user2 == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or friend not found");
        }
        friendshipService.acceptFriendRequest(user1, user2);
        return ResponseEntity.ok("Friend request accepted");
    }

    @PostMapping("/{userId}/decline")
    public ResponseEntity<String> declineFriendRequest(
            @PathVariable("userId") Long userId,
            @RequestBody Long friendId
    ) {
        User user1 = userService.findById(userId);
        User user2 = userService.findById(friendId);
        if (user1 == null || user2 == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or friend not found");
        }
        friendshipService.declineFriendRequest(user1, user2);
        return ResponseEntity.ok("Friend request declined");
    }

    @PostMapping("/{userId}/remove")
    public ResponseEntity<String> removeFriend(
            @PathVariable("userId") Long userId,
            @RequestBody Long friendId
    ) {
        User user1 = userService.findById(userId);
        User user2 = userService.findById(friendId);
        if (user1 == null || user2 == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or friend not found");
        }
        friendshipService.removeFriend(user1, user2);
        return ResponseEntity.ok("Friend removed successfully");
    }

    @GetMapping("/{userId}/friends")
    public ResponseEntity<List<User>> getUserFriends(@PathVariable("userId") Long userId) {
        User user = userService.findById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        List<User> friends = friendshipService.getUserFriends(user);
        return ResponseEntity.ok(friends);
    }

}


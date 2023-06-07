package pl.ziwg.medialibrex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.ziwg.medialibrex.entity.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    List<User> findByName(String name);
}

package pl.ziwg.medialibrex.service;

import pl.ziwg.medialibrex.dto.UserDTO;
import pl.ziwg.medialibrex.entity.User;

import java.util.List;

public interface UserService {
    void saveUser(UserDTO userDTO);

    User findByEmail(String email);

    List<UserDTO> findAllUsers();

    User findById(Long id);

}

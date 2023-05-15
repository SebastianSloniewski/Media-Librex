package pl.ziwg.medialibrex.mapper;

import org.mapstruct.Mapper;
import pl.ziwg.medialibrex.dto.UserGetDTO;
import pl.ziwg.medialibrex.entity.User;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserGetDTO toUserGetDTO(User user);

    User toUser(UserGetDTO userGetDTO);

    List<User> toUserList(List<UserGetDTO> userGetDTOList);

    List<UserGetDTO> toUserGetDTOList(List<User> userList);
}

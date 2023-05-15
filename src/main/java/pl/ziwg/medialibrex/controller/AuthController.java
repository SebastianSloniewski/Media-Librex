package pl.ziwg.medialibrex.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;
import pl.ziwg.medialibrex.dto.MediaListDTO;
import pl.ziwg.medialibrex.dto.UserDTO;
import pl.ziwg.medialibrex.dto.UserGetDTO;
import pl.ziwg.medialibrex.entity.User;
import pl.ziwg.medialibrex.mapper.UserMapper;
import pl.ziwg.medialibrex.service.MediaListService;
import pl.ziwg.medialibrex.service.UserService;

import java.security.Principal;
import java.util.List;

@Controller
@AllArgsConstructor
public class AuthController {

    private UserService userService;
    private UserMapper userMapper;
    private MediaListService mediaListService;

    @GetMapping("index")
    public String home(){
        return "index";
    }

    @GetMapping("/login")
    public String loginForm() {
        return "login";
    }

    @GetMapping("/logged")
    public ModelAndView loggedInfo(Principal principal) {

        User user = userService.findByEmail(principal.getName());
        UserGetDTO userGetDTO = userMapper.toUserGetDTO(user);
        return new ModelAndView("redirect:http://localhost:3000/","UserDao", userGetDTO);
    }

    @GetMapping("register")
    public String showRegistrationForm(Model model){
        UserDTO user = new UserDTO();
        model.addAttribute("user", user);
        return "register";
    }

    @PostMapping("/register/save")
    public String registration(@Valid @ModelAttribute("user") UserDTO user,
                               BindingResult result,
                               Model model){
        User existing = userService.findByEmail(user.getEmail());
        if (existing != null) {
            result.rejectValue("email", null, "There is already an account registered with that email");
        }
        if (result.hasErrors()) {
            model.addAttribute("user", user);
            return "register";
        }
        userService.saveUser(user);

        // Create default collection for user
        MediaListDTO defaultMediaList = new MediaListDTO();
        defaultMediaList.setName("Obejrzane");
        mediaListService.createMediaList(defaultMediaList, userService.findByEmail(user.getEmail()).getId());

        return "redirect:/register?success";
    }

    @GetMapping("/users")
    public String listRegisteredUsers(Model model){
        List<UserDTO> users = userService.findAllUsers();
        model.addAttribute("users", users);
        return "users";
    }
}

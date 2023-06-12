package pl.ziwg.medialibrex.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.authentication.logout.CookieClearingLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import pl.ziwg.medialibrex.dto.MediaListDTO;
import pl.ziwg.medialibrex.dto.UserDTO;
import pl.ziwg.medialibrex.dto.UserGetDTO;
import pl.ziwg.medialibrex.entity.User;
import pl.ziwg.medialibrex.mapper.UserMapper;
import pl.ziwg.medialibrex.repository.UserRepository;
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
    public String setCookie(Principal principal, HttpServletResponse response) {
        User user = userService.findByEmail(principal.getName());

        Long id = user.getId();
        String email = user.getEmail();
        String name = user.getName();

        String[] output = name.split(" ");
        String firstname = output[0];
        String lastname = output[1];

        // create a cookie
        Cookie cookie_id = new Cookie("id", id.toString());
        Cookie cookie_email = new Cookie("email", email);
        Cookie cookie_firstname = new Cookie("firstname", firstname);
        Cookie cookie_lastname = new Cookie("lastname", lastname);

        //add cookie to response
        response.addCookie(cookie_id);
        response.addCookie(cookie_email);
        response.addCookie(cookie_firstname);
        response.addCookie(cookie_lastname);


        return "redirect:http://localhost:3000/";
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
        defaultMediaList.setName("Watched");
        mediaListService.createMediaList(defaultMediaList, userService.findByEmail(user.getEmail()).getId(), true);

        return "redirect:/register?success";
    }

    @GetMapping("/users")
    public String listRegisteredUsers(Model model){
        List<UserDTO> users = userService.findAllUsers();
        model.addAttribute("users", users);
        return "users";
    }

    @GetMapping("/users/search")
    public ResponseEntity<List<UserGetDTO>> searchUsersByName(@RequestParam String name){
        List<User> users = userService.findByName(name);
        if (users == null || users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(userMapper.toUserGetDTOList(users));
    }
}

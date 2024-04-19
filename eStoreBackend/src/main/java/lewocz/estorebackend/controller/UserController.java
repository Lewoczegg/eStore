package lewocz.estorebackend.controller;

import jakarta.validation.Valid;
import lewocz.estorebackend.model.User;
import lewocz.estorebackend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Valid @RequestBody User user) {
        userService.registerUser(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
    }
}

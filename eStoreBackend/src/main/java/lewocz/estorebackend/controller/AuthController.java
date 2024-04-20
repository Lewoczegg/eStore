package lewocz.estorebackend.controller;

import jakarta.validation.Valid;
import lewocz.estorebackend.dto.LoginRequest;
import lewocz.estorebackend.dto.LoginResponse;
import lewocz.estorebackend.dto.UserDTO;
import lewocz.estorebackend.model.User;
import lewocz.estorebackend.service.UserService;
import lewocz.estorebackend.utils.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        } catch (BadCredentialsException e) {
            throw e;
        }

        Long seconds = 3600L;
        User user = userService.getUserByEmail(request.email());
        String token = JwtUtil.generateToken(request.email(), seconds);

        UserDTO userDto = new UserDTO(
                user.getFirstName(),
                user.getLastName(),
                user.getAddress(),
                user.getCity(),
                user.getState(),
                user.getPin()
        );

        return ResponseEntity.ok(new LoginResponse(token, seconds, userDto));
    }
}

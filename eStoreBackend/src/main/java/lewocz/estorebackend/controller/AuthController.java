package lewocz.estorebackend.controller;

import jakarta.validation.Valid;
import lewocz.estorebackend.dto.LoginRequest;
import lewocz.estorebackend.dto.LoginResponse;
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

    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        } catch (BadCredentialsException e) {
            throw e;
        }

        Long seconds = 3600L;
        String token = JwtUtil.generateToken(request.email(), seconds);
        return ResponseEntity.ok(new LoginResponse(token, seconds));
    }
}

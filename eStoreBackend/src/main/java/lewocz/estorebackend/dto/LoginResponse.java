package lewocz.estorebackend.dto;

public record LoginResponse(String token, Long expiresInSeconds, UserDTO userDTO) {
}

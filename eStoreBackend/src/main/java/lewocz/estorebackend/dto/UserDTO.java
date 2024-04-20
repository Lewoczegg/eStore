package lewocz.estorebackend.dto;

public record UserDTO(
        String firstName,
        String lastName,
        String address,
        String city,
        String state,
        String pin,
        String email
) {
}

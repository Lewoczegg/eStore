package lewocz.estorebackend.dto;

public record OrderDetailDTO(
        Integer productId,
        Integer qty,
        Integer amount,
        Integer price
) {
}

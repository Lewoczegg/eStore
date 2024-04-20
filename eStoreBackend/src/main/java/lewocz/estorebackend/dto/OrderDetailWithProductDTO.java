package lewocz.estorebackend.dto;

public record OrderDetailWithProductDTO(
        Integer id,
        Integer productId,
        String productName,
        Integer qty,
        Integer price,
        Integer amount
        ) {
}

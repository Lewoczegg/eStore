package lewocz.estorebackend.dto;

import lewocz.estorebackend.model.OrderDetail;

import java.util.List;

public record AddOrderRequest(
        String userName,
        String address,
        String city,
        String state,
        String pin,
        Long total,
        String userEmail,
        List<OrderDetailDTO> orderDetails) {
}

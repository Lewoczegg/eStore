package lewocz.estorebackend.service;

import lewocz.estorebackend.dto.AddOrderRequest;
import lewocz.estorebackend.dto.OrderDetailWithProductDTO;
import lewocz.estorebackend.model.Order;
import lewocz.estorebackend.model.OrderDetail;

import java.util.List;

public interface OrderService {
    void addOrder(AddOrderRequest order);
    List<Order> getAllOrdersByEmail(String email);
    List<OrderDetailWithProductDTO> getOrderDetailsWithProductName(Integer orderId);
}

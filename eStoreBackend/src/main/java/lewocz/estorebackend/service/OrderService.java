package lewocz.estorebackend.service;

import lewocz.estorebackend.dto.AddOrderRequest;
import lewocz.estorebackend.model.Order;

public interface OrderService {
    void addOrder(AddOrderRequest order);
}

package lewocz.estorebackend.controller;

import lewocz.estorebackend.dto.AddOrderRequest;
import lewocz.estorebackend.dto.ApiResponse;
import lewocz.estorebackend.dto.OrderDetailWithProductDTO;
import lewocz.estorebackend.model.Order;
import lewocz.estorebackend.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/add")
    ResponseEntity<ApiResponse> addOrder(@RequestBody AddOrderRequest request) {
        orderService.addOrder(request);

        ApiResponse response = new ApiResponse("Order added successfully");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/getAll")
    ResponseEntity<List<Order>> getAlOrders(@RequestParam String userEmail) {
        List<Order> orders = orderService.getAllOrdersByEmail(userEmail);

        return ResponseEntity.status(HttpStatus.OK).body(orders);
    }

    @GetMapping("/get")
    public ResponseEntity<List<OrderDetailWithProductDTO>> getOrderDetailsWithProductNameByOrderId(@RequestParam Integer orderId) {
        List<OrderDetailWithProductDTO> orderDetails = orderService.getOrderDetailsWithProductName(orderId);

        return ResponseEntity.status(HttpStatus.OK).body(orderDetails);
    }
}

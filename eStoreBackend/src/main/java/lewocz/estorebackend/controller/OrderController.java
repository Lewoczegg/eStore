package lewocz.estorebackend.controller;

import lewocz.estorebackend.dto.AddOrderRequest;
import lewocz.estorebackend.dto.ApiResponse;
import lewocz.estorebackend.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}

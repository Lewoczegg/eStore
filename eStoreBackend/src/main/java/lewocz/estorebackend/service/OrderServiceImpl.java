package lewocz.estorebackend.service;

import lewocz.estorebackend.dto.AddOrderRequest;
import lewocz.estorebackend.model.Order;
import lewocz.estorebackend.model.OrderDetail;
import lewocz.estorebackend.model.Product;
import lewocz.estorebackend.model.User;
import lewocz.estorebackend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final UserService userService;
    private final ProductService productService;
    private final OrderRepository orderRepository;

    public OrderServiceImpl(UserService userService, ProductService productService, OrderRepository orderRepository) {
        this.userService = userService;
        this.productService = productService;
        this.orderRepository = orderRepository;
    }

    @Override
    public void addOrder(AddOrderRequest orderRequest) {

        User user = userService.getUserByEmail(orderRequest.userEmail());

        Order newOrder = new Order();
        newOrder.setUser(user);
        newOrder.setUserName(orderRequest.userName());
        newOrder.setAddress(orderRequest.address());
        newOrder.setCity(orderRequest.city());
        newOrder.setState(orderRequest.state());
        newOrder.setPin(orderRequest.pin());
        newOrder.setTotal(orderRequest.total());

        List<OrderDetail> orderDetails = new ArrayList<>();

        orderRequest.orderDetails().forEach(detail -> {
            Product product = productService.getProductById(detail.productId());

            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setProduct(product);
            orderDetail.setQty(detail.qty());
            orderDetail.setPrice(detail.price());
            orderDetail.setAmount(detail.amount());

            orderDetails.add(orderDetail);
        });

        newOrder.setOrderDetails(orderDetails);

        orderRepository.save(newOrder);
    }
}

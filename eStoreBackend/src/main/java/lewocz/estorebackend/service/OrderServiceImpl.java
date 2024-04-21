package lewocz.estorebackend.service;

import lewocz.estorebackend.dto.AddOrderRequest;
import lewocz.estorebackend.dto.OrderDetailWithProductDTO;
import lewocz.estorebackend.model.Order;
import lewocz.estorebackend.model.OrderDetail;
import lewocz.estorebackend.model.Product;
import lewocz.estorebackend.model.User;
import lewocz.estorebackend.repository.OrderDetailRepository;
import lewocz.estorebackend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final UserService userService;
    private final ProductService productService;
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;

    public OrderServiceImpl(UserService userService, ProductService productService, OrderRepository orderRepository, OrderDetailRepository orderDetailRepository) {
        this.userService = userService;
        this.productService = productService;
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
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

    @Override
    public List<Order> getAllOrdersByEmail(String email) {
        User user = userService.getUserByEmail(email);

        return orderRepository.findByUserId(user.getId());
    }

    @Override
    public List<OrderDetailWithProductDTO> getOrderDetailsWithProductName(Integer orderId) {
        List<OrderDetail> orderDetail = orderDetailRepository.findByOrderId(orderId);

        List<OrderDetailWithProductDTO> orderDetailWithProductDTOs = orderDetail.stream().map(detail ->
            new OrderDetailWithProductDTO(
                    detail.getId(),
                    detail.getProduct().getId(),
                    detail.getProduct().getProductName(),
                    detail.getQty(),
                    detail.getPrice(),
                    detail.getAmount(),
                    detail.getProduct().getProductImg()
            )
        ).collect(Collectors.toList());

        return orderDetailWithProductDTOs;
    }
}

package lewocz.estorebackend.controller;

import lewocz.estorebackend.model.Category;
import lewocz.estorebackend.model.Product;
import lewocz.estorebackend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/product")
    public ResponseEntity<List<Product>> getAllProducts(
            @RequestParam(required = false) Integer subCategoryId,
            @RequestParam(required = false) Integer mainCategoryId
    ) {
        List<Product> products;
        if(mainCategoryId != null) {
            products = productService.getAllProductsByMainCategoryId(mainCategoryId);
        } else if (subCategoryId != null) {
            products = productService.getAllProductsBySubCategoryId(subCategoryId);
        } else {
            products = productService.getAllProducts();
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/category")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = productService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
}

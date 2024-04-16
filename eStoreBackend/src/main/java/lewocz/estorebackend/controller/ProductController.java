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
            @RequestParam(required = false) Integer mainCategoryId,
            @RequestParam(required = false) String keyword
    ) {
        List<Product> products;
        if (subCategoryId != null) {
            if (keyword != null) {
                products = productService.getProductsBySubCategoryIdAndKeyword(subCategoryId, keyword);
            } else {
                System.out.println("sub");
                products = productService.getAllProductsBySubCategoryId(subCategoryId);
            }
        } else if (mainCategoryId != null) {
            if (keyword != null) {
                products = productService.getProductsByMainCategoryIdAndKeyword(mainCategoryId, keyword);

            } else {
                System.out.println("main");
                products = productService.getAllProductsByMainCategoryId(mainCategoryId);

            }
        } else {
            if (keyword != null) {
                products = productService.getProductsByPartialKeyword(keyword);
            } else {
                products = productService.getAllProducts();
            }
        }

        System.out.println(products.toString());
        return ResponseEntity.ok(products);
    }

    @GetMapping("/category")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = productService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
}

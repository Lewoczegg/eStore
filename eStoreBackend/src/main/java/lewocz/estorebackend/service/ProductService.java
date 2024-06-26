package lewocz.estorebackend.service;

import lewocz.estorebackend.model.Category;
import lewocz.estorebackend.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    List<Category> getAllCategories();
    List<Product> getAllProductsByMainCategoryId(int categoryId);
    List<Product> getAllProductsBySubCategoryId(int categoryId);
    List<Product> getProductsByMainCategoryIdAndKeyword(int mainCategoryId, String keyword);
    List<Product> getProductsBySubCategoryIdAndKeyword(int subCategoryId, String keyword);
    List<Product> getProductsByPartialKeyword(String keyword);
    Product getProductById(int productId);
}

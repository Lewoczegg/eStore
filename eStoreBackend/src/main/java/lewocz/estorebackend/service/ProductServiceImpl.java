package lewocz.estorebackend.service;

import lewocz.estorebackend.model.Category;
import lewocz.estorebackend.model.Product;
import lewocz.estorebackend.repository.CategoryRepository;
import lewocz.estorebackend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public List<Product> getAllProductsByMainCategoryId(int mainCategoryId) {
        Optional<Category> category = categoryRepository.findById(mainCategoryId);

        if (category.isEmpty()) {
            throw new IllegalArgumentException("Category with id " + mainCategoryId + " not found");
        }

        return productRepository.findByCategoryParentCategoryId(mainCategoryId);
    }

    @Override
    public List<Product> getAllProductsBySubCategoryId(int subCategoryId) {
        Optional<Category> category = categoryRepository.findById(subCategoryId);

        if (category.isEmpty()) {
            throw new IllegalArgumentException("Category with id " + subCategoryId + " not found");
        }

        return productRepository.findByCategory(category.get());
    }

    @Override
    public List<Product> getProductsByMainCategoryIdAndKeyword(int mainCategoryId, String keyword) {
        Optional<Category> category = categoryRepository.findById(mainCategoryId);

        if (category.isEmpty()) {
            throw new IllegalArgumentException("Category with id " + mainCategoryId + " not found");
        }

        return productRepository.findByMainCategoryIdAndKeyword(mainCategoryId, keyword);
    }

    @Override
    public List<Product> getProductsBySubCategoryIdAndKeyword(int subCategoryId, String keyword) {
        Optional<Category> category = categoryRepository.findById(subCategoryId);

        if (category.isEmpty()) {
            throw new IllegalArgumentException("Category with id " + subCategoryId + " not found");
        }

        return productRepository.findBySubCategoryIdAndKeyword(subCategoryId, keyword);
    }

    @Override
    public List<Product> getProductsByPartialKeyword(String keyword) {
        return productRepository.findByKeywordsContaining(keyword);
    }

    @Override
    public Product getProductById(int id) {
        Optional<Product> product = productRepository.findById(id);

        if (product.isEmpty()) {
            throw new IllegalArgumentException("Product with id " + id + " not found");
        }

        return product.get();
    }
}

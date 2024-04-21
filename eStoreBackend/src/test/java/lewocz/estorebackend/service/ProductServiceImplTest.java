package lewocz.estorebackend.service;

import lewocz.estorebackend.exception.NotFoundException;
import lewocz.estorebackend.model.Category;
import lewocz.estorebackend.model.Product;
import lewocz.estorebackend.repository.CategoryRepository;
import lewocz.estorebackend.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private ProductServiceImpl productService;


    @Test
    public void whenGetAllProducts_thenReturnProductList() {
        Product product1 = new Product();
        product1.setId(1);
        Product product2 = new Product();
        product2.setId(2);
        when(productRepository.findAll()).thenReturn(Arrays.asList(product1, product2));

        List<Product> products = productService.getAllProducts();

        assertNotNull(products);
        assertEquals(2, products.size());
        verify(productRepository).findAll();
    }

    @Test
    public void whenGetAllCategories_thenReturnCategoryList() {
        Category category1 = new Category();
        category1.setId(1);
        category1.setCategory("Electronics");

        Category category2 = new Category();
        category2.setId(2);
        category2.setCategory("Clothing");

        when(categoryRepository.findAll()).thenReturn(Arrays.asList(category1, category2));

        List<Category> categories = productService.getAllCategories();

        assertNotNull(categories);
        assertEquals(2, categories.size(), "Should return all categories");
        assertEquals("Electronics", categories.get(0).getCategory());
        assertEquals("Clothing", categories.get(1).getCategory());
        verify(categoryRepository).findAll();
    }

    @Test
    public void givenCategoryExist_whenGetAllProductsByMainCategoryId_thenReturnProductList() {
        int mainCategoryId = 1;
        Category category = new Category();
        category.setId(mainCategoryId);
        when(categoryRepository.findById(mainCategoryId)).thenReturn(Optional.of(category));

        Product product1 = new Product();
        product1.setId(1);
        Product product2 = new Product();
        product2.setId(2);
        when(productRepository.findByCategoryParentCategoryId(mainCategoryId)).thenReturn(Arrays.asList(product1, product2));

        List<Product> products = productService.getAllProductsByMainCategoryId(mainCategoryId);

        assertNotNull(products);
        assertEquals(2, products.size());
        assertEquals(1, products.get(0).getId());
        assertEquals(2, products.get(1).getId());
        verify(categoryRepository).findById(mainCategoryId);
        verify(productRepository).findByCategoryParentCategoryId(mainCategoryId);
    }

    @Test
    public void givenCategoryDoesNotExist_whenGetAllProductsByMainCategoryId_thenThrowNotFoundException() {
        int mainCategoryId = 999;
        when(categoryRepository.findById(mainCategoryId)).thenReturn(Optional.empty());

        NotFoundException thrown = assertThrows(
                NotFoundException.class,
                () -> productService.getAllProductsByMainCategoryId(mainCategoryId),
                "Expected getAllProductsByMainCategoryId to throw, but it didn't"
        );

        assertTrue(thrown.getMessage().contains("Category with id " + mainCategoryId + " not found"));
        verify(categoryRepository).findById(mainCategoryId);
        verify(productRepository, never()).findByCategoryParentCategoryId(anyInt());
    }

    @Test
    public void givenCategoryExist_whenGetAllProductsBySubCategoryId_thenReturnProductList() {
        int subCategoryId = 1;
        Category category = new Category();
        category.setId(subCategoryId);
        Product product1 = new Product();
        product1.setId(1);
        Product product2 = new Product();
        product2.setId(2);
        when(categoryRepository.findById(subCategoryId)).thenReturn(Optional.of(category));
        when(productRepository.findByCategory(category)).thenReturn(Arrays.asList(product1, product2));

        List<Product> products = productService.getAllProductsBySubCategoryId(subCategoryId);

        assertNotNull(products);
        assertEquals(2, products.size());
        verify(categoryRepository).findById(subCategoryId);
        verify(productRepository).findByCategory(category);
    }

    @Test
    public void givenCategoryDoesNotExist_whenGetAllProductsBySubCategoryId_thenThrowNotFoundException() {
        int subCategoryId = 999;
        when(categoryRepository.findById(subCategoryId)).thenReturn(Optional.empty());

        NotFoundException thrown = assertThrows(
                NotFoundException.class,
                () -> productService.getAllProductsBySubCategoryId(subCategoryId),
                "Expected getAllProductsBySubCategoryId to throw, but it didn't"
        );

        assertTrue(thrown.getMessage().contains("Category with id " + subCategoryId + " not found"));
        verify(categoryRepository).findById(subCategoryId);
        verify(productRepository, never()).findByCategory(any(Category.class));
    }

    @Test
    public void givenCategoryExist_whenGetProductsByMainCategoryIdAndKeyword_thenReturnProductList() {
        int mainCategoryId = 1;
        String keyword = "electronics";
        Category category = new Category();
        category.setId(mainCategoryId);
        Product product1 = new Product();
        product1.setId(1);
        product1.setKeywords(keyword);
        Product product2 = new Product();
        product2.setId(2);
        product2.setKeywords(keyword);
        when(categoryRepository.findById(mainCategoryId)).thenReturn(Optional.of(category));
        when(productRepository.findByMainCategoryIdAndKeyword(mainCategoryId, keyword)).thenReturn(Arrays.asList(product1, product2));

        List<Product> products = productService.getProductsByMainCategoryIdAndKeyword(mainCategoryId, keyword);

        assertNotNull(products);
        assertEquals(2, products.size());
        verify(categoryRepository).findById(mainCategoryId);
        verify(productRepository).findByMainCategoryIdAndKeyword(mainCategoryId, keyword);
    }

    @Test
    public void givenCategoryDoesNotExist_whenGetProductsByMainCategoryIdAndKeyword_thenThrowNotFoundException() {
        int mainCategoryId = 999;
        String keyword = "nonexistent";
        when(categoryRepository.findById(mainCategoryId)).thenReturn(Optional.empty());

        NotFoundException thrown = assertThrows(
                NotFoundException.class,
                () -> productService.getProductsByMainCategoryIdAndKeyword(mainCategoryId, keyword),
                "Expected getProductsByMainCategoryIdAndKeyword to throw, but it didn't"
        );

        assertTrue(thrown.getMessage().contains("Category with id " + mainCategoryId + " not found"));
        verify(categoryRepository).findById(mainCategoryId);
        verify(productRepository, never()).findByMainCategoryIdAndKeyword(mainCategoryId, keyword);
    }

    @Test
    public void givenCategoryExist_whenGetProductsBySubCategoryIdAndKeyword_thenReturnProductList() {
        int subCategoryId = 1;
        String keyword = "gadgets";
        Category category = new Category();
        category.setId(subCategoryId);
        Product product1 = new Product();
        product1.setId(1);
        product1.setKeywords(keyword);
        Product product2 = new Product();
        product2.setId(2);
        product2.setKeywords(keyword);
        when(categoryRepository.findById(subCategoryId)).thenReturn(Optional.of(category));
        when(productRepository.findBySubCategoryIdAndKeyword(subCategoryId, keyword)).thenReturn(Arrays.asList(product1, product2));

        List<Product> products = productService.getProductsBySubCategoryIdAndKeyword(subCategoryId, keyword);

        assertNotNull(products);
        assertEquals(2, products.size());
        verify(categoryRepository).findById(subCategoryId);
        verify(productRepository).findBySubCategoryIdAndKeyword(subCategoryId, keyword);
    }

    @Test
    public void givenCategoryDoesNotExist_whenGetProductsBySubCategoryIdAndKeyword_thenThrowNotFoundException() {
        int subCategoryId = 999;
        String keyword = "nonexistent";
        when(categoryRepository.findById(subCategoryId)).thenReturn(Optional.empty());

        NotFoundException thrown = assertThrows(
                NotFoundException.class,
                () -> productService.getProductsBySubCategoryIdAndKeyword(subCategoryId, keyword),
                "Expected getProductsBySubCategoryIdAndKeyword to throw, but it didn't"
        );

        assertTrue(thrown.getMessage().contains("Category with id " + subCategoryId + " not found"));
        verify(categoryRepository).findById(subCategoryId);
        verify(productRepository, never()).findBySubCategoryIdAndKeyword(subCategoryId, keyword);
    }

    @Test
    public void givenProductExist_whenGetProductsByKeyword_thenReturnProductList() {
        String keyword = "tech";
        Product product1 = new Product();
        product1.setId(1);
        product1.setKeywords("latest,tech");
        Product product2 = new Product();
        product2.setId(2);
        product2.setKeywords("super,tech");
        when(productRepository.findByKeywordsContaining(keyword)).thenReturn(Arrays.asList(product1, product2));

        List<Product> products = productService.getProductsByPartialKeyword(keyword);

        assertNotNull(products);
        assertEquals(2, products.size());
        assertTrue(products.stream().allMatch(p -> p.getKeywords().contains(keyword)));
        verify(productRepository).findByKeywordsContaining(keyword);
    }

    @Test
    public void givenProductDoesNotExist_whenGetProductsByKeyword_thenReturnEmptyList() {
        String keyword = "nonexistent";
        when(productRepository.findByKeywordsContaining(keyword)).thenReturn(Collections.emptyList());

        List<Product> products = productService.getProductsByPartialKeyword(keyword);

        assertNotNull(products);
        assertTrue(products.isEmpty());
        verify(productRepository).findByKeywordsContaining(keyword);
    }

    @Test
    public void givenProductExist_whenGetProductById_thenReturnProduct() {
        int productId = 1;
        Product product = new Product();
        product.setId(productId);
        product.setProductName("Gadget");
        when(productRepository.findById(productId)).thenReturn(Optional.of(product));

        Product foundProduct = productService.getProductById(productId);

        assertNotNull(foundProduct);
        assertEquals(productId, foundProduct.getId());
        assertEquals("Gadget", foundProduct.getProductName());
        verify(productRepository).findById(productId);
    }

    @Test
    public void givenProductDoesNotExist_whenGetProductById_thenThrowNotFoundException() {
        int productId = 999;
        when(productRepository.findById(productId)).thenReturn(Optional.empty());

        NotFoundException thrown = assertThrows(
                NotFoundException.class,
                () -> productService.getProductById(productId),
                "Expected getProductById to throw, but it didn't"
        );

        assertTrue(thrown.getMessage().contains("Product with id " + productId + " not found"));
        verify(productRepository).findById(productId);
    }
}
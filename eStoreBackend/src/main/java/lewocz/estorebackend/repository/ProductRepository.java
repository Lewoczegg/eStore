package lewocz.estorebackend.repository;

import lewocz.estorebackend.model.Category;
import lewocz.estorebackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategory(Category category);
    List<Product> findByCategoryParentCategoryId(int mainCategoryId);

    @Query("SELECT p FROM Product p WHERE p.category.id = :category AND p.keywords LIKE %:keyword%")
    List<Product> findBySubCategoryIdAndKeyword(@Param("category") int subCategoryId, @Param("keyword") String keyword);

    @Query("SELECT p FROM Product p WHERE p.category.parentCategory.id = :mainCategoryId AND p.keywords LIKE %:keyword%")
    List<Product> findByMainCategoryIdAndKeyword(@Param("mainCategoryId") int mainCategoryId, @Param("keyword") String keyword);

    @Query("SELECT p FROM Product p WHERE p.keywords LIKE %:keyword%")
    List<Product> findByKeywordsContaining(@Param("keyword") String keyword);
}

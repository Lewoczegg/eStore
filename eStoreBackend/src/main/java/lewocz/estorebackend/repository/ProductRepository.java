package lewocz.estorebackend.repository;

import lewocz.estorebackend.model.Category;
import lewocz.estorebackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategory(Category category);
    List<Product> findByCategoryParentCategoryId(int mainCategoryId);
}

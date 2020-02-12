import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;
import java.util.List;

public class PointDB {
    private EntityManager entityManager;

    public PointDB(){
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("jpa-persistence");
        entityManager = entityManagerFactory.createEntityManager();
    }

    public Point insertPoint(Point point) {
        entityManager.getTransaction().begin();
        entityManager.persist(point);
        entityManager.getTransaction().commit();
        return point;
    }

    public List<Point> findAllPoints() {
        TypedQuery<Point> query = entityManager.createQuery("Select e from Point e", Point.class);
        return query.getResultList();
    }

}

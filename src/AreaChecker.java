import java.io.Serializable;
import java.util.List;

public class AreaChecker implements Serializable {

    private double x;
    private double y;
    private double r = 0.1d;

    private double canvasX;
    private double canvasY;

    private PointDB pointDB = new PointDB();

    public void checkForm() {
        check(x, y);
    }

    public void checkCanvas() {
        check(canvasX, canvasY);
    }

    public void check(double x, double y) {
        Point point = new Point();
        point.setX(x);
        point.setY(y);
        point.setR(r);
        point.setHit(isHit(x, y));
        try {
            pointDB.insertPoint(point);
        } catch (Exception e) {}
    }

    public boolean isHit(Point point) {
        return isHit(point.getX(), point.getY());
    }

    private boolean isHit(double x, double y) {
        if (
            ((x <= 0) && (y >= 0) && (Math.pow(x,2) + Math.pow(y,2) <= Math.pow(r,2))) ||
            ((x >= 0) && (y <= 0) && (y >= x - r/2)) ||
            ((x <= 0) && (y <= 0) && (x >= -r) && (y >= -r/2))
        ){
            return true;
        } else {
            return false;
        }
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public List<Point> getPoints() {
        return pointDB.findAllPoints();
    }

    public void setPoints(List<Point> points) {
        points.forEach(pointDB::insertPoint);
    }

    public Double getCanvasX() {
        return canvasX;
    }

    public void setCanvasX(Double canvasX) {
        this.canvasX = canvasX;
    }

    public Double getCanvasY() {
        return canvasY;
    }

    public void setCanvasY(Double canvasY) {
        this.canvasY = canvasY;
    }

}

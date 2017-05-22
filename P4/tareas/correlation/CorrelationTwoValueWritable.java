package oldapi;

import java.io.DataInput;
import java.io.DataOutput;
import java.io.IOException;
import org.apache.hadoop.io.Writable;


/**
 * Code from stackoverflow
 *
 * http://stackoverflow.com/questions/15734154/how-java-hadoop-mapper-can-send-multiple-values
 *
 * @author Unmesha SreeVeni U.B
 *
 */
public class CorrelationTwoValueWritable implements Writable {
    private double first;
    private double second;

    public  CorrelationTwoValueWritable() {
        set(first, second);
    }
    public  CorrelationTwoValueWritable(double first, double second) {
        set(first, second);
    }
    public void set(double first, double second) {
        this.first = first;
        this.second = second;
    }
    public double getFirst() {
        return first;
    }
    public double getSecond() {
        return second;
    }
    @Override
    public void write(DataOutput out) throws IOException {
        out.writeDouble(first);
        out.writeDouble(second);
    }
    @Override
    public void readFields(DataInput in) throws IOException {
        first = in.readDouble();
        second = in.readDouble();
    }

    /* (non-Javadoc)
     * @see java.lang.Object#hashCode()
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        long temp;
        temp = Double.doubleToLongBits(first);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(second);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        return result;
    }
    /* (non-Javadoc)
     * @see java.lang.Object#equals(java.lang.Object)
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (!(obj instanceof CorrelationTwoValueWritable)) {
            return false;
        }
        CorrelationTwoValueWritable other = (CorrelationTwoValueWritable) obj;
        if (Double.doubleToLongBits(first) != Double
                .doubleToLongBits(other.first)) {
            return false;
        }
        if (Double.doubleToLongBits(second) != Double
                .doubleToLongBits(other.second)) {
            return false;
        }
        return true;
    }
    @Override
    public String toString() {
        return first + "," + second;
    }
}

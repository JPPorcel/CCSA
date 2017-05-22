package oldapi;

import java.io.IOException;
import java.util.Iterator;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.DoubleWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.MapReduceBase;
import org.apache.hadoop.mapred.OutputCollector;
import org.apache.hadoop.mapred.Reducer;
import org.apache.hadoop.mapred.Reporter;

public class CorrelationReducer extends MapReduceBase implements Reducer<Text, CorrelationTwoValueWritable, Text, DoubleWritable> 
{
	public void reduce(Text key, Iterator<CorrelationTwoValueWritable> values, OutputCollector<Text, DoubleWritable> output, Reporter reporter) throws IOException 
	{
		double totalX = 0.0;
		double totalY = 0.0;
		double totalXX = 0.0;
		double totalYY = 0.0;
		double totalXY = 0.0;
		int n = 0;
		
		while (values.hasNext()) 
		{
			CorrelationTwoValueWritable tuple = values.next();
			double x = tuple.getFirst();
			double y = tuple.getSecond();
			totalX += x;
			totalY += y;
			totalXX += x * x;
			totalYY += y * y;
			totalXY += x * y;
			n++;
		}
		
		double averageX = totalX / n;
		double averageY = totalY / n;
		double covariance = totalXY / n - averageX * averageY;
		double desviationX = Math.sqrt(totalXX / n - averageX * averageX);
		double desviationY = Math.sqrt(totalYY / n - averageY * averageY);
		double correlation = covariance / (desviationX * desviationY);
		
		output.collect(key, new DoubleWritable(correlation));
	}
}

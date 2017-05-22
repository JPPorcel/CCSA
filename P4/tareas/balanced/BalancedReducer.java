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

public class BalancedReducer extends MapReduceBase implements Reducer<Text, DoubleWritable, Text, DoubleWritable> 
{
	public void reduce(Text key, Iterator<DoubleWritable> values, OutputCollector<Text, DoubleWritable> output, Reporter reporter) throws IOException 
	{
		int number_of_zeros = 0;
		int number_of_ones = 0;
		while (values.hasNext()) 
		{
			if (values.next().get() == 0)
				number_of_zeros++;
			else
				number_of_ones++;
		}
		double ratio = number_of_zeros*1.0/number_of_ones;
		if(number_of_ones > number_of_zeros) ratio = number_of_ones*1.0/number_of_zeros;
		output.collect(key, new DoubleWritable(ratio));
	}
}

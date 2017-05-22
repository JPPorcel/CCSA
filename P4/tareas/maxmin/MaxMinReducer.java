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

public class MaxMinReducer extends MapReduceBase implements Reducer<Text, DoubleWritable, Text, DoubleWritable> 
{
	public void reduce(Text key, Iterator<DoubleWritable> values, OutputCollector<Text, DoubleWritable> output, Reporter reporter) throws IOException 
	{
		Double minValue = Double.MAX_VALUE;
		Double maxValue = Double.MIN_VALUE;
		while (values.hasNext())
		{
			Double value = values.next().get();
			minValue = Math.min(minValue, value);
			maxValue = Math.max(maxValue, value);
		}
			
		output.collect(new Text("min"), new DoubleWritable(minValue));
		output.collect(new Text("max"), new DoubleWritable(maxValue));
	}
}

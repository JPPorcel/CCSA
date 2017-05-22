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

public class MaxMinAverageReducer extends MapReduceBase implements Reducer<Text, DoubleWritable, Text, DoubleWritable> 
{
	public void reduce(Text key, Iterator<DoubleWritable> values, OutputCollector<Text, DoubleWritable> output, Reporter reporter) throws IOException 
	{
		Double minValue = Double.MAX_VALUE;
		Double maxValue = Double.MIN_VALUE;
		Double sum = 0.0;
		int total = 0;
		
		while (values.hasNext())
		{
			Double value = values.next().get();
			minValue = Math.min(minValue, value);
			maxValue = Math.max(maxValue, value);
			sum += value;
			total++;
		}
			
		output.collect(new Text("min " + key), new DoubleWritable(minValue));
		output.collect(new Text("max " + key), new DoubleWritable(maxValue));
		output.collect(new Text("average " + key), new DoubleWritable(new Double(sum/total)));
	}
}

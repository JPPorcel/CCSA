package oldapi;

import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.MapReduceBase;
import org.apache.hadoop.mapred.Mapper;
import org.apache.hadoop.mapred.OutputCollector;
import org.apache.hadoop.mapred.Reporter;

public class CorrelationMapper extends MapReduceBase implements Mapper<LongWritable, Text, Text, CorrelationTwoValueWritable> 
{
	private static final int MISSING = 9999;

	public void map(LongWritable key, Text value, OutputCollector<Text, CorrelationTwoValueWritable> output, Reporter reporter) throws IOException 
	{
		String line = value.toString();
		String[] parts = line.split(",");
		
		for(int i=0; i<parts.length-1; i++)
			for(int k=i+1; k<parts.length-1; k++)
			{
				output.collect(new Text("correlation " + Integer.toString(i) + " with " + Integer.toString(k)), 
					new CorrelationTwoValueWritable(Double.parseDouble(parts[i]), Double.parseDouble(parts[k])));
			}
	}
}

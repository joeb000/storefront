package storefront.helpers;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class Utils {


	public static void writeToFile(String fileName, String content){
		File f = new File(fileName);
		if (!f.exists()){
		}
		
		try(FileWriter fw = new FileWriter(f, true);
				BufferedWriter bw = new BufferedWriter(fw);
				PrintWriter out = new PrintWriter(bw))
		{
			out.println(content);
		} catch (IOException e) {
			//exception handling left as an exercise for the reader
		}

	}


}

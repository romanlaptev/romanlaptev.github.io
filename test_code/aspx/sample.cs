using System;
using System.IO;
using System.Web;
using System.Web.Hosting;

public class ASPX2HTML : MarshalByRefObject {
  public void ProcessRequest(String p_aspx) {
    HttpRuntime.ProcessRequest(new SimpleWorkerRequest(p_aspx, null, Console.Out));
  }
  public static void Main(String[] arguments) {
    ASPX2HTML host = (ASPX2HTML)ApplicationHost.CreateApplicationHost(typeof(ASPX2HTML), "/foo", 
                     Directory.CurrentDirectory);
    foreach (String aspx in arguments) {
      Console.Out.WriteLine("file:"+aspx);
      host.ProcessRequest(aspx);
    }
  }
}


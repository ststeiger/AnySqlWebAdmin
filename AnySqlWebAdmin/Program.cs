
using Microsoft.AspNetCore.Hosting;
// using Microsoft.Extensions.Configuration;
// using Microsoft.Extensions.Logging;


namespace AnySqlWebAdmin
{
    
    
    public class Program
    {
        
        
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }
        
        
        public static IWebHost BuildWebHost(string[] args)
        {
            // IConfigurationRoot configuration = new ConfigurationBuilder()
            //     .AddCommandLine(args)
            //     .Build();
            
            return new WebHostBuilder()
                .UseContentRoot(System.IO.Directory.GetCurrentDirectory())
                //.UseConfiguration(configuration)
                .UseUrls("http://localhost:59799/")
                .UseKestrel()
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();
            
            // return WebHost.CreateDefaultBuilder(args).UseStartup<Startup>().Build();
        }
    }
}


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
        } // End Sub Main 


        public static IWebHost BuildWebHost(string[] args)
        {

            // Microsoft.Extensions.Configuration.CommandLineConfigurationExtensions.AddCommandLine()

            // Microsoft.Extensions.Configuration.IConfigurationRoot configuration = 
            //      new Microsoft.Extensions.Configuration.ConfigurationBuilder()
            //     .AddCommandLine(args).Build();

            return new WebHostBuilder()
                .UseContentRoot(System.IO.Directory.GetCurrentDirectory())
                //.UseConfiguration(configuration)
                .UseUrls("http://localhost:59799/")
                //.UseKestrel()
                
                
                .UseKestrel(options => {

                    //options.UseHttps("certificate.pfx", "password");

                    //options.Listen(System.Net.IPAddress.Loopback, 443, listenOptions =>
                    //{
                    //    listenOptions.UseHttps("certificate.pfx", "password");
                    //});

                    // if a second address is specified it will assume that address is
                    // to be secured with the built-in developer cert, as such

                    options.Listen(System.Net.IPAddress.Loopback, 5080); //HTTP port
                    // options.Listen(System.Net.IPAddress.Loopback, 5443); //HTTPS port

                    options.Listen(System.Net.IPAddress.Loopback, 5443, listenOptions =>
                    {
                        listenOptions.UseHttps("certificate.pfx", "topsecret");
                    });

                })
                

                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();
            // return WebHost.CreateDefaultBuilder(args).UseStartup<Startup>().Build(); 
        } // End Function BuildWebHost(string[] args) 


    } // End Class Program 


} // End Namespace AnySqlWebAdmin 

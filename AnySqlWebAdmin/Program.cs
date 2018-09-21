
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

        //  .pfx: Personal Information Exchange (.pfx) file.
        // https://stackoverflow.com/questions/808669/convert-a-cert-pem-certificate-to-a-pfx-certificate
        // I need.pfx file to install https on website on IIS.
        // I have two separate files: certificate (.cer or pem) and private key(.crt) but IIS accepts only.pfx files.
        // openssl pkcs12 -inkey bob_key.pem -in bob_cert.cert -export -out bob_pfx.pfx
        // openssl pkcs12 -export -out bob_pfx.pfx -inkey bob_key.pem -in bob_cert.cert 

        // https://stackoverflow.com/questions/6307886/how-to-create-pfx-file-from-certificate-and-private-key
        // openssl pkcs12 -export -out domain.name.pfx -inkey domain.name.key -in domain.name.crt
        // openssl pkcs12 -export -out domain.name.pfx -inkey domain.name.key -in PRIVATE_KEY.crt 

        // If you have a root CA and intermediate certs, then include them as well using multiple -in params
        // openssl pkcs12 -export -out domain.name.pfx -inkey domain.name.key -in domain.name.crt -in intermediate.crt -in rootca.crt

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


                .UseKestrel(options =>
                {

                    //options.UseHttps("certificate.pfx", "password");

                    //options.Listen(System.Net.IPAddress.Loopback, 443, listenOptions =>
                    //{
                    //    listenOptions.UseHttps("certificate.pfx", "password");
                    //});

                    // if a second address is specified it will assume that address is
                    // to be secured with the built-in developer cert, as such

                    options.Listen(System.Net.IPAddress.Loopback, 5080); //HTTP port
                                                                         // options.Listen(System.Net.IPAddress.Loopback, 5443); //HTTPS port

                    // C:\Program Files (x86)\Windows Kits\10\bin\10.0.15063.0\x64\makecert.exe
                    // https://www.digicert.com/util/
                    // https://www.ibm.com/support/knowledgecenter/en/SSWHYP_4.0.0/com.ibm.apimgmt.cmc.doc/task_apionprem_gernerate_self_signed_openSSL.html
                    // https://blog.jayway.com/2014/09/03/creating-self-signed-certificates-with-makecert-exe-for-development/
                    // How to Create a .PFX File From An Already Installed Certificate:
                    // https://www.urtech.ca/2018/04/solved-how-to-create-a-pfx-certificate-file/

                    // Run the following OpenSSL command to generate your private key and public certificate.Answer the questions and enter the Common Name when prompted.
                    // openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem
                    // "C:\Program Files\Git\usr\bin\openssl.exe" req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem

                    // Review the created certificate:
                    // openssl x509 -text - noout -in certificate.pem
                    // "C:\Program Files\Git\usr\bin\openssl.exe" x509 -text -noout -in certificate.pem

                    // Combine your key and certificate in a PKCS#12 (P12) bundle:
                    // openssl pkcs12 -inkey key.pem -in certificate.pem - export -out certificate.p12
                    // "C:\Program Files\Git\usr\bin\openssl.exe" pkcs12 -inkey key.pem -in certificate.pem -export -out certificate.pfx

                    // Validate your P2 file.
                    // openssl pkcs12 -in certificate.p12 - noout - info

                    options.Listen(System.Net.IPAddress.Loopback, 5443, listenOptions =>
                         {
                        //listenOptions.UseHttps(@"D:\lol\certificate.pfx", "topsecret");

                        string pfxLocation = @"D:\lol\certificate.pfx";
                             string password = "";

                             if (System.Environment.OSVersion.Platform == System.PlatformID.Unix)
                                 pfxLocation = "/root/certs/certificate.pfx";

                             listenOptions.UseHttps(pfxLocation, password);
                         });

                })

                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();
            // return WebHost.CreateDefaultBuilder(args).UseStartup<Startup>().Build(); 
        } // End Function BuildWebHost(string[] args) 


    } // End Class Program 


} // End Namespace AnySqlWebAdmin 

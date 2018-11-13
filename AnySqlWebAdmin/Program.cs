
using Microsoft.AspNetCore.Hosting;
// using Microsoft.Extensions.Configuration;
// using Microsoft.Extensions.Logging;


namespace AnySqlWebAdmin
{


    // https://stackoverflow.com/questions/35715015/where-is-the-typescript-tools-version-set-in-an-asp-net-5-project
    //<TypeScriptToolsVersion>3.1.3</TypeScriptToolsVersion>
    //<!--
    //<TscToolPath Condition = "'$(TscToolPath)' == ''" >$(MSBuildProgramFiles32)\Microsoft SDKs\TypeScript</TscToolPath>
    //-->
    //<TscToolPath>D:\Programme\LessPortableApps\dotnet\TypeScript</TscToolPath>
    //<TscToolExe>D:\Programme\LessPortableApps\dotnet\TypeScript\3.1.3\tsc.exe</TscToolExe>
    //<TscYieldDuringToolExecution Condition = "'$(TscYieldDuringToolExecution)' == ''" > true </ TscYieldDuringToolExecution >
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
        // openssl pkcs12 -export -out localhost.pfx -inkey key.pem -in certificate.cert 
        
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

#if true
            // https://stackoverflow.com/questions/32057441/disable-application-insights-in-debug
            Microsoft.ApplicationInsights.Extensibility.TelemetryConfiguration.Active.DisableTelemetry = true;
            Microsoft.ApplicationInsights.Extensibility.Implementation.TelemetryDebugWriter.IsTracingDisabled = true;
#else
            Microsoft.ApplicationInsights.Extensibility.TelemetryConfiguration.Active.InstrumentationKey = "AppSettings.TelemetryInstrumentationKey";
#endif

            return new WebHostBuilder()
                .UseContentRoot(System.IO.Directory.GetCurrentDirectory())
                //.UseConfiguration(configuration)
                //.UseUrls("http://localhost:59799/")
                //.UseKestrel()

                // https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-2.1
                // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel?view=aspnetcore-2.1
                .UseKestrel(options =>
                {

                    // The maximum number of connections is unlimited (null) by default.
                    // options.Limits.MaxConcurrentConnections = 100;

                    // The default maximum request body size is 30,000,000 bytes, which is approximately 28.6 MB.
                    // options.Limits.MaxRequestBodySize = 30000000; // bytes
                    

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

                    // Run the following OpenSSL command to generate your private key and public certificate.
                    // Answer the questions and enter the Common Name when prompted.
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

                    // Merge to PFX:
                    // openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem
                    // openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 0 -out certificate.pem
                    // openssl pkcs12 -export -out localhost.pfx -inkey key.pem -in certificate.cert


                    // A) Create root certificate
                    // B) Create SSL-certificate 
                    // C) Trust root-certificate
                    // D) Import root-certificate into firefox 


                    // options.Listen(System.Net.IPAddress.Loopback, 5443, listenOptions =>
                    // options.Listen(System.Net.IPAddress.Any, 5443, listenOptions =>
                    //options.Listen(System.Net.IPAddress.Parse("127.0.0.1"), 5443, listenOptions =>
                    // https://localhost:59801/
                    options.Listen(System.Net.IPAddress.Parse("127.0.0.1"), 59801, listenOptions =>
                        {
                            // listenOptions.UseHttps(@"D:\lol\certificate.pfx", "topsecret");

                            
                            

                            string pfxLocation = @"D:\lol\certificate.pfx";
                            string password = "";
                            
                            
                            if (System.Environment.OSVersion.Platform == System.PlatformID.Unix)
                                pfxLocation = "/root/certs/certificate.pfx";
                            
                            pfxLocation = "/root/.dotnet/corefx/cryptography/x509stores/my/015B78912250D3A1DD277787B59036CFF0213744.pfx";
                            pfxLocation = "/root/sources/tracker/localhost.pfx";
                            
                            pfxLocation = "/root/github/RedmineMailService/RedmineMailService/obelix.pfx";
                            // pfxLocation = @"C:\Users\Administrator\Documents\Visual Studio 2017\Projects\RedmineMailService\RedmineMailService\obelix.pfx";
                            // pfxLocation = @"D:\username\Documents\visual studio 2017\Projects\RedmineMailService\RedmineMailService\obelix.pfx";
                            // pfxLocation = @"D:\username\Documents\Visual Studio 2017\Projects\rlipscombe\bouncy-castle-csharp\CreateCertificate\bin\Debug\subject.pfx";
                            // password = "password";
                            
                            
                            System.Security.Cryptography.X509Certificates.X509Certificate2 cert = 
                                new System.Security.Cryptography.X509Certificates.X509Certificate2(
                                      pfxLocation
                                    , password);
                            
                            // https://major.io/2013/05/14/changing-your-ssh-servers-port-from-the-default-is-it-worth-it/
                            // https://docs.microsoft.com/en-us/aspnet/core/fundamentals/servers/kestrel?view=aspnetcore-2.1
                            // listenOptions.UseHttps(pfxLocation, password);
                            listenOptions.UseHttps(cert);
                        });
                })
                
                // .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();
            // return WebHost.CreateDefaultBuilder(args).UseStartup<Startup>().Build(); 
        } // End Function BuildWebHost(string[] args) 
        
        
    } // End Class Program 
    
    
} // End Namespace AnySqlWebAdmin 

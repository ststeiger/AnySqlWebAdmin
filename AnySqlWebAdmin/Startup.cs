using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace AnySqlWebAdmin
{
    
    
    public class Startup
    {
        
        public IConfiguration Configuration { get; }
        
        
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<SqlService>(new SqlService());
            services.AddMvc();
            

            services.AddMvc(mvcOptions =>
            {
                mvcOptions.ValueProviderFactories.Add(new JsonValueProviderFactory());
                mvcOptions.ValueProviderFactories.Add(new AnywhereValueProviderFactory());
            });

        }
        
        
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // if (env.IsDevelopment()) { app.UseDeveloperExceptionPage(); }
            
            // app.UseStatusCodePages();
            app.UseErrorHandlingMiddleware();


            app.UseDefaultFiles(new DefaultFilesOptions()
            {
                DefaultFileNames = new List<string>()
                {
                    "map.htm", "index.htm", "index.html", "slick.htm"
                }
            });

            app.UseStaticFiles();
            // app.UseMiddleware<SqlMiddleware>();
            app.UseSqlMiddleware();

            app.UseMvc();
        }
        
        
    }
    
    
}

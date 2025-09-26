
namespace AnySqlWebAdmin;

using Microsoft.Extensions.Hosting; // IsDevelopment
using Microsoft.AspNetCore.Builder; // Use*
using Microsoft.Extensions.DependencyInjection; // Add*


public class Program
{


    public static async System.Threading.Tasks.Task<int> Main(string[] args)
    {
        Microsoft.AspNetCore.Builder.WebApplicationBuilder builder = Microsoft.AspNetCore.Builder.WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddRazorPages();

        Microsoft.AspNetCore.Builder.WebApplication app = builder.Build();

        // Configure the HTTP request pipeline.
        if (!app.Environment.IsDevelopment())
        {
            app.UseExceptionHandler("/Error");
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseHttpsRedirection();

        app.UseRouting();

        app.UseAuthorization();

        app.MapStaticAssets();
        app.MapRazorPages()
           .WithStaticAssets();

        await app.RunAsync();

        return 0;
    } // End Task Main 


} // End Class Program 

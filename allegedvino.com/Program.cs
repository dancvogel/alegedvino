using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;

namespace allegedvino.com
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var hostBuilder = new WebHostBuilder()
                .UseKestrel(o => o.AddServerHeader = false)
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>();

            var regionName = Environment.GetEnvironmentVariable("REGION_NAME");
            if(regionName != null)
            {
                hostBuilder = hostBuilder.UseApplicationInsights();
            }
            
            var host = hostBuilder.Build();

            host.Run();
        }
    }
}

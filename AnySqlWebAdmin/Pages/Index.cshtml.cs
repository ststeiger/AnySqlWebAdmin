
namespace AnySqlWebAdmin.Pages
{
    public class IndexModel 
        : Microsoft.AspNetCore.Mvc.RazorPages.PageModel
    {
        private readonly Microsoft.Extensions.Logging.ILogger<IndexModel> _logger;

        public IndexModel(Microsoft.Extensions.Logging.ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }
    }
}

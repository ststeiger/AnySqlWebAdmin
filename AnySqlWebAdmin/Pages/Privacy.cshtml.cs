
namespace AnySqlWebAdmin.Pages
{
    public class PrivacyModel 
        : Microsoft.AspNetCore.Mvc.RazorPages.PageModel
    {
        private readonly Microsoft.Extensions.Logging.ILogger<PrivacyModel> _logger;

        public PrivacyModel(Microsoft.Extensions.Logging.ILogger<PrivacyModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }

}

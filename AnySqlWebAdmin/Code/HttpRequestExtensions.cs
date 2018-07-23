
namespace AnySqlWebAdmin
{

    // Push-notifications:
    // https://dotnetthoughts.net/detecting-ajax-requests-in-aspnet-core/
    public static class HttpRequestExtensions
    {

        private const string RequestedWithHeader = "X-Requested-With";
        private const string XmlHttpRequest = "XMLHttpRequest";

        public static bool IsAjaxRequest(this Microsoft.AspNetCore.Http.HttpRequest request)
        {
            if (request == null)
            {
                throw new System.ArgumentNullException("request");
            }

            if (request.Headers != null)
            {
                return request.Headers[RequestedWithHeader] == XmlHttpRequest;
            }

            return false;
        }


    }


}

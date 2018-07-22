
using Microsoft.AspNetCore.Mvc;


namespace AnySqlWebAdmin.Controllers
{


    [Route("api/[controller]")]
    public class TreedataController : Controller
    {


        // GET api/values/5
        [HttpGet("{id?}")] // ?: optional parameter 
        //public string Get(int? id) // ?: nullable type
        public void Get(string id) // ?: nullable type
        {
            TreeHelper.GetTreeData(this.HttpContext, id);
        }


        // POST api/values
        [HttpPost]
        // public void Post([FromBody]string id)
        // public void Post([FromForm]string id)
        // public void Post([FromBody, FromForm]string id)
        // public void Post([FromBody]Newtonsoft.Json.Linq.JObject id)
        // public void Post([FromBody]dynamic id)
        // public void Post([FromJSON]System.Guid? id)
        public void Post([FromAnywhere]System.Guid? id)
        {
            TreeHelper.GetTreeData(this.HttpContext, id);
        }
        

    }


}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace GetMeHome.Controllers
{
    public partial class DefaultController : Controller
    {

        [Authorize]
        [HttpGet]
        [Route("api/username")]

        public string username()
        {
            var user = User.Identity.Name.ToLower();
            return user;

        }
       
    }
}

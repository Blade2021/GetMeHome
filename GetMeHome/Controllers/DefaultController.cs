using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Reflection;

namespace SVHCExpressCareTracker.Controllers
{


    public partial class DefaultController : Controller
    {                     

        [AllowAnonymous]
        [Route("api/helloworldgetdata")]
        [HttpGet]
        public string HelloWordGetData()
        {
            return "hi!";            
        }
    }







}

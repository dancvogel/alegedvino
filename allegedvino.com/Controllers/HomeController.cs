using Microsoft.AspNetCore.Mvc;

namespace allegedvino.com.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

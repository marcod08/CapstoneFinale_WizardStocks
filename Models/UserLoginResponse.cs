using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WizardStocks.Models
{
    public class UserLoginResponse
    {
        public int userId { get; set; }
        public string accessToken { get; set; }
    }
}
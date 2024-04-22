using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace WizardStocks
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // abilita le richieste Cors
            config.EnableCors();
            // serializzatore JSON per evitare errori dovuti ai riferimenti circolari durante la serializzazione degli oggetti
            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}

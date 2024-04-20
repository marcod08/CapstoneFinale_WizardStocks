using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace WizardStocks.Attributes
{
    public class CustomAuthorizeAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            // Qui recupero token
            var tokenString = actionContext.Request.Headers.Authorization?.Parameter;

            // Qui verifico se il token esiste
            if (tokenString == null)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                return;
            }

            // Qui verifico la firma del token JWT
            var key = Encoding.UTF8.GetBytes("JSNB£s&q0sjvnUQ&NDccsjdnVoa%oasNAGnvkj62casLANCJ2nnc%ja&nAh479bsnHb&$");
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };

            SecurityToken validatedToken;
            ClaimsPrincipal claimsPrincipal;

            try
            {
                claimsPrincipal = tokenHandler.ValidateToken(tokenString, validationParameters, out validatedToken);
            }
            catch (Exception ex)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                return;
            }

            // Qui si estrae l'id dal token
            var userIdClaim = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier);

            // Qui verifico se l'id è presente nel token
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userIdFromToken))
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                return;
            }

            base.OnAuthorization(actionContext);
        }

    }
}
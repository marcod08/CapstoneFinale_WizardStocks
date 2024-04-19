using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.UI.WebControls;
using WizardStocks.Models;

namespace WizardStocks.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        private WizardDbContext db = new WizardDbContext();

        // GET: api/Users
        public IQueryable<User> GetUsers()
        {
            return db.Users;
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.id)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Users - Registrazione Utente
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (db.Users.Any(u => u.email == user.email))
            {
                return BadRequest("Email already registered");
            }

            user.password = HashPassword(user.password);

            db.Users.Add(user);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = user.id }, user);
        }

        private string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }


        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        [ResponseType(typeof(string))]
        [HttpPost]
        [Route("api/Users/Login")]
        public IHttpActionResult Login(UserLogin model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = db.Users.FirstOrDefault(u => u.email == model.email);

            if (user == null)
            {
                return Unauthorized();
            }

            string hashedPassword = HashPassword(model.password);

            if (user.password != hashedPassword)
            {
                return Unauthorized();
            }

            var token = GenerateAccessToken(user);

            var response = new UserLoginResponse
            {
                userId = user.id,
                accessToken = token
            };

            return Ok(response);
        }


        private string GenerateAccessToken(User user)
        {
            // Chiave segreta 
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("JSNB£s&q0sjvnUQ&NDccsjdnVoa%oasNAGnvkj62casLANCJ2nnc%ja&nAh479bsnHb&$"));

            // Credenziali 
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Rivendicazioni
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.id.ToString()), 
                new Claim(JwtRegisteredClaimNames.Email, user.email),
            };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.id == id) > 0;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using WizardStocks.Models;

namespace WizardStocks.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class FavsController : ApiController
    {
        private WizardDbContext db = new WizardDbContext();

        // GET: api/Favs
        public IQueryable<Fav> GetFavs()
        {
            return db.Favs;
        }

        // GET: api/Favs/5
        [ResponseType(typeof(Fav))]
        public IHttpActionResult GetFav(int id)
        {
            Fav fav = db.Favs.Find(id);
            if (fav == null)
            {
                return NotFound();
            }

            return Ok(fav);
        }

        // GET: api/Favs/{userId} la get che utilizzo
        [Route("api/Favs/{userId}")]
        [ResponseType(typeof(IEnumerable<string>))]
        public IHttpActionResult GetFavsByUserId(int userId)
        {
            var favs = db.Favs.Where(f => f.userId == userId).Select(f => f.cardId).ToList();
            if (favs == null || favs.Count == 0)
            {
                return NotFound();
            }

            return Ok(favs);
        }


        // PUT: api/Favs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFav(int id, Fav fav)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != fav.id)
            {
                return BadRequest();
            }

            db.Entry(fav).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FavExists(id))
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

        // POST: api/Favs Aggiunta preferiti
        [ResponseType(typeof(Fav))]
        public IHttpActionResult PostFav(Fav fav)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Favs.Add(fav);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = fav.id }, fav);
        }

        // DELETE: api/Favs Cancella preferiti
        [ResponseType(typeof(Fav))]
        public IHttpActionResult DeleteFav(Fav fav)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingFav = db.Favs.FirstOrDefault(f => f.userId == fav.userId && f.cardId == fav.cardId);
            if (existingFav == null)
            {
                return NotFound();
            }

            db.Favs.Remove(existingFav);
            db.SaveChanges();

            return Ok(existingFav);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FavExists(int id)
        {
            return db.Favs.Count(e => e.id == id) > 0;
        }
    }
}
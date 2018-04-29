using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using HarmanAssignment.Models;

namespace HarmanAssignment.Controllers
{
    public class AdressesController : ApiController
    {
        private HarmanDBEntities db = new HarmanDBEntities();

        // GET: api/Adresses
        public IQueryable<Adress> GetAdresses()
        {
            return db.Adresses;
        }

        // GET: api/Adresses/5
        [ResponseType(typeof(Adress))]
        public IHttpActionResult GetAdress(int id)
        {
            Adress adress = db.Adresses.Find(id);
            if (adress == null)
            {
                return NotFound();
            }

            return Ok(adress);
        }

        // PUT: api/Adresses/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAdress(int id, Adress adress)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != adress.Id)
            {
                return BadRequest();
            }

            db.Entry(adress).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdressExists(id))
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

        // POST: api/Adresses
        [ResponseType(typeof(Adress))]
        public IHttpActionResult PostAdress(Adress adress)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Adresses.Add(adress);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = adress.Id }, adress);
        }

        // DELETE: api/Adresses/5
        [ResponseType(typeof(Adress))]
        public IHttpActionResult DeleteAdress(int id)
        {
            Adress adress = db.Adresses.Find(id);
            if (adress == null)
            {
                return NotFound();
            }

            db.Adresses.Remove(adress);
            db.SaveChanges();

            return Ok(adress);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AdressExists(int id)
        {
            return db.Adresses.Count(e => e.Id == id) > 0;
        }
    }
}
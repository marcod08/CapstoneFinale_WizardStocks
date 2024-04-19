using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Linq;

namespace WizardStocks.Models
{
    public partial class WizardDbContext : DbContext
    {
        public WizardDbContext()
            : base("name=WizardDbContext")
        {
        }

        public virtual DbSet<Fav> Favs { get; set; }
        public virtual DbSet<History> Histories { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<History>()
                .Property(e => e.priceUSD)
                .HasPrecision(19, 4);

            modelBuilder.Entity<History>()
                .Property(e => e.priceUSDFoil)
                .HasPrecision(19, 4);

            modelBuilder.Entity<History>()
                .Property(e => e.priceEur)
                .HasPrecision(19, 4);

            modelBuilder.Entity<History>()
                .Property(e => e.priceEurFoil)
                .HasPrecision(19, 4);

            modelBuilder.Entity<History>()
                .Property(e => e.priceTix)
                .HasPrecision(19, 4);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Favs)
                .WithRequired(e => e.User)
                .WillCascadeOnDelete(false);
        }
    }
}

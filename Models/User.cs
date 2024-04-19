namespace WizardStocks.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class User
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public User()
        {
            Favs = new HashSet<Fav>();
        }

        public int id { get; set; }

        [Required]
        public string email { get; set; }

        [Required]
        public string password { get; set; }

        [Column(TypeName = "date")]
        public DateTime birthDate { get; set; }

        [Required]
        public string gender { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Fav> Favs { get; set; }
    }
}

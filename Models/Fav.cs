namespace WizardStocks.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Fav
    {
        public int id { get; set; }
        [Required]
        public int userId { get; set; }

        [Required]
        public string cardId { get; set; }

        public virtual User User { get; set; }
    }
}

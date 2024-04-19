namespace WizardStocks.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("History")]
    public partial class History
    {
        public int id { get; set; }

        public DateTime date { get; set; }

        [Required]
        public string cardId { get; set; }

        [Column(TypeName = "money")]
        public decimal? priceUSD { get; set; }

        [Column(TypeName = "money")]
        public decimal? priceUSDFoil { get; set; }

        [Column(TypeName = "money")]
        public decimal? priceEur { get; set; }

        [Column(TypeName = "money")]
        public decimal? priceEurFoil { get; set; }

        [Column(TypeName = "money")]
        public decimal? priceTix { get; set; }
    }
}

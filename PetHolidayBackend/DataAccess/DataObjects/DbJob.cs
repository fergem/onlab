﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DataObjects
{
    public class DbJob
    {
        public int ID { get; set; }
        public required string Location { get; set; }
        public required int Hours { get; set; }
        public required string Description { get; set; }
        public required int StatusID { get; set; }
        public virtual DbStatus Status { get; set; } = null!;
        public required int OwnerUserID { get; set; }
        public virtual DbUser OwnerUser { get; set; } = null!;
        public int? PetSitterUserID { get; set; }
        public virtual DbUser PetSitterUser { get; set; } = null!;
    }
}

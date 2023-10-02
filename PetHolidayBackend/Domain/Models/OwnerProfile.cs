﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class OwnerProfile
    {
        public int ID { get; set; }
        public string? Description { get; set; }
        public int MinRequiredExperience { get; set; }
        public int MinWage { get; set; }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class JobApplication
    {
        public int ID { get; set; }
        public bool IsApproved { get; set; }
        public IReadOnlyCollection<JobApplicationComment>? Comments { get; set; }
        public required User ApplicantUser { get; set; }
    }
}

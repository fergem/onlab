﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Domain.Common;

namespace Domain.Models
{
    public class Job
    {
        public int ID { get; set; }
        public required string Location { get; set; }
        public required bool Repeated { get; set; }

        public required string Title { get; set; }
        public required JobType Type { get; set; }

        public required DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public required string Description { get; set; }
        public required int Payment { get; set; }
        public required int MinRequiredExperience { get; set; }

        public ICollection<JobApplication>? JobApplications { get; set; }
        public required UserBaseInformation OwnerUserInformation { get; set; }
        public UserBaseInformation? PetSitterUserInformation { get; set; }

        public required IReadOnlyCollection<Pet> Pets { get; set; }
        public required ICollection<DaysOfWeek>? Days { get; set; }
    }

}

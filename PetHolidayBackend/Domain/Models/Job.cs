﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Job
    {
        public int ID { get; set; }
        public required string Location { get; set; }
        public required int Hours { get; set; }
        public required string Description { get; set; }
        public required int Payment { get; set; }
        public required int MinRequiredExperience { get; set; }
        public required bool Repeated {  get; set; }

        public required Status Status { get; set; }

        public required DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public required UserInformation OwnerUserInformation { get; set; }
        public UserInformation? PetSitterUserInformation { get; set; }

        public required IReadOnlyCollection<Pet> Pets { get; set; }

        public required IReadOnlyCollection<Days> Days { get; set; }

    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Days
    {
        [Description("Mon")]
        Mon,
        Tue,
        Wed,
        Thu,
        Fri,
        Sat,
        Sun,
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Status
    {
        Empty,
        Available,
        Pending,
        Inprogress,
        Done,
    }
}

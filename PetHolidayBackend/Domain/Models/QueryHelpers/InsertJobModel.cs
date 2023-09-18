using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.QueryHelpers
{
    public class InsertJobModel
    {
        public required string Location { get; set; }
        public required int Hours { get; set; }
        public required string Description { get; set; }
        public required int Payment { get; set; }
        public required int MinRequiredExperience { get; set; }
        public required List<int> petIDs { get; set; }
        public required DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public List<Days>? Days { get; set; }
        public required bool Repeated { get; set; }
        public required JobType Type { get; set; }
        public required string Title { get; set; }

    }
}

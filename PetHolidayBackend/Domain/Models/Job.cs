using System;
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
        public required bool Repeated {  get; set; }


        public required string Title { get; set; }
        public required JobType Type { get; set; }

        public required DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }


        public byte[]? OwnerPicture { get; set; }
        public byte[]? DisplayPetPicture { get; set; }

        public required ICollection<DaysOfWeek>? Days { get; set; }

    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Status
    {
        Empty,
        Available,
        Approving,
        Upcoming,
        Done,
        Canceled,
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum JobType
    {
        Sitting,
        Boarding,
        Walking,
        Visit,
    }
}

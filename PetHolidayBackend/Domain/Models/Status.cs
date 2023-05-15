using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Status
    {
        public required int ID { get; set; }
        public required StatusName Name { get; set; }
    }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum StatusName
    {
        Available,
        WaitingForApproval,
        Inprogress,
        Done,
    }
}

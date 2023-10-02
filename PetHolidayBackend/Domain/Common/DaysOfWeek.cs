using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Common
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum DaysOfWeek
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
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Common
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Status
    {
        All,
        Available,
        Upcoming,
        Done,
        Canceled,
    }
}
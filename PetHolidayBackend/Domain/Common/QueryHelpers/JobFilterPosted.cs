﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Common.QueryHelpers
{
    public class JobFilterPosted
    {
        public bool? Repeated { get; set; }
        public Status Status { get; set; }

        public int PageSize {get;} = 10;
        public int PageNumber { get; set; } = 1;
    }
}

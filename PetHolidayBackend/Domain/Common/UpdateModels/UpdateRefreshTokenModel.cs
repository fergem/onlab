using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Common.UpdateModels
{
    public class UpdateRefreshTokenModel
    {
        public required string? UserName;
        public required string OldRefreshToken;
        public required string NewRefreshToken;
    }
}

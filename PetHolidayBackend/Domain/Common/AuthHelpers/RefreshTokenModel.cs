using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Common.AuthHelpers
{
    public class RefreshTokenModel
    {
        public required string AccessToken {  get; set; }
        public required string RefreshToken { get; set; }
    }
}

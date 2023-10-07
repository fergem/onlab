using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Common.UpdateModels
{
    public class UpdateProfileModel
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public int? Age { get; set; }
        public string? Location { get; set; }
        public string? PhoneNumber { get; set; }
        public UpdateOwnerProfileModel? OwnerProfile { get; set; }
        public UpdatePetSitterProfile? PetSitterProfile { get; set;}
    }
}

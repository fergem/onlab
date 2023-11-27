using Domain.Common;

namespace PetHolidayWebApi.DTOs
{
    public class PetDTO
    {
        public required int ID { get; set; }
        public required string Name { get; set; }
        public required PetSpecies Species { get; set; }
        public required int Age { get; set; }
        public required byte[]? Image { get; set; }
    }
}

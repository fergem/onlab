namespace PetHolidayWebApi.DTOs
{
    public class PostedJobApplicationDTO
    {
        public required int ID { get; set; }
        public required string Status { get; set; }
        public required UserDetailsDTO ApplicantUser { get; set; }
    }
}

namespace PetHolidayWebApi.DTOs
{
    public class JobApplicationChatDTO
    {
        public required int ID { get; set; }
        public required string JobTitle { get; set; }
        public required DateTime StartDate { get; set; }
        public required DateTime? EndDate { get; set; }
        public required string Type { get; set; }
        public required bool Repeated { get; set; }
        public required IReadOnlyCollection<JobApplicationCommentDTO>? Comments { get; set; }
        public required UserPreviewDTO OwnerUser { get; set; }
        public required UserPreviewDTO ApplicantUser { get; set; }
        public required byte[]? DisplayPetPicture { get; set; }
    }
}

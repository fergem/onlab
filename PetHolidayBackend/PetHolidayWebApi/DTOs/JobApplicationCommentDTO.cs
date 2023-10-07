using Domain.Models;

namespace PetHolidayWebApi.DTOs
{
    public class JobApplicationCommentDTO
    {
        public required int ID { get; set; }
        public required string? CommentText { get; set; }
        public required DateTime CommentDate { get; set; }
        public required int SenderUserID { get; set; }
    }
}

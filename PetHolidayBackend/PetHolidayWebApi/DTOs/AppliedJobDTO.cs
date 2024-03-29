﻿namespace PetHolidayWebApi.DTOs
{
    public class AppliedJobDTO
    {
        public required int ID { get; set; }
        public required string Title { get; set; }
        public required DateTime StartDate { get; set; }
        public required DateTime? EndDate { get; set; }
        public required string Type { get; set; }
        public required string Status { get; set; }
        public required string Description { get; set; }
        public required ICollection<string>? Days { get; set; }
        public required UserPreviewDTO OwnerUser { get; set; }
        public required JobApplicationDTO? JobApplication { get; set; }
        public required bool IsRepeated { get; set; }  
        public required int CatCount { get; set; }
        public required int DogCount { get; set; }
    }
}

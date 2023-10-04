﻿namespace PetHolidayWebApi.DTOs
{
    public class UserDTO
    {
        public required int ID { get; set; }
        public required string UserName { get; set; }
        public required string Email { get; set; }
        public required string? Bearer { get; set; }
    }
}

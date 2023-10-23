using Domain.Common;
using Domain.Models;
using Microsoft.Identity.Client;
using PetHolidayWebApi.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PetHolidayWebApi.ModelExtensions
{
    public static class JobExtensions
    {
        public static JobDetailsDTO ToJobDetailsDTO(this Job job) => 
            new JobDetailsDTO
            {
                ID = job.ID,
                Location = job.Location,
                Repeated = job.Repeated,
                OwnerID = job.OwnerUser.Id,
                Title = job.Title,
                Type = job.Type, 
                StartDate = job.StartDate,
                EndDate = job.EndDate,
                Description = job.Description,
                Payment = job.Payment,
                MinRequiredExperience = job.MinRequiredExperience,
                OwnerUser = job.OwnerUser.ToUserPreviewDTO(), 
                Pets = job.Pets.Select(p => p.ToPetDTO()).ToList(), 
                Days = job.Days?.ToList(),
                Status = job.Status,
            };
        public static JobPreviewDTO ToJobPreviewDTO(this Job job) =>
            new JobPreviewDTO
            {
                ID = job.ID,
                Location = job.Location,
                Title = job.Title,
                Type = job.Type.ToString(),
                StartDate = job.StartDate,
                EndDate = job.EndDate,
                Days = job.Days?.Select(d => d.ToString()).ToList(),
                CatCount = job.Pets.Count(p => p.Pet.Species == PetSpecies.Cat),
                DogCount = job.Pets.Count(p => p.Pet.Species == PetSpecies.Dog),
                OwnerUserPicture = job.OwnerUser.Picture,
                DisplayPetPicture = job.Pets.FirstOrDefault()?.Pet.Images is not null ? job.Pets.FirstOrDefault()?.Pet.Images.FirstOrDefault()?.ToPetImage() : null
            };

        public static PostedJobDTO ToPostedJobDTO(this Job job) =>
            new PostedJobDTO
            {
                ID = job.ID,
                Title = job.Title,
                Status = job.Status.ToString(),
                Type = job.Type.ToString(),
                StartDate = job.StartDate,
                EndDate = job.EndDate,
                Description = job.Description,
                Days = job.Days?.Select(d => d.ToString()).ToList(),
                JobApplications = job.JobApplications.Select(s => s.ToPostedJobApplicationDTO()).ToList(),
            };
    }
}

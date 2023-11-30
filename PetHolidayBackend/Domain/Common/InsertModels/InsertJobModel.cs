using Domain.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Common.InsertModels
{
    public class InsertJobModel
    {
        public required string Location { get; set; }
        public required string Description { get; set; }
        public required int Payment { get; set; }
        public required int MinRequiredExperience { get; set; }
        public required List<int> PetIDs { get; set; }
        public required DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public ICollection<DaysOfWeek>? Days { get; set; }
        public required bool Repeated { get; set; } 
        public required JobType JobType { get; set; }
        public required string Title { get; set; }
    }
    public class InsertJobModelValidator : AbstractValidator<InsertJobModel>
    {
        public InsertJobModelValidator()
        {
            RuleFor(job => job.Title).NotEmpty().WithMessage("Title is required");
            RuleFor(job => job.Location).NotEmpty().WithMessage("Location is required");
            RuleFor(job => job.Description).NotEmpty().WithMessage("Description is required");
            RuleFor(job => job.PetIDs).NotEmpty().WithMessage("Select at least one pet");
            RuleFor(job => job.JobType)
                .NotNull().WithMessage("Job type should be set")
                .Must((job, type) =>
                {
                    if (type == JobType.Boarding || type == JobType.Sitting)
                    {
                        return !job.Repeated && (job.Days == null || job.Days.Count == 0);
                    }
                    return true;
                }).WithMessage("This type of job should not be repeated");

            RuleFor(job => job.EndDate)
                .Must((job, endDate) => !(!job.Repeated && endDate is null))
                .WithMessage("End date should be set when job is not repeated")
                .Must((job, endDate) => !(job.Repeated && endDate is not null))
                .WithMessage("End date should not be set when job is repeated")
                .GreaterThanOrEqualTo(dto => dto.StartDate.AddDays(1))
                .WithMessage("End date must be greater than the start date")
                .Must((job, endDate) => !(job.Repeated && endDate.HasValue && endDate.Value.Date < DateTime.Now.Date))
                .WithMessage("Cannot pick date in the past");

            RuleFor(job => job.StartDate).NotEmpty().WithMessage("Start date should be set")
                .Must(startDate => startDate.Date >= DateTime.Now.Date).WithMessage("Cannot pick date in the past");

            RuleFor(job => job.Days).Must((job, days) => !job.Repeated || (days != null && days.Count > 0))
                .WithMessage("At least one day should be selected");
        }
    }
}

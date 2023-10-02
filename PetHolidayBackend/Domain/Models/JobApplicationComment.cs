using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class JobApplicationComment
    {
        public string? CommentText { get; set; }
        public DateTime CommentDate { get; set; }
        public int SenderUserID { get; set; }

    }
}

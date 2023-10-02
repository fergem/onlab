using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DataObjects
{
    public class DbJobApplicationComment
    {
        public int ID { get; set; }
        public string? CommentText { get; set; }
        public DateTime CommentDate { get; set; }
        public int SenderUserID { get; set; }

        public int JobApplicationID { get; set; }
        public virtual DbJobApplication? JobApplication { get; set; }
    }
}

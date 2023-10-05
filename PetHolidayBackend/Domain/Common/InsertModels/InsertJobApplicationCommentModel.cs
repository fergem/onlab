using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Common.InsertModels
{
    public class InsertJobApplicationCommentModel
    {
        public required int ApplicationID;
        public required string Message;
    }
}

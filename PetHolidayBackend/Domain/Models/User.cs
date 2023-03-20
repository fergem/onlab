using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class User
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; } 
        public int Age { get; set; }
        public byte[] Picture { get; set; }

        public User(int ID, string FirstName, string LastName, int Age, byte[] Picture)
        {
            this.ID = ID;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Picture = Picture;
            this.Age = Age;
        }
    }
}

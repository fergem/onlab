﻿using Domain.Models;
using Domain.Models.AuthHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IUserRepository
    {
        Task<User> Register(RegisterModel registerModel);
        Task<User> Login(LoginModel loginModel);
    }
}

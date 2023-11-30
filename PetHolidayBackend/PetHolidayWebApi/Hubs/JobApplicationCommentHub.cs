using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace PetHolidayWebApi.Hubs
{
    public class JobApplicationCommentHub: Hub
    {
       
        public async Task SubscribeToCommentSection(int applicationID) => 
            await Groups.AddToGroupAsync(Context.ConnectionId, applicationID.ToString());

        public async Task Typing(int applicationID) =>
            await Clients.Group(applicationID.ToString()).SendAsync("CommentTyping");

        public async Task TypingStopped(int applicationID) =>
            await Clients.Group(applicationID.ToString()).SendAsync("CommentTypingStopped"); 
    }
}

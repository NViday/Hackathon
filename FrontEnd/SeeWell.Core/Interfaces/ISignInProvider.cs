using System;

namespace SeeWell.Core.Interfaces
{
	public interface ISignInProvider
	{
		void Login(Action<AppUser, string> OnLoginComplete);

		void Logout();
	}
}

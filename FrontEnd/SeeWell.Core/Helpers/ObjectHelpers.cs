

using Acr.UserDialogs;
using SeeWell.Core.Interfaces;

namespace SeeWell.Core.Helpers
{
	/// <summary>
	/// Contains ready made object instances
	/// </summary>
	public static class ObjectHelpers
	{
		public static ObjectFactory BrokerFactory => ServiceLocator.ResolveType<ObjectFactory>();

		public static ISignInProvider SignInManager => ServiceLocator.ResolveType<ISignInProvider>();

		public static IUserDialogs UserDialogManager => ServiceLocator.ResolveType<IUserDialogs>();
		
		public static TypeLocator ServiceLocator => TypeLocator.GetInstance();
	}
}

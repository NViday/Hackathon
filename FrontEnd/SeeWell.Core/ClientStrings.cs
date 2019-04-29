

namespace SeeWell.Core
{
	public class ClientStrings
	{
		public const string ApplicationName = "SeeWell";

		public const string AppVersion = "0.0.0.1";
		/// <summary>
		/// Known http headers
		/// </summary>
		public static class HttpStrings
		{
			public const string Authorization = "Authorization";
			public const string AcceptLanguage = "Accept-Language";
			public const string ContentType = "Content-Type";
			public const string DefaultRequestContentType = @"application/json";
			public const string DefaultLocale = "EN-US";
		}


		/// <summary>
		/// Various service segements (controllers) and their actions
		/// </summary>
		public static class ServiceApiSegments
		{
			/// <summary>
			/// Owner controller and actions
			/// </summary>
			public static class OwnerSegment
			{
				public const string Name = "Owner";
				public const string ParamId = "id";
			}
		}


		public static class ApplicationSettings
		{
			public const string Locale = "Locale";
			public const string CurrentUserName = "CurrentUserName";
			public const string PasswordHash = "PasswordHash";
			public const string AppUser = "AppUser";
			public const string SessionToken = "SessionToken";
			public const string LastKnownAddress = "LastKnownAddress";
			public const string UserCompletedSignIn = "UserCompletedSignIn";
		}
	}
}

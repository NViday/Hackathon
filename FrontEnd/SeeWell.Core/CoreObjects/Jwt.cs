using System;

namespace SeeWell.Core
{
	/// <summary>
	/// JWT
	/// </summary>
	public class Jwt
	{
		/// <summary>
		/// Gets or sets the access token.
		/// </summary>
		public string access_token { get; set; }

		/// <summary>
		/// Gets or sets the type of the token.
		/// </summary>
		public string token_type { get; set; }

		/// <summary>
		/// Gets or sets number of days the token is valid for.
		/// </summary>
		public int expires_in { get; set; }

		/// <summary>
		/// Gets or sets the expiration date.
		/// </summary>
		public DateTimeOffset expires { get; set; }

		/// <summary>
		/// Gets the authorization header
		/// </summary>
		/// <returns></returns>
		public string GetAuthorizationHeader()
		{
			return token_type + " " + access_token;
		}

		/// <summary>
		/// Returns true if ... is valid.
		/// </summary>
		public bool IsValid()
		{
			return !string.IsNullOrEmpty(access_token) && !string.IsNullOrEmpty(token_type) && DateTimeOffset.UtcNow < expires;
		}
	}
}

using ReactiveUI;
using System;
using System.Runtime.Serialization;
using System.Text;
using System.Text.RegularExpressions;

namespace SeeWell.Core.ViewModels
{
	/// <summary>
	/// View model for the list display
	/// Other view models will be added in similar fashion. 
	/// </summary>
	[DataContract]
	public class UserViewModel : ViewModelBase
	{
		private string _userName;
		private string _password;
		private DateTimeOffset _dateAdded;

		[DataMember]
		public string Id { get; set; }

		[DataMember]
		public string UserName { get => _userName; set => this.RaiseAndSetIfChanged(ref _userName, value, nameof(UserName)); }

		[DataMember]
		public string Password { get => _password; set => this.RaiseAndSetIfChanged(ref _password, value, nameof(Password)); }

		[DataMember]
		public DateTimeOffset DateAdded { get => _dateAdded; set => this.RaiseAndSetIfChanged(ref _dateAdded, value, nameof(DateAdded)); }

		[IgnoreDataMember]
		public string FormattedName => $"{UserName}, On:{DateAdded.ToString("MM/dd/yy H:mm:ss")}";

		public static bool ValidatePassword(string password, out string error)
		{
			var errorInterim = new StringBuilder();
			bool finalresult = true;
			if (string.IsNullOrEmpty(password))
			{
				errorInterim.AppendLine("password should not be empty");
				finalresult = false;
			}
			else if (password.Length < 5 || password.Length > 12)
			{
				errorInterim.AppendLine("password must be between 5 and 12 characters");
				finalresult = false;
			}
			else if (!new Regex(@"\d").IsMatch(password))
			{
				errorInterim.AppendLine("password must contain at least one digit (0-9)");
				finalresult = false;
			}
			else if (!new Regex(@"[a-zA-Z]").IsMatch(password))
			{
				errorInterim.AppendLine("password must contain at least one alphabeth");
				finalresult = false;
			}
			else if (new Regex(@"(..+)\1").IsMatch(password))
			{
				// e.g ababab, abcabcabc, can be easily modified to the number of substring patterns (can also be a setting)
				errorInterim.AppendLine("password should not  contain repeating 2 substring patterns");
				finalresult = false;
			}
			error = errorInterim.ToString();
			return finalresult;
		}
	}
}

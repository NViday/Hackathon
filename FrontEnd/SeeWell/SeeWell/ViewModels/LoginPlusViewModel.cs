using System;
using System.Windows.Input;
using Syncfusion.XForms.DataForm;
using Xamarin.Forms;
using System.ComponentModel;
using System.Collections;
using System.Collections.Generic;
using SeeWell.Services;
using System.Threading.Tasks;
using SeeWell.Core;
using SeeWell.Core.Helpers;
using System.Text.RegularExpressions;

namespace SeeWell.ViewModels
{
	public class LoginPlusViewModel : BaseViewModel, INotifyPropertyChanged, INotifyDataErrorInfo
	{
		[Display(AutoGenerateField = false)]
		public ICommand ContinueCommand { get; }
		private string email;
		private string _password;
		private DateTime birthday;
		private bool personOfColor;
		private bool doctor;
		private bool transexual;
		private readonly INavigation navigation;
		private readonly Page parent;
		private readonly AppUser user = ObjectHelpers.BrokerFactory.ApplicationSettings.AppUser;

		public LoginPlusViewModel(INavigation navigation, Page parent)
		{
			Title = "About";
			ContinueCommand = new Command(async () => { await ValidateAndContinue(); });
			this.navigation = navigation;
			this.parent = parent;
		}

		private async Task ValidateAndContinue()
		{
			IsBusy = true;
			if (!HasErrors)
			{
				user.Birthday = Birthday;
				user.Doctor = Doctor;
				user.Transexual = Transexual;
				user.PersonOfColor = PersonOfColor;
				ObjectHelpers.BrokerFactory.ApplicationSettings.AppUser = user;
				ObjectHelpers.BrokerFactory.ApplicationSettings.UserCompletedSignIn = true; 
				await Helpers.PushMainPage(navigation);
			//	navigation.RemovePage(parent);
			}
			else
			{
				ObjectHelpers.UserDialogManager.Alert($"Please complete the required fields");
				
			}
			IsBusy = false;
		}

		[Display(Name = nameof(Email)), DataType(DataType.EmailAddress), DisplayOptions(ShowLabel = true)]
		public string Email
		{
			get => user.Email;
			private set
			{
				email = value;
				PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Email)));
			}
		}

		[Display(AutoGenerateField = false)]
		public string WelcomeMessage => $"Hi {user.Name ?? user.Email} {Environment.NewLine}{Environment.NewLine}Please fill out the following to complete your registration!";

		[Display(AutoGenerateField = false)]
		public string Avatar => user.Avatar?.ToString();


		[Display(Name = "Birthday"), DataType(DataType.DateTime), DateRange(MinYear =1945, MaxYear =2019, ErrorMessage ="You must be 0 -100 years old"),  DisplayOptions(ShowLabel = true)]
		public DateTime Birthday
		{
			get => birthday; set
			{
				birthday = value;
				PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Birthday)));
			}
		}

		//[Display(Prompt = nameof(Password)), DataType(DataType.Password), DisplayOptions(ShowLabel = true)]
		//public string Password
		//{
		//	get => _password; set
		//	{
		//		_password = value;
		//		PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Password)));
		//	}
		//}

		[Display(Name = "Are you transsexual?"), DataType(nameof(DataFormCheckBoxItem)), DisplayOptions(ShowLabel = true)]
		public bool Transexual
		{
			get => transexual; set
			{
				transexual = value;
				PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Transexual)));
			}
		}


		[Display(Name = "Are you a doctor?"), DataType(nameof(DataFormCheckBoxItem)), DisplayOptions(ShowLabel = true)]
		public bool Doctor
		{
			get => doctor; set
			{
				doctor = value;
				PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Doctor)));
			}
		}

		[Display(Name = "Person of Color?"), DataType(nameof(DataFormCheckBoxItem)), DisplayOptions(ShowLabel = true)]
		public bool PersonOfColor
		{
			get => personOfColor; set
			{
				personOfColor = value;
				PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(PersonOfColor)));
			}
		}


		public event PropertyChangedEventHandler PropertyChanged;

		[Display(AutoGenerateField = false)]

		public bool HasErrors => false;

		public event EventHandler<DataErrorsChangedEventArgs> ErrorsChanged;

		public IEnumerable GetErrors(string propertyName)
		{
			var list = new List<string>();
			if (propertyName.Equals(nameof(Email)))
			{
				if (!IsEmailValid(Email))
				{
					list.Add("Email isn't valid");
				}
			}


			return list;

		}

		public static bool IsEmailValid(string email)
		{
			const string EmailRegEx = @"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
									@"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-0-9a-z]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$";

			const string pattern = EmailRegEx;
			Regex regEx = new Regex(pattern);
			return regEx.IsMatch(email);
		}
	}
}
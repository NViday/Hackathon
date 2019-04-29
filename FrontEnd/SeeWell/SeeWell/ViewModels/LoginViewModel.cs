using SeeWell.Core;
using SeeWell.Core.Helpers;
using SeeWell.Services;
using System;
using System.Threading.Tasks;
using System.Windows.Input;

using Xamarin.Forms;

namespace SeeWell.ViewModels
{
	public class LoginViewModel : BaseViewModel
	{
		private readonly INavigation navigation;

		public LoginViewModel(INavigation navigation)
		{
			Title = "Login";
			ContinueCommand = new Command(GoogleLogin);
			this.navigation = navigation;
		}

		public ICommand ContinueCommand { get; }

		private void GoogleLogin()
		{
			IsBusy = true;
			ObjectHelpers.SignInManager.Login(OnLoginComplete);
			IsBusy = false;
		}

		private async void OnLoginComplete(AppUser googleUser, string message)
		{
			if (googleUser != null)
			{
				ObjectHelpers.BrokerFactory.ApplicationSettings.AppUser = googleUser;
				await Helpers.PushLoginPlusPage(navigation);
			}
			else
			{
				ObjectHelpers.UserDialogManager.Alert($"Error while logging in {message}");
			}
		}

		internal async Task CheckRegistrationStatus()
		{
			// If the user registered but didn't complete sign in, send them to the next page
			if (Utilities.IsUserPartiallyRegistered())
			{
				await Helpers.PushLoginPlusPage(navigation);
			}
		}
	}
}
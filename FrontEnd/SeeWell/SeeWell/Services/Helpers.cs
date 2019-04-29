using SeeWell.Views;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace SeeWell.Services
{
	internal static class Helpers
	{
		public static async Task PushPageAsync(this INavigation navigation, ContentPage page, bool hasNavigationBar)
		{
			NavigationPage.SetHasNavigationBar(page, hasNavigationBar);
			await navigation.PushAsync(page, true);
		}

		public static  async Task PushLoginPage(INavigation navigation)
		{
			var loginPage = new LoginPage();
			await navigation.PushModalAsync(loginPage, true);
		}


		public static async Task PushLoginPlusPage(INavigation navigation)
		{
			var loginPlusPage = new LoginPlusPage();
			await navigation.PushModalAsync(loginPlusPage, true);
		}

		public static async Task PushMainPage(INavigation navigation)
		{
			var mainPage = new MainPage();
			await navigation.PushModalAsync(mainPage, true);
		}
	}
}

using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using SeeWell.Services;
using SeeWell.Views;
using SeeWell.Core;
using SeeWell.Core.Helpers;
using Syncfusion.Licensing;
using Acr.UserDialogs;

namespace SeeWell
{
	public partial class App : Application
	{

		public App()
		{
			InitializeComponent();

			DependencyService.Register<MockDataStore>();
			SyncfusionLicenseProvider.RegisterLicense("OTU1OTJAMzEzNzJlMzEyZTMwakdrN29PNU41azRtbHVvYjBTZXZReFBjQ01OZHEzeFM2dzFwdUVOb21Jdz0=");
			ObjectHelpers.ServiceLocator.RegisterInstance(typeof(IUserDialogs), UserDialogs.Instance);

			if (!Utilities.IsUserCompletelyRegistered())
			{
				if (Utilities.IsUserPartiallyRegistered())
				{
					MainPage = new LoginPlusPage();
				}
				else
				{
					MainPage = new LoginPage();
				}
			}
			else
			{
				MainPage = new MainPage();
			}
		}

		protected override void OnStart()
		{
			// Handle when your app starts
		}

		protected override void OnSleep()
		{
			// Handle when your app sleeps
		}

		protected override void OnResume()
		{
			// Handle when your app resumes
		}
	}
}

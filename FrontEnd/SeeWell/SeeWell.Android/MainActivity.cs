using System;

using Android.App;
using Android.Content.PM;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Android.OS;
using SeeWell.Core.Interfaces;
using SeeWell.Droid.Library;
using SeeWell.Core.Helpers;
using SeeWell.Core;
using Android.Gms.Auth.Api.SignIn;
using Android.Gms.Auth.Api;
using Plugin.CurrentActivity;
using Acr.UserDialogs;

namespace SeeWell.Droid
{
    [Activity(Label = "SeeWell", Icon = "@mipmap/icon", Theme = "@style/MainTheme", MainLauncher = true, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]
    public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsAppCompatActivity
    {
        protected override void OnCreate(Bundle savedInstanceState)
        {
            TabLayoutResource = Resource.Layout.Tabbar;
            ToolbarResource = Resource.Layout.Toolbar;

            base.OnCreate(savedInstanceState);
			CrossCurrentActivity.Current.Init(this, savedInstanceState);
			UserDialogs.Init(this);
			Xamarin.Essentials.Platform.Init(this, savedInstanceState);
            global::Xamarin.Forms.Forms.Init(this, savedInstanceState);
			ObjectHelpers.ServiceLocator.RegisterInstance(typeof(ISignInProvider), new GoogleManager());
			ObjectHelpers.ServiceLocator.RegisterInstance(typeof(ObjectFactory), ObjectFactory.GetInstance());

			LoadApplication(new App());
        }
        public override void OnRequestPermissionsResult(int requestCode, string[] permissions, [GeneratedEnum] Android.Content.PM.Permission[] grantResults)
        {
            Xamarin.Essentials.Platform.OnRequestPermissionsResult(requestCode, permissions, grantResults);

            base.OnRequestPermissionsResult(requestCode, permissions, grantResults);
        }


		protected override void OnActivityResult(int requestCode, Result resultCode, Android.Content.Intent data)
		{
			base.OnActivityResult(requestCode, resultCode, data);
			if (requestCode == 1)
			{
				GoogleSignInResult result = Auth.GoogleSignInApi.GetSignInResultFromIntent(data);
				GoogleManager.Instance.OnAuthCompleted(result);
			}
		}
	}
}
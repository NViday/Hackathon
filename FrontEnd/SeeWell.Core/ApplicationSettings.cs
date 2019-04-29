
using SeeWell.Core;
using SQLite;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SeeWell.Core
{
	public class ApplicationSettings : ViewModelBase
	{
		#region Private
		private readonly AppUser appUserDefault = null;
		private readonly Jwt tokenDefault = null;
		private readonly SmartAddress LastKnownAddressDefault = null;
		private readonly StorageSettingsBroker settingsBroker = null;
		private readonly bool userCompletedSignInDefault = false;
		#endregion

		/// <summary>
		/// Initializes a new instance of the <see cref="ApplicationSettings"/> class.
		/// </summary>
		/// <param name="settingsBroker">The settings broker.</param>
		public ApplicationSettings(StorageSettingsBroker settingsBroker)
		{
			Utilities.ParamRequireNotNull(settingsBroker, nameof(settingsBroker));
			this.settingsBroker = settingsBroker;
		}

		/// <summary>
		/// Resets all the settings.
		/// </summary>
		/// <returns></returns>
		public async Task Reset()
		{
			await Task.Run(() =>
			{
				AppUser = appUserDefault;
				Token = tokenDefault;
			});
		}


		/// <summary>
		/// Gets the name of the application.
		/// </summary>
		public string ApplicationName => ClientStrings.ApplicationName;

		/// <summary>
		/// Gets or sets the application user.
		/// </summary>
		public AppUser AppUser
		{
			get => settingsBroker.GetValueOrDefault<AppUser>(ClientStrings.ApplicationSettings.AppUser,
					appUserDefault);
			set
			{
				settingsBroker.AddOrUpdateValue(ClientStrings.ApplicationSettings.AppUser, value);
			}
		}


		/// <summary>
		/// Gets or sets the token.
		/// </summary>
		public Jwt Token
		{
			get => settingsBroker.GetValueOrDefault<Jwt>(ClientStrings.ApplicationSettings.SessionToken,
					tokenDefault);
			set
			{
				settingsBroker.AddOrUpdateValue(ClientStrings.ApplicationSettings.SessionToken, value);
			}
		}


		public bool UserCompletedSignIn
		{
			get => settingsBroker.GetValueOrDefault<bool>(ClientStrings.ApplicationSettings.UserCompletedSignIn,
					userCompletedSignInDefault);
			set
			{
				settingsBroker.AddOrUpdateValue(ClientStrings.ApplicationSettings.UserCompletedSignIn, value);
			}
		}

		/// <summary>
		/// Gets or sets the last known address.
		/// </summary>
		public SmartAddress LastKnownAddress
		{
			get => settingsBroker.GetValueOrDefault<SmartAddress>(ClientStrings.ApplicationSettings.LastKnownAddress,
					LastKnownAddressDefault);
			set
			{
				settingsBroker.AddOrUpdateValue(ClientStrings.ApplicationSettings.LastKnownAddress, value);
			}
		}

		/// <summary>
		/// Gets the current app version
		/// </summary>
		public string CurrentAppVersion => ClientStrings.AppVersion;
	}
}
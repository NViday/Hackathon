
using Acr.Settings;
using System;
using System.Collections.Generic;

namespace SeeWell.Core
{
	/// <summary>
	/// Saves data to persistent storage. Can be used directly or via a separate layer to format data
	/// </summary>
	public class StorageSettingsBroker
	{
		private readonly ISettings blobCache;

		/// <summary>
		/// Initializes a new instance of the <see cref="SettingsBroker"/> class.
		/// </summary>
		/// <param name="appName">Name of the application.</param>
		/// <param name="isSecure">if set to <c>true</c> [is secure].</param>
		public StorageSettingsBroker(string appName)
		{
			Utilities.ParamRequireNotNull(appName, nameof(appName));
			blobCache = CrossSettings.Current;
			blobCache.JsonSerializerSettings = JsonHelpers.GetSerializerSettings();
		}

		/// <summary>
		/// Adds or update value.
		/// </summary>
		/// <param name="key">The key.</param>
		/// <param name="value">The value.</param>
		/// <param name="expiration">The expiration.</param>
		/// <returns>True if successful, false otherwise</returns>
		public void AddOrUpdateValue(string key, object value, DateTimeOffset? expiration = null)
		{
			blobCache.SetValue(key, value);
		}

		/// <summary>
		/// Gets the value or default.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="key">The key.</param>
		/// <param name="defaultValue">The default value.</param>
		/// <param name="refreshDelegate">Delegate function used to refresh the data if it's not available.</param>
		/// <returns>The value or returns a default if it doesn't exist</returns>
		public T GetValueOrDefault<T>(string key, T defaultValue, Func<IObservable<T>> refreshDelegate = null)
		{
			T value;
			try
			{
				value = blobCache.Get<T>(key, defaultValue);
			}
			catch (KeyNotFoundException)
			{
				value = defaultValue;
			}

			return value;
		}

		/// <summary>
		/// Deletes the value.
		/// </summary>
		/// <param name="key">The key.</param>
		public void DeleteValue(string key)
		{
			blobCache.Remove(key);
		}

		public void Dispose()
		{

		}
	}
}

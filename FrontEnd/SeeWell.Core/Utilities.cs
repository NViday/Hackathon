
using SeeWell.Core.Properties;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using SeeWell.Core.Helpers;

namespace SeeWell.Core
{
	/// <summary>
	/// Generic utilities that can be used across all projects regardless of type. 
	/// </summary>
	public static class Utilities
	{
	
		/// <summary>
		/// Validates that a string is not null or empty otherwise throws and exception
		/// </summary>
		/// <param name="currentString">The current string.</param>
		/// <param name="parameterName">Name of the parameter.</param>
		/// <param name="message">The message.</param>
		/// <exception cref="System.ArgumentNullException"></exception>
		public static void ParamRequireStringNotNullOrEmpty(string currentString, string parameterName, string message = null)
		{
			if (string.IsNullOrEmpty(currentString))
			{
				var finalMessage = message ?? string.Format(Resources.ParamNullMessage, parameterName);
				throw new ArgumentNullException(parameterName, finalMessage);
			}
		}

		/// <summary>
		/// Validates that an object is not null
		/// </summary>
		/// <param name="currentObject">The current object.</param>
		/// <param name="parameterName">Name of the parameter.</param>
		/// <param name="message">The message.</param>
		/// <exception cref="System.ArgumentNullException"></exception>
		public static void ParamRequireNotNull(object currentObject, string parameterName, string message = null)
		{
			if (currentObject == null)
			{
				var finalMessage = message ?? string.Format(Resources.ParamNullMessage, parameterName);
				throw new ArgumentNullException(parameterName, finalMessage);
			}
		}

	
		/// <summary>
		/// Serializes to json.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="baseObject">The base object.</param>
		/// <param name="serializerSettings">The serializer settings.</param>
		/// <returns></returns>
		public static string SerializeToJson<T>(T baseObject, JsonSerializerSettings serializerSettings = null)
		{
			ParamRequireNotNull(baseObject, nameof(baseObject));
			return JsonConvert.SerializeObject(baseObject, serializerSettings);
		}

		/// <summary>
		/// Deserializes from json.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="serializedText">The serialized text.</param>
		/// <param name="serializerSettings">The serializer settings.</param>
		/// <returns></returns>
		public static T DeserializeFromJson<T>(string serializedText, JsonSerializerSettings serializerSettings = null)
		{
			ParamRequireStringNotNullOrEmpty(serializedText, nameof(serializedText));
			return JsonConvert.DeserializeObject<T>(serializedText, serializerSettings);
		}

		/// <summary>
		/// returns true if the  collection is not null and has at least one entry. False otherwise
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="data"></param>
		/// <param name="predicate"></param>
		/// <returns></returns>
		public static bool IsAny<T>(this IEnumerable<T> data, Func<T, bool> predicate = null)
		{
			if (predicate != null)
			{
				return data != null && data.Any(predicate);
			}

			return data != null && data.Any();
		}

		/// <summary>
		/// Reads the stream to string.
		/// </summary>
		/// <param name="stream">The stream.</param>
		/// <param name="encoding">The encoding to use</param>
		/// <returns></returns>
		public static string ReadStreamToString(this Stream stream, Encoding encoding)
		{
			if (stream.CanSeek)
			{
				stream.Position = 0;
			}

			using (var reader = new StreamReader(stream, encoding))
			{
				try
				{
					return reader.ReadToEnd();
				}
				// TODO: BUGBUG, we are affected by this recent mono upgrade regression
				//https://github.com/mono/mono/issues/9511
				catch (Exception)
				{
					return "ExceptionCaughtDue to https://github.com/mono/mono/issues/9511";
				}
			}
		}

		public static bool IsUserCompletelyRegistered()
		{
			return ObjectHelpers.BrokerFactory.ApplicationSettings.AppUser != null && ObjectHelpers.BrokerFactory.ApplicationSettings.UserCompletedSignIn;
		}

		public static bool IsUserPartiallyRegistered()
		{
			return ObjectHelpers.BrokerFactory.ApplicationSettings.AppUser != null && !ObjectHelpers.BrokerFactory.ApplicationSettings.UserCompletedSignIn;
		}
	}
}

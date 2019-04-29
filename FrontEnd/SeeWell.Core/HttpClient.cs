
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using SeeWell.Core;
using SeeWell.Core.Properties;

namespace SeeWell.Core
{
	/// <summary>
	/// Http client
	/// </summary>
	public class HttpClient 
	{
		private readonly JsonSerializerSettings serializerSettings;
	
		/// <summary>
		/// Gets or sets the default type of the request content.
		/// </summary>
		public string DefaultRequestContentType => ClientStrings.HttpStrings.DefaultRequestContentType;

		/// <summary>
		/// Initializes a new instance of the <see cref="HttpClient"/> class.
		/// </summary>
		/// <param name="jsonSerializerSettings">The json serializer settings.</param>
		public HttpClient(JsonSerializerSettings jsonSerializerSettings)
		{
			serializerSettings = jsonSerializerSettings;
			serializerSettings.TypeNameHandling = TypeNameHandling.All;
		}

		/// <summary>
		/// Gets data.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="httpEndpoint">The base URI.</param>
		/// <param name="queryParams">The query parameters.</param>
		/// <param name="httpHeaders">The HTTP headers.</param>
		/// <param name="timeoutInMillSeconds"></param>
		/// <returns></returns>
		public  async Task<T> GetData<T>(Uri httpEndpoint, Dictionary<string, string> queryParams = null, Dictionary<string, string> httpHeaders = null, int timeoutInMillSeconds = 3 * 60 * 1000) where T : class
		{
			Utilities.ParamRequireNotNull(httpEndpoint, nameof(httpEndpoint));

			var returnObj = default(T);
			var response = await GetDataRaw(httpEndpoint, queryParams, httpHeaders, timeoutInMillSeconds);

			if (response.StatusCode != HttpStatusCode.Created && response.StatusCode != HttpStatusCode.OK)
			{
				return returnObj;
			}

			return GetReturnObjectFromStream<T>(response);
		}

		/// <summary>
		/// Sends the data to the http endpoint
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="data">The data.</param>
		/// <param name="httpMethod">The HTTP method.</param>
		/// <param name="httpEndpoint">The HTTP endpoint.</param>
		/// <param name="queryParams">The query parameters.</param>
		/// <param name="httpHeaders">The HTTP headers.</param>
		/// <param name="timeoutInMillSeconds"></param>
		/// <returns>The requested data</returns>
		public async Task<T> SendData<T>(object data, HttpMethod httpMethod, Uri httpEndpoint, Dictionary<string, string> queryParams = null, Dictionary<string, string> httpHeaders = null, int timeoutInMillSeconds = 3 * 60 * 1000) where T : class
		{
			Utilities.ParamRequireNotNull(data, nameof(data));
			Utilities.ParamRequireNotNull(httpEndpoint, nameof(httpEndpoint));
			var uri = httpEndpoint;

			if (httpMethod == HttpMethod.Get)
			{
				//logger.LogExceptionAndThrow(new InvalidOperationException(Resources.HttpClientGetInPostMethodError),
				//	Resources.HttpClientGetInPostMethodError);
			}
			try
			{
				T returnObj = null;
				if (queryParams.IsAny())
				{
					uri = new Uri($"{httpEndpoint.AbsoluteUri}?{GetQueryFragment(queryParams)}");
				}

				var request = (HttpWebRequest)WebRequest.Create(uri);
				request.ContentType = DefaultRequestContentType;
				if (httpHeaders.IsAny())
				{
					const string queryParameterKey = "queryParameterKey";

					foreach (var v in httpHeaders)
					{
						Utilities.ParamRequireStringNotNullOrEmpty(v.Key, string.Format(Resources.HttpClientNullParamKey, v.Key ?? queryParameterKey));
						request.Headers[v.Key] = v.Value;
					}
				}

				request.Method = httpMethod.ToString();
				request.Timeout = timeoutInMillSeconds;
			
				using (var writer = new StreamWriter(await request.GetRequestStreamAsync()))
				{
					string jsonContent;
					if (data.GetType() != typeof(string))
					{
						jsonContent = Utilities.SerializeToJson(data, serializerSettings);
					}
					else
					{
						jsonContent = data as string;
					}
					await writer.WriteAsync(jsonContent);
				}

				var response = (HttpWebResponse)await request.GetResponseAsync();
				if (response.StatusCode == HttpStatusCode.Created || response.StatusCode == HttpStatusCode.OK)
				{
					return GetReturnObjectFromStream<T>(response);
				}

				return returnObj;
			}
			catch (WebException e)
			{
				var error = GetInnerErrorOrThrowAuthException(e, uri.AbsoluteUri, httpMethod);
				//logger.LogException(e, Resources.HttpClientSendDataWebErrorText, new Dictionary<string, string>()
				//{
				//	{"Inner Error", error }
				//});
				throw;
			}
			catch (Exception e)
			{
				//logger.LogException(e, Resources.HttpClientSendDataUnknownErrorText, new Dictionary<string, string>
				//{
				//	{ "RequestUrl", uri.AbsoluteUri},
				//	{ "HTTP Method", HttpMethod.Get.ToString() },
				//});
				throw;
			}
		}

		/// <summary>
		/// Gets the data base.
		/// </summary>
		/// <param name="httpEndpoint">The HTTP endpoint.</param>
		/// <param name="queryParams">The query parameters.</param>
		/// <param name="httpHeaders">The HTTP headers.</param>
		/// <param name="timeoutInMillSeconds"></param>
		/// <returns></returns>
		public async Task<HttpWebResponse> GetDataRaw(Uri httpEndpoint, Dictionary<string, string> queryParams = null, Dictionary<string, string> httpHeaders = null, int timeoutInMillSeconds = 3 * 60 * 1000)
		{
			var uri = httpEndpoint;

			try
			{
				if (queryParams.IsAny())
				{
					uri = new Uri($"{httpEndpoint.AbsoluteUri}?{GetQueryFragment(queryParams)}");
				}

				var request = (HttpWebRequest)WebRequest.Create(uri);
				request.ContentType = DefaultRequestContentType;
				request.Timeout = timeoutInMillSeconds;
				if (httpHeaders.IsAny())
				{
					const string queryParameterKey = "queryParameterKey";
					foreach (var v in httpHeaders)
					{
						Utilities.ParamRequireStringNotNullOrEmpty(v.Key, string.Format(Resources.HttpClientNullParamKey, v.Key ?? queryParameterKey));
						request.Headers[v.Key] = v.Value;
					}
				}

				return (HttpWebResponse)await request.GetResponseAsync();
			}
			catch (WebException e)
			{
				var error = GetInnerErrorOrThrowAuthException(e, uri.AbsoluteUri, HttpMethod.Get);
				//logger.LogException(e, Resources.HttpClientGetDataWebErrorText, new Dictionary<string, string>()
				//{
				//	{"Inner Error", error }
				//});
				throw;
			}
			catch (Exception e)
			{
				//logger.LogException(e, Resources.HttpClientGetDataUnknownErrorText, new Dictionary<string, string>
				//{
				//	{ "RequestUrl", uri.AbsoluteUri},
				//	{ "HTTP Method", HttpMethod.Get.ToString() },
				//});
				throw;
			}
		}

		#region Private methods

		private string GetInnerErrorOrThrowAuthException(WebException e, string uri, HttpMethod httpMethod)
		{
			var innerError = string.Empty;
			var exceptionResponse = (HttpWebResponse)e.Response;
			if (exceptionResponse != null)
			{
				innerError = exceptionResponse.GetResponseStream()?.ReadStreamToString(Encoding.UTF8);
			}
			if (exceptionResponse?.StatusCode == HttpStatusCode.Unauthorized)
			{
				var errorMessage = string.Format(Resources.HttpClient401Error, e);
				//logger.LogExceptionAndThrow(new AuthenticationException(errorMessage, e), errorMessage, new Dictionary<string, string>()
				//{
				//	{ "RequestUrl", uri},
				//	{ "HTTP Method", httpMethod.ToString() },
				//	{ "Response stream string", innerError ?? string.Empty }
				//});
			}

			return innerError;
		}

		/// <summary>
		/// Gets the query fragment from a dictionary
		/// </summary>
		/// <param name="queryDictionary">The query dictionary.</param>
		/// <returns></returns>
		private static string GetQueryFragment(Dictionary<string, string> queryDictionary)
		{
			var queryParamString = string.Empty;

			const string queryParameterKey = "QueryParameterKey";
			const string queryParameterValue = "QueryParameterValue";

			foreach (var param in queryDictionary)
			{
				Utilities.ParamRequireStringNotNullOrEmpty(param.Key, string.Format(Resources.HttpClientNullParamKey, param.Key ?? queryParameterKey));
				Utilities.ParamRequireStringNotNullOrEmpty(param.Value, string.Format(Resources.HttpClientNullParamKey, param.Value ?? queryParameterValue));

				queryParamString = string.IsNullOrEmpty(queryParamString) ?
					$"{param.Key}={Uri.EscapeDataString(param.Value)}"
					: $"{queryParamString}&{param.Key}={Uri.EscapeDataString(param.Value)}";
			}

			return queryParamString;
		}

		/// <summary>
		/// Gets the return object from http response stream.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="response">The response.</param>
		/// <returns></returns>
		private T GetReturnObjectFromStream<T>(HttpWebResponse response) where T : class
		{
			var returnObj = default(T);

			var responseJson = string.Empty;

			try
			{
				responseJson = response.GetResponseStream()?.ReadStreamToString(Encoding.UTF8);
				returnObj = (typeof(T) == typeof(string)) ? responseJson as T : Utilities.DeserializeFromJson<T>(responseJson, serializerSettings);
			}
			catch (Exception ex)
			{
				//	logger.LogExceptionAndThrow(ex, Resources.HttpClientGetDataDeserializeErrorText,
				//		new Dictionary<string, string>
				//		{
				//			{"JSON Response Raw Text", responseJson }
				//		});
				//}
			}

			return returnObj;
		}

		#endregion
	}
}

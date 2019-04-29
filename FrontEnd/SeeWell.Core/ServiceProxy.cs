
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

using SeeWell.Core.Properties;

namespace SeeWell.Core
{
	public class ServiceProxy 
	{
		internal Jwt AuthorizationToken;
		protected static readonly Uri BaseServiceUri = new Uri("https://kwackssurface:44391/");
		protected static readonly Uri BaseApiBaseUrl = new Uri($"{BaseServiceUri}api/");

		public HttpClient HttpClient { get; }
		public ApplicationSettings UserSettings { get; }

		/// <summary>
		/// Initializes a new instance of the <see cref="ServiceProxy"/> class.
		/// </summary>
		/// <param name="httpClient">The HTTP client.</param>
		/// <param name="logger">The logger.</param>
		/// <param name="userSettings">The user settings.</param>
		public ServiceProxy(HttpClient httpClient, ApplicationSettings userSettings)
		{
			Utilities.ParamRequireNotNull(httpClient, nameof(httpClient));
			Utilities.ParamRequireNotNull(userSettings, nameof(userSettings));

			HttpClient = httpClient;
			this.UserSettings = userSettings;
		}

	
		
		#region User management
		/// <summary>
		/// Logs the user in.
		/// </summary>
		/// <param name="userName">Name of the user.</param>
		/// <param name="password">The password.</param>
		/// <returns></returns>
		public async Task LogIn(string userName, string password)
		{
			Utilities.ParamRequireStringNotNullOrEmpty(userName, nameof(userName));
			Utilities.ParamRequireStringNotNullOrEmpty(password, nameof(password));
			try
			{
				//await HttpClient.SendData<object>(userName,
				//	HttpClient.HttpMethod.Post,
				//	//new Uri(BaseApiBaseUrl + ServiceApiSegments.AccountSegment.Name + ServiceApiSegments.AccountSegment.Login),
				//	//queryParams: new Dictionary<string, string>()
				//	//{
				//	//	{ServiceApiSegments.AccountSegment.ParamUserName, userName },
				//	//	{ServiceApiSegments.AccountSegment.ParamPassword, password },
				//	//},
				//	//httpHeaders: GetBaseHttpHeaders());

				//UserSettings.AppUser = new AppUser()
				//{
				//	Email = userName,
				//	Password = password
				//};

				//await RefreshToken(userName, password);
			}
			catch (Exception ex)
			{
				//logger.LogExceptionAndThrow(ex, "Login failed");
			}
		}

		
		/// <summary>
		/// Refreshes the token.
		/// </summary>
		public async Task RefreshToken(string userName, string password)
		{
			Utilities.ParamRequireStringNotNullOrEmpty(userName, nameof(userName));
			Utilities.ParamRequireStringNotNullOrEmpty(password, nameof(password));

			try
			{
				var authBody = $"grant_type=password&username={ Uri.EscapeDataString(userName)}&password={ Uri.EscapeDataString(password)}";
				//this.AuthorizationToken = await HttpClient.SendData<Jwt>(authBody, HttpMethod.Post, new Uri($"{BaseServiceUri}{ServiceApiSegments.AccountSegment.Authorization}?{authBody}"));

				if (!AuthorizationToken.IsValid())
				{
					//logger.LogExceptionAndThrow(new AuthenticationException(Resources.ServiceProxyInvalidToken), Resources.ServiceProxyInvalidToken);
				}

				UserSettings.Token = this.AuthorizationToken;
			}
			catch (Exception ex)
			{
				//logger.LogExceptionAndThrow(ex, "RefreshToken Failed");
			}
		}

		/// <summary>
		/// Gets the current users profile.
		/// </summary>
		/// <returns></returns>
		public async Task<AppUser> GetMe()
		{
			AppUser appUser = null;
			try
			{
			//	appUser = await HttpClient.GetData<AppUser>(new Uri(BaseApiBaseUrl + ServiceApiSegments.AccountSegment.Name + "/" + ServiceApiSegments.AccountSegment.Me), httpHeaders: GetPostAuthHeaders());

				if (appUser != null)
				{
					var temp1 = UserSettings.AppUser;

					if (UserSettings.AppUser == null)
					{
						UserSettings.AppUser = appUser;
					}
					else
					{
						var temp = UserSettings.AppUser.Password;
						appUser.Password = temp;
						UserSettings.AppUser = appUser;
					}

					appUser = UserSettings.AppUser;
				}

			}
			catch (Exception ex)
			{
				//logger.LogExceptionAndThrow(ex, "GetMe() Failed");
			}

			return appUser;

		}

		/// <summary>
		/// Gets the external token.
		/// </summary>
		/// <param name="provider">The provider.</param>
		/// <param name="token">The token.</param>
		/// <returns></returns>
		public async Task GetExternalToken(string provider, string token)
		{
			Utilities.ParamRequireStringNotNullOrEmpty(provider, nameof(provider));
			Utilities.ParamRequireStringNotNullOrEmpty(token, nameof(token));

			try
			{
				var authBody = $"provider={Uri.EscapeDataString(provider)}&token={Uri.EscapeDataString(token)}";
			//	this.AuthorizationToken = await HttpClient.GetData<Jwt>(new Uri($"{ BaseApiBaseUrl }{ ServiceApiSegments.AccountSegment.Name}{ServiceApiSegments.AccountSegment.ExternalToken}?{authBody}"));

				if (!AuthorizationToken.IsValid())
				{
					//logger.LogExceptionAndThrow(new AuthenticationException(Resources.ServiceProxyInvalidToken), Resources.ServiceProxyInvalidToken);
				}

				UserSettings.Token = this.AuthorizationToken;
			}
			catch (Exception ex)
			{
				//logger.LogExceptionAndThrow(ex, "GetExternalToken Failed", new Dictionary<string, string>()
				//{
				//	{"provider", provider },
				//	{"token", token }
				//});
			}
		}


		/// <summary>
		/// Registers the external service for the current user.
		/// </summary>
		/// <param name="token">The token.</param>
		/// <param name="provider">The provider.</param>
		/// <returns></returns>
		public async Task<AppUser> RegisterExternal(string token, string provider)
		{
			Utilities.ParamRequireStringNotNullOrEmpty(token, nameof(token));
			Utilities.ParamRequireStringNotNullOrEmpty(provider, nameof(provider));

			AppUser appUser = null;
			try
			{
				//appUser = await HttpClient.SendData<AppUser>(token,
				//	  HttpMethod.Post,
					  //new Uri(BaseApiBaseUrl + ServiceApiSegments.AccountSegment.Name + "/" + ServiceApiSegments.AccountSegment.ExternalLogin), httpHeaders: GetBaseHttpHeaders(),
					  //queryParams: new Dictionary<string, string>()
					  //{
						 // { ServiceApiSegments.AccountSegment.ParamProvider, provider },
						 // { ServiceApiSegments.AccountSegment.ParamToken, token }
					  //});

			//	UserSettings.AppUser = appUser;
				//await GetExternalToken(provider, token);
			}
			catch (Exception ex)
			{
				//logger.LogExceptionAndThrow(ex, "Register External Failed Failed", new Dictionary<string, string>()
				//{
				//	{"provider", provider },
				//	{"token", token }
				//});
			}

			return appUser;
		}


		///// <summary>
		///// Registers the user.
		///// </summary>
		///// <param name="user">The user.</param>
		///// <returns></returns>
		//public async Task RegisterUser(IAppUser user)
		//{
		//	Utilities.ParamRequireNotNull(user, nameof(user));

		//	try
		//	{
		//		await HttpClient.SendData<object>(user,
		//			IHttpClient.HttpMethod.Post,
		//			new Uri(BaseApiBaseUrl + ServiceApiSegments.AccountSegment.Name + ServiceApiSegments.AccountSegment.Register), httpHeaders: GetBaseHttpHeaders());

		//		await RefreshToken(user.Email, user.Password);
		//		UserSettings.AppUser = user;
		//	}
		//	catch (Exception ex)
		//	{
		//		logger.LogExceptionAndThrow(ex, "Register User Failed", new Dictionary<string, string>()
		//		{
		//			{"UserEmail", user.Email },
		//			{"PW", user.Password }
		//		});
		//	}
		//}

		#endregion


//		/// <summary>
//		/// Gets the featured tour .
//		/// </summary>
//		/// <param name="includeTestData">The include test data.</param>
//		/// <returns></returns>
//		/// <remarks>TODO: this is a stop gap - we need to use GetTourWithTag instead</remarks>
//		public async Task<ITour> GetFeaturedTour(bool includeTestData = false)
//		{
//			ITour tour = null;
//			try
//			{
//				var entry = await GetResourceEntry(SharedStrings.TourTags.TempFeatureIdTourSeattle);
//				if (entry != null)
//				{
//					tour = await GetTour(entry.Value, includeTestData);
//				}
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, Resources.ServiceProxyGetTours);
//			}

//			return tour;
//		}

//		/// <summary>
//		/// Gets the tours with the specified tag.
//		/// </summary>
//		/// <param name="tag">The tag (use TourTag known types)</param>
//		/// <param name="includeTestData">if set to <c>true</c> [include test data].</param>
//		/// <returns></returns>
//		public async Task<IEnumerable<ITour>> GetToursWithTags(string tag, bool includeTestData = false)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(tag, nameof(tag));

//			IEnumerable<ITour> tours = null;
//			try
//			{
//				tours = await HttpClient.GetData<IEnumerable<ITour>>(new Uri(BaseApiBaseUrl + ServiceApiSegments.TourSegment.Name),
//				  httpHeaders: GetBaseHttpHeaders(includeTestData), queryParams: new Dictionary<string, string>() { { ServiceApiSegments.TourSegment.ParamTag, tag } });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, Resources.ServiceProxyGetTours);
//			}

//			return tours;
//		}

//		/// <summary>
//		/// Gets the tours.
//		/// </summary>
//		/// <returns></returns>
//		public async Task<IEnumerable<ITour>> GetTours(bool isTestDataIncluded = false)
//		{
//			IEnumerable<ITour> tours = null;
//			try
//			{
//				tours = await HttpClient.GetData<IEnumerable<ITour>>(new Uri(BaseApiBaseUrl + ServiceApiSegments.TourSegment.Name),
//				  httpHeaders: GetBaseHttpHeaders(isTestDataIncluded));
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, Resources.ServiceProxyGetTours);
//			}

//			return tours;
//		}

//		/// <summary>
//		/// Gets the tour.
//		/// </summary>
//		/// <param name="id">The identifier.</param>
//		/// <param name="includeTestData"></param>
//		/// <returns></returns>
//		public async Task<ITour> GetTour(string id, bool includeTestData = false)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(id));

//			ITour tour = null;
//			try
//			{
//				tour = await HttpClient.GetData<ITour>(new Uri($"{BaseApiBaseUrl}{ServiceApiSegments.TourSegment.Name}/{Uri.EscapeDataString(id)}"),
//				  httpHeaders: GetPostAuthHeaders(includeTestData), queryParams: new Dictionary<string, string>() { { ServiceApiSegments.TourSegment.ParamId, id } });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, Resources.ServiceProxyGetTours);
//			}

//			return tour;
//		}

//		#region Purchases
//		/// <summary>
//		/// Gets all purchases for the client. 
//		/// </summary>
//		/// <param name="since"></param>
//		/// <returns></returns>
//		public async Task<IEnumerable<IPurchaseInformation>> GetPurchases(DateTimeOffset? since = null)
//		{
//			try
//			{
//				return await HttpClient.GetData<IEnumerable<IPurchaseInformation>>(
//					new Uri(BaseApiBaseUrl + ServiceApiSegments.PurchaseSegment.Name + @"/" + ServiceApiSegments.PurchaseSegment.GetUserPurchasesAction),
//					httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>()
//					{
//						{ServiceApiSegments.PurchaseSegment.ParamStartDate, since == null? DateTimeOffset.MinValue.ToString(): since.ToString()}
//					});
//			}
//			catch (Exception ex)
//			{
//				logger.LogException(ex, "GetPurchases failed");
//				return null;
//			}
//		}

//		/// <summary>
//		/// Gets the stripe user information.
//		/// </summary>
//		/// <param name="apiVersion">The API version.</param>
//		/// <returns></returns>
//		public async Task<string> GetStripeUserInfo(string apiVersion)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(apiVersion, nameof(apiVersion));

//			try
//			{
//				var temp = await HttpClient.GetData<IResourceEntry>(
//					new Uri(BaseApiBaseUrl + ServiceApiSegments.PurchaseSegment.Name + @"/" +
//							ServiceApiSegments.PurchaseSegment.GetStripeUserAction),
//					httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>()
//					{
//						{ServiceApiSegments.PurchaseSegment.ParamApiVersion, apiVersion}
//					});

//				return temp.Value;
//			}
//			catch (Exception ex)
//			{
//				logger.LogException(ex, "GetStripeUserInfo failed");
//				throw;
//			}
//		}

//		/// <summary>
//		/// Updates  the stripe user information.
//		/// </summary>
//		/// <param name="token">The API version.</param>
//		/// <param name="isDefault">true if this ithe default token, false otherwise.</param>
//		/// <returns></returns>
//		public async Task<bool> UpdateStripeUserInfo(string token, bool isDefault)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(token, nameof(token));

//			try
//			{
//				var tt = await HttpClient.SendData<object>(token,
//					IHttpClient.HttpMethod.Post,
//					new Uri(BaseApiBaseUrl + ServiceApiSegments.PurchaseSegment.Name + "/" + ServiceApiSegments.PurchaseSegment.UpdateStripeUserAction), httpHeaders: GetPostAuthHeaders(),
//					queryParams: new Dictionary<string, string>()
//					 {
//						{ServiceApiSegments.PurchaseSegment.ParamToken, token},
//					   {ServiceApiSegments.PurchaseSegment.ParamIsDefault, isDefault.ToString()}
//					 });
//				return Convert.ToBoolean(tt);
//			}
//			catch (Exception ex)
//			{
//				logger.LogException(ex, "GetStripeUserInfo failed");
//				throw;
//			}
//		}

//		/// <summary>
//		/// Completes the purchase.
//		/// </summary>
//		/// <param name="purchaseInformation">The purchase information.</param>
//		/// <returns></returns>
//		public async Task CompletePurchase(IPurchaseInformation purchaseInformation)
//		{
//			Utilities.ParamRequireNotNull(purchaseInformation, nameof(purchaseInformation));

//			try
//			{
//				await HttpClient.SendData<IPurchaseInformation>(purchaseInformation,
//					IHttpClient.HttpMethod.Post,
//					new Uri(BaseApiBaseUrl + ServiceApiSegments.PurchaseSegment.Name + "/" + ServiceApiSegments.PurchaseSegment.CompleteAction), httpHeaders: GetPostAuthHeaders());
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "Complete Purchase Failed");
//			}
//		}

//		/// <summary>
//		/// Gets the merchant information.
//		/// </summary>
//		/// <param name="clientVersion">The client version.</param>
//		/// <returns></returns>
//		public async Task<IEnumerable<IMerchant>> GetMerchantInformation(string clientVersion)
//		{
//			try
//			{
//				return await HttpClient.GetData<IEnumerable<IMerchant>>(
//					new Uri(BaseApiBaseUrl + ServiceApiSegments.MerchantSegment.Name + "/" + ServiceApiSegments.MerchantSegment.GetAllMerchantsAction),
//				   queryParams: new Dictionary<string, string>()
//					 {
//						{ServiceApiSegments.MerchantSegment.ParamClientAppVersion, clientVersion}},
//					 httpHeaders: GetPostAuthHeaders());
//			}
//			catch (Exception ex)
//			{
//				logger.LogException(ex, "GetMerchantInformation failed");
//				throw;
//			}
//		}

//		#endregion

//		#region CheckIns

//		/// <summary>
//		/// Checks the user in.
//		/// </summary>
//		/// <param name="checkIn">The check in.</param>
//		/// <returns></returns>
//		public async Task CheckIn(IUserCheckIn checkIn)
//		{
//			Utilities.ParamRequireNotNull(checkIn, nameof(checkIn));

//			try
//			{
//				await HttpClient.SendData<IUserCheckIn>(checkIn,
//					IHttpClient.HttpMethod.Post,
//					new Uri(BaseApiBaseUrl + ServiceApiSegments.CheckInSegment.Name + ServiceApiSegments.CheckInSegment.CheckIn),
//					httpHeaders: GetPostAuthHeaders());
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, Resources.ServiceProxyCheckInError);
//			}
//		}

//		/// <summary>
//		/// Gets the location.
//		/// </summary>
//		/// <param name="longitude">The longitude.</param>
//		/// <param name="latitude">The latitude.</param>
//		/// <returns></returns>
//		public async Task<IWelcomePack> GetWelcomePack(double longitude, double latitude)
//		{
//			IWelcomePack welcomePack = null;
//			try
//			{
//				welcomePack = await HttpClient.GetData<IWelcomePack>(new Uri(BaseApiBaseUrl + ServiceApiSegments.TourSegment.Name + ServiceApiSegments.TourSegment.WelcomePack),
//				  httpHeaders: GetBaseHttpHeaders(), queryParams: new Dictionary<string, string>()
//				  {
//					  { ServiceApiSegments.TourSegment.ParamLatitude, latitude.ToString() },
//					  { ServiceApiSegments.TourSegment.ParamLongitude, longitude.ToString() }
//				  });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, Resources.ServiceProxyGetLocationError);
//			}

//			return welcomePack;

//		}

//		/// <summary>
//		/// Gets the tour owners information.
//		/// </summary>
//		/// <param name="ownerIds">The owner ids.</param>
//		/// <returns></returns>
//		public async Task<IEnumerable<IOwner>> GetTourOwnersInfo(IEnumerable<string> ownerIds)
//		{
//			Utilities.ParamRequireNotNull(ownerIds, nameof(ownerIds));
//			var finalOwners = ownerIds.Distinct();
//			List<IOwner> owners = null;
			
//			foreach (var id in finalOwners)
//			{
//				try
//				{
//					var item = await HttpClient.GetData<IOwner>(new Uri($"{BaseApiBaseUrl}{ServiceApiSegments.OwnerSegment.Name}/{Uri.EscapeDataString(id)}"),
//					  httpHeaders: GetBaseHttpHeaders());

//					if (item != null)
//					{
//						if(owners == null)
//						{
//							owners = new List<IOwner>();
//						}
//						owners.Add(item);
//					}
//				}
//				catch (Exception ex)
//				{
//					logger.LogExceptionAndThrow(ex, Resources.ServiceProxyGetLocationError);
//				}
//			}

//			return owners;
//		}

//		#endregion

//		#region Tour Ratings

//		/// <summary>
//		/// Get Tour Rating by Tour Id
//		/// </summary>
//		/// <param name="tourId"></param>
//		/// <returns></returns>
//		public async Task<IEnumerable<ITourRating>> GetTourRatingsByTourId(string tourId)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(tourId, nameof(tourId));
//			IEnumerable<ITourRating> tourRating = null;
//			try
//			{
//				tourRating = await HttpClient.GetData<IEnumerable<ITourRating>>(new Uri(BaseApiBaseUrl + ServiceApiSegments.TourRatingSegment.Name + "/" + ServiceApiSegments.TourRatingSegment.TourAction),
//				  httpHeaders: GetBaseHttpHeaders(), queryParams: new Dictionary<string, string>() { { ServiceApiSegments.TourRatingSegment.TourId, tourId } });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetTourRatingsBtItemId failed");
//			}

//			return tourRating;
//		}

//		/// <summary>
//		/// Add Tour Rating into database
//		/// </summary>
//		/// <param name="tourRating"></param>
//		/// <returns></returns>
//		public async Task PostTourRating(ITourRating tourRating)
//		{
//			Utilities.ParamRequireNotNull(tourRating, nameof(tourRating));
//			try
//			{
//				await HttpClient.SendData<ITourRating>(tourRating,
//					 IHttpClient.HttpMethod.Post,
//					 new Uri(BaseApiBaseUrl + SharedStrings.ServiceApiSegments.TourRatingSegment.Name),
//					 httpHeaders: GetPostAuthHeaders());
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "PostTourRating failed");
//			}
//		}

//		/// <summary>
//		/// Update Tour Rating into database
//		/// </summary>
//		/// <param name="tourRating"></param>
//		/// <returns></returns>
//		public async Task PutTourRating(ITourRating tourRating)
//		{
//			Utilities.ParamRequireNotNull(tourRating, nameof(tourRating));

//			try
//			{
//				await HttpClient.SendData<ITourRating>(tourRating, IHttpClient.HttpMethod.Put, new Uri(BaseApiBaseUrl + SharedStrings.ServiceApiSegments.TourRatingSegment.Name), httpHeaders: GetPostAuthHeaders());
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "PutTourRating failed");
//			}
//		}

//		/// <summary>
//		/// Delete Tour Rating by Id 
//		/// </summary>
//		/// <param name="tourId"></param>
//		/// <returns></returns>
//		public async Task DeleteTourRating(string tourId)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(tourId, nameof(tourId));

//			try
//			{
//				await HttpClient.SendData<ITourRating>(tourId,
//					IHttpClient.HttpMethod.Delete,
//					new Uri(BaseApiBaseUrl + SharedStrings.ServiceApiSegments.TourRatingSegment.Name),
//					queryParams: new Dictionary<string, string>() { { SharedStrings.ServiceApiSegments.TourRatingSegment.TourId, tourId } },
//					httpHeaders: GetPostAuthHeaders());
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "DeleteTourRating failed");
//			}
//		}
//		#endregion

//		#region Categories
//		/// <summary>
//		/// Get all categories
//		/// </summary>
//		/// <returns></returns>
//		public async Task<IEnumerable<ICategory>> GetCategories()
//		{
//			IEnumerable<ICategory> categories = null;
//			try
//			{
//				categories = await HttpClient.GetData<IEnumerable<ICategory>>(new Uri(BaseApiBaseUrl + ServiceApiSegments.CategorySegment.Name + ServiceApiSegments.CategorySegment.GetCategories),
//					httpHeaders: GetBaseHttpHeaders()
//				  );
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetCategories failed");
//			}

//			return categories;
//		}

//		/// <summary>
//		/// Get Category by Id 
//		/// </summary>
//		/// <param name="id"></param>
//		/// <returns></returns>
//		public async Task<ICategory> GetCategory(string id)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(id));
//			ICategory category = null;
//			try
//			{
//				category = await HttpClient.GetData<ICategory>(new Uri(BaseApiBaseUrl + ServiceApiSegments.CategorySegment.Name),
//				  httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>() { { ServiceApiSegments.CategorySegment.ParamId, id } });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetCategory failed");
//			}

//			return category;
//		}

//		#endregion

//		#region Tour Management
//		/// <summary>
//		/// Get eddystonetrigger by id
//		/// </summary>
//		/// <param name="id"></param>
//		/// <returns></returns>
//		public async Task<IEddyStoneTrigger> GetEddyStoneTrigger(string id)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(id));
//			IEddyStoneTrigger eddyStoneTrigger = null;
//			try
//			{
//				eddyStoneTrigger = await HttpClient.GetData<IEddyStoneTrigger>(new Uri(BaseApiBaseUrl + ServiceApiSegments.EventTriggerSegment.Name + ServiceApiSegments.EventTriggerSegment.EddyStoneTrigger),
//				  httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>() { { ServiceApiSegments.EventTriggerSegment.ParamId, id } });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetEddyStoneTrigger failed");
//			}
//			return eddyStoneTrigger;
//		}

//		public async Task<IEddyStoneTrigger> GetTourEddyStoneTrigger(string id, string tourId)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(id));
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(tourId));
//			IEddyStoneTrigger eddyStoneTrigger = null;
//			try
//			{
//				eddyStoneTrigger = await HttpClient.GetData<IEddyStoneTrigger>(new Uri(BaseApiBaseUrl + ServiceApiSegments.EventTriggerSegment.Name + ServiceApiSegments.EventTriggerSegment.EddyStoneTrigger),
//				  httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>() {
//					  { ServiceApiSegments.EventTriggerSegment.ParamId, id },
//					  { ServiceApiSegments.EventTriggerSegment.ParamTourId, tourId }

//				  });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetEddyStoneTrigger failed");
//			}
//			return eddyStoneTrigger;
//		}

//		public async Task<IEddyStoneTrigger> GetTourActivityEddyStoneTrigger(string id, string activityId)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(id));
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(activityId));
//			IEddyStoneTrigger eddyStoneTrigger = null;
//			try
//			{
//				eddyStoneTrigger = await HttpClient.GetData<IEddyStoneTrigger>(new Uri(BaseApiBaseUrl + ServiceApiSegments.EventTriggerSegment.Name + ServiceApiSegments.EventTriggerSegment.EddyStoneTrigger),
//				  httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>() {
//					  { ServiceApiSegments.EventTriggerSegment.ParamId, id },
//					  { ServiceApiSegments.EventTriggerSegment.ParamActivityId, activityId }
//				  });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetEddyStoneTrigger failed");
//			}
//			return eddyStoneTrigger;
//		}


//		/// <summary>
//		/// Get tour's eddystonetriggers by tourid
//		/// </summary>
//		/// <param name="tourId"></param>
//		/// <returns></returns>
//		public async Task<IEnumerable<IEddyStoneTrigger>> GetTourEddyStoneTrigger(string tourId)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(tourId, nameof(tourId));
//			IEnumerable<IEddyStoneTrigger> eddyStoneTrigger = null;
//			try
//			{
//				eddyStoneTrigger = await HttpClient.GetData<IEnumerable<IEddyStoneTrigger>>(new Uri(BaseApiBaseUrl + ServiceApiSegments.EventTriggerSegment.Name + ServiceApiSegments.EventTriggerSegment.TourEddyStoneTrigger),
//				  httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>() { { ServiceApiSegments.EventTriggerSegment.ParamTourId, tourId } });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetTourEddyStoneTrigger failed");
//			}
//			return eddyStoneTrigger;
//		}

//		/// <summary>
//		/// Get tour's eddystonetriggers by activityId
//		/// </summary>
//		/// <param name="activityId"></param>
//		/// <returns></returns>
//		public async Task<IEnumerable<IEddyStoneTrigger>> GetActivityEddyStoneTrigger(string activityId)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(activityId, nameof(activityId));
//			IEnumerable<IEddyStoneTrigger> eddyStoneTrigger = null;
//			try
//			{
//				eddyStoneTrigger = await HttpClient.GetData<IEnumerable<IEddyStoneTrigger>>(new Uri(BaseApiBaseUrl + ServiceApiSegments.EventTriggerSegment.Name + ServiceApiSegments.EventTriggerSegment.ActivityEddyStoneTrigger),
//				  httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>() { { ServiceApiSegments.EventTriggerSegment.ParamActivityId, activityId } });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetActivityEddyStoneTrigger failed");
//			}
//			return eddyStoneTrigger;
//		}

//		/// <summary>
//		/// Get SmartGeoCoordinate by id
//		/// </summary>
//		/// <param name="id"></param>
//		/// <returns></returns>
//		public async Task<ISmartGeoCoordinate> GetSmartGeoCoordinate(string id)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(id));
//			ISmartGeoCoordinate smartGeoCoordinate = null;
//			try
//			{
//				smartGeoCoordinate = await HttpClient.GetData<ISmartGeoCoordinate>(new Uri(BaseApiBaseUrl + ServiceApiSegments.EventTriggerSegment.Name + ServiceApiSegments.EventTriggerSegment.SmartGeoCoordinate),
//				  httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>() { { ServiceApiSegments.EventTriggerSegment.ParamId, id } });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetSmartGeoCoordinate failed");
//			}
//			return smartGeoCoordinate;
//		}

//		/// <summary>
//		/// 
//		/// </summary>
//		/// <param name="id"></param>
//		/// <returns></returns>
//		public async Task<ISmartGeoCoordinate> GetTourSmartGeoCoordinate(string id, string tourId)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(id));
//			ISmartGeoCoordinate smartGeoCoordinate = null;
//			try
//			{
//				smartGeoCoordinate = await HttpClient.GetData<ISmartGeoCoordinate>(new Uri(BaseApiBaseUrl + ServiceApiSegments.EventTriggerSegment.Name + ServiceApiSegments.EventTriggerSegment.SmartGeoCoordinate),
//				  httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>() {
//					  { ServiceApiSegments.EventTriggerSegment.ParamId, id },
//					  { ServiceApiSegments.EventTriggerSegment.ParamTourId, tourId }
//				  });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetSmartGeoCoordinate failed");
//			}
//			return smartGeoCoordinate;
//		}

//		/// <summary>
//		/// 
//		/// </summary>
//		/// <param name="id"></param>
//		/// <returns></returns>
//		public async Task<ISmartGeoCoordinate> GetTourActivitySmartGeoCoordinate(string id, string tourId, string activityId)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(id));
//			ISmartGeoCoordinate smartGeoCoordinate = null;
//			try
//			{
//				smartGeoCoordinate = await HttpClient.GetData<ISmartGeoCoordinate>(new Uri(BaseApiBaseUrl + ServiceApiSegments.EventTriggerSegment.Name + ServiceApiSegments.EventTriggerSegment.TourActivitySmartGeocoordinate),
//				  httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>() {
//					  { ServiceApiSegments.EventTriggerSegment.ParamId, id },
//					  { ServiceApiSegments.EventTriggerSegment.ParamActivityId, activityId },
//					  { ServiceApiSegments.EventTriggerSegment.ParamTourId, tourId }
//				  });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetSmartGeoCoordinate failed");
//			}
//			return smartGeoCoordinate;
//		}

//		/// <summary>
//		/// Get tour's SmartGeoCoordinates by tourid
//		/// </summary>
//		/// <param name="tourId"></param>
//		/// <returns></returns>
//		public async Task<IEnumerable<ISmartGeoCoordinate>> GetTourSmartGeoCoordinate(string tourId)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(tourId, nameof(tourId));
//			IEnumerable<ISmartGeoCoordinate> smartGeoCoordinate = null;
//			try
//			{
//				smartGeoCoordinate = await HttpClient.GetData<IEnumerable<ISmartGeoCoordinate>>(new Uri(BaseApiBaseUrl + ServiceApiSegments.EventTriggerSegment.Name + ServiceApiSegments.EventTriggerSegment.TourSmartGeoCoordinate),
//				  httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>() { { ServiceApiSegments.EventTriggerSegment.ParamTourId, tourId } });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetTourSmartGeoCoordinate failed");
//			}
//			return smartGeoCoordinate;
//		}

//		/// <summary>
//		/// Get tour's SmartGeoCoordinates by activityId
//		/// </summary>
//		/// <param name="activityId"></param>
//		/// <returns></returns>
//		public async Task<ISmartGeoCoordinate> GetActivitySmartGeoCoordinate(string activityId)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(activityId, nameof(activityId));
//			ISmartGeoCoordinate smartGeoCoordinate = null;
//			try
//			{
//				smartGeoCoordinate = await HttpClient.GetData<ISmartGeoCoordinate>(new Uri(BaseApiBaseUrl + ServiceApiSegments.EventTriggerSegment.Name + ServiceApiSegments.EventTriggerSegment.ActivitySmartGeoCoordinate),
//				  httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>() { { ServiceApiSegments.EventTriggerSegment.ParamActivityId, activityId
//	}
//});
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetActivitySmartGeoCoordinate failed");
//			}
//			return smartGeoCoordinate;
//		}

//		/// <summary>
//		/// Get IBeaconTrigger by id
//		/// </summary>
//		/// <param name="id"></param>
//		/// <returns></returns>
//		public async Task<IBeaconTrigger> GetIBeaconTrigger(string id)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(id));
//			IBeaconTrigger iBeaconTrigger = null;
//			try
//			{
//				iBeaconTrigger = await HttpClient.GetData<IBeaconTrigger>(new Uri(BaseApiBaseUrl + ServiceApiSegments.EventTriggerSegment.Name + ServiceApiSegments.EventTriggerSegment.IBeaconTrigger),
//				  httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>() { { ServiceApiSegments.EventTriggerSegment.ParamId, id } });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetIBeaconTrigger failed");
//			}
//			return iBeaconTrigger;
//		}
//		/// <summary>
//		/// 
//		/// </summary>
//		/// <param name="id"></param>
//		/// <returns></returns>
//		public async Task<IBeaconTrigger> GetTourActivityIBeaconTrigger(string id, string tourId, string activityId)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(id));
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(activityId));
//			IBeaconTrigger iBeaconTrigger = null;
//			try
//			{
//				iBeaconTrigger = await HttpClient.GetData<IBeaconTrigger>(new Uri(BaseApiBaseUrl + ServiceApiSegments.EventTriggerSegment.Name + ServiceApiSegments.EventTriggerSegment.TourActivityIbeaconTrigger),
//				  httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>() {
//					  { ServiceApiSegments.EventTriggerSegment.ParamId, id },
//					  { ServiceApiSegments.EventTriggerSegment.ParamActivityId, activityId },
//					   { ServiceApiSegments.EventTriggerSegment.ParamTourId, tourId }
//				  });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetIBeaconTrigger failed");
//			}
//			return iBeaconTrigger;
//		}
//		/// <summary>
//		/// 
//		/// </summary>
//		/// <param name="id"></param>
//		/// <returns></returns>
//		public async Task<IBeaconTrigger> GetTourIBeaconTrigger(string id, string tourId)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(id));
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(tourId));
//			IBeaconTrigger iBeaconTrigger = null;
//			try
//			{
//				iBeaconTrigger = await HttpClient.GetData<IBeaconTrigger>(new Uri(BaseApiBaseUrl + ServiceApiSegments.EventTriggerSegment.Name + ServiceApiSegments.EventTriggerSegment.IBeaconTrigger),
//				  httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>() {
//					  { ServiceApiSegments.EventTriggerSegment.ParamId, id },
//					  { ServiceApiSegments.EventTriggerSegment.ParamTourId, tourId }
//				  });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetIBeaconTrigger failed");
//			}
//			return iBeaconTrigger;
//		}

//		/// <summary>
//		/// Get tour's IBeaconTrigger by tourid
//		/// </summary>
//		/// <param name="tourId"></param>
//		/// <returns></returns>
//		public async Task<IEnumerable<IBeaconTrigger>> GetTourIBeaconTrigger(string tourId)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(tourId, nameof(tourId));
//			IEnumerable<IBeaconTrigger> iBeaconTrigger = null;
//			try
//			{
//				iBeaconTrigger = await HttpClient.GetData<IEnumerable<IBeaconTrigger>>(new Uri(BaseApiBaseUrl + ServiceApiSegments.EventTriggerSegment.Name + ServiceApiSegments.EventTriggerSegment.TourIBeaconTrigger),
//				  httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>() { { ServiceApiSegments.EventTriggerSegment.ParamTourId, tourId } });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetTourIBeaconTrigger failed");
//			}
//			return iBeaconTrigger;
//		}

//		/// <summary>
//		/// Get tour's AudioVideoActivity by id and local
//		/// </summary>
//		/// <param name="id"></param>
//		/// <returns></returns>
//		public async Task<IAudioVideoActivity> GetTourAVActivity(string id)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(id));
//			IAudioVideoActivity audioVideoActivity = null;
//			try
//			{
//				audioVideoActivity = await HttpClient.GetData<IAudioVideoActivity>(new Uri(BaseApiBaseUrl + ServiceApiSegments.ActivitySegment.Name + ServiceApiSegments.ActivitySegment.TourAVActivity),
//				  httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>() { { ServiceApiSegments.ActivitySegment.ParamId, id } });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetAudioVideoActivity failed");
//			}

//			return audioVideoActivity;
//		}

//		/// <summary>
//		/// Get tour's AugmentedRealityActivity by id and local
//		/// </summary>
//		/// <param name="id"></param>
//		/// <returns></returns>
//		public async Task<IAugmentedRealityActivity> GetTourARActivity(string id)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(id));
//			IAugmentedRealityActivity augmentedRealityActivity = null;
//			try
//			{
//				augmentedRealityActivity = await HttpClient.GetData<IAugmentedRealityActivity>(new Uri(BaseApiBaseUrl + ServiceApiSegments.ActivitySegment.Name + ServiceApiSegments.ActivitySegment.TourARActivity),
//				  httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>() { { ServiceApiSegments.ActivitySegment.ParamId, id } });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetAugmentedRealityActivity failed");
//			}
//			return augmentedRealityActivity;
//		}

//		/// <summary>
//		/// Get tour's ImageOverlayActivity by id and local
//		/// </summary>
//		/// <param name="id"></param>
//		/// <returns></returns>
//		public async Task<IImageOverlayActivity> GetTourIOActivity(string id)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(id));
//			IImageOverlayActivity imageOverlayActivity = null;
//			try
//			{
//				imageOverlayActivity = await HttpClient.GetData<IImageOverlayActivity>(new Uri(BaseApiBaseUrl + ServiceApiSegments.ActivitySegment.Name + ServiceApiSegments.ActivitySegment.TourIOActivity),
//				  httpHeaders: GetPostAuthHeaders(), queryParams: new Dictionary<string, string>() { { ServiceApiSegments.ActivitySegment.ParamId, id } });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, "GetImageOverlayActivity failed");
//			}
//			return imageOverlayActivity;
//		}

//		#endregion

//		/// <summary>
//		/// Gets the media.
//		/// </summary>
//		/// <param name="id">The identifier.</param>
//		/// <returns></returns>
//		public async Task<IMediaItem> GetMedia(string id)
//		{
//			Utilities.ParamRequireNotNull(id, nameof(id));

//			IMediaItem media = null;
//			try
//			{
//				media = await HttpClient.GetData<IMediaItem>(new Uri($"{BaseApiBaseUrl}{ServiceApiSegments.MediaSegment.Name}/{Uri.EscapeDataString(id)}"), httpHeaders: GetPostAuthHeaders());
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, Resources.ServiceProxyGetTours);
//			}

//			return media;
//		}

//		/// <summary>
//		/// Gets the resource entry.
//		/// </summary>
//		/// <param name="id">The identifier.</param>
//		/// <returns></returns>
//		public async Task<IResourceEntry> GetResourceEntry(string id)
//		{
//			IResourceEntry resourceEntries = null;

//			try
//			{
//				resourceEntries = await HttpClient.GetData<IResourceEntry>(new Uri($"{BaseApiBaseUrl}{ServiceApiSegments.ResourceSegment.Name}/{id}"), httpHeaders: GetPostAuthHeaders(), timeoutInMillSeconds: 10000);
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, Resources.ServiceProxyGetTours);
//			}

//			return resourceEntries;
//		}


//		#region Tickets

//		/// <summary>
//		/// Validates the ticket.
//		/// </summary>
//		/// <param name="ticket">The ticket.</param>
//		/// <param name="tourId"></param>
//		/// <returns></returns>
//		public async Task<bool> ValidateTicket(ITicket ticket, string tourId)
//		{
//			Utilities.ParamRequireNotNull(ticket, nameof(ticket));

//			try
//			{
//				var tt = await HttpClient.SendData<object>(ticket, IHttpClient.HttpMethod.Post,
//					new Uri(BaseApiBaseUrl + ServiceApiSegments.TicketSegment.Name + "/" + ServiceApiSegments.TicketSegment.ValidateTicketAction),
//					   queryParams: new Dictionary<string, string>() { { ServiceApiSegments.TicketSegment.ParamTourId, tourId } },
//					httpHeaders: GetPostAuthHeaders());
//				return bool.Parse(tt.ToString());
//			}
//			catch (Exception ex)
//			{
//				logger.LogException(ex, "Ticket validation failed");
//				throw;
//			}
//		}

//		/// <summary>
//		/// Gets the tour tickets.
//		/// </summary>
//		/// <param name="tourId">The tour identifier.</param>
//		/// <returns></returns>
//		public async Task<IEnumerable<ITicket>> GetTourTickets(string tourId)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(tourId, nameof(tourId));

//			IEnumerable<ITicket> tickets = null;
//			try
//			{
//				tickets = await HttpClient.GetData<IEnumerable<ITicket>>(new Uri(BaseApiBaseUrl + ServiceApiSegments.TicketSegment.Name),
//				  httpHeaders: GetBaseHttpHeaders(), queryParams: new Dictionary<string, string>() { { ServiceApiSegments.TicketSegment.ParamTourId, tourId } });
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, $"Error while getting tickets for tour with id {tourId}");
//			}

//			return tickets;
//		}
//		#endregion

//		#region Tour Collections

//		/// <summary>
//		/// Gets the tour collection by identifier.
//		/// </summary>
//		/// <param name="id"></param>
//		/// <param name="includeTestData"></param>
//		/// <returns></returns>
//		public async Task<ITourCollection> GetTourCollectionById(string id, bool includeTestData = false)
//		{
//			Utilities.ParamRequireStringNotNullOrEmpty(id, nameof(id));

//			ITourCollection tourCollection = null;

//			try
//			{
//				tourCollection = await HttpClient.GetData<ITourCollection>(new Uri($"{BaseApiBaseUrl}{ServiceApiSegments.TourCollectionSegment.Name}/{id}"),
//				  httpHeaders: GetBaseHttpHeaders(includeTestData));
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, $"Error while getting tour collection with id {id}");
//			}

//			return tourCollection;
//		}

//		/// <summary>
//		/// Gets the tour collections.
//		/// </summary>
//		/// <returns></returns>
//		public async Task<IEnumerable<ITourCollection>> GetTourCollections(bool includeTestData = false)
//		{
//			// Utilities.ParamRequireNotNull(forLocation, nameof(forLocation));

//			IEnumerable<ITourCollection> tourCollections = null;

//			try
//			{
//				tourCollections = await HttpClient.GetData<IEnumerable<ITourCollection>>(new Uri(BaseApiBaseUrl + ServiceApiSegments.TourCollectionSegment.Name),
//				  httpHeaders: GetBaseHttpHeaders(includeTestData));
//			}
//			catch (Exception ex)
//			{
//				logger.LogExceptionAndThrow(ex, $"Error while getting tour collections");
//			}

//			return tourCollections;
//		}


//		#endregion

		#region Protected

		protected Dictionary<string, string> GetPostAuthHeaders()
		{
			var jwt = GetJwtHeader();
			return new Dictionary<string, string>()
			{
				{ jwt.Key, jwt.Value},
			};
		}

		/// <summary>
		/// Gets the common HTTP headers.
		/// </summary>
		/// <returns></returns>
		protected KeyValuePair<string, string> GetJwtHeader()
		{
			return new KeyValuePair<string, string>(ClientStrings.HttpStrings.Authorization,
				UserSettings.Token.GetAuthorizationHeader());
		}

		#endregion
	}
}

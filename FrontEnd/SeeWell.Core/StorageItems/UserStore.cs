
using Newtonsoft.Json;
using SQLite;

namespace SeeWell.Core.ViewModels
{
	/// <summary>
	/// This is a storage entity.
	/// In this case the entities are serialized vs saved as POCOs.
	/// Other entities will be saved to storage using the same model.
	/// </summary>
	[Table(nameof(UserStore))]
	internal class UserStore
	{
		private string userStoreSerialized;
		private UserViewModel userViewModel;

		public UserStore(UserViewModel user)
		{
			this.UserViewModel = user;
			Id = user.Id;
		}

		public UserStore()
		{
		}

		[PrimaryKey]
		public string Id { get; set; }

		public string UserStoreString
		{
			get => userStoreSerialized = Utilities.SerializeToJson(UserViewModel, new JsonSerializerSettings { ObjectCreationHandling = ObjectCreationHandling.Auto });
			set => userStoreSerialized = value;
		}

		[Ignore, JsonIgnore]
		public UserViewModel UserViewModel
		{
			get => userViewModel ?? (userViewModel = Utilities.DeserializeFromJson<UserViewModel>(userStoreSerialized, new JsonSerializerSettings { ObjectCreationHandling = ObjectCreationHandling.Auto }));
			private set => userViewModel = value;
		}
	}
}

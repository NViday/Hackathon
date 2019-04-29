
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SeeWell.Core.ViewModels;

namespace SeeWell.Core
{
	/// <summary>
	/// This class is used to manage users (CRUD operations)
	/// </summary>
	public class SeeWellHelper
	{
		private static readonly object LockObject = new object();
		private static SeeWellHelper SeeWellInstance;
		private static SettingsBroker transientSettingsBroker =  SettingsBroker.GetInstance(Environment.GetFolderPath(Environment.SpecialFolder.Personal), SeeWellTypeHelper.GetAppStorageType());

		/// <summary>
		/// Gets the instance.
		/// </summary>
		/// <param name="transientSettings">The transient settings.</param>
		/// <returns></returns>
		public static SeeWellHelper GetInstance()
		{
			if (SeeWellInstance == null)
			{
				lock (LockObject)
				{
					if (SeeWellInstance == null)
					{
						SeeWellInstance = new SeeWellHelper();
					}
				}
			}

			return SeeWellInstance;
		}
		
		/// <summary>
		/// Gets all users
		/// </summary>
		/// <returns></returns>
		public IEnumerable<UserViewModel> GetAllUsers()
		{
			return transientSettingsBroker.GetAll<UserStore>()?.Select(g => g.UserViewModel);
		}
		
		/// <summary>
		/// Adds a new user 
		/// </summary>
		/// <param name="user"></param>
		/// <returns></returns>
		public async Task AddUser(UserViewModel user)
		{
			await Task.Run(() =>
			{
				user.DateAdded = DateTimeOffset.UtcNow;
				user.Id = Guid.NewGuid().ToString();
				transientSettingsBroker.AddOrUpdate(new UserStore(user));
			});
		}
	}
}


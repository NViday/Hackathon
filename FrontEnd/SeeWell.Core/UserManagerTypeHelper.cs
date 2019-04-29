
using System;
using System.Collections.Generic;
using SeeWell.Core.ViewModels;

namespace SeeWell.Core
{
    public static class SeeWellTypeHelper
	{
		public static IEnumerable<Type> GetAppStorageType()
		{
			return new List<Type>()
			{
				typeof(UserStore)
				// Here we would add other types that will be added to storage
				// This also means we can version storage types accordingly and plan for migration and data upgrades. 
			};
		}
	}
}

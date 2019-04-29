using System;
using System.Collections.Generic;
using System.Text;

namespace SeeWell.Core
{
	public class ObjectFactory
	{
		private static object lockObject = new Object();
		private static ObjectFactory instance; 


		private ObjectFactory()
		{
			this.ApplicationSettings = new ApplicationSettings(new StorageSettingsBroker(ClientStrings.ApplicationName));
		}

	
		public static ObjectFactory GetInstance()
		{
			if(instance == null)
			{
				lock(lockObject)
				{
					if(instance == null)
					{
						instance = new ObjectFactory(); 
					}
				}
			}

			return instance;
		}

		public ApplicationSettings ApplicationSettings { get; private set; }

	}
}

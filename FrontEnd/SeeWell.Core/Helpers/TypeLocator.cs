
using System;
using System.Collections.Generic;
using Catel.IoC;

namespace SeeWell.Core.Helpers
{
	public class TypeLocator 
	{
		private static readonly IServiceLocator serviceLocator = ServiceLocator.Default;
		private static TypeLocator instance;
		private static readonly object lockObject = new object();

		private TypeLocator()
		{

		}

		public static TypeLocator GetInstance()
		{
			if (instance == null)
			{
				lock (lockObject)
				{
					if (instance == null)
					{
						instance = new TypeLocator();
					}
				}
			}

			return instance;
		}

		public bool IsTypeRegistered(Type serviceType, object tag = null)
		{
			return serviceLocator.IsTypeRegistered(serviceType, tag);
		}

		public bool IsTypeRegisteredAsSingleton(Type serviceType, object tag = null)
		{
			return serviceLocator.IsTypeRegisteredAsSingleton(serviceType, tag);
		}

		public void RegisterInstance(Type serviceType, object instance, object tag = null)
		{
			serviceLocator.RegisterInstance(serviceType, instance, tag);
		}

		public void RegisterType(Type serviceType, Type serviceImplementationType, object tag = null, bool registerIfAlreadyRegistered = true)
		{
			serviceLocator.RegisterType(serviceType, serviceImplementationType, tag, registerIfAlreadyRegistered: registerIfAlreadyRegistered);
		}

		public void RemoveAllTypes(Type serviceType)
		{
			serviceLocator.RemoveAllTypes(serviceType);
		}

		public void RemoveType(Type serviceType, object tag = null)
		{
			serviceLocator.RemoveType(serviceType, tag);
		}

		public object[] ResolveAllTypes(params Type[] types)
		{
			return serviceLocator.ResolveMultipleTypes(types);
		}

		public T ResolveType<T>(object tag = null)
		{
			return (T)serviceLocator.ResolveType(typeof(T), tag);
		}

		public IEnumerable<object> ResolveTypes(Type serviceType)
		{
			return serviceLocator.ResolveTypes(serviceType);
		}
	}
}

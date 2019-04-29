using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace SeeWell.Core
{
	/// <summary>
	/// Json helpers
	/// </summary>
	public static class JsonHelpers
	{
		private static JsonSerializerSettings jss = null;

		/// <summary>
		/// Json serializer settings
		/// </summary>
		/// <returns></returns>
		public static JsonSerializerSettings GetSerializerSettings()
		{
			if (jss == null)
			{
				jss = new JsonSerializerSettings { ObjectCreationHandling = ObjectCreationHandling.Auto };

				// NOTE: Field converters must be added in order. i.e. Derived classes must show up before base classes

				jss.TypeNameHandling = TypeNameHandling.Auto;
			}

			return jss;
		}
	}
	/// <summary>
	/// Json helpers
	/// </summary>
	public class ConcreteTypeConverter<TConcrete> : JsonConverter
	{
		public override bool CanConvert(Type objectType)
		{
			//assume we can convert to anything for now
			return true;
		}

		public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
		{
			//explicitly specify the concrete type we want to create
			return serializer.Deserialize<TConcrete>(reader);
		}

		public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
		{
			//use the default serialization - it works fine
			serializer.Serialize(writer, value);
		}
	}


	public class GenericConverter<T, U> : CustomCreationConverter<T> where U : T, new()
	{
		public override T Create(Type objectType)
		{
			return new U();
		}
	}
}

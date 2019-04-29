
using SQLite;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace SeeWell.Core
{
	/// <summary>
	/// Saves data to persistent storage. Can be used directly or via a separate layer to format data
	/// </summary>
	public class SettingsBroker 
	{
		private static readonly object Locker = new object();
		private static SettingsBroker broker;
		private static SQLiteConnection sqLiteConnection;
		private readonly IEnumerable<Type> knownTypes;

		/// <summary>
		/// Initializes a new instance of the <see cref="SettingsBroker"/> class.
		/// </summary>
		/// </summary>
		/// <param name="dbPath">The database path.</param>
		/// <param name="registerTypes">The register types.</param>
		private SettingsBroker(string dbPath, IEnumerable<Type> registerTypes)
		{
			Utilities.ParamRequireStringNotNullOrEmpty(dbPath, nameof(dbPath));
			Utilities.ParamRequireNotNull(registerTypes, nameof(registerTypes));

			knownTypes = registerTypes;
			sqLiteConnection = new SQLiteConnection(Path.Combine(dbPath, "SpecificFileName.db"), SQLiteOpenFlags.ReadWrite | SQLiteOpenFlags.Create | SQLiteOpenFlags.SharedCache);
			CreateTables();
		}


		/// <summary>
		/// Gets the instance.
		/// </summary>
		/// <param name="dbPath">The database path.</param>
		/// <param name="registerTypes">The register types.</param>
		/// <returns></returns>
		public static SettingsBroker GetInstance(string dbPath, IEnumerable<Type> registerTypes)
		{
			Utilities.ParamRequireStringNotNullOrEmpty(dbPath, nameof(dbPath));
			Utilities.ParamRequireNotNull(registerTypes, nameof(registerTypes));

			if (broker == null)
			{
				lock (Locker)
				{
					if (broker == null)
					{
						broker = new SettingsBroker(dbPath, registerTypes);
					}
				}
			}

			return broker;
		}

		/// <summary>
		/// Add or update value.
		/// </summary>
		/// <param name="key">The key.</param>
		/// <param name="value">The value.</param>
		/// <returns>True if successful, false otherwise</returns>
		public int AddOrUpdate<T>(T value) where T : class, new()
		{
			Utilities.ParamRequireNotNull(value, nameof(value));
			var val = sqLiteConnection.InsertOrReplace(value);
			return val;
		}

		/// <summary>
		/// Gets the value or default.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="key">The key.</param>
		/// <returns>The value or returns a default if it doesn't exist</returns>
		public T GetValue<T>(string key) where T : new()
		{
			Utilities.ParamRequireStringNotNullOrEmpty(key, nameof(key));
			var val = default(T);
			try
			{
				val = sqLiteConnection.Find<T>(key);
			}
			catch (InvalidOperationException)
			{
				// Log
			}

			return val;
		}
		
		/// <summary>
		/// Gets all.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <returns></returns>
		public IEnumerable<T> GetAll<T>() where T : new()
		{

			return (from i in sqLiteConnection.Table<T>() select i).ToList();
		}

		/// <summary>
		/// Deletes the value.
		/// </summary>
		/// <param name="key">The key.</param>
		public int Delete<T>(string key)
		{
			Utilities.ParamRequireStringNotNullOrEmpty(key, nameof(key));
			return sqLiteConnection.Delete<T>(key);
		}

		/// <summary>
		/// Deletes all.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		public int DeleteAll<T>() where T : new()
		{
			return sqLiteConnection.DeleteAll<T>();
		}


		private void CreateTables()
		{
			foreach (var v in knownTypes)
			{
				sqLiteConnection.CreateTable(v);
			}
		}
	}
}

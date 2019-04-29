
using System.Runtime.Serialization;
using ReactiveUI;

namespace SeeWell.Core
{
	/// <summary>
	///  All view models inherit from this so we can provide some consistent behavior. e.g. 
	///  Shared commands like "Back", "Create" etc.
	/// </summary>
	[DataContract]
    public abstract class ViewModelBase : ReactiveObject
    {
       
    }
}


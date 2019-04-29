using SeeWell.ViewModels;
using Syncfusion.XForms.DataForm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace SeeWell.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class LoginPlusPage : ContentPage
	{
		public LoginPlusPage()
		{
			InitializeComponent();
			BindingContext = new LoginPlusViewModel(Navigation, this);
		}
	}
}
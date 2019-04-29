
using System;
using System.Runtime.Serialization;

namespace SeeWell.Core
{
    [DataContract]
    public class AppUser 
    {
        /// <summary>
        /// Gets or sets the userId identifier.
        /// </summary>
        [DataMember]
        public string Id { get; set; }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        [DataMember]
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the email.
        /// </summary>
        [DataMember]
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets the password.
        /// </summary>
        [DataMember]
        public string Password { get; set; }


		public bool  Transexual { get; set; }


		public bool Doctor { get; set; }


		public DateTimeOffset Birthday { get; set; }
		
		public bool PersonOfColor { get; set; }

		[DataMember]
		public Uri Avatar { get; set; }

		/// <summary>
		/// Gets or sets the type of the user.
		/// </summary>
		[DataMember]
        public UserType UserType { get; set; }
        
        /// <summary>
        /// Gets or sets the address.
        /// </summary>
        [DataMember]
        public SmartAddress Address { get; set; }

        [DataMember]
        public bool IsDelete { get; set; }
    }
}

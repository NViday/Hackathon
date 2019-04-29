
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace SeeWell.Core
{
    [DataContract]
    public class SmartAddress
	{
        [DataMember]
        public string AddressLineOne { get; set; }

        [DataMember]
        public string AddressLineTwo { get; set; }

        [DataMember]
        public string City { get; set; }

        [DataMember]
        public string State { get; set; }

        [DataMember]
        public string PostalCode { get; set; }

        [DataMember]
        public string Country { get; set; }

        [DataMember]
        public string Region { get; set; }
    }
}

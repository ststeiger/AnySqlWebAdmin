
using System.Xml.Serialization;


namespace AnySqlDataFeed.XML
{


    [XmlRoot(ElementName = "collection", Namespace = "http://www.w3.org/2007/app")]
    public class Collection
    {
        [XmlElement(ElementName = "title", Namespace = "http://www.w3.org/2005/Atom")]
        public string Title { get; set; }

        [XmlAttribute(AttributeName = "href")]
        public string Href { get; set; }
    }


    [XmlRoot(ElementName = "workspace", Namespace = "http://www.w3.org/2007/app")]
    public class Workspace
    {
        [XmlElement(ElementName = "title", Namespace = "http://www.w3.org/2005/Atom")]
        public string Title { get; set; }

        [XmlElement(ElementName = "collection", Namespace = "http://www.w3.org/2007/app")]
        public System.Collections.Generic.List<Collection> Collection { get; set; }
    }


    [XmlRoot(ElementName = "service", Namespace = "http://www.w3.org/2007/app")]
    public class Service
    {
        [XmlElement(ElementName = "workspace", Namespace = "http://www.w3.org/2007/app")]
        public Workspace Workspace { get; set; }

        [XmlAttribute(AttributeName = "atom", Namespace = "http://www.w3.org/2000/xmlns/")]
        public string Atom { get; set; }

        [XmlAttribute(AttributeName = "base", Namespace = "http://www.w3.org/XML/1998/namespace")]
        public string Base { get; set; }

        [XmlAttribute(AttributeName = "xmlns")]
        public string Xmlns { get; set; }
    }


}

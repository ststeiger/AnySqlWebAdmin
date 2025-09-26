
using System.Xml.Serialization;


namespace Foobar.AnySqlDataFeed.XML
{


    // http://xmltocsharp.azurewebsites.net/
    public class TableList
    {

        const string AppNamespace = "http://www.w3.org/2007/app";
        const string AtomNamespace = "http://www.w3.org/2005/Atom";

        const string AtomXmlns = "http://www.w3.org/2000/xmlns/";
        const string BaseXmlns = "http://www.w3.org/XML/1998/namespace";


        [XmlInclude(typeof(TableList))]
        [XmlRoot(ElementName = "collection", Namespace = AppNamespace)]
        public class Collection
        {
            [XmlElement(ElementName = "title", Namespace = AtomNamespace)]
            public string Title { get; set; }

            [XmlAttribute(AttributeName = "href")]
            public string Href { get; set; }
        }

        [XmlInclude(typeof(TableList))]
        [XmlRoot(ElementName = "workspace", Namespace = AppNamespace)]
        public class Workspace
        {
            [XmlElement(ElementName = "title", Namespace = AtomNamespace)]
            public string Title { get; set; }

            [XmlElement(ElementName = "collection", Namespace = AppNamespace)]
            public System.Collections.Generic.List<Collection> Collection { get; set; }
        }

        [XmlInclude(typeof(TableList))]
        [XmlRoot(ElementName = "service", Namespace = AppNamespace)]
        public class Service
        {
            [XmlAttribute(AttributeName = "xmlns")]
            public string Xmlns { get; set; }

            [XmlAttribute(AttributeName = "atom", Namespace = AtomXmlns)]
            public string Atom { get; set; }

            [XmlElement(ElementName = "workspace", Namespace = AppNamespace)]
            public Workspace Workspace { get; set; }

            [XmlAttribute(AttributeName = "base", Namespace = BaseXmlns)]
            public string Base { get; set; }
        }


    }


}

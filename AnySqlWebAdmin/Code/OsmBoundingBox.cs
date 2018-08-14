
// Licensed under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0


namespace AnySqlWebAdmin
{


    namespace Xml2CSharp
    {
        [System.Xml.Serialization.XmlRoot(ElementName = "bounds")]
        public class Bounds
        {
            [System.Xml.Serialization.XmlAttribute(AttributeName = "minlat")]
            public decimal Minlat { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "minlon")]
            public decimal Minlon { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "maxlat")]
            public decimal Maxlat { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "maxlon")]
            public decimal Maxlon { get; set; }
        }

        [System.Xml.Serialization.XmlRoot(ElementName = "node")]
        public class Node
        {
            [System.Xml.Serialization.XmlAttribute(AttributeName = "id")]
            public string Id { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "visible")]
            public bool Visible { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "version")]
            public int Version { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "changeset")]
            public long Changeset { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "timestamp")]
            public System.DateTime Timestamp { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "user")]
            public string User { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "uid")]
            public long Uid { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "lat")]
            public decimal Lat { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "lon")]
            public decimal Lon { get; set; }

            [System.Xml.Serialization.XmlElement(ElementName = "tag")]
            public System.Collections.Generic.List<Tag> Tag { get; set; }
        }

        [System.Xml.Serialization.XmlRoot(ElementName = "tag")]
        public class Tag
        {
            [System.Xml.Serialization.XmlAttribute(AttributeName = "k")]
            public string K { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "v")]
            public string V { get; set; }
        }

        [System.Xml.Serialization.XmlRoot(ElementName = "nd")]
        public class Nd
        {
            [System.Xml.Serialization.XmlAttribute(AttributeName = "ref")]
            public long Ref { get; set; }
        }

        [System.Xml.Serialization.XmlRoot(ElementName = "way")]
        public class Way
        {
            [System.Xml.Serialization.XmlElement(ElementName = "nd")]
            public System.Collections.Generic.List<Nd> Nd { get; set; }

            [System.Xml.Serialization.XmlElement(ElementName = "tag")]
            public System.Collections.Generic.List<Tag> Tag { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "id")]
            public long Id { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "visible")]
            public bool Visible { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "version")]
            public int Version { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "changeset")]
            public long Changeset { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "timestamp")]
            public System.DateTime Timestamp { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "user")]
            public string User { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "uid")]
            public long Uid { get; set; }
        }

        [System.Xml.Serialization.XmlRoot(ElementName = "member")]
        public class Member
        {
            [System.Xml.Serialization.XmlAttribute(AttributeName = "type")]
            public string Type { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "ref")]
            public long Ref { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "role")]
            public string Role { get; set; }
        }

        [System.Xml.Serialization.XmlRoot(ElementName = "relation")]
        public class Relation
        {
            [System.Xml.Serialization.XmlElement(ElementName = "member")]
            public System.Collections.Generic.List<Member> Member { get; set; }

            [System.Xml.Serialization.XmlElement(ElementName = "tag")]
            public System.Collections.Generic.List<Tag> Tag { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "id")]
            public long Id { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "visible")]
            public bool Visible { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "version")]
            public int Version { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "changeset")]
            public long Changeset { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "timestamp")]
            public System.DateTime Timestamp { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "user")]
            public string User { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "uid")]
            public long Uid { get; set; }
        }


        [System.Xml.Serialization.XmlRoot(ElementName = "osm")]
        public class Osm
        {
            [System.Xml.Serialization.XmlElement(ElementName = "bounds")]
            public Bounds Bounds { get; set; }

            [System.Xml.Serialization.XmlElement(ElementName = "node")]
            public System.Collections.Generic.List<Node> Node { get; set; }

            [System.Xml.Serialization.XmlElement(ElementName = "way")]
            public System.Collections.Generic.List<Way> Way { get; set; }

            [System.Xml.Serialization.XmlElement(ElementName = "relation")]
            public System.Collections.Generic.List<Relation> Relation { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "version")]
            public string Version { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "generator")]
            public string Generator { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "copyright")]
            public string Copyright { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "attribution")]
            public string Attribution { get; set; }

            [System.Xml.Serialization.XmlAttribute(AttributeName = "license")]
            public string License { get; set; }
        }

    }


}

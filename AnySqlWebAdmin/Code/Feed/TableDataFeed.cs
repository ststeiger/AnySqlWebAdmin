
using AnySqlDataFeed.XML;


namespace AnySqlDataFeed.OData
{


    public class TableDataFeed
    {


        // https://msdn.microsoft.com/en-us/library/cc716729(v=vs.110).aspx
        // https://www.devart.com/dotconnect/oracle/docs/DataTypeMapping.html
        // https://msdn.microsoft.com/en-us/library/ms131092.aspx
        public static void MapDotNetTypes(System.Type t)
        {
            System.Collections.Generic.Dictionary<System.Type, string> dict = new System.Collections.Generic.Dictionary<System.Type, string>();

            dict.Add(typeof(System.Guid), "Edm.Guid");
            dict.Add(typeof(string), "Edm.String");
            dict.Add(typeof(byte), "Edm.Byte"); //dict.Add(typeof(bool), "Edm.Byte"); // TinyInt
            dict.Add(typeof(bool), "Edm.Boolean");
            dict.Add(typeof(int), "Edm.Int32");
            dict.Add(typeof(long), "Edm.Int64");
            dict.Add(typeof(System.DateTime), "Edm.DateTime");
            dict.Add(typeof(float), "Edm.Double"); //  .NET Single - SqlReal
            dict.Add(typeof(double), "Edm.Double"); // .NET Double - SqlFloat
            dict.Add(typeof(byte[]), "Edm.Binary");
            dict.Add(typeof(decimal), "Edm.Decimal"); // <Property Name="AP_Price" Type="Edm.Decimal" Precision="18" Scale="2"/>

        }


        public static void MapSqlServerTypes(System.Type t)
        {
            System.Collections.Generic.Dictionary<System.Data.SqlDbType, string> dict = new System.Collections.Generic.Dictionary<System.Data.SqlDbType, string>();

            // System.Data.SqlDbType dbt = System.Data.SqlDbType.;

            dict.Add(System.Data.SqlDbType.UniqueIdentifier, "Edm.Guid");
            dict.Add(System.Data.SqlDbType.NVarChar, "Edm.String");
            dict.Add(System.Data.SqlDbType.NText, "Edm.String");
            dict.Add(System.Data.SqlDbType.VarChar, "Edm.String");
            dict.Add(System.Data.SqlDbType.Text, "Edm.String");
            
            dict.Add(System.Data.SqlDbType.Bit, "Edm.Boolean");
            dict.Add(System.Data.SqlDbType.TinyInt, "Edm.Byte"); //dict.Add(typeof(bool), "Edm.Byte"); // TinyInt
            dict.Add(System.Data.SqlDbType.Int, "Edm.Int32");
            dict.Add(System.Data.SqlDbType.BigInt, "Edm.Int64");
            
            dict.Add(System.Data.SqlDbType.Float, "Edm.Double");
            dict.Add(System.Data.SqlDbType.Real, "Edm.Double");
            dict.Add(System.Data.SqlDbType.Decimal, "Edm.Decimal"); // <Property Name="AP_Price" Type="Edm.Decimal" Precision="18" Scale="2"/>

            dict.Add(System.Data.SqlDbType.SmallDateTime, "Edm.DateTime");
            dict.Add(System.Data.SqlDbType.DateTime, "Edm.DateTime");
            dict.Add(System.Data.SqlDbType.DateTime2, "Edm.DateTime");

            dict.Add(System.Data.SqlDbType.VarBinary, "Edm.Binary");
            dict.Add(System.Data.SqlDbType.Image, "Edm.Binary");
        }


        public class PrimaryKeyInfo
        {
            public string ColumnName;
            public System.Type DotNetType;
        }


        public static PrimaryKeyInfo[] GetPrimaryKeyInfo(string tableName, System.Data.DataTable dtTableData)
        {
            System.Collections.Generic.List<PrimaryKeyInfo> pkl = 
                new System.Collections.Generic.List<PrimaryKeyInfo>();

            string strSQL = @"
SELECT  
	 --iskcu.constraint_name
	--,iskcu.table_schema
	--,iskcu.table_name	
	 iskcu.column_name
	--,isc.ordinal_position
	--,isc.data_type
	-- ,*
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS AS istc 

LEFT JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS iskcu 
	ON iskcu.TABLE_SCHEMA = istc.TABLE_SCHEMA
	AND iskcu.TABLE_NAME = istc.TABLE_NAME
	AND iskcu.CONSTRAINT_NAME = istc.CONSTRAINT_NAME
	
LEFT JOIN INFORMATION_SCHEMA.COLUMNS AS isc 
	ON isc.TABLE_SCHEMA = iskcu.TABLE_SCHEMA
	AND isc.TABLE_NAME = iskcu.TABLE_NAME
	AND isc.COLUMN_NAME = iskcu.COLUMN_NAME
	
WHERE (1=1) 
AND istc.CONSTRAINT_TYPE = 'PRIMARY KEY' 
AND istc.TABLE_NAME LIKE '" + tableName.Replace("'", "''") + @"' 
AND istc.table_schema NOT IN ('pg_catalog', 'information_schema') 

ORDER BY isc.ORDINAL_POSITION 
";

            using (System.Data.DataTable dtPkInfo = SQL.GetDataTable(strSQL))
            {
                foreach (System.Data.DataRow dr in dtPkInfo.Rows)
                {
                    string columnName = System.Convert.ToString(dr["column_name"]);

                    pkl.Add(
                        new PrimaryKeyInfo() { ColumnName = columnName, DotNetType = dtTableData.Columns[columnName].DataType }
                    );
                } // Next dr 

            } // End Using dt

            return pkl.ToArray();
        }


        // datetime'1900-01-01T00%3A00%3A00'
        public static string CreatePkTemplate(string tableName, PrimaryKeyInfo[] pki)
        {
            if (pki.Length == 0)
            {
                throw new System.NotImplementedException("Case no PK not studied...");
            }


            if (pki.Length == 1)
            {
                if (object.ReferenceEquals(pki[0].DotNetType, typeof(System.Guid)))
                    return tableName + "(guid'{@value0}')"; // guid

                if (object.ReferenceEquals(pki[0].DotNetType, typeof(int)))
                    return tableName + "({@value0})"; // int

                if (object.ReferenceEquals(pki[0].DotNetType, typeof(long)))
                    return tableName + "({@value0})"; // long

                if (object.ReferenceEquals(pki[0].DotNetType, typeof(string)))
                    return tableName + "('{@value0}')"; // string

                if (object.ReferenceEquals(pki[0].DotNetType, typeof(System.DateTime)))
                    return tableName + "(datetime'{@value0}')"; // string

                throw new System.NotImplementedException("CreatePkTemplate for type " + pki[0].DotNetType.Name + " not implemented");
            }


            string str = tableName + "(";
            // <link rel="edit" title="T_SYS_VisualisierungStichtag" href="T_SYS_VisualisierungStichtag(VIS_DWG='%3F',VIS_Stichtag=datetime'1900-01-01T00%3A00%3A00')" />


            for (int i = 0; i < pki.Length; ++i)
            {
                if (object.ReferenceEquals(pki[i].DotNetType, typeof(System.Guid)))
                    str += pki[i].ColumnName + "=" + "guid'{@value" + i.ToString() + "}'"; // guid

                if (object.ReferenceEquals(pki[i].DotNetType, typeof(string)))
                    str += pki[i].ColumnName + "=" + "'{@value" + i.ToString() + "}'"; // string

                if (object.ReferenceEquals(pki[i].DotNetType, typeof(int)))
                    str += pki[i].ColumnName + "=" + "{@value" + i.ToString() + "}"; // int

                if (object.ReferenceEquals(pki[i].DotNetType, typeof(long)))
                    str += pki[i].ColumnName + "=" + "{@value" + i.ToString() + "}"; // long

                if (object.ReferenceEquals(pki[i].DotNetType, typeof(System.DateTime)))
                    str += pki[i].ColumnName + "=" + "datetime'{@value" + i.ToString() + "}'"; // string

                if (i < pki.Length - 1)
                    str += ",";
            }
            str += ")";

            // return tableName + "T_Benutzer({@value})"; // string
            // <link rel="edit" title="T_SYS_VisualisierungStichtag" href="T_SYS_VisualisierungStichtag(VIS_DWG='%3F',VIS_Stichtag=datetime'1900-01-01T00%3A00%3A00')" />
            return str;
        }


        public static System.Data.DataTable GetColumnInfo(string table_name)
        {
            string strSQL = @"
-- DECLARE @__in_table_name nvarchar(128)
-- SET @__in_table_name = N'___AllTypes' 


SELECT 
	--  table_schema
	 --table_name,
	 column_name
	-- ,ordinal_position
	-- ,column_default
	-- ,is_nullable
	,data_type
	
	,CASE WHEN is_nullable = 'YES'
		THEN NULL 
		ELSE 'false' 
	END AS EntityNullable
	
	,CASE 
		WHEN DATA_TYPE IN ('bigint', 'bigserial') THEN 'Edm.Int64'
		WHEN DATA_TYPE = 'binary' THEN 'Edm.Binary'
		WHEN DATA_TYPE IN ('bit', 'boolean') THEN 'Edm.Boolean'
		WHEN data_type IN ('char', 'nchar','varchar', 'nvarchar','text', 'ntext', 'character varying', 'national character varying') THEN 'Edm.String' 
		WHEN DATA_TYPE = 'date' THEN 'Edm.DateTime'
		WHEN DATA_TYPE = 'smalldatetime' THEN 'Edm.DateTime'
		WHEN DATA_TYPE IN ('datetime') THEN 'Edm.DateTime'
		WHEN DATA_TYPE IN ('datetime2', 'timestamp without time zone') THEN 'Edm.DateTime'
		WHEN DATA_TYPE IN ('datetimeoffset', 'timestamp with time zone') THEN 'Edm.DateTimeOffset'
		WHEN DATA_TYPE = 'decimal' THEN 'Edm.Decimal'
		WHEN DATA_TYPE IN ('float', 'double', 'double precision') THEN 'Edm.Double'
		WHEN DATA_TYPE = 'image' THEN 'Edm.Binary'
		WHEN DATA_TYPE IN ('int', 'integer', 'serial') THEN 'Edm.Int32'
		WHEN DATA_TYPE = 'money' THEN 'Edm.Decimal'
		WHEN DATA_TYPE = 'numeric' THEN 'Edm.Decimal'
		WHEN DATA_TYPE = 'real' THEN 'Edm.Single'
		WHEN DATA_TYPE = 'smallint' THEN 'Edm.Int16'
		WHEN DATA_TYPE = 'smallmoney' THEN 'Edm.Decimal'
		WHEN DATA_TYPE IN ('time', 'time with timezone', 'time without timezone') THEN 'Edm.Time'
		WHEN DATA_TYPE = 'timestamp' THEN 'Edm.Binary'
		WHEN DATA_TYPE = 'tinyint' THEN 'Edm.Byte'
		WHEN DATA_TYPE IN ('uniqueidentifier', 'uuid') THEN 'Edm.Guid'
		WHEN DATA_TYPE IN ('varbinary', 'bytea') THEN 'Edm.Binary'
		WHEN DATA_TYPE = 'xml' THEN 'Edm.String'
		
		ELSE 'n.def.'
	END AS EntityType 
	
	,CASE 
		WHEN data_type IN ('image', 'xml') THEN 'Max' 
		WHEN data_type IN ('char', 'nchar','varchar', 'nvarchar','text', 'ntext', 'character varying', 'national character varying')
			 AND (character_maximum_length > 100000 OR character_maximum_length < 0 OR DATA_TYPE IN ('text', 'ntext'))
				THEN 'Max' 
		WHEN data_type IN ('char', 'nchar','varchar', 'nvarchar','text', 'ntext', 'character varying', 'national character varying')
			THEN CAST(character_maximum_length AS varchar(30)) 
		WHEN data_type IN ('binary', 'varbinary', 'bytea')
			THEN 
				CASE 
					WHEN character_octet_length < 0 THEN 'Max' 
					ELSE CAST(character_octet_length AS varchar(30)) 
				END 
		ELSE NULL 
	END AS EntityMaxLength
	
	,
	CASE 
		WHEN data_type IN ('image', 'xml') THEN 'false' 
		WHEN data_type IN ('varchar', 'nvarchar','text', 'ntext', 'varbinary', 'bytea', 'xml', 'character varying', 'national character varying') THEN 'false' 
		WHEN data_type IN ('char', 'nchar', 'binary') THEN 'true' 
		ELSE NULL 
	END AS EntityFixedLength
	
	,CASE 
		
		WHEN EXISTS(SELECT * FROM information_schema.tables WHERE table_schema = 'pg_catalog') AND data_type IN ('character varying', 'national character varying', 'text') THEN 'true' -- PostGre uses UTF-8 always
		WHEN data_type IN ('nchar', 'nvarchar', 'ntext', 'xml') THEN 'true' 
		WHEN data_type IN ('char', 'varchar', 'text') THEN 'false'
		ELSE NULL 
	END AS EntityUnicode 
	
	,
	CASE 
		WHEN data_type IN ('bigint', 'biginteger', 'bigserial', 'int', 'integer', 'serial', 'smallint', 'tinyint') THEN NULL 
		WHEN datetime_precision IS NOT NULL THEN datetime_precision 
		ELSE numeric_precision 
	END AS EntityPrecision 
	
	,
	CASE 
		WHEN data_type IN ('bigint', 'biginteger', 'bigseial', 'int', 'integer', 'serial', 'smallint', 'tinyint') THEN NULL 
		ELSE numeric_scale 
	END AS EntityScale
	
	-- ,character_maximum_length
	-- ,character_octet_length
	-- ,numeric_precision
	-- ,numeric_precision_radix

	-- ,character_set_catalog
	-- ,character_set_schema
	-- ,character_set_name
	-- ,collation_catalog
	-- ,collation_schema
	-- ,collation_name
	-- ,*
FROM INFORMATION_SCHEMA.COLUMNS 

WHERE (1=1) 
-- AND TABLE_NAME = @__in_table_name 
--AND TABLE_NAME = 't_blogpost' 
AND TABLE_NAME = '" + table_name.Replace("'", "''") + @"' 

AND table_name NOT IN ('sysdiagrams', 'dtproperties') 
AND table_schema NOT IN ('pg_catalog', 'information_schema') 

ORDER BY ORDINAL_POSITION 
";

            return SQL.GetDataTable(strSQL);
        }


        public static string GetWhereCondition(string table_name)
        {
            string strSQL = @"
SELECT 
	 -- isc.table_name, 
	 isc.column_name 
FROM information_schema.columns AS isc 

INNER JOIN INFORMATION_SCHEMA.TABLES AS ist 
	ON ist.table_name = isc.table_name 
	AND ist.table_schema = isc.table_schema 
	AND TABLE_TYPE = 'BASE TABLE' 

WHERE isc.column_name LIKE '%\_Status' ESCAPE '\' 
AND isc.table_name = '" + table_name.Replace("'", "''") + @"' 

-- ORDER BY table_name 
";

            string str = "";

            using (System.Data.DataTable dt = SQL.GetDataTable(strSQL))
            {
                if (dt.Rows.Count > 0)
                {
                    string column_name = System.Convert.ToString(dt.Rows[0]["column_name"]);
                    str = string.Format(" WHERE " + column_name + "<> 99");
                }
                    
            }

            return str;
        }


        public static void GetSerializationData(string table_name, System.IO.TextWriter tw, System.Uri url)
        {
            /*
            var set = new System.Xml.XmlWriterSettings();
            set.Indent = true;

            using (System.Xml.XmlWriter writer = System.Xml.XmlWriter.Create(@"D:\employees.xml", set))
            {
                writer.WriteStartDocument();
                writer.WriteStartElement("Employees"); // <-- Important root element

                writer.WriteAttributeString("localname", "value");
                writer.WriteValue("Foobar");

                writer.WriteEndElement();              // <-- Closes it
                writer.WriteEndDocument();
            }
            */


            // table_name = "T_Admin";

            
            const string format = "yyyy'-'MM'-'dd'T'HH':'mm':'ssZ";

            // If you're using a debugger this will rightfully throw an exception
            // with .NET 3.5 SP1 because 'z' is for local time only; however, the exception
            // asks me to use the 'Z' specifier for UTC times, but it doesn't exist, so it
            // just spits out 'Z' as a literal.
            // string updatetime = "2015-08-26T15:29:19Z";
            string updatetime = System.DateTime.UtcNow.ToString(format, System.Globalization.CultureInfo.InvariantCulture);


            TableData.Feed feed = new TableData.Feed();

            //string baseURL = url.Scheme + "://" + url.Authority + (System.Web.Hosting.HostingEnvironment.ApplicationVirtualPath + "/").Replace("//", "/") + "ajax/ExcelDataFeed.ashx/";
            string baseURL = url.Scheme + "://" + url.Authority + "/DataFeed/";


            // feed.Base = "http://localhost:5570/ExcelDataFeed.svc/";
            feed.Base = baseURL;

            if(System.Environment.OSVersion.Platform != System.PlatformID.Unix)
                feed.Xmlns = "http://www.w3.org/2005/Atom";

            feed.D = "http://schemas.microsoft.com/ado/2007/08/dataservices";
            feed.M = "http://schemas.microsoft.com/ado/2007/08/dataservices/metadata";

            // feed.Id = "http://localhost:5570/ExcelDataFeed.svc/T_Admin";
            feed.Id = baseURL + table_name;




            feed.Title = new TableData.Title();
            feed.Title.Type = "text";
            feed.Title.Text = table_name;

            feed.Updated = updatetime;

            feed.Link = new TableData.Link();
            feed.Link.Rel = "self";
            feed.Link.Title = table_name;
            feed.Link.Href = table_name;

            feed.Entry = new System.Collections.Generic.List<TableData.Entry>();
            
            using (System.Data.DataTable dtColumnInfo = GetColumnInfo(table_name))
            {

                using (System.Data.DataTable dtTableData = SQL.GetDataTable("SELECT * FROM " + table_name + GetWhereCondition(table_name) ))
                {
                    
                    PrimaryKeyInfo[] pki = GetPrimaryKeyInfo(table_name, dtTableData);
                    string pkTemplate = CreatePkTemplate(table_name, pki);

                    int cnt = dtTableData.Rows.Count;
                    
                    for (int i = 0; i < cnt; ++i)
                    {

                        string thisPKvalue = pkTemplate;

                        for (int j = 0; j < pki.Length; ++j)
                        {
                            string str = System.Convert.ToString(dtTableData.Rows[i][pki[j].ColumnName]);
                            thisPKvalue = thisPKvalue.Replace("{@value" + j.ToString() + "}", str);
                        }


                        TableData.Entry ent = new TableData.Entry();

                        // ent.Id = "http://localhost:5570/ExcelDataFeed.svc/T_Admin(guid'6d12a79a-033d-4ca4-8e48-4a5eaa6f6aad')";
                        ent.Id = baseURL + thisPKvalue;

                        ent.Category = new TableData.Category();
                        ent.Category.Term = "COR_Basic_DemoModel." + table_name;
                        ent.Category.Scheme = "http://schemas.microsoft.com/ado/2007/08/dataservices/scheme";

                        ent.Link = new TableData.Link();
                        ent.Link.Rel = "edit";
                        ent.Link.Title = table_name;

                        ent.Link.Href = thisPKvalue;
                        ent.Updated = updatetime;
                        ent.Title = "";

                        ent.Author = new TableData.Author();
                        ent.Author.Name = "";

                        ent.Content = new TableData.Content();
                        ent.Content.Type = "application/xml";


                        //ent.Content.Properties = new TableData.Properties();
                        ent.Content.Properties = new TableData.MyProperties(dtColumnInfo, dtTableData.Rows[i]);

                        feed.Entry.Add(ent);
                    }


                    Tools.XML.Serialization.SerializeToXml(feed, tw);
                    /*
                    // Serialze here ? 
                    var x = feed;
                    System.Xml.Serialization.XmlSerializer serializer = new System.Xml.Serialization.XmlSerializer(x.GetType());

                    using (System.IO.Stream strm = new System.IO.FileStream(@"D:\lolz.txt", System.IO.FileMode.Create))
                        serializer.Serialize(strm, x);
                     */
                }

            } // End Using dtColumnInfo 

            // Service x = new Service();
            
        }

    }


    [System.Xml.Serialization.XmlRoot(ElementName = "service", Namespace = "AppNamespace")]
    public class Service
    {
        [System.Xml.Serialization.XmlAttribute(AttributeName = "xmlns")]
        public string Xmlns { get; set; }

        [System.Xml.Serialization.XmlAttribute(AttributeName = "atom", Namespace = "AtomXmlns")]
        public string Atom { get; set; }

        [System.Xml.Serialization.XmlAttribute(AttributeName = "base", Namespace = "BaseXmlns")]
        public string Base { get; set; }

        [System.Xml.Serialization.XmlElement]
        public XML.TableData.MyProperties aaaa = new TableData.MyProperties();
    }


}

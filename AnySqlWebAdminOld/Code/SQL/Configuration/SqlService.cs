
namespace AnySqlWebAdmin
{


    public class SqlService
    {

        private static string s_ConnectionString;
        private static System.Data.Common.DbProviderFactory s_Factory;



        private static string GetMsCs()
        {
            System.Data.SqlClient.SqlConnectionStringBuilder csb = new System.Data.SqlClient.SqlConnectionStringBuilder();

            if (System.Environment.OSVersion.Platform == System.PlatformID.Unix)
                csb.DataSource = System.Environment.MachineName + ",2019";
            else
                //csb.DataSource = System.Environment.MachineName + @"\SQLEXPRESS";
                csb.DataSource = System.Environment.MachineName;
            
            // csb.DataSource = System.Environment.MachineName;
            csb.InitialCatalog = "COR_Basic_Demo_V4";
            // csb.InitialCatalog = "COR_Basic_SNB";



            csb.IntegratedSecurity = System.Environment.OSVersion.Platform != System.PlatformID.Unix;
            if (!csb.IntegratedSecurity)
            {
                csb.UserID = TestPlotly.SecretManager.GetSecret<string>("DefaultDbUser");
                csb.Password = TestPlotly.SecretManager.GetSecret<string>("DefaultDbPassword");
            }

            
            csb.PacketSize = 4096;
            csb.PersistSecurityInfo = false;
            csb.ApplicationName = "BlueMine";
            csb.ConnectTimeout = 15;
            csb.Pooling = true;
            csb.MinPoolSize = 1;
            csb.MaxPoolSize = 100;
            csb.MultipleActiveResultSets = false;
            csb.WorkstationID = System.Environment.MachineName;

            
            
            
            // https://github.com/dotnet/runtime/issues/14945
            // SQL server alias recognized with CLR runtime but not CoreCLR
            // The SQL server alias is defined on each client machine and it points to a SQL server instance. 
            // The alias information is stored in the registry on Windows. 
            // This is a OS specific dependency which can work only on Windows. 
            // As a result we decided to drop support for sql alias in CoreFX.
            if (System.Runtime.InteropServices.RuntimeInformation.IsOSPlatform(System.Runtime.InteropServices.OSPlatform.Windows))
            {
                string key = System.Environment.GetEnvironmentVariable("PROCESSOR_ARCHITECTURE") == "x86"
                ? @"HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\MSSQLServer\Client\ConnectTo"
                : @"HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\MSSQLServer\Client\ConnectTo";

                string newSource = (string)Microsoft.Win32.Registry.GetValue(key, csb.DataSource, null);
                if (newSource != null)
                    csb.DataSource = newSource.Substring(newSource.IndexOf(',') + 1);
            }

            string cs = csb.ConnectionString;
            csb = null;
            
            return cs;
        } // End Function GetMsCs 


        private static string GetMyCS()
        {
            var csb = new MySql.Data.MySqlClient.MySqlConnectionStringBuilder();
            
            if (System.Environment.OSVersion.Platform == System.PlatformID.Unix)
                csb.Server = System.Environment.MachineName;
            else
                csb.Server = System.Environment.MachineName + @"\SQLEXPRESS";

            csb.Database = "COR_Basic_Demo_V4";

            csb.UserID = TestPlotly.SecretManager.GetSecret<string>("DefaultDbUser");
            csb.Password = TestPlotly.SecretManager.GetSecret<string>("DefaultDbPassword");


            csb.CharacterSet = System.Text.Encoding.UTF8.WebName;

            csb.AllowZeroDateTime = false;
            csb.PersistSecurityInfo = false;

            csb.ConnectionIdleTimeout = 15;
            csb.ConnectionTimeout = 15;
            csb.DefaultCommandTimeout = 30;
            
            csb.Pooling = true;
            csb.MinimumPoolSize = 1;
            csb.MaximumPoolSize = 100;

            string cs = csb.ConnectionString;
            csb = null;

            return cs;
        } // End Function GetMsCs 


        private static string GetPgCs()
        {
            var csb = new Npgsql.NpgsqlConnectionStringBuilder();

            if (System.Environment.OSVersion.Platform == System.PlatformID.Unix)
                csb.Host = System.Environment.MachineName;
            else
                csb.Host = System.Environment.MachineName + @"\SQLEXPRESS";

            csb.Database = "COR_Basic_Demo_V4";
            csb.IntegratedSecurity = System.Environment.OSVersion.Platform != System.PlatformID.Unix;
            if (!csb.IntegratedSecurity)
            {
                csb.Username = TestPlotly.SecretManager.GetSecret<string>("DefaultDbUser");
                csb.Password = TestPlotly.SecretManager.GetSecret<string>("DefaultDbPassword");
            }

            csb.ReadBufferSize = 4096;
            csb.WriteBufferSize = 4096;
            
            csb.PersistSecurityInfo = false;
            csb.ApplicationName = "BlueMine";
            csb.Timeout = 15;

            csb.Pooling = true;
            csb.MinPoolSize = 1;
            csb.MaxPoolSize = 100;
            
            string cs = csb.ConnectionString;
            csb = null;

            return cs;
        }


        static SqlService()
        {

            // s_Factory = DbProviderFactories.GetFactory<Npgsql.NpgsqlFactory>();
            // s_Factory = DbProviderFactories.GetFactory(typeof(MySql.Data.MySqlClient.MySqlClientFactory));
            // s_Factory = DbProviderFactories.GetFactory(typeof(System.Data.SqlClient.SqlClientFactory));

            s_Factory = System.Data.SqlClient.SqlClientFactory.Instance;

            s_ConnectionString = GetMsCs();
        }



        public string ConnectionString
        {
            get
            {
                return s_ConnectionString;
            }
        }


        public System.Data.Common.DbProviderFactory Factory
        {
            get
            {
                return s_Factory;
            }
        }


        public System.Data.Common.DbConnection Connection
        {
            get
            {
                System.Data.Common.DbConnection con = s_Factory.CreateConnection();
                con.ConnectionString = s_ConnectionString;

                if (con.State != System.Data.ConnectionState.Open)
                    con.Open();


                return con;
            }
        }


        public SqlService()
        { }


        public void AddParameterList(System.Collections.Generic.Dictionary<string, object> pars, System.Data.Common.DbCommand cmd)
        {
            foreach (System.Collections.Generic.KeyValuePair<string, object> kvp in pars)
            {
                string key = kvp.Key;
                object value = kvp.Value;
                
                if (!key.StartsWith("@"))
                    key = "@" + key;


                if (value == null)
                    value = System.DBNull.Value;

                System.Data.Common.DbParameter p = new System.Data.SqlClient.SqlParameter(key, value);
                // cmd.Parameters.Add(new System.Data.SqlClient.SqlParameter(key, kvp.Value));
                cmd.Parameters.Add(p);
            } // Next kvp 

            // System.Console.WriteLine(cmd);
        } // End Sub AddParameterList 


    } // End Class SqlService 


} // End Namespace AnySqlWebAdmin 

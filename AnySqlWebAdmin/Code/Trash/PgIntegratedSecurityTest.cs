
namespace AnySqlWebAdmin.Code.Trash
{


    public class PgIntegratedSecurityTest
    {


        // AnySqlWebAdmin.Code.Trash.PgIntegratedSecurityTest.TestNpgSql();
        public static void TestNpgSql()
        {
            var a = new { Test = 5, Result = "Success" };
            var b = new { Test = 3, Result = "foo" };
            var c = new { Test1 = 3, Result = "foo" };

            System.Type t = a.GetType();
            System.Console.WriteLine(t);

            if (object.ReferenceEquals(a.GetType(), b.GetType()))
                System.Console.WriteLine("Two anony = equal");


            Npgsql.NpgsqlConnectionStringBuilder csb = new Npgsql.NpgsqlConnectionStringBuilder();

            csb.Database = "osm_test"; // must be set

            csb.Host = "localhost";
            // csb.Host = "127.0.0.1"; // doesn't work
            // csb.Host = System.Environment.MachineName; // doesn't work 
            csb.Port = 5432;

            // csb.IntegratedSecurity = true;
            csb.Username = System.Environment.UserName; // Works when user exists
            // csb.Username = "postgres"; // works as root 

            bool ret = false;
            string sql = "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'; ";

            using (System.Data.Common.DbConnection conn = Npgsql.NpgsqlFactory.Instance.CreateConnection())
            {
                conn.ConnectionString = csb.ConnectionString;

                if (conn.State != System.Data.ConnectionState.Open)
                    conn.Open();

                using (System.Data.Common.DbCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = sql;

                    int? foo = (int?)cmd.ExecuteScalar();

                    if (foo.HasValue)
                        ret = foo.Value != 0;
                } // End Using cmd 

                if (conn.State != System.Data.ConnectionState.Closed)
                    conn.Close();
            } // End Using conn 

            System.Console.WriteLine(ret);
        } // End Sub TestNpgSql 


    } // End Class PgIntegratedSecurityTest 


} // End Namespace AnySqlWebAdmin.Code.Trash 

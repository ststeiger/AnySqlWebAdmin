
// using Cassandra;


// https://github.com/datastax/csharp-driver
namespace AnySqlWebAdmin
{

    public class User
    {
        public System.Guid UserId { get; set; }
        public string Name { get; set; }
    }

    
    /*     



INFO  16:51:25 Cassandra version: 3.9
INFO  16:51:25 Thrift API version: 20.1.0
Starting Messaging Service on localhost/127.0.0.1:7000 (lo)
CQL supported versions: 3.4.2 (default: 3.4.2)


system_auth.resource_role_permissons_index
system_auth.role_members
system_auth.role_permissions
system_auth.roles


system_distributed.parent_repair_history
system_distributed.repair_history
system_distributed.view_build_status


system.IndexInfo
system.batches
system.paxos
system.local
system.peers
system.peer_events
system.range_xfers
system.compaction_history
system.sstable_activity
system.size_estimates
system.available_ranges
system.views_builds_in_progress
system.built_views
system.hints
system.batchlog
system.schema_keyspaces
system.schema_columnfamilies
system.schema_columns
system.schema_triggers
system.schema_usertypes
system.schema_functions
system.schema_aggregates




system_traces.events
system_traces.sessions     
     
     
system_schema.keyspaces
system_schema.tables
system_schema.columns
system_schema.triggers
system_schema.dropped_columns
system_schema.views
system_schema.types
system_schema.functions
system_schema.aggregates
system_schema.indexes
     */


    // https://datastax.github.io/csharp-driver/features/components/mapper/
    // https://docs.datastax.com/en/developer/csharp-driver/3.6/features/parametrized-queries/
    public class SchemaKeyspaces
    {
        // public string KeyspaceName { get; set; }
        // public bool DurableWrites { get; set; }
        // public System.Collections.Generic.Dictionary<string, string> Replication { get; set; }

        // Mapper is case-insensitive, but doesn't ignore underlines
        public string Keyspace_Name { get; set; }
        public bool Durable_Writes { get; set; }
        public System.Collections.Generic.Dictionary<string, string> Replication { get; set; }
    }



    class TestCassandra
    {

        // https://www.instaclustr.com/support/documentation/getting-started/connect-cassandra-c-sample-code/

        // AnySqlWebAdmin.Sample.QueryKeyspaces().Wait();
        // AnySqlWebAdmin.TestCassandra.Test();
        public static void Test()
        {
            System.Console.WriteLine("Hello Cassandra!");

            using (Cassandra.ICluster cluster = Cassandra.Cluster.Builder()
                  .AddContactPoints("127.0.0.1")
                  .WithPort(9042)
                  // .WithLoadBalancingPolicy(new Cassandra.DCAwareRoundRobinPolicy("AWS_VPC_AP_SOUTHEAST_2"))
                  // .WithAuthProvider(new Cassandra.PlainTextAuthProvider("Username", "Password"))
                  .Build())
            {

                // Connect to the nodes using a keyspace
                using (Cassandra.ISession session = cluster.Connect("system_distributed"))
                {

                    

                    // Get name of a Cluster
                    System.Console.WriteLine("The cluster's name is: " + cluster.Metadata.ClusterName);
                    // Execute a query on a connection synchronously
                    using (Cassandra.RowSet rs = session.Execute("SELECT * FROM repair_history"))
                    {

                        // Iterate through the RowSet
                        foreach (Cassandra.Row row in rs)
                        {
                            string value = row.GetValue<string>("keyspace_name");
                            System.Console.WriteLine(value);
                            // Do something with the value
                        } // End Using row 
                    } // End Using rs 

                    Cassandra.Mapping.IMapper mapper = new Cassandra.Mapping.Mapper(session);
                    // System.Collections.Generic.IEnumerable<User> users = mapper.Fetch<User>("SELECT userid, name FROM users");
                    // System.Collections.Generic.IEnumerable<User> users2 = mapper.Fetch<User>("SELECT * FROM users WHERE name = ?", "someName");


                    // https://docs.datastax.com/en/developer/csharp-driver/3.6/features/parametrized-queries/
                    // https://docs.datastax.com/en/developer/java-driver/3.1/faq/
                    // https://docs.datastax.com/en/developer/csharp-driver/3.2/
                    // Cassandra.PreparedStatement statement = session.Prepare("SELECT * FROM table where a = :a and b = :b");
                    // Bind by name using anonymous types 
                    // session.Execute(statement.Bind(new { a = "aValue", b = "bValue" }));


                    System.Collections.Generic.IEnumerable<SchemaKeyspaces> keySpaces1 = mapper.Fetch<SchemaKeyspaces>("SELECT * FROM system_schema.keyspaces");
                    System.Collections.Generic.List<SchemaKeyspaces> keySpaces = System.Linq.Enumerable.ToList(keySpaces1);
                    System.Console.WriteLine(keySpaces);


                    using (Cassandra.RowSet rs = session.Execute("SELECT * FROM system_schema.keyspaces"))
                    {
                        // Iterate through the RowSet
                        foreach (Cassandra.Row row in rs)
                        {

                            foreach (Cassandra.CqlColumn cc in rs.Columns)
                            {
                                object value = row.GetValue<object>(cc.Name);
                                System.Console.WriteLine(value);
                                // Do something with the value
                            } // Next cc

                        } // End Using row 

                    } // End Using rs 

                } // End Using session 

            } // End Using cluster 

        } // End Sub Test 


    } // End Class TestCassandra 


} // End Namespace AnySqlWebAdmin 


#if CASSANDRA_SHARP_ONLY_WORKS_WITH_CASSANDRA2_NOT3


using CassandraSharp;
using CassandraSharp.Config;
using CassandraSharp.CQLPoco;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AnySqlWebAdmin
{


    public class SchemaKeyspaces
    {
        public string KeyspaceName { get; set; }
        public bool DurableWrites { get; set; }
        public Dictionary<string, string> Replication { get; set; }
    }

    public static class Sample
    {

        public class SnitchType
        {
            public static string Simple="Simple";
        }

        public class EndpointStrategy
        {
            public static string Nearest = "Nearest";
        }


        // https://www.codeproject.com/Articles/758803/DotNet-Programming-using-Cassandra
        public static ICluster GetCluster(int myPort, string[] myClusters)
        {
            CassandraSharpConfig config = new CassandraSharpConfig();
            ClusterConfig clusterConfig = new ClusterConfig();
            TransportConfig transConfig = new TransportConfig();
            clusterConfig.Name = "Test Cluster";
            transConfig.Port = myPort;
            clusterConfig.Transport = new TransportConfig();

            EndpointsConfig endPointConfig = new EndpointsConfig();
            endPointConfig.Servers = myClusters;
            // endPointConfig.Snitch = SnitchType.Simple;
            // endPointConfig.Strategy = EndpointStrategy.Nearest;

            //BehaviorConfig behaveConfig = new BehaviorConfig();
            //behaveConfig.KeySpace = ConfigEntries.DefaultDatabase;
            //if (!String.IsNullOrWhiteSpace(ConfigEntries.UserName)) behaveConfig.User = ConfigEntries.UserName;
            //if (!String.IsNullOrWhiteSpace(ConfigEntries.Password)) behaveConfig.Password = ConfigEntries.Password;
            //behaveConfig.ReadConsistencyLevel = Apache.Cassandra.ConsistencyLevel.ONE;
            //behaveConfig.WriteConsistencyLevel = Apache.Cassandra.ConsistencyLevel.ONE;

            clusterConfig.Transport = transConfig;
            clusterConfig.Endpoints = endPointConfig;


            // KeyspaceConfig ksc = new KeyspaceConfig();
            // ksc.Name = "";

            // clusterConfig.DefaultKeyspace = ksc;



            config.Clusters = new ClusterConfig[] { clusterConfig };

            //We need to ensure that the connection is not initialized before configuring...
            ClusterManager.Shutdown();

            ClusterManager.Configure(config);

            ICluster cluster = ClusterManager.GetCluster("Test Cluster");
            return cluster;
        }


        private static void DisplayKeyspace(SchemaKeyspaces ks)
        {
            System.Console.WriteLine("KeyspaceName={0} DurableWrites={1} Class={2} ReplicationFactor={3}",
                              ks.KeyspaceName,
                              ks.DurableWrites,
                              ks.Replication["class"],
                              ks.Replication["replication_factor"]);
        }

        public static async Task QueryKeyspaces()
        {
            // This is configurable in your cassandra-env.sh file, but the default is 7199. 
            // Ports 57311 and 57312 are randomly assigned ports used for RMI communication. 
            // These ports change each time Cassandra starts up, but need to be open in the firewall, 
            // along with 8080 / 7199(depending on version), to allow for remote JMX acces


            // XmlConfigurator.Configure();
            // using (ICluster cluster = ClusterManager.GetCluster("TestCassandra"))
            //using (ICluster cluster = GetCluster(7199, new string[] { "127.0.0.1" }))
            //using (ICluster cluster = GetCluster(9042, new string[] { "127.0.0.1" }))
            using (ICluster cluster = GetCluster(9042, new string[] { "localhost" }))
            {
                var cmd = cluster.CreatePocoCommand();
                const string cqlKeyspaces = "SELECT * from system_schema.keyspaces";

                // async operation with streaming
                cmd.WithConsistencyLevel(ConsistencyLevel.ONE)
                   .Execute<SchemaKeyspaces>(cqlKeyspaces)
                   .Subscribe(DisplayKeyspace);
                
                // future
                System.Collections.Generic.IList<SchemaKeyspaces> kss = await cmd.Execute<SchemaKeyspaces>(cqlKeyspaces).AsFuture();
                foreach (SchemaKeyspaces ks in kss)
                    DisplayKeyspace(ks);
            }

            ClusterManager.Shutdown();
        }
    }

}
#endif

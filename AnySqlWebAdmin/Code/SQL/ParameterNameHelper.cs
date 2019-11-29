
namespace AnySqlWebAdmin
{


    public static class ParameterNameHelper
    {


        private static readonly char[] s_invalid_characters;


        static ParameterNameHelper()
        {
            // https://stackoverflow.com/questions/751719/sql-server-invalid-characters-in-parameter-names
            s_invalid_characters = new char[] {
                 '\'', '`', '"', '\\'
                ,';', ',', '\r', '\n', ' '
                ,'{', '}', '(',')','[',']','<','>'
                , '=', '+', '-', '*', '/', '%' 
                ,'!','~','|','&','^'
                ,'.', '#','@' // @@ is potentially dangerous
            };
        }


        private static bool IsInvalidLinqParallel(string param)
        {
            char[] list = param.ToCharArray();

            // bool contains = list.AsParallel().Any(t => s_invalid_characters.AsParallel().Any(x => x.Equals(t)));
            return System.Linq.Enumerable.Any(
                System.Linq.ParallelEnumerable.AsParallel(list)
                , delegate (char t)
                {
                    return System.Linq.Enumerable.Any(
                       System.Linq.ParallelEnumerable.AsParallel(s_invalid_characters)
                       , delegate (char x)
                       { return x.Equals(t); }
                    );
                }
            );
        }


        public static bool IsInvalid(string param)
        {
            if (string.IsNullOrEmpty(param))
                return true;

            char[] list = param.ToCharArray();


            for (int i = 0; i < param.Length; ++i)
            {
                for (int j = 0; j < s_invalid_characters.Length; ++j)
                {
                    if (param[i].Equals(s_invalid_characters[j]))
                        return true;
                }
            }

            return false;
        }



        public static void Test()
        {

            System.Diagnostics.Stopwatch sw = new System.Diagnostics.Stopwatch();
            sw.Start();
            for (int i = 0; i < 1000; ++i)
            {
                // IsInvalid("test123<");
                IsInvalid("test123");
            }

            sw.Stop();
            long t1 = sw.ElapsedMilliseconds;
            System.Console.WriteLine();


            sw.Reset();
            sw.Start();
            for (int i = 0; i < 1000; ++i)
            {
                // IsInvalidLinqParallel("test123<");
                IsInvalidLinqParallel("test123");
            }

            sw.Stop();
            long t2 = sw.ElapsedMilliseconds;

            System.Console.WriteLine("{0} vs {1}", t1, t2);

        }

    }


}

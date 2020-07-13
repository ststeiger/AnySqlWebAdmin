
namespace AnySqlWebAdmin.Code.SqlMerge
{


    public class StringWriterWithEncoding
        : System.IO.StringWriter
    {
        private readonly System.Text.Encoding m_Encoding;


        public StringWriterWithEncoding(System.Text.StringBuilder sb, System.Text.Encoding encoding)
            : base(sb)
        {
            this.m_Encoding = encoding;
        }


        public override System.Text.Encoding Encoding
        {
            get { return this.m_Encoding; }
        }


    } // End Class StringWriterWithEncoding


}

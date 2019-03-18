
namespace AnySqlWebAdmin
{



    public sealed class HttpCookie
    {
        private string _name;

        private string _path = "/";

        private bool _secure;

        private bool _httpOnly;

        private string _domain;

        private bool _expirationSet;

        private System.DateTime _expires;

        private string _stringValue;

        private System.Collections.Specialized.NameValueCollection _multiValue;

        private bool _changed;

        private bool _added;

        internal bool Changed
        {
            get
            {
                return _changed;
            }
            set
            {
                _changed = value;
            }
        }

        internal bool Added
        {
            get
            {
                return _added;
            }
            set
            {
                _added = value;
            }
        }

        public string Name
        {
            get
            {
                return _name;
            }
            set
            {
                _name = value;
                _changed = true;
            }
        }

        public string Path
        {
            get
            {
                return _path;
            }
            set
            {
                _path = value;
                _changed = true;
            }
        }

        public bool Secure
        {
            get
            {
                return _secure;
            }
            set
            {
                _secure = value;
                _changed = true;
            }
        }

        public bool HttpOnly
        {
            get
            {
                return _httpOnly;
            }
            set
            {
                _httpOnly = value;
                _changed = true;
            }
        }

        public string Domain
        {
            get
            {
                return _domain;
            }
            set
            {
                _domain = value;
                _changed = true;
            }
        }

        public System.DateTime Expires
        {
            get
            {
                if (!_expirationSet)
                {
                    return System.DateTime.MinValue;
                }
                return _expires;
            }
            set
            {
                _expires = value;
                _expirationSet = true;
                _changed = true;
            }
        }



        internal string ValueCollectionToString(bool urlencoded)
        {
            System.Text.StringBuilder stringBuilder = new System.Text.StringBuilder();

            foreach (string thisKey in _multiValue.AllKeys)
            {
                string key = thisKey;
                if (urlencoded)
                    key = System.Web.HttpUtility.UrlEncode(key);

                string[] values = this._multiValue.GetValues(key);

                for (int i = 0; i < values.Length; ++i)
                {
                    stringBuilder.Append("&");
                    stringBuilder.Append(key);
                    stringBuilder.Append("=");

                    string value = values[i];
                    if (urlencoded)
                        value = System.Web.HttpUtility.UrlEncode(value);

                    stringBuilder.Append(value);
                }

            }

            return stringBuilder.ToString();
        }


        public string Value
        {
            get
            {
                if (_multiValue != null)
                {
                    _multiValue.ToString();
                    return ValueCollectionToString(false);
                }
                return _stringValue;
            }
            set
            {
                if (_multiValue != null)
                {
                    _multiValue.Clear();
                    _multiValue.Add(null, value);
                }
                else
                {
                    _stringValue = value;
                }
                _changed = true;
            }
        }


        public bool HasKeys
        {
            get
            {
                return Values.HasKeys();
            }
        }


        internal void FillFromString(System.Collections.Specialized.NameValueCollection nvc, string s, bool urlencoded, System.Text.Encoding encoding)
        {
            int num = s?.Length ?? 0;
            for (int i = 0; i < num; i++)
            {
                // ThrowIfMaxHttpCollectionKeysExceeded();
                int num2 = i;
                int num3 = -1;
                while (true)
                {
                    if (i < num)
                    {
                        switch (s[i])
                        {
                            case '=':
                                if (num3 < 0)
                                {
                                    num3 = i;
                                }
                                goto default;
                            default:
                                i++;
                                continue;
                            case '&':
                                break;
                        }
                    }
                    break;
                }
                string text = null;
                string text2 = null;
                if (num3 >= 0)
                {
                    text = s.Substring(num2, num3 - num2);
                    text2 = s.Substring(num3 + 1, i - num3 - 1);
                }
                else
                {
                    text2 = s.Substring(num2, i - num2);
                }
                if (urlencoded)
                {
                    nvc.Add(System.Web.HttpUtility.UrlDecode(text, encoding), System.Web.HttpUtility.UrlDecode(text2, encoding));
                }
                else
                {
                    nvc.Add(text, text2);
                }
                if (i == num - 1 && s[i] == '&')
                {
                    nvc.Add(null, string.Empty);
                }
            }
        }


        internal void FillFromString(System.Collections.Specialized.NameValueCollection nvc, string s)
        {
            FillFromString(nvc, s, false, null);
        }
        

        public System.Collections.Specialized.NameValueCollection Values
        {
            get
            {
                if (_multiValue == null)
                {
                    _multiValue = new System.Collections.Specialized.NameValueCollection(System.StringComparer.OrdinalIgnoreCase);
                    if (_stringValue != null)
                    {
                        if (_stringValue.IndexOf('&') >= 0 || _stringValue.IndexOf('=') >= 0)
                        {
                            FillFromString(this._multiValue, _stringValue);
                        }
                        else
                        {
                            _multiValue.Add(null, _stringValue);
                        }
                        _stringValue = null;
                    }
                }
                _changed = true;
                return _multiValue;
            }
        }


        public string this[string key]
        {
            get
            {
                return Values[key];
            }
            set
            {
                Values[key] = value;
                _changed = true;
            }
        }


        internal HttpCookie()
        {
            _changed = true;
        }


        public HttpCookie(string name)
        {
            _name = name;
            SetDefaultsFromConfig();
            _changed = true;
        }


        public HttpCookie(string name, string value)
        {
            _name = name;
            _stringValue = value;
            SetDefaultsFromConfig();
            _changed = true;
        }


        private void SetDefaultsFromConfig()
        {
            // System.Web.Configuration.HttpCookiesSection httpCookies = System.Web.Configuration.RuntimeConfig.GetConfig().HttpCookies;
            // _secure = httpCookies.RequireSSL;
            this._secure = true;

            // _httpOnly = httpCookies.HttpOnlyCookies;
            this._httpOnly = true;

            // if (httpCookies.Domain != null && httpCookies.Domain.Length > 0) _domain = httpCookies.Domain;
            // this._domain = "";
        }


        private bool SupportsHttpOnly
        {
            get
            {
                return true;
            }
        }


        internal static string FormatHttpCookieDateTime(System.DateTime dt)
        {
            if (dt < System.DateTime.MaxValue.AddDays(-1.0) && dt > System.DateTime.MinValue.AddDays(1.0))
            {
                dt = dt.ToUniversalTime();
            }
            return dt.ToString("ddd, dd-MMM-yyyy HH':'mm':'ss 'GMT'", System.Globalization.DateTimeFormatInfo.InvariantInfo);
        }



        internal System.Collections.Generic.KeyValuePair<string, Microsoft.Extensions.Primitives.StringValues>
            GetSetCookieHeader(Microsoft.AspNetCore.Http.HttpContext context)
        {
            System.Text.StringBuilder stringBuilder = new System.Text.StringBuilder();
            if (!string.IsNullOrEmpty(_name))
            {
                stringBuilder.Append(_name);
                stringBuilder.Append('=');
            }
            if (_multiValue != null)
            {
                stringBuilder.Append(ValueCollectionToString(false));
            }
            else if (_stringValue != null)
            {
                stringBuilder.Append(_stringValue);
            }
            if (!string.IsNullOrEmpty(_domain))
            {
                stringBuilder.Append("; domain=");
                stringBuilder.Append(_domain);
            }
            if (_expirationSet && _expires != System.DateTime.MinValue)
            {
                stringBuilder.Append("; expires=");
                stringBuilder.Append(FormatHttpCookieDateTime(_expires));
            }
            if (!string.IsNullOrEmpty(_path))
            {
                stringBuilder.Append("; path=");
                stringBuilder.Append(_path);
            }
            if (_secure)
            {
                stringBuilder.Append("; secure");
            }
            if (_httpOnly && this.SupportsHttpOnly)
            {
                stringBuilder.Append("; HttpOnly");
            }

            return new System.Collections.Generic.KeyValuePair<string, Microsoft.Extensions.Primitives.StringValues>("27", stringBuilder.ToString());
        }


    }


}

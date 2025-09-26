
/* @license: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/. 
https://github.com/datejs/Datejs/blob/master/src/core.js
https://code.google.com/p/datejs/wiki/FormatSpecifiers
http://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
http://blog.stevenlevithan.com/archives/date-time-format
http://stackoverflow.com/questions/6002808/is-there-any-way-to-get-current-time-in-nanoseconds-using-javascript
*/

interface ShortDate
{
    h():number;
}



let FormatTools =
    {

        // https://github.com/datejs/Datejs/blob/master/src/globalization/en-US.js
        $i18n:
        {
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            , abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            , shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
            , firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"]

            , monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            , abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

            , amDesignator: "AM"
            , pmDesignator: "PM"
        }


        // Pad number with 0
        , p: function (value:number, len:number)
        {
            let val:string = String(value);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        }

        // Pad with n "0"-chars
        , mp: function (d: Date, n: number)
        {
            let i = 3, res = this.p(d.getMilliseconds(), 3).substr(0, n);
            
            for (; i < n; ++i)
                res += "0";
            
            return res;
        }


        , tzo: function (d:Date)
        {
            let o = d.getTimezoneOffset();
            return (o > 0 ? "-" : "+") + this.p(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4)
        }


        , tz: function (date:Date)
        {
            let timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                timezoneClip = /[^-+\dA-Z]/g;
            return (String(date).match(timezone) || [""]).pop().replace(timezoneClip, "");
        }

        , ord: function (num:number):string
        {
            if (num <= 0)
                return num.toString();
            
            switch (num % 100)
            {
                case 11:
                case 12:
                case 13:
                    return num + "th";
            }

            switch (num % 10)
            {
                case 1:
                    return num + "st";
                case 2:
                    return num + "nd";
                case 3:
                    return num + "rd";
                default:
                    return num + "th";
            }

        } // End Function ord

        , "format": function (str:string)
        {
            if (!str)
                return str;
            
            str = str.toString();
            
            if (arguments.length < 2)
                return str;
            
            let t = typeof arguments[1],
                args = "string" == t || "number" == t ? Array.prototype.slice.call(arguments) : arguments[1];
            
            for (let arg in args)
                str = str.replace(new RegExp("\\{" + arg + "\\}", "gi"), args[arg]);

            return str
        }

        , "formatDate": function (x:Date & ShortDate, formatString:string)
        {
            // "S dd'd'.MM (MMMM).yyyy ".replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g, 
            return formatString.replace(/d{1,4}|M{1,4}|f{1,7}|yy(?:yy)?|([HhmsTt])\1?|[oSZ]|"[^"]*"|'[^']*'/g,
                function (m:string)
                {
                    let p = this.p
                        , mp = this.mp.bind(this)
                        , tzo = this.tzo.bind(this)
                        , tz = this.tz.bind(this)
                        , ord = this.ord.bind(this)
                        , i18n = this.$i18n;


                    x.h = x.getHours;

                    if (m.charAt(0) === "\\")
                    {
                        return m.replace("\\", "");
                    }

                    switch (m)
                    {
                        case "hh":
                            return p(x.h() < 13 ? (x.h() === 0 ? 12 : x.h()) : (x.h() - 12));
                        case "h":
                            return x.h() < 13 ? (x.h() === 0 ? 12 : x.h()) : (x.h() - 12);
                        case "HH":
                            return p(x.h());
                        case "H":
                            return x.h();
                        case "mm":
                            return p(x.getMinutes());
                        case "m":
                            return x.getMinutes();
                        case "ss":
                            return p(x.getSeconds());
                        case "s":
                            return x.getSeconds();
                        case "yyyy":
                            return p(x.getFullYear(), 4);
                        case "yy":
                            return p(x.getFullYear());
                        case "dddd":
                            return i18n.dayNames[x.getDay()];
                        case "ddd":
                            return i18n.abbreviatedDayNames[x.getDay()];
                        case "dd":
                            return p(x.getDate());
                        case "d":
                            return x.getDate();
                        case "MMMM":
                            return i18n.monthNames[x.getMonth()];
                        case "MMM":
                            return i18n.abbreviatedMonthNames[x.getMonth()];
                        case "MM":
                            return p((x.getMonth() + 1));
                        case "M":
                            return x.getMonth() + 1;
                        case "t":
                            return (x.h() < 12 ? i18n.amDesignator.substring(0, 1) : i18n.pmDesignator.substring(0, 1)).toLowerCase();
                        case "tt":
                            return (x.h() < 12 ? i18n.amDesignator : i18n.pmDesignator).toLowerCase();
                        case "T":
                            return x.h() < 12 ? i18n.amDesignator.substring(0, 1) : i18n.pmDesignator.substring(0, 1);
                        case "TT":
                            return x.h() < 12 ? i18n.amDesignator : i18n.pmDesignator;
                        case "S":
                            return ord(x.getDate());
                        case "fffffff":
                            return mp(x, 7);
                        case "ffffff":
                            return mp(x, 6);
                        case "fffff":
                            return mp(x, 5);
                        case "ffff":
                            return mp(x, 4);
                        case "fff":
                            return mp(x, 3);
                        case "ff":
                            return mp(x, 2);
                        case "f":
                            return mp(x, 1);
                        case "o":
                            return tzo(x);
                        case "Z":
                            return tz(x);
                        default:
                            return m;
                    } // End Switch
                } // End Fn
                    .bind(this)
                //.apply(this, arguments)
            );
        }

    };


// let x = new Date();
// FormatTools.formatDate(x, "dddd (ddd)   S dd'd'.MM (MMM MMMM).yyyy HH:mm:ss.fff t tt T TT (o) {Z}")

// FormatTools.format("hello {foo} name", { foo: "bar" });
// FormatTools.formatString("hello {foo} name");

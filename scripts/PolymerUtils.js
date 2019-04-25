
Number.prototype.formatCurrency = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

window._androidCoordinatesCallback=null;
function _setAndroidCoordinates(string){
    if(window._androidCoordinatesCallback){
        var splitted=string.split(",");
        var object={coords:{latitude:Number(splitted[0].trim()),longitude:Number(splitted[1].trim())}};
        console.log("SETTING OBJECT MARCH",object);
        console.log(JSON.stringify(object));
        window._androidCoordinatesCallback(object);

    }
}
var defaultDiacriticsRemovalMap = [
    { 'base': 'A', 'letters': '\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F' },
    { 'base': 'AA', 'letters': '\uA732' },
    { 'base': 'AE', 'letters': '\u00C6\u01FC\u01E2' },
    { 'base': 'AO', 'letters': '\uA734' },
    { 'base': 'AU', 'letters': '\uA736' },
    { 'base': 'AV', 'letters': '\uA738\uA73A' },
    { 'base': 'AY', 'letters': '\uA73C' },
    { 'base': 'B', 'letters': '\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181' },
    { 'base': 'C', 'letters': '\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E' },
    { 'base': 'D', 'letters': '\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779\u00D0' },
    { 'base': 'DZ', 'letters': '\u01F1\u01C4' },
    { 'base': 'Dz', 'letters': '\u01F2\u01C5' },
    { 'base': 'E', 'letters': '\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E' },
    { 'base': 'F', 'letters': '\u0046\u24BB\uFF26\u1E1E\u0191\uA77B' },
    { 'base': 'G', 'letters': '\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E' },
    { 'base': 'H', 'letters': '\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D' },
    { 'base': 'I', 'letters': '\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197' },
    { 'base': 'J', 'letters': '\u004A\u24BF\uFF2A\u0134\u0248' },
    { 'base': 'K', 'letters': '\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2' },
    { 'base': 'L', 'letters': '\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780' },
    { 'base': 'LJ', 'letters': '\u01C7' },
    { 'base': 'Lj', 'letters': '\u01C8' },
    { 'base': 'M', 'letters': '\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C' },
    { 'base': 'N', 'letters': '\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4' },
    { 'base': 'NJ', 'letters': '\u01CA' },
    { 'base': 'Nj', 'letters': '\u01CB' },
    { 'base': 'O', 'letters': '\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C' },
    { 'base': 'OI', 'letters': '\u01A2' },
    { 'base': 'OO', 'letters': '\uA74E' },
    { 'base': 'OU', 'letters': '\u0222' },
    { 'base': 'OE', 'letters': '\u008C\u0152' },
    { 'base': 'oe', 'letters': '\u009C\u0153' },
    { 'base': 'P', 'letters': '\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754' },
    { 'base': 'Q', 'letters': '\u0051\u24C6\uFF31\uA756\uA758\u024A' },
    { 'base': 'R', 'letters': '\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782' },
    { 'base': 'S', 'letters': '\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784' },
    { 'base': 'T', 'letters': '\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786' },
    { 'base': 'TZ', 'letters': '\uA728' },
    { 'base': 'U', 'letters': '\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244' },
    { 'base': 'V', 'letters': '\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245' },
    { 'base': 'VY', 'letters': '\uA760' },
    { 'base': 'W', 'letters': '\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72' },
    { 'base': 'X', 'letters': '\u0058\u24CD\uFF38\u1E8A\u1E8C' },
    { 'base': 'Y', 'letters': '\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE' },
    { 'base': 'Z', 'letters': '\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762' },
    { 'base': 'a', 'letters': '\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250' },
    { 'base': 'aa', 'letters': '\uA733' },
    { 'base': 'ae', 'letters': '\u00E6\u01FD\u01E3' },
    { 'base': 'ao', 'letters': '\uA735' },
    { 'base': 'au', 'letters': '\uA737' },
    { 'base': 'av', 'letters': '\uA739\uA73B' },
    { 'base': 'ay', 'letters': '\uA73D' },
    { 'base': 'b', 'letters': '\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253' },
    { 'base': 'c', 'letters': '\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184' },
    { 'base': 'd', 'letters': '\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A' },
    { 'base': 'dz', 'letters': '\u01F3\u01C6' },
    { 'base': 'e', 'letters': '\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD' },
    { 'base': 'f', 'letters': '\u0066\u24D5\uFF46\u1E1F\u0192\uA77C' },
    { 'base': 'g', 'letters': '\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F' },
    { 'base': 'h', 'letters': '\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265' },
    { 'base': 'hv', 'letters': '\u0195' },
    { 'base': 'i', 'letters': '\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131' },
    { 'base': 'j', 'letters': '\u006A\u24D9\uFF4A\u0135\u01F0\u0249' },
    { 'base': 'k', 'letters': '\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3' },
    { 'base': 'l', 'letters': '\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747' },
    { 'base': 'lj', 'letters': '\u01C9' },
    { 'base': 'm', 'letters': '\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F' },
    { 'base': 'n', 'letters': '\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5' },
    { 'base': 'nj', 'letters': '\u01CC' },
    { 'base': 'o', 'letters': '\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275' },
    { 'base': 'oi', 'letters': '\u01A3' },
    { 'base': 'ou', 'letters': '\u0223' },
    { 'base': 'oo', 'letters': '\uA74F' },
    { 'base': 'p', 'letters': '\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755' },
    { 'base': 'q', 'letters': '\u0071\u24E0\uFF51\u024B\uA757\uA759' },
    { 'base': 'r', 'letters': '\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783' },
    { 'base': 's', 'letters': '\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B' },
    { 'base': 't', 'letters': '\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787' },
    { 'base': 'tz', 'letters': '\uA729' },
    { 'base': 'u', 'letters': '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289' },
    { 'base': 'v', 'letters': '\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C' },
    { 'base': 'vy', 'letters': '\uA761' },
    { 'base': 'w', 'letters': '\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73' },
    { 'base': 'x', 'letters': '\u0078\u24E7\uFF58\u1E8B\u1E8D' },
    { 'base': 'y', 'letters': '\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF' },
    { 'base': 'z', 'letters': '\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763' }
];
var semanaDias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
var semana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

Date.prototype.getMesString= function(){
    var mm=this.getMonth()
    ;
    return meses[mm].substring(0,1).toUpperCase()+meses[mm].substring(1).toLowerCase();
};
Date.prototype.getDiaSemanaString= function(){
    var mm=this.getDay();
    
    return semanaDias[mm].substring(0,1).toUpperCase()+semanaDias[mm].substring(1).toLowerCase();
};
Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('-');
};
Date.prototype.getTomorrow = function(){
    var time=this.getTime();
    
        time=time+(24*60*60*1000);
  
        var offBefore=this.getTimezoneOffset();
        
    var nuevo=new Date(time);
    var offAfter=nuevo.getTimezoneOffset();
    var dif=offAfter-offBefore;
    if(dif>0){
        time+=(dif*60*1000);
    }

    return new Date(time);
};
Date.prototype.getYesterday = function(times){
    if(!times){
        times=1;
    }
    var time=this.getTime();
    
    while(times>0){
        time=time-(24*60*60*1000);
        times--;
    }
        

        var offBefore=this.getTimezoneOffset();
        
    var nuevo=new Date(time);
    var offAfter=nuevo.getTimezoneOffset();
    var dif=offAfter-offBefore;
    if(dif>0){
        time+=(dif*60*1000);
    }

    return new Date(time);
};


function isUTCZero(date){
    
    return date.getUTCHours()==0 && date.getUTCMinutes()==0 && date.getUTCSeconds()==0 && date.getUTCMilliseconds()==0;

  }
  function getLocalDateFromString(string){
      //YYYY-MM-DD
      var date=new Date();
      var split=string.split("-");
      date.setFullYear(Number(split[0]));
      date.setMonth(Number(split[1])-1);
      date.setDate(Number(split[2]));
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);  
    //    console.warn("FECHA",date);

        return date;
  }

Date.prototype.getZeroHoursLocalDate = function(){
    var time=this.getTime();
  //  time=time+(this.getTimezoneOffset()*60*1000);
  /*if(isUTCZero(this)){
    time=time+(this.getTimezoneOffset()*60*1000);
  }*/

    var fecha=new Date();
    fecha.setDate(this.getDate());
    fecha.setMonth(this.getMonth());
    fecha.setFullYear(this.getFullYear());
    fecha.setHours(0);
    fecha.setMinutes(0);
    fecha.setSeconds(0);
    fecha.setMilliseconds(0);  
    time=fecha.getTime();
    
    return new Date(time);
};





Date.prototype.fullSpanishDate = function () {
    var dd = this.getDate();
    var mm = this.getMonth();
    var yyyy = this.getFullYear();

    var yearString = semana[this.getDay()] + " " + dd + " de " + meses[mm] + " de " + yyyy;

    var minutes = this.getMinutes();
    var hour = this.getHours();
    var pm = false;
    if (hour >= 12) {
        hour = hour - 12;
        pm = true;
    }
    var timeString;
    if (pm) {
        timeString = hour + ":" + (minutes > 9 ? '' : '0') + minutes + " PM";
    }
    else {

        timeString = hour + ":" + (minutes > 9 ? '' : '0') + minutes + " AM";
    }

    return timeString + ", " + yearString;

};
Date.prototype.fullTime = function () {
    var seconds = this.getSeconds();
    var minutes = this.getMinutes();
    var hour = this.getHours();
    var milliSeconds = this.getMilliseconds();
    var millis = milliSeconds + "";
    while (millis.length < 3) {
        millis = "0" + millis;

    }

    return [(hour > 9 ? '' : '0') + hour,
    (minutes > 9 ? '' : '0') + minutes,
    (seconds > 9 ? '' : '0') + seconds + "." + millis
    ].join(':');
};
var diacriticsMap = {};
for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
    var letters = defaultDiacriticsRemovalMap[i].letters;
    for (var j = 0; j < letters.length; j++) {
        diacriticsMap[letters[j]] = defaultDiacriticsRemovalMap[i].base;
    }
}

// "what?" version ... http://jsperf.com/diacritics/12
function removeDiacritics(str) {
    return str.replace(/[^\u0000-\u007E]/g, function (a) {
        return diacriticsMap[a] || a;
    });
}


var PolymerUtils = {
    getLocalDateFromString: function(string){
        return getLocalDateFromString(string);
    },
    addLongPressListener: function(listItem,action,time){
        
  
            // Create variable for setTimeout
            var delay;
            
            // Set number of milliseconds for longpress
            var longpress = time;
            if(!time){
                longpress=1300;
            }
            
          
            
            //var  listItem = listItems[i];
              var click=listItem.onClick;

            var done=false;
            listItem.addEventListener("click",function(e){
                e.preventDefault();
            });
             listItem.addEventListener('mousedown', function (e) {
                //var _this = this;
                
                done=false;
                delay = setTimeout(function(){
                    if(action){
                        action();
                    }
                    done=true;
                }, longpress);
                
                
              }, true);
              
              listItem.addEventListener('mouseup', function (e) {
                  if(!done && click){
                    click();
                  }
                // On mouse up, we know it is no longer a longpress
                clearTimeout(delay);
              });
              
              listItem.addEventListener('mouseout', function (e) {
                clearTimeout(delay);
              });
              
            
            
    },
    getCurrentLocation: function(callback){
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(callback,function(err){
              console.error("Geolocation error",err);
              if(err && err.code==1){
                PolymerUtils.Dialog.showErrorMessage({message:"Negaste el permiso para revisar tu ubicación actual.",positiveButton:{text: "Entendido"}});

              }
          },{enableHighAccuracy: false});
        } else { 
            if(callback){
                callback(null);
            }
          PolymerUtils.Dialog.showErrorMessage({message:"Tu navegador no es compatible con la geolocalización automática",positiveButton:{text: "Entendido"}});
        }
      },
    getLastDayOfMonth: function(index,origen){
        var date=new Date();
        if(origen){
            date=new Date(origen.getTime());
        }
        date.setMinutes(0);
        date.setHours(0);
        date.setMilliseconds(0);
        date.setSeconds(0);
        
        while(date.getDate()!=index){
            date=date.getYesterday();
        }
      //  console.log("Last day of week",date);
        return date;
    },
    getNextMonth: function(date){
        var fecha=new Date();
        if(date){
            fecha=new Date(date.getTime());
        }
        fecha.setMinutes(0);
        fecha.setHours(0);
        fecha.setMilliseconds(0);
        fecha.setSeconds(0);
        fecha.setDate(1);
        fecha.setMonth(fecha.getMonth()+1);
        return fecha;

    },
    getLastMonth: function(date){
        var fecha=new Date();
        if(date){
            fecha=new Date(date.getTime());
        }
        fecha.setMinutes(0);
        fecha.setHours(0);
        fecha.setMilliseconds(0);
        fecha.setSeconds(0);
        fecha.setDate(1);
        fecha.setMonth(fecha.getMonth()-1);
        return fecha;
        
    },
    getLastDayOfWeek: function(index,origen){

        var date=new Date();
        if(origen){
            date=new Date(origen.getTime());
        }
        date.setMinutes(0);
        date.setHours(0);
        date.setMilliseconds(0);
        date.setSeconds(0);
        
        while(date.getDay()!=index){
            date=date.getYesterday();
        }
      //  console.log("Last day of week",date);
        return date;
    },
    showFileInput:function(type,callback){
        var inputFile = document.createElement("input");
        inputFile.type="file";
        if(type){
         //   console.log("Type",type);
        
            inputFile.accept=type.join(",");
        }
        inputFile.style = "display:none;";
        inputFile.addEventListener("change",function(e){
          //  console.log("Saitama changed!",e.files,e);
          if(e.target.files && e.target.files[0]){
            if(callback)
            callback(e.target.files[0]);
            
          
          }
          else{
              PolymerUtils.Toast.show("No seleccionaste ningún archivo");
          }
          
            document.getElementById("unique-main-app-body-file-input").removeChild(inputFile);
        
        });
        
        document.getElementById("unique-main-app-body-file-input").appendChild(inputFile);
       
       // if(inputFile.tap)
       //inputFile.dispatchEvent("ontouchstart");
       // console.log();
       inputFile.click();

    },
    sendTouchEvent: function(x, y, element, eventType) {
        const touchObj = new Touch({
          identifier: Date.now(),
          target: element,
          clientX: x,
          clientY: y,
          radiusX: 2.5,
          radiusY: 2.5,
          rotationAngle: 10,
          force: 0.5,
        });
      
        const touchEvent = new TouchEvent(eventType, {
          cancelable: true,
          bubbles: true,
          touches: [touchObj],
          targetTouches: [],
          changedTouches: [touchObj],
          shiftKey: true,
        });
      
        element.dispatchEvent(touchEvent);
      },
      objectToArray: function(object,saveKey,firstLevel){
            if(!object){
                return null;
            }
           // console.log("COnverting to array!!!",object);
            var arreglo=[];
            var keys=Object.keys(object);
            for(var i=0;i<keys.length;i++){
                if(saveKey){
                    if(typeof(object[keys[i]])=="string"){
                        var obj={"value":object[keys[i]]};
                        obj[saveKey]=keys[i];
                        arreglo.push(obj);
                    }
                    else if(typeof(object[keys[i]])=="object"){
                        var obj=object[keys[i]];
                        obj[saveKey]=keys[i];
                        arreglo.push(obj);
                    }
                    
                }
                else{
                    arreglo.push(object[keys[i]]);
                }

                
            }
            return arreglo;
      },
    fixDataForFirebase: function (data,ignoreMissing) {
        var objectKeys = Object.keys(data);

        var fixed = {};
        if (Array.isArray(data)) {
            fixed = [];
        }
        if(typeof(ignoreMissing)=="undefined" || ignoreMissing==null){
            ignoreMissing=true;
        }
        for (var i = 0; i < objectKeys.length; i++) {
            var llave = objectKeys[i];
            var obj = data[llave];
            if (llave.startsWith("___")) {
                continue;
            }
            if(!ignoreMissing){
                if (typeof obj == "undefined" || obj == null || (typeof obj == "string" && obj.trim() == "")) {

                    return { "error": { "source": llave.replace("_number_", "").replace("_string_", "") } };
                }
            }
            else{
                if (typeof obj == "undefined" || obj == null || (typeof obj == "string" && obj.trim() == "")) {

                    continue;
                }
            }
            
            if (((typeof llave) == "string") && llave.startsWith("_number_")) {
                if (typeof obj == "string")
                    fixed[llave.replace("_number_", "")] = parseFloat(obj.trim());
                else fixed[llave.replace("_number_", "")] = obj;
            }
            else if (((typeof llave) == "string") && llave.startsWith("_string_")) {
                if (typeof obj == "string")
                    fixed[llave.replace("_string_", "")] = obj.trim();
                else fixed[llave.replace("_string_", "")] = (obj + "").trim();


            }
            else if(typeof obj=="object" && Object.prototype.toString.call(obj)=== '[object Date]'){
               // console.log("I'm a date",obj);
                fixed[llave]=obj;
            }

            else if (typeof obj == "object" || Array.isArray(obj)) {
                fixed[llave] = PolymerUtils.fixDataForFirebase(obj,ignoreMissing);

            }
            else {
                fixed[llave] = obj;
            }

            if(typeof(fixed[llave])=="string"){
                fixed[llave]=fixed[llave].trim();
            }
        }
        return fixed;
    },
  
    /**
     * Arreglo con la lista de nombres de los meses en español.
     * 
     */
    formatFolio:function(id,timestamp){
        var date=PolymerUtils.getDateFromTimestamp(timestamp);
        var mesActual=(date.getMonth()+1)+"";
        var anioActual=(date.getFullYear()+"").substring(2,4);
        if(mesActual.length<2){
          mesActual="0"+mesActual;
        }
        if(id.length<10){
          while(id.length<3){
            id="0"+id;
          }
          return "RACA-"+anioActual+"-"+mesActual+"-"+id;
        }
        else{
          return id;
        }
    
      },
    monthsNames:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
    formatCurrency: function(number,c, d, t){
        var n = number, 
        c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = d == undefined ? "." : d, 
        t = t == undefined ? "," : t, 
        s = n < 0 ? "-" : "", 
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
        j = (j = i.length) > 3 ? j % 3 : 0;
       return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
     },
     getDateObjectFromString: function(string){
        return new Date(string+" GMT-5");
     },
     convertHourStringToMinutes: function(hora){
        var horas=Number(hora.split(":")[0]);
        var minutos=Number(hora.split(":")[1]);
        return (horas*60)+minutos;
     },
     convertMinutesToHours: function(minutes){
        var horas=Math.floor(minutes/60);
        var pm=false;
        if(horas>=12){
            pm=true;            
        }
        if(horas>12){
            horas=horas-12;
        }
        var minutos=minutes%60;
        if(minutos<10){
            minutos="0"+minutos;
        }
        if(pm){
            return horas+":"+minutos+" PM";
        }
        else{
            return horas+":"+minutos+" AM";

        }

     },
    convertFirebaseTimestamp: function(timestamp){
        var tiempo=0;
        if(typeof timestamp=="object" && timestamp!=null && timestamp.seconds){
            var nanos=timestamp.nanoseconds+"";
            while(nanos.length<3){
                nanos="0"+nanos;

            }
            tiempo = Number(timestamp.seconds + "" + nanos.substring(0, 3));
            //  console.log(timestamp);
        }
        else {
            return timestamp;
        }
        return tiempo;

    },
    getDateFromTimestamp: function (timestamp) {

        if (typeof timestamp == "object" && timestamp != null && timestamp.seconds) {
            var nanos = timestamp.nanoseconds + "";
            while (nanos.length < 3) {
                nanos = "0" + nanos;
            }
            timestamp = Number(timestamp.seconds + "" + nanos.substring(0, 3));
            //console.log(timestamp);
        }

        var date = new Date(timestamp);
        if (!this.monthsNames[date.getMonth()]) {
            date = new Date(0);
            return null;
        }
        return date;
    },
    getFullSpanishDate: function(timestamp){
 // console.log(timestamp);   
 if (typeof timestamp == "object" && timestamp != null && timestamp.seconds) {
    var nanos = timestamp.nanoseconds + "";
    while (nanos.length < 3) {
        nanos = "0" + nanos;
    }
    timestamp = Number(timestamp.seconds + "" + nanos.substring(0, 3));
    //              console.log(timestamp);
}

var date = new Date(timestamp);
if (!this.monthsNames[date.getMonth()]) {
    date = new Date(0);

}

var fecha = date.getDate() + "/" + this.monthsNames[date.getMonth()].substring(0, 3) + "/" + date.getFullYear();
if (date.getTime() == 0) {
    return "principio";
}


return date.fullSpanishDate();

    },
    /**
     * Devuelve la estampa de tiempo con un formato legible de datos para el usuario.
    */
    getTimeString: function (timestamp) {
        // console.log(timestamp);   
        if (typeof timestamp == "object" && timestamp != null && timestamp.seconds) {
            var nanos = timestamp.nanoseconds + "";
            while (nanos.length < 3) {
                nanos = "0" + nanos;
            }
            timestamp = Number(timestamp.seconds + "" + nanos.substring(0, 3));
            //              console.log(timestamp);
        }

        var date = new Date(timestamp);
        if (!this.monthsNames[date.getMonth()]) {
            date = new Date(0);

        }

        var fecha = date.getDate() + "/" + this.monthsNames[date.getMonth()].substring(0, 3) + "/" + date.getFullYear();
        if (date.getTime() == 0) {
            return "principio";
        }


        return date.getHours() + ":" + (date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes()) + ", " + fecha;

    },
    getDateString: function (timestamp, yesterday) {
        // console.log(timestamp);   
        if (typeof timestamp == "object" && timestamp != null && timestamp.seconds) {
            var nanos = timestamp.nanoseconds + "";
            while (nanos.length < 3) {
                nanos = "0" + nanos;
            }
            timestamp = Number(timestamp.seconds + "" + nanos.substring(0, 3));
            //              console.log(timestamp);
        }

        var date = new Date(timestamp);
        if (!this.monthsNames[date.getMonth()]) {
            date = new Date(0);
        }
        if (yesterday) {

            date.setDate(date.getDate() - 1);

        }
        var fecha = date.getDate() + "/" + this.monthsNames[date.getMonth()].substring(0, 3) + "/" + date.getFullYear();

        return fecha;

    },

    objectEquals: function(a,b){
        if(a==null && b==null){
            return true;
        }
        if(a==null || b==null){
            return false;
        }

     //   console.log("A",a,"B",b);
        var aKeys=Object.keys(a);
        var bKeys=Object.keys(b);
        if(aKeys.length==bKeys.length){
            var cierto=true;
            for(var i=0;i<aKeys.length;i++){
                if(b[aKeys[i]]!=a[aKeys[i]]){
                    cierto=false;
                    break;
                }
            }
       //     console.log("Cierto",cierto);
            return cierto;
        }

        return false;
    },
    getHourString: function (timestamp) {
        // console.log(timestamp);   
        if (typeof timestamp == "object" && timestamp != null && timestamp.seconds) {
            var nanos = timestamp.nanoseconds + "";
            while (nanos.length < 3) {
                nanos = "0" + nanos;
            }
            timestamp = Number(timestamp.seconds + "" + nanos.substring(0, 3));
            //              console.log(timestamp);
        }

        var date = new Date(timestamp);
        if (!this.monthsNames[date.getMonth()]) {
            date = new Date(0);
        }
        //                     var fecha=date.getDate()+"/"+this.monthsNames[date.getMonth()].substring(0,3)+"/"+date.getFullYear();

        return date.getHours() + ":" + (date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes());

    },

    isEnterKey: function (e) {
        return e.keyCode == 13;
    },
    arrayContainsObjectWithField: function (array, field, value) {
        if (!array) {
            console.log("Error readin non-array: " + array);
            return false;
        }
        for (var i = 0; i < array.length; i++) {
            var object = array[i];
            if (object[field] == value) {
                return true;
            }
        }
        return false;
    },
    iterateArray: function (array, action) {
        if (!array) {
            console.log("Error readin non-array: " + array);
            return;
        }
        if (!action) {
            console.log("No action function defined for iteration");
            return;
        }
        for (var i = 0; i < array.length; i++) {
            if (action) {
                action(array[i], i);
            }
        }

    },
    cloneIntoContext: function (original, context) {
        if (!original) {
            return;
        }
        if (original instanceof Array) {
            return;
        }
        else {
            var keys = Object.keys(original);
            //var copy={};
            for (var i = 0; i < keys.length; i++) {
                context[keys[i]] = original[keys[i]];
            }
            // return copy;
        }
    },
     isPrimitive: function(test) {
        return (test !== Object(test));
    },
    isFunction: function(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
       },
    cloneObject: function (original,firstLevel) {
        if (!original) {
            return null;
        }
        if(this.isFunction(original)){
            return null;
        }
        if(original)
        if (original instanceof Array) {
            var copy = [];
            for (var i = 0; i < original.length; i++) {
                if(!firstLevel)
                copy[i] = this.cloneObject(original[i]);
                else copy[i]=original[i];
            }
            return copy;
        }
        else {
            var keys = Object.keys(original);
            var copy = {};
            for (var i = 0; i < keys.length; i++) {
                var obj=original[keys[i]];
                if(this.isPrimitive(original[keys[i]])){
                    copy[keys[i]] = (original[keys[i]]);
                    
                }
                else if(typeof obj=="object" && Object.prototype.toString.call(obj)=== '[object Date]'){

                    copy[keys[i]] = (original[keys[i]]);
                }
                else{
                    if(!firstLevel)
                    copy[keys[i]] = this.cloneObject(original[keys[i]]);
                    else 
                    copy[keys[i]] = (original[keys[i]]);
                }
            }
            return copy;
        }

    },
    removeUndefinedFields: function (object) {
        if (!object) {
            return;
        }
        var keys = Object.keys(object);
        for (var i = 0; i < keys.length; i++) {
            var field = object[keys[i]];
            if (typeof field == "undefined" || field == null) {
                delete object[keys[i]];
            }
        }
    },
    elementToClassName: function(string){
        var array=string.split("-");
        var className="";
        for(var i=0;i<array.length;i++){
            var word=array[i];
            className=className+word.substring(0,1).toUpperCase()+word.substring(1).toLowerCase();
        }
        return className;
    },
    stringToFunction: function(str) {
        str=PolymerUtils.elementToClassName(str);
        console.log("cLASS NAME",str);
        var arr = str.split(".");

      
        var fn = (window);
        //for (var i = 0, len = arr.length; i < len; i++) {
          fn = fn[str];
        //}
      console.log(fn);
        if (typeof fn !== "function") {
          throw new Error("function not found");
        }
      
        return  fn;
      },
      Dialog:{
        showSuccessMessage: function(options){
            var opts={type: (options.type ? options.type : "with-backdrop"),
            
                title:{
                    text: (options.title ? options.title : "¡Éxito!"),
                    style: "background-color: var(--paper-green-600); color: white; font-weight: 600;"
                },
                titleIcon:{
                    icon: "check",
                    style: "color: white;"
                  },
                message:{
                    text: options.message,
                    style: "font-weight: 500; color: white; font-size: 18px;"
                },
                
                style: "width: 500px; background-color: var(--paper-green-600);",
                smallStyle: "width: 100% !important;",
                
            };
            if(options.positiveButton){
                opts.positiveButton={
                    text: options.positiveButton.text,
                    action: options.positiveButton.action,
                    style: "color: white;"  
                };
            }
            if(options.negativeButton){
                opts.negativeButton={
                    text: options.negativeButton.text,
                    action: options.negativeButton.action,
                    style: "color: white;"  
                };
            }
            PolymerUtils.Dialog.createAndShow(opts);
        },
        showErrorMessage: function(options){
            var opts={type: (options.type ? options.type : "with-backdrop"),
            
                title:{
                    text: (options.title ? options.title : "Error"),
                    style: "background-color: var(--paper-red-600); color: white; font-weight: 600;"
                },
                titleIcon:{
                    icon: "close",
                    style: "color: white; "
                  },
                message:{
                    text: options.message,
                    style: "font-weight: 500; color: white; font-size: 18px;"
                },
                
                style: "width: 500px; background-color: var(--paper-red-600);",
                smallStyle: "width: 100% !important;",
                
            };
            if(options.positiveButton){
                opts.positiveButton={
                    text: options.positiveButton.text,
                    action: options.positiveButton.action,
                    style: "color: white;"  
                };
            }
            if(options.negativeButton){
                opts.negativeButton={
                    text: options.negativeButton.text,
                    action: options.negativeButton.action,
                    style: "color: white;"  
                };
            }
            PolymerUtils.Dialog.createAndShow(opts);
        },
        _appendTitle: function(title,titleIcon,titleContainer,emptyDialog){
while (titleContainer.firstChild) {
    titleContainer.removeChild(titleContainer.firstChild);
}


            var titleDiv=document.createElement("div");
                
                    titleDiv.setAttribute("style","flex-grow: 100;")
                    var h2=document.createElement("div");
                    h2.setAttribute("style","display: flex; flex-wrap: wrap; line-height: 32px;  background-color: #E0E0E0; font-weight: 400; font-size: 26px; padding: 20px 24px;");
                    if(!emptyDialog){
                        h2.setAttribute("style",h2.getAttribute("style")+"border-radius: 6px 6px 0 0;");
                    }
                    if(title.style){
                        h2.setAttribute("style",h2.getAttribute("style")+title.style);
                    }
                    if(titleIcon){
                        var leftIcon=document.createElement("iron-icon");
                        if(titleIcon.icon)
                        leftIcon.icon=titleIcon.icon;
                        if(titleIcon.style){
                            leftIcon.setAttribute("style",leftIcon.getAttribute("style")+"min-height: 35px; min-width: 35px; height: 35px; width: 35px; margin-right: 12px;"+titleIcon.style);
                        
                        }
                        else{
                            leftIcon.setAttribute("style",leftIcon.getAttribute("style")+"min-height: 35px; min-width: 35px;  height: 35px; width: 35px; margin-right: 12px;"); 
                        
                        }
                        
                        h2.appendChild(leftIcon);
                    }
                    h2.appendChild(titleDiv);
                    var iconButton=null;
                    if(title.iconButton){
                        iconButton=document.createElement("paper-icon-button");
                        
                        iconButton.icon=title.iconButton.icon;
                        h2.appendChild(iconButton);
                        if(title.iconButton.action){
                            var iconAccion=function(){
                                title.iconButton.action(dialog,element);
                            };
                            otherFunctions.push({"name":"click","elemento":iconButton,"funcion":iconAccion});
                            iconButton.addEventListener("click",iconAccion);
                  
                        }

                    }
                if(typeof(title)=="object"){
                   // h2.innerText=options.title.string;
                    titleDiv.innerHTML=title.text;
                   }
                else{
                    
//                    h2.innerText=options.title;
                    titleDiv.innerHTML=title;

                }
                titleContainer.appendChild(h2);
              
                
        },
        createAndShow: function(options){
            
            var element=null;
            if(options.element){
                if(options.params){
                    var pams=options.params;
                    var helper=document.createElement(options.element);
                    element=new helper.constructor(...pams);
                    delete helper;
                    helper=null;
//                    delete element;
  //                  element=new element.constructor(...pams);
                }
                else{
                    element=document.createElement(options.element);

                }
                if(element._dialogOptions){
                    //console.log("ELEMENT HAS OPTIONS!!!!!!!",element._dialogOptions);
                    var innerOpts=element._dialogOptions;
                    var lll=Object.keys(innerOpts);
                    for(var i=0;i<lll.length;i++){
                        if(innerOpts[lll[i]])
                        options[lll[i]]=innerOpts[lll[i]];
                    }
                    /*if(innerOpts.title){
                        options.title=innerOpts.title;

                    }   
                    if(innerOpts.message){
                        options.message=innerOpts.message;
                    }     
                    if(innerOpts.positiveButton){
                        options.positiveButton=innerOpts.positiveButton;
                    }
                    if(innerOpts.negativeButton){
                        options.negativeButton=innerOpts.negativeButton;
                    }*/
                }
            }
            var otherFunctions=[];
            var style = document.createElement('style');
            style.type = 'text/css';
            if(options.smallStyle){
                
              /*  if(options.smallStyle){

            
                style.innerHTML = '.small-class {'+options.smallStyle+'}';
                }

            */
            style.innerHTML = '.small-class {'+options.smallStyle+'}';
            }
            var dialog=document.createElement("paper-dialog");
            //console.log(dialog.style);
            dialog.appendChild(style);

            dialog.setAttribute("style","border-radius: 6px;");
            if(options.showCloseButton){
                var closeButt=document.createElement("paper-icon-button");
                closeButt.setAttribute("style", "width: 40px; height: 40px; padding: 8px !important; margin: 0 !important; color: var(--paper-grey-600); position: absolute; top: 12px; right: 12px; z-index: 999;");
                closeButt.setAttribute("icon","icons:close");
                closeButt.addEventListener("click",function(){
                    dialog.close();
                });
                PolymerUtils.Tooltip.registerTooltip(closeButt,"Cerrar");
                dialog.appendChild(closeButt);
                
            }
            if(options.extraTitleElement){
                var divo=document.createElement("div");
                divo.innerHTML=options.extraTitleElement.html;
                if(options.extraTitleElement.action){
                    divo.addEventListener("click",function(){
                        options.extraTitleElement.action(dialog,element);
                    });
                }
                dialog.appendChild(divo);
                
            }
            var spinner=null;
            if(options.saveSpinner && options.saveSpinner.enabled!=false){
                var saveDiv=document.createElement("div");
                saveDiv.setAttribute("style","margin: 0 !important;");
                var estilo = document.createElement('style');
                
            estilo.type = 'text/css';
            estilo.innerHTML=`.spinner{
                position: absolute; top: 0; right: 0; left: 0; bottom: 0;
                opacity: 0;
                display: none;
                border-radius: 6px;
                
                background-color: white;
                text-align: center;
                transition: opacity 0.5s;
                z-index: -1;
              }
              .spinner.saving{
                  display: block;
                opacity: 1;
                z-index: 999 !important;
              }`;
              spinner=document.createElement("div");
              spinner.classList.add("spinner");

                var htmlText=`
                <div style="width: 100%; height: 100%; display: flex; 
                align-items: center;
                justify-content: center;
                flex-direction: column;">
              <div style="font-size: 16px;">[[spinnerText]]</div>
              <br />
              <paper-spinner active></paper-spinner>
              </div>`;

              if(options.saveSpinner.message){
                htmlText=htmlText.replace("[[spinnerText]]",options.saveSpinner.message);
              }
              else{
                htmlText=htmlText.replace("[[spinnerText]]","");

              }
              spinner.innerHTML=htmlText;
              spinner.appendChild(estilo);
              /*saveDiv.addEventListener("click",function(){
                  dialog.setSaving(false);
              });*/
              saveDiv.appendChild(spinner);
              dialog.appendChild(saveDiv);
              dialog.setSaving=function(saving){
                dialog.saving=saving;
                if(saving){
                    spinner.classList.add("saving");    
                }
                else{
                    spinner.classList.remove("saving");

                }
              //  console.log("Setting saving",saving);
              };
              if(options.saveSpinner.saving){
                  dialog.setSaving(true);
              }
            }

            if(options.style){
                dialog.setAttribute("style",dialog.getAttribute("style")+options.style);
            }
            var scrollable=document.createElement("paper-dialog-scrollable");
            if(options.nonScrollable){
                scrollable=document.createElement("div");
            }
            /*if(options.emptyDialog){
                var scrollableStyle=document.createElement("style");
                scrollableStyle.innerHTML=`
                --paper-dialog-scrollable: {
                    padding: 0px !important;
                  }`;
                  scrollable.appendChild(scrollableStyle);  
                  scrollable.setAttribute("style",scrollable.getAttribute("style")+"padding: 0 !important; background-color: red;");
            }*/

            /*var scrollableStyle=document.createElement("style");
            scrollableStyle.innerHTML=`--paper-dialog-scrollable: {
                max-width: 100% !important;
              };`;
              scrollable.appendChild(scrollableStyle);*/

           /*   if(options.scrollableStyle){
                var scrollableStyle=document.createElement("style");
                scrollableStyle.innerHTML=`
                --paper-dialog-scrollable: {
                    padding: 0px !important;
                  }`;
              scrollable.appendChild(scrollableStyle);
           //     scrollable.querySelector("#scrollable")
            //    scrollable.setAttribute("style",scrollable.getAttribute("style")+options.scrollableStyle);
              }*/
            if(options.element){

               // var MyClass = PolymerUtils.stringToFunction(options.element);
               // element= new MyClass();
                 
                
               
                // instance.do();
                
                //element=new options.element
                
                element._dialog=dialog;
                /*if(dialog.saving && spinner!=null){
                    spinner.classList.add("saving");   
                }*/
                scrollable.appendChild(element);

              //  console.log(element._dialogOptions);
                    
                }
            if(options.type){
                var type=options.type;
                if(type=="with-backdrop"){

                    dialog.withBackdrop=true;
                }
                else if(type=="modal"){

                    dialog.modal=true;
                }
                else{

                    dialog.withBackdrop=false;
                    dialog.modal=false;
                }

            }
            else{
                dialog.withBackdrop=true;

            }
            

            dialog.entryAnimation="scale-up-animation";
            dialog.exitAnimation="fade-out-animation";
            var divGenial=document.createElement("div");
            divGenial.innerText="Genial";
            var titleContainer=document.createElement("div");
            titleContainer.setAttribute("style","margin-top: 0 !important; padding: 0 !important;");
            if(options.title){
                
                PolymerUtils.Dialog._appendTitle(options.title,options.titleIcon,titleContainer,dialog.classList.contains("small-class"));
            }
            dialog.appendChild(titleContainer);
            dialog.reloadTitle=function(){
                if(options.title){
                    PolymerUtils.Dialog._appendTitle(options.title,options.titleIcon,titleContainer,dialog.classList.contains("small-class"));
            
                }
                
            };
            dialog.updateTitle=function(titulo){
                options.title=titulo;
                if(titulo){
                    PolymerUtils.Dialog._appendTitle(titulo,options.titleIcon,titleContainer,dialog.classList.contains("small-class"));
            
                }
              };
             
            if(options.message){
                var message=document.createElement("p");
                message.setAttribute("style","font-weight: 400; font-size: 17px; color: var(--paper-grey-700); line-height: 25px;");
                if(options.message.style){
                    message.setAttribute("style",message.getAttribute("style")+options.message.style);
                }
               if(typeof(options.message)=="object"){
                message.innerHTML=options.message.text;
               
               }
               else{
                message.innerHTML=options.message;
               
               }
                dialog.appendChild(message);
            }
            
            
            
            var elementReadyListener=null;
                if(options.element && options.elementReady){
                    elementReadyListener=function(e){
                        if(e.target.tagName.toLowerCase()=="paper-dialog")
                        options.elementReady(element,dialog);
                    };
                    dialog.addEventListener("iron-overlay-opened",elementReadyListener);
                }
            var dialogClosedListener=null;
            if(options.onDialogClosed){
                dialogClosedListener=function(e){
                var parent=
                    document.getElementById("unique-main-app-body-dialog-div");
                    if(e.target.tagName.toLowerCase()==("paper-dialog") && parent.contains(dialog)){
                        options.onDialogClosed(dialog,element);
                    }

                };
                dialog.addEventListener("iron-overlay-closed",dialogClosedListener);

            }
            
            dialog.appendChild(scrollable);
          
      if(options.positiveButton || options.negativeButton){

      
            var buttons=document.createElement("div");
            buttons.className="buttons";

            if(options.negativeButton){

                var cancelButton=document.createElement("paper-button");
                cancelButton.setAttribute("style","font-weight: 500;");
                cancelButton.classList.add("negativeButtonClassForLayout");
                cancelButton.innerText=options.negativeButton.text;
                cancelButton.raised=(options.negativeButton.raised==true);
                if(options.negativeButton.style){
                    cancelButton.setAttribute("style",
                    cancelButton.getAttribute("style")+options.negativeButton.style);
                }
                if(options.negativeButton.action){
                    var negativeFunction=function(){
                        options.negativeButton.action(dialog,element);
                    
                    };
                    otherFunctions.push({"name":"click","elemento":cancelButton,"funcion":negativeFunction});
                    cancelButton.addEventListener("click",negativeFunction);
                }
                else{
                    var negativeFunction=function(){
                        dialog.close();
                    
                    };
                    otherFunctions.push({"name":"click","elemento":cancelButton,"funcion":negativeFunction});
                    cancelButton.addEventListener("click",negativeFunction);
                }
                buttons.appendChild(cancelButton);
            }
            if(options.positiveButton){
                var okButton=document.createElement("paper-button");
                okButton.setAttribute("style","font-weight: 500;");
                okButton.classList.add("positiveButtonClassForLayout");
                okButton.raised=(options.positiveButton.raised==true);
                if(options.positiveButton.style){
                    okButton.setAttribute("style",
                    okButton.getAttribute("style")+options.positiveButton.style);
                }
                okButton.innerText=options.positiveButton.text;
                if(options.positiveButton.action){
                    var positiveFunction=function(){
                        options.positiveButton.action(dialog,element);
                    
                    };
                    otherFunctions.push({"name":"click","elemento":okButton,"funcion":positiveFunction});
                    okButton.addEventListener("click",positiveFunction);
                }
                else{
                    var positiveFunction=function(){
                        dialog.close();
                    
                    };
                    otherFunctions.push({"name":"click","elemento":okButton,"funcion":positiveFunction});
                    okButton.addEventListener("click",positiveFunction);
                }
                buttons.appendChild(okButton);
            }
            dialog.appendChild(buttons);
            
      }


     // dialog.appendChild()
            var ironMediaQuery=document.createElement("iron-media-query");
            ironMediaQuery.query="(max-width: 640px)";
            var funcion=function(e){
                var small=e.detail.value;
           //     console.log("I'm small!!!!!!!!",small);
                if(small){
                    dialog.classList.add("small-class");
                    
                }
                else{
                    dialog.classList.remove("small-class");
                }
                if(options.onSmallChanged){
                    options.onSmallChanged(dialog);
                  }
            };
            ironMediaQuery.addEventListener("query-matches-changed",funcion);
            dialog.appendChild(ironMediaQuery);
           
            return PolymerUtils.Dialog.show(dialog,funcion,otherFunctions,elementReadyListener,dialogClosedListener);
        },

        show: function (dialog,funcion,otherFunctions,elementReadyListener,dialogClosedListener) {
            dialog.addEventListener("iron-overlay-closed", function (e) {
                //if(e.detail.target.id=="dialog")
             //   if (e.detail.target.name == "dialog") {
                var parent=
                    document.getElementById("unique-main-app-body-dialog-div");
                    if(e.target.tagName.toLowerCase()==("paper-dialog") && parent.contains(dialog)){
                       // console.log("Removing dialog");
                       if(elementReadyListener){
                        dialog.removeEventListener("iron-overlay-opened",elementReadyListener);

                       }
                       if(dialogClosedListener){
                        dialog.removeEventListener("iron-overlay-closed",dialogClosedListener);

                       }
                        if(funcion){
                            dialog.removeEventListener("query-matches-changed",funcion);
                   //         console.log("Removed funcion!!!!");
                        }
                        if(otherFunctions){
                            for(var i=0;i<otherFunctions.length;i++){
                                var functionObject=otherFunctions[i];
                                functionObject.elemento.removeEventListener(functionObject.name,functionObject.funcion);
                      //          console.log("Removed function from ",functionObject);
                            }
                        }
                        parent.removeChild(dialog);
                 //       console.log("Removed dialog!!!!!");
                    }
                   
               // }
                //console.log("Child removed");
            });
            document.getElementById("unique-main-app-body-dialog-div").appendChild(dialog);
            dialog.open();
            return dialog;
        }
    },
    Tooltip:{
        registerTooltip: function(target,message){
            target.addEventListener("mouseover",function(evo){
                PolymerUtils.Tooltip.show(evo,message);

            });

          },
        show: function(event,value){
            var offsetX=0;
            var offsetY=15;
            var x = event.clientX+offsetX;
            var y = event.clientY+offsetY;
           if(!value){
               return;
           }
         //   console.log(event);
          //  console.log("EVent x",x);
           // console.log("EVent y",y);
        
            var div=document.createElement("div");
            div.setAttribute("style",`opacity: 0.9; position: fixed; z-index: 999 !important; top: `+y+`px; left: `+x+`px; background-color: #212121; color: white; padding: 2px 8px; border-radius: 3px; font-size: 15px;`);
            div.innerText=value;    
            var parent=
            document.getElementById("unique-main-app-body-tooltip-div");
            var target=event.target;
            //var cursorOriginal=target.style.cursor;
            //target.style.cursor="pointer";
            var moveFunc, clickFunc, outFunc;
            moveFunc=function(moveEvent){
        
                var x = moveEvent.clientX+offsetX;
                var y = moveEvent.clientY+offsetY;
               // console.log("Moved",x,y);
                div.style.top=y+"px";
                div.style.left=x+"px";
            };
            clickFunc=function(){
                while(parent.firstChild){
               
                    parent.removeChild(parent.firstChild);
                   
                }
               // target.style.cursor=cursorOriginal;
                target.removeEventListener("mouseout",outFunc);    
                target.removeEventListener("mousemove",moveFunc);   
                target.removeEventListener("click",clickFunc);    
            };
            
            div.addEventListener("click",clickFunc);
            outFunc=function(){
                while(parent.firstChild){
               
                    parent.removeChild(parent.firstChild);
                   
                }
               // target.style.cursor=cursorOriginal;
                target.removeEventListener("mouseout",outFunc);    
                target.removeEventListener("mousemove",moveFunc);    
                target.removeEventListener("click",clickFunc);    
            };
            while(parent.firstChild){
               
                parent.removeChild(parent.firstChild);
               
            }
            target.addEventListener("mousemove",moveFunc);
            target.addEventListener("click",clickFunc);
            target.addEventListener("mouseout",outFunc);
           // console.log(div);
            parent.appendChild(div);
        }
    },
      /*
    Dialog:{
        showSuccessMessage: function(options){
            var opts={type: (options.type ? options.type : "with-backdrop"),
            
                title:{
                    text: (options.title ? options.title : "¡Éxito!"),
                    style: "background-color: var(--paper-green-600); color: white; font-weight: 600;"
                },
                titleIcon:{
                    icon: "check",
                    style: "color: white;"
                  },
                message:{
                    text: options.message,
                    style: "font-weight: 500; color: white; font-size: 18px;"
                },
                
                style: "width: 500px; background-color: var(--paper-green-600);",
                smallStyle: "width: 100% !important;",
                
            };
            if(options.positiveButton){
                opts.positiveButton={
                    text: options.positiveButton.text,
                    action: options.positiveButton.action,
                    style: "color: white;"  
                };
            }
            if(options.negativeButton){
                opts.negativeButton={
                    text: options.negativeButton.text,
                    action: options.negativeButton.action,
                    style: "color: white;"  
                };
            }
            PolymerUtils.Dialog.createAndShow(opts);
        },
        showErrorMessage: function(options){
            var opts={type: (options.type ? options.type : "with-backdrop"),
            
                title:{
                    text: (options.title ? options.title : "Error"),
                    style: "background-color: var(--paper-red-600); color: white; font-weight: 600;"
                },
                titleIcon:{
                    icon: "close",
                    style: "color: white; "
                  },
                message:{
                    text: options.message,
                    style: "font-weight: 500; color: white; font-size: 18px;"
                },
                
                style: "width: 500px; background-color: var(--paper-red-600);",
                smallStyle: "width: 100% !important;",
                
            };
            if(options.positiveButton){
                opts.positiveButton={
                    text: options.positiveButton.text,
                    action: options.positiveButton.action,
                    style: "color: white;"  
                };
            }
            if(options.negativeButton){
                opts.negativeButton={
                    text: options.negativeButton.text,
                    action: options.negativeButton.action,
                    style: "color: white;"  
                };
            }
            PolymerUtils.Dialog.createAndShow(opts);
        },
        
        createAndShow: function(options){
            
            var element=null;
            if(options.element){
                if(options.params){
                    var pams=options.params;
                    var helper=document.createElement(options.element);
                    element=new helper.constructor(...pams);
                    delete helper;
                    helper=null;
//                    delete element;
  //                  element=new element.constructor(...pams);
                }
                else{
                    element=document.createElement(options.element);

                }
                if(element._dialogOptions){
                    var innerOpts=element._dialogOptions;
                    var lll=Object.keys(innerOpts);
                    for(var i=0;i<lll.length;i++){
                        if(innerOpts[lll[i]])
                        options[lll[i]]=innerOpts[lll[i]];
                    }
                    /*if(innerOpts.title){
                        options.title=innerOpts.title;

                    }   
                    if(innerOpts.message){
                        options.message=innerOpts.message;
                    }     
                    if(innerOpts.positiveButton){
                        options.positiveButton=innerOpts.positiveButton;
                    }
                    if(innerOpts.negativeButton){
                        options.negativeButton=innerOpts.negativeButton;
                    }*
                }
            }
            var otherFunctions=[];
            var style = document.createElement('style');
            style.type = 'text/css';
            if(options.smallStyle){if(options.smallStyle){

            
                style.innerHTML = '.small-class {'+options.smallStyle+'}';
                }

            
            style.innerHTML = '.small-class {'+options.smallStyle+'}';
            }
            var dialog=document.createElement("paper-dialog");
            //console.log(dialog.style);
            dialog.appendChild(style);

            dialog.setAttribute("style","border-radius: 6px;");
            console.log("Checking options for saveSpinner",options);
            if(options.saveSpinner && options.saveSpinner.enabled!=false){
                var saveDiv=document.createElement("div");
                saveDiv.setAttribute("style","margin: 0 !important;");
                var estilo = document.createElement('style');
                
            estilo.type = 'text/css';
            estilo.innerHTML=`.spinner{
                position: absolute; top: 0; right: 0; left: 0; bottom: 0;
                opacity: 0;
                display: none;
                border-radius: 6px;
                
                background-color: white;
                text-align: center;
                transition: opacity 0.5s;
                z-index: -1;
              }
              .spinner.saving{
                  display: block;
                opacity: 1;
                z-index: 999 !important;
              }`;
              var spinner=document.createElement("div");
              spinner.classList.add("spinner");

                var htmlText=`
                <div style="width: 100%; height: 100%; display: flex; 
                align-items: center;
                justify-content: center;
                flex-direction: column;">
              <div style="font-size: 16px;">[[spinnerText]]</div>
              <br />
              <paper-spinner active></paper-spinner>
              </div>`;

              if(options.saveSpinner.message){
                htmlText=htmlText.replace("[[spinnerText]]",options.saveSpinner.message);
              }
              else{
                htmlText=htmlText.replace("[[spinnerText]]","");

              }
              spinner.innerHTML=htmlText;
              spinner.appendChild(estilo);
              /*saveDiv.addEventListener("click",function(){
                  dialog.setSaving(false);
              });*
              saveDiv.appendChild(spinner);
              dialog.appendChild(saveDiv);
              dialog.setSaving=function(saving){
                dialog.saving=saving;
                if(saving){
                    spinner.classList.add("saving");    
                }
                else{
                    spinner.classList.remove("saving");

                }
              //  console.log("Setting saving",saving);
              };
              console.log("Set saving created as function!!!!!!!!!!!!!!!!!!!");
              if(options.saveSpinner.saving){
                  dialog.setSaving(true);
              }
            }

            if(options.style){
                dialog.setAttribute("style",dialog.getAttribute("style")+options.style);
            }
            var scrollable=document.createElement("paper-dialog-scrollable");
            /*var scrollableStyle=document.createElement("style");
            scrollableStyle.innerHTML=`--paper-dialog-scrollable: {
                max-width: 100% !important;
              };`;
              scrollable.appendChild(scrollableStyle);*
            if(options.element){

               // var MyClass = PolymerUtils.stringToFunction(options.element);
               // element= new MyClass();
                 
                
               
                // instance.do();
                
                //element=new options.element
                
                element._dialog=dialog;
                scrollable.appendChild(element);
              //  console.log(element._dialogOptions);
                    
                }
            if(options.type){
                var type=options.type;
                if(type=="with-backdrop"){

                    dialog.withBackdrop=true;
                }
                else if(type=="modal"){

                    dialog.modal=true;
                }
                else{

                    dialog.withBackdrop=false;
                    dialog.modal=false;
                }

            }
            else{
                dialog.withBackdrop=true;

            }
            

            dialog.entryAnimation="scale-up-animation";
            dialog.exitAnimation="fade-out-animation";
            var divGenial=document.createElement("div");
            divGenial.innerText="Genial";
            if(options.title){
                var titleDiv=document.createElement("div");
                
                    titleDiv.setAttribute("style","flex-grow: 100;")
                    var h2=document.createElement("div");
                    h2.setAttribute("style","display: flex; flex-wrap: wrap; margin: 0 !important; line-height: 32px; border-radius: 6px 6px 0 0; background-color: #E0E0E0; font-weight: 400; font-size: 26px; padding-top: 20px; padding-bottom: 20px;");
                    if(options.title.style){
                        h2.setAttribute("style",h2.getAttribute("style")+options.title.style);
                    }
                    if(options.titleIcon){
                        var leftIcon=document.createElement("iron-icon");
                        if(options.titleIcon.icon)
                        leftIcon.icon=options.titleIcon.icon;
                        if(options.titleIcon.style){
                            leftIcon.setAttribute("style",leftIcon.getAttribute("style")+"min-height: 35px; min-width: 35px; height: 35px; width: 35px; margin-right: 12px;"+options.titleIcon.style);
                        
                        }
                        else{
                            leftIcon.setAttribute("style",leftIcon.getAttribute("style")+"min-height: 35px; min-width: 35px;  height: 35px; width: 35px; margin-right: 12px;"); 
                        
                        }
                        
                        h2.appendChild(leftIcon);
                    }
                    h2.appendChild(titleDiv);
                    var iconButton=null;
                    if(options.title.iconButton){
                        iconButton=document.createElement("paper-icon-button");
                        
                        iconButton.icon=options.title.iconButton.icon;
                        h2.appendChild(iconButton);
                        if(options.title.iconButton.action){
                            var iconAccion=function(){
                                options.title.iconButton.action(dialog,element);
                            };
                            otherFunctions.push({"name":"click","elemento":iconButton,"funcion":iconAccion});
                            iconButton.addEventListener("click",iconAccion);
                  
                        }

                    }
                if(typeof(options.title)=="object"){
                   // h2.innerText=options.title.string;
                    titleDiv.innerHTML=options.title.text;
                   }
                else{
                    
//                    h2.innerText=options.title;
                    titleDiv.innerHTML=options.title;

                }
                dialog.appendChild(h2);
              
                
            }

            if(options.message){
                var message=document.createElement("p");
                message.setAttribute("style","font-weight: 400; font-size: 17px; color: var(--paper-grey-700); line-height: 25px;");
                if(options.message.style){
                    message.setAttribute("style",message.getAttribute("style")+options.message.style);
                }
               if(typeof(options.message)=="object"){
                message.innerHTML=options.message.text;
               
               }
               else{
                message.innerHTML=options.message;
               
               }
                dialog.appendChild(message);
            }
            
            
            
            var elementReadyListener=null;
                if(options.element && options.elementReady){
                    elementReadyListener=function(e){
                        if(e.target.tagName.toLowerCase()=="paper-dialog")
                        options.elementReady(element);
                    };
                    dialog.addEventListener("iron-overlay-opened",elementReadyListener);
                }
            
            dialog.appendChild(scrollable);
          
      if(options.positiveButton || options.negativeButton){

      
            var buttons=document.createElement("div");
            buttons.className="buttons";

            if(options.negativeButton){

                var cancelButton=document.createElement("paper-button");
                cancelButton.setAttribute("style","font-weight: 500;");
                cancelButton.classList.add("negativeButtonClassForLayout");
                cancelButton.innerText=options.negativeButton.text;
                cancelButton.raised=(options.negativeButton.raised==true);
                if(options.negativeButton.style){
                    okButton.setAttribute("style",
                    okButton.getAttribute("style")+options.negativeButton.style);
                }
                if(options.negativeButton.action){
                    var negativeFunction=function(){
                        options.negativeButton.action(dialog,element);
                    
                    };
                    otherFunctions.push({"name":"click","elemento":cancelButton,"funcion":negativeFunction});
                    cancelButton.addEventListener("click",negativeFunction);
                }
                else{
                    var negativeFunction=function(){
                        dialog.close();
                    
                    };
                    otherFunctions.push({"name":"click","elemento":cancelButton,"funcion":negativeFunction});
                    cancelButton.addEventListener("click",negativeFunction);
                }
                buttons.appendChild(cancelButton);
            }
            if(options.positiveButton){
                var okButton=document.createElement("paper-button");
                okButton.setAttribute("style","font-weight: 500;");
                okButton.classList.add("positiveButtonClassForLayout");
                okButton.raised=(options.positiveButton.raised==true);
                if(options.positiveButton.style){
                    okButton.setAttribute("style",
                    okButton.getAttribute("style")+options.positiveButton.style);
                }
                okButton.innerText=options.positiveButton.text;
                if(options.positiveButton.action){
                    var positiveFunction=function(){
                        options.positiveButton.action(dialog,element);
                    
                    };
                    otherFunctions.push({"name":"click","elemento":okButton,"funcion":positiveFunction});
                    okButton.addEventListener("click",positiveFunction);
                }
                else{
                    var positiveFunction=function(){
                        dialog.close();
                    
                    };
                    otherFunctions.push({"name":"click","elemento":okButton,"funcion":positiveFunction});
                    okButton.addEventListener("click",positiveFunction);
                }
                buttons.appendChild(okButton);
            }
            dialog.appendChild(buttons);
            
      }


     // dialog.appendChild()
            var ironMediaQuery=document.createElement("iron-media-query");
            ironMediaQuery.query="(max-width: 640px)";
            var funcion=function(e){
                var small=e.detail.value;
           //     console.log("I'm small!!!!!!!!",small);
                if(small){
                    dialog.classList.add("small-class");
                }
                else{
                    dialog.classList.remove("small-class");
                }
            };
            ironMediaQuery.addEventListener("query-matches-changed",funcion);
            dialog.appendChild(ironMediaQuery);
           
            return PolymerUtils.Dialog.show(dialog,funcion,otherFunctions,elementReadyListener);
        },

        show: function (dialog,funcion,otherFunctions,elementReadyListener) {
            dialog.addEventListener("iron-overlay-closed", function (e) {
                //if(e.detail.target.id=="dialog")
             //   if (e.detail.target.name == "dialog") {
                var parent=
                    document.getElementById("unique-main-app-body-dialog-div");
                    if(e.target.tagName.toLowerCase()==("paper-dialog") && parent.contains(dialog)){
                       // console.log("Removing dialog");
                       if(elementReadyListener){
                           dialog.removeEventListener("iron-overlay-opened",elementReadyListener);

                       }
                        if(funcion){
                            dialog.removeEventListener("query-matches-changed",funcion);
                   //         console.log("Removed funcion!!!!");
                        }
                        if(otherFunctions){
                            for(var i=0;i<otherFunctions.length;i++){
                                var functionObject=otherFunctions[i];
                                functionObject.elemento.removeEventListener(functionObject.name,functionObject.funcion);
                      //          console.log("Removed function from ",functionObject);
                            }
                        }
                        parent.removeChild(dialog);
                 //       console.log("Removed dialog!!!!!");
                    }
                   
               // }
                //console.log("Child removed");
            });
            document.getElementById("unique-main-app-body-dialog-div").appendChild(dialog);
            dialog.open();
            return dialog;
        }
    },*/
    GeoLocation:{
        /**
 * Get locations within a bounding box defined by a center point and distance from from the center point to the side of the box;
 *
 * @param {Object} area an object that represents the bounding box
 *    around a point in which locations should be retrieved
 * @param {Object} area.center an object containing the latitude and
 *    longitude of the center point of the bounding box
 * @param {number} area.center.latitude the latitude of the center point
 * @param {number} area.center.longitude the longitude of the center point
 * @param {number} area.radius (in kilometers) the radius of a circle
 *    that is inscribed in the bounding box;
 *    This could also be described as half of the bounding box's side length.
 * @return {Promise} a Promise that fulfills with an array of all the
 *    retrieved locations
 */
queryLocations: function(area) {
    // calculate the SW and NE corners of the bounding box to query for
    const box = PolymerUtils.GeoLocation.boundingBoxCoordinates(area.center, area.radius);
  
    // construct the GeoPoints
    const lesserGeopoint = new firebase.firestore.GeoPoint(box.swCorner.latitude, box.swCorner.longitude);
    const greaterGeopoint = new firebase.firestore.GeoPoint(box.neCorner.latitude, box.neCorner.longitude);
  
    // construct the Firestore query
    let query = firebase.firestore().collection('addresses').where('location', '>', lesserGeopoint).where('location', '<', greaterGeopoint);
  
    // return a Promise that fulfills with the locations
    return query.get()
      .then((snapshot) => {
        const allLocs = []; // used to hold all the loc data
        var counter=0;
        snapshot.forEach((loc) => {
          // get the data
          const data = loc.data();
          data._key=loc.id;
          // calculate a distance from the center
          data.distanceFromCenter = PolymerUtils.GeoLocation.distance(area.center, data.location);
          // add to the array
          counter++;

          if(data.distanceFromCenter<=area.radius)
          allLocs.push(data);
        });
        console.log("COunter locations",counter);
        return allLocs;
      })
      .catch((err) => {
        return new Error('Error while retrieving events');
      });
  },
        wrapLongitude:function(longitude) {
            if (longitude <= 180 && longitude >= -180) {
              return longitude;
            }
            const adjusted = longitude + 180;
            if (adjusted > 0) {
              return (adjusted % 360) - 180;
            }
            // else
            return 180 - (-adjusted % 360);
          },
          metersToLongitudeDegrees: function(distance, latitude) {
            const EARTH_EQ_RADIUS = 6378137.0;
            // this is a super, fancy magic number that the GeoFire lib can explain (maybe)
            const E2 = 0.00669447819799;
            const EPSILON = 1e-12;
            const radians = this.degreesToRadians(latitude);
            const num = Math.cos(radians) * EARTH_EQ_RADIUS * Math.PI / 180;
            const denom = 1 / Math.sqrt(1 - E2 * Math.sin(radians) * Math.sin(radians));
            const deltaDeg = num * denom;
            if (deltaDeg < EPSILON) {
              return distance > 0 ? 360 : 0;
            }
            // else
            return Math.min(360, distance / deltaDeg);
          },
          /**
 * Calculates the SW and NE corners of a bounding box around a center point for a given radius;
 *
 * @param {Object} center The center given as .latitude and .longitude
 * @param {number} radius The radius of the box (in kilometers)
 * @return {Object} The SW and NE corners given as .swCorner and .neCorner
 */
degreesToRadians: function(degrees) {return (degrees * Math.PI)/180;},
boundingBoxCoordinates:function(center, radius) {
    const KM_PER_DEGREE_LATITUDE = 110.574;
    const latDegrees = radius / KM_PER_DEGREE_LATITUDE;
    const latitudeNorth = Math.min(90, center.latitude + latDegrees);
    const latitudeSouth = Math.max(-90, center.latitude - latDegrees);
    // calculate longitude based on current latitude
    const longDegsNorth = this.metersToLongitudeDegrees(radius, latitudeNorth);
    const longDegsSouth = this.metersToLongitudeDegrees(radius, latitudeSouth);
    const longDegs = Math.max(longDegsNorth, longDegsSouth);
    return {
      swCorner: { // bottom-left (SW corner)
        latitude: latitudeSouth,
        longitude: this.wrapLongitude(center.longitude - longDegs),
      },
      neCorner: { // top-right (NE corner)
        latitude: latitudeNorth,
        longitude: this.wrapLongitude(center.longitude + longDegs),
      },
    };
  },/**
  * Calculates the distance, in kilometers, between two locations, via the
  * Haversine formula. Note that this is approximate due to the fact that
  * the Earth's radius varies between 6356.752 km and 6378.137 km.
  *
  * @param {Object} location1 The first location given as .latitude and .longitude
  * @param {Object} location2 The second location given as .latitude and .longitude
  * @return {number} The distance, in kilometers, between the inputted locations.
  */
 distance(location1, location2) {
   const radius = 6371; // Earth's radius in kilometers
   const latDelta = this.degreesToRadians(location2.latitude - location1.latitude);
   const lonDelta = this.degreesToRadians(location2.longitude - location1.longitude);
 
   const a = (Math.sin(latDelta / 2) * Math.sin(latDelta / 2)) +
           (Math.cos(this.degreesToRadians(location1.latitude)) * Math.cos(this.degreesToRadians(location2.latitude)) *
           Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2));
 
   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
 
   return radius * c;
 }
    },
    
Toast:{
    /** 
     * Muestra el paper-toast conseguido llamando a la función newToast.
     * Los parámetros se explican en la función newToast
    */

    show: function (message, duration, wideLayout, dialog, buttonText, buttonColor) {
        this.newToast(message, duration, wideLayout, dialog, buttonText, buttonColor).open();
    },
    /** 
     * Crea un nuevo paper-toast.
     * 
     * Recibe los siguientes parámetros:
     * - message: El mensaje a mostrar en el paper-toast.
     * - duration: la duración en pantalla del toast, en milisegundos
     * - dialog: objeto de paper-dialog, en caso de que el toast se deba mostrar 
     *      sobre el overlay de un dialog con "with-backdrop" o con "modal"
     * - buttonText: (opcional) texto que se mostrará como un botón a la derecha del toast.
     * - buttonColor: (opcional) color deol botón que se mostrará a la derecha del toast.
     *  
    */
    newToast: function (message, duration, dialog, buttonText, buttonColor) {
        wideLayout = document.body.clientWidth <= 640;
        var t = message;
        var d = duration;
        var toast = document.createElement("paper-toast");

        toast.text = t;

        if (buttonText) {
            var but = document.createElement("paper-button");
            but.style.cssText = "text-transform:none; color: " + (buttonColor || "#2196F3") + ";"

            but.innerHTML = buttonText;
            toast.appendChild(but);
        }
        if (d != null)
            toast.duration = d;
        if (wideLayout) {
            toast.style = "width: 100%;" +
                "min-width: 0;" +
                "border-radius: 0;" +
                "padding-top: 12px;" +
                "margin: 0;";
        }
        else {
            toast.style = "";
        }

        toast.addEventListener("iron-overlay-closed", function () {
            if (dialog)
                dialog.removeChild(toast);
            else
                document.getElementById("unique-main-app-body-toast-div").removeChild(toast);
            //console.log("Child removed");
        });
        //dynamicEl.cities = this.officesCities;
        //    if(dialog)
        //    dialog.appendChild(toast);
        //    else
        
        document.getElementById("unique-main-app-body-toast-div").appendChild(toast);

        return toast;
    }


}


    /*
   showOldDialog: function(dialog){
       dialog.addEventListener("iron-overlay-closed",function(e){
             //if(e.detail.target.id=="dialog")
             document.getElementById("unique-main-app-body-dialog-div").removeChild(dialog);
             
             //console.log("Child removed");
         });
         document.getElementById("unique-main-app-body-dialog-div").appendChild(dialog);
         dialog.open();
   },*/
    /*showDateSelector: function(dialog){
        dialog.addEventListener("iron-overlay-closed",function(e){
              //if(e.detail.target.id=="dialog")
              document.getElementById("unique-main-app-body-dialog-div").removeChild(dialog);
              
              //console.log("Child removed");
          });
          document.getElementById("unique-main-app-body-dialog-div").appendChild(dialog);
          dialog.open();
    },*/
};






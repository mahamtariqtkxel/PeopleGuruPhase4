/*
*  PeopleGuru.js
*  Copyright © 2012 PeopleGuru Software Inc. 
*
*  Created:      July 6, 2014 RSC
*/



//basic browser detection flags
var KioskYn = false;
$.xhrPool = [];
$.xhrPool.abortAll = function () {
    $(this).each(function (i, jqXHR) {   //  cycle through list of recorded connection
        jqXHR.abort();  //  aborts connection
        $.xhrPool.splice(i, 1); //  removes from list by index
    });
}
$.ajaxSetup({
    beforeSend: function (jqXHR) {
        if (this.url.indexOf("GetHelpInfo") < 0 && this.url.indexOf("Chat") < 0 && this.url.indexOf("ScheduleTemplates") < 0)
            $.xhrPool.push(jqXHR);
    }, //  annd connection to list
    complete: function (jqXHR) {
        var i = $.xhrPool.indexOf(jqXHR);   //  get index for current connection completed
        if (i > -1) $.xhrPool.splice(i, 1); //  removes from list by index
    }
});

MSIE = (navigator.userAgent.indexOf("MSIE") > -1);
MSIEVER = MSIE && parseFloat(navigator.appVersion.split('MSIE')[1]);
MSIE6 = MSIE && Math.floor(MSIEVER) == 6.0;
MSIE7 = MSIE && Math.floor(MSIEVER) == 7.0;
MSIE8 = MSIE && Math.floor(MSIEVER) == 8.0;
FIREFOX = (navigator.userAgent.toLowerCase().indexOf("firefox") > -1);
SAFARI = (navigator.userAgent.toLowerCase().indexOf("safari") > -1);
CHROME = (navigator.userAgent.toLowerCase().indexOf("chrome") > -1);
APPLEMOBILE = (navigator.userAgent.toLowerCase().indexOf("ipad") > -1) || (navigator.userAgent.toLowerCase().indexOf("iphone") > -1);

var MIN_TIMEOUT = 17.0;
var LAST_SYNC = null;
var LAST_SERVER_SYNC = new Date().getTime();
var sessionTimeoutH;
var sessionTimeoutCountdown;
var sessionTimeoutCountdownSeconds;

var adhocApi = null;
var adhocApiReady = false;
var adhocApiLoading = false;

function initAdHocSession() {
    
    if (!adhocApiLoading) {
        adhocApiLoading = true;
        if (adhocApi === null) {
            jQuery.ajaxSetup({ async: true });
            $.get("../../System/AdHocReporting/AdHocSession.aspx", initAdHocSession_cb);
        }
    }
    
}

function initAdHocSession_cb(data) {
    if (adhocApi === null) {
        var response = $.parseJSON(data);
        adhocApi = new ExagoApi(response.AdHocBaseUrl, response.AdHocApiKey, initAdHocSession_cbready, true);
            
    }
}

function initAdHocSession_cbready() {
    adhocApiReady = true;
}

var dialogLogoutInstance;


getTimeOutFormatted = function () {
    var minutes = "00";
    var sec = sessionTimeoutCountdownSeconds;

    if (sec > 60) {
        minutes = "01";
        sec = sec - 60;
    }

    return minutes + ":" + (sec < 10 ? '0' : '') + sec.toFixed(0);
}


sessionLogoutVerification = function () {

    sessionTimeoutCountdownSeconds = 60;

    if (sessionTimeoutH)
        clearTimeout(sessionTimeoutH);

    if (sessionTimeoutCountdown)
        clearTimeout(sessionTimeoutCountdown);

    if (dialogLogoutInstance)
        dialogLogoutInstance.close();

    

    var dirtyYn = false;

    if ($(".track-changes").length > 0)
        dirtyYn = true;

    if (typeof (templatesViewModel) != "undefined" && templatesViewModel != null) {
        if (templatesViewModel.DirtyYn())
            dirtyYn = true;
    }

    if (typeof (timecardTemplate) != "undefined" && timecardTemplate != null) {
        if (timecardTemplate.DirtyYn())
            dirtyYn = true;
    }

    var msg = "Are you still there? If not, we will close this session in <div style='display: contents' class='inactivity-countdown'>" + getTimeOutFormatted() + "</div>.";

    if (dirtyYn) {
        sessionTimeoutCountdownSeconds = 120;
        msg = "Are you still there? If not, we will close this session in <div style='display: contents' class='inactivity-countdown'>" + getTimeOutFormatted() + "</div> and unsaved changes will be lost.";
    }

    var btns = [];

    btns.push({
        label: "I'm here",
        action: function () {
            if (dialogLogoutInstance)
                dialogLogoutInstance.close();

            if (sessionTimeoutCountdown)
                clearTimeout(sessionTimeoutCountdown);

            jQuery.ajaxSetup({ async: true });
            $.get("../../System/Start/SessionRefresh.aspx");
            LAST_SERVER_SYNC = new Date().getTime();
            LAST_SYNC = new Date().getTime();
            sessionTimeoutH = setTimeout(sessionTimeout, (1000.0 * sessionTimeoutCountdownSeconds * MIN_TIMEOUT));

        }
    })

    dialogLogoutInstance = new BootstrapDialog({
        title: "Inactivity Timeout",
        message: msg,
        buttons: btns
    });

    dialogLogoutInstance.open();

    sessionLogoutVerificationCountdown();

    
}

sessionLogoutVerificationCountdown = function () {

    if (sessionTimeoutCountdown)
        clearTimeout(sessionTimeoutCountdown);

    sessionTimeoutCountdownSeconds = sessionTimeoutCountdownSeconds - 1;

    if (sessionTimeoutCountdownSeconds > 0) {

        
        $(".inactivity-countdown").html(getTimeOutFormatted());

        sessionTimeoutCountdown = setTimeout(sessionLogoutVerificationCountdown, 1000.0);
    }
    else {
        $(".PageContent").trigger("divFrameUnload");
        top.location = '../../System/Start/Logout.aspx?timeout=1';
    }
   
}


sessionTimeout = function () {
    sessionLogoutVerification();
}
 
resetSessionTimeout = function () {

    var now = new Date().getTime();

    if (sessionTimeoutH)
        clearTimeout(sessionTimeoutH);

    if (dialogLogoutInstance)
        dialogLogoutInstance.close();

    if (((now - LAST_SERVER_SYNC) / (1000 * 60)) >= 2) {
        jQuery.ajaxSetup({ async: true });
        $.get("../../System/Start/SessionRefresh.aspx");

        LAST_SERVER_SYNC = now;

        if (LAST_SYNC == null) {
            LAST_SYNC = now;
            sessionTimeoutH = setTimeout(sessionTimeout, (1000.0 * 60.0 * MIN_TIMEOUT));
        }
        else if (((now - LAST_SYNC) / (1000.0 * 60.0)) < MIN_TIMEOUT) {
            LAST_SYNC = now;
            clearTimeout(sessionTimeoutH);
            sessionTimeoutH = setTimeout(sessionTimeout, (1000.0 * 60.0 * MIN_TIMEOUT));
        }
        else {
            clearTimeout(sessionTimeoutH);
            sessionLogoutVerification();
        }
    }
    else {
        LAST_SYNC = now;
        clearTimeout(sessionTimeoutH);
        sessionTimeoutH = setTimeout(sessionTimeout, (1000.0 * 60.0 * MIN_TIMEOUT));
    }
}

if (typeof (PeopleGuru) != "undefined") {
    PeopleGuru._AspNetPrefix = 'ctl00_';
}


function formatDate(dt) {
    return (dt.getMonth() + 1) + '/' + dt.getDate() + '/' + dt.getFullYear();
}


Cookie = {
    supports: function () {
        try {
            document.cookie = 'cookiez=true';

            if (Cookie.get('cookiez') == 'true') {
                Cookie.remove('cookiez');
                return true;
            } else {
                return false;
            }
        } catch (ex) { return false; }
    },

    set: function (name, value, expires, path, domain, secure) {
        if (!Cookie.supports())
            return false;

        if (typeof (expires) == 'number')
            expires = addDays(new Date(), expires);

        document.cookie = name + '=' + escape(value) +
        ((expires) ? '; expires=' + expires.toGMTString() : '') +
        ((path) ? '; path=' + path : '') +
        ((domain) ? '; domain=' + domain : '') +
        ((secure) ? '; secure' : '');

        return true;
    },

    get: function (name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        } else {
            begin += 2;
        }
        var end = document.cookie.indexOf(";", begin);

        if (end == -1)
            end = dc.length;

        return unescape(dc.substring(begin + prefix.length, end));
    },

    remove: function (name, path, domain) {
        if (Cookie.get(name)) {
            document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        }
    }
}

function addDays(dt, days) {
    return new Date(dt.getTime() + days * 24 * 60 * 60 * 1000);
}

function setComboItem(combo, item) {
    if (typeof (combo) == 'string')
        combo = _mg(combo);

    if (combo) {
        //exact match
        for (var i = 0; i < combo.options.length; ++i) {
            if (combo.options[i].value == String(item) || combo.options[i].text == String(item)) {
                combo.selectedIndex = i;
                return;
            }
        }

        //case sensitive match
        for (var i = 0; i < combo.options.length; ++i) {
            var rx = new RegExp(String(item));
            if (combo.options[i].value.match(rx) || combo.options[i].text.match(rx)) {
                combo.selectedIndex = i;
                return;
            }
        }

        //case insensitive match
        for (var i = 0; i < combo.options.length; ++i) {
            var rx = new RegExp(String(item), "i");
            if (combo.options[i].value.match(rx) || combo.options[i].text.match(rx)) {
                combo.selectedIndex = i;
                return;
            }
        }
    }
}

// returns the server-side ID of the screen field. eg: 'ctl00_ScreenPH_cmdButtons_1' --> 'cmdButtons_1'
function unMangle(id) {
    var rx = new RegExp(PeopleGuru._AspNetPrefix + 'ScreenPH_(.+)');

    if (id.match(rx)) {
        return RegExp.$1;
    }
    return '';
}

// returns the mangled name given the server-side ID. eg: 'cmdButtons_1' --> 'ctl00_ScreenPH_cmdButtons_1'
function mangle(id) {
    return PeopleGuru._AspNetPrefix + (id.substring(0, 2) == 'vs' ? '' : 'ScreenPH_') + id;
}

// returns the control index based on a non-mangled field ID. eg: 'cmdButtons_1' -> '1'
function getControlIndex(id) {
    var rx = new RegExp('[^_]+_([0-9]{1,4})');

    if (id.match(rx))
        return RegExp.$1;

    return '';
}

function isEditMode() {
    return /insert|update/i.test(document.getElementById(mangle('vsEditMode')).value);
}

function isScreenObject() {
    return getScreenId() != '-1';
}

function getScreenId() {
    if (window.location.toString().match(/\/(val|det|tab|wiz)([0-9]{1,5})(\.aspx\?{0,1})/gim)) {
        return RegExp.$2;
    } else {
        return '-1';
    }
}

if (typeof (stopEvent) == 'undefined') {
    function stopEvent(event) {
        if (window.attachEvent) {
            event.returnValue = false;
            event.cancelBubble = true;
        } else {
            event.preventDefault();
            event.stopPropagation();
        }

        if (window.attachEvent)
            event.keyCode = 0;

        return false;
    }
}

if (typeof (_mg) == 'undefined') {
    _mg = function (something) {
        if (typeof (something) != 'string')
            return something;
        return $("[id$='" + something + "']")[0];
    }
}
if (typeof (_mgg) == 'undefined') {
    _mgg = function (something) {
        return _mg(PeopleGuru._AspNetPrefix + something);
    }
}

var StringExtensions = {
    left: function (text, n) {
        if (n < 1)
            return '';
        else if (n > String(text).length)
            return text;
        else
            return String(text).substring(0, n);
    },

    right: function (text, n) {
        if (n < 1) {
            return '';
        }
        if (n > String(text).length) {
            return text;
        }
        else {
            var len = String(text).length;
            return String(text).substring(len, len - n);
        }
    },

    ltrim: function (text) {
        return (text || '').replace(/^\s+/, '');
    },

    rtrim: function (text) {
        return (text || '').replace(/\s+$/, '');
    },

    trim: function (text) {
        return (text || '').replace(/^\s+|\s+$/g, '');
    }
}


if (window.String.prototype) {
    String.prototype.left = function (n) {
        return StringExtensions.left(this, n);
    }

    String.prototype.right = function (n) {
        return StringExtensions.right(this, n);
    }

    String.prototype.rtrim = function () {
        return StringExtensions.rtrim(this);
    }

    String.prototype.ltrim = function () {
        return StringExtensions.ltrim(this);
    }

    String.prototype.trim = function () {
        return StringExtensions.trim(this);
    }
}


if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str) {
        return str.length > 0 && this.substring(0, str.length) === str;
    }
};

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (str) {
        return str.length > 0 && this.substring(this.length - str.length, this.length) === str;
    }
};


//a routine to return a function object bound to an object instance,
//used to call a function and set the 'this' context for the function
if (typeof (Function.prototype.bind) == 'undefined') {
    Function.prototype.bind = function (object) {
        var __method = this;
        return function () {
            __method.apply(object, arguments);
        };
    };
}

function openDocument(href,targetOverride,returnYn) {
    if (href == "")
        PeopleGuru.showDialog("Open Document", "This document is empty.", OK);
    else
    {
        if (MobilePlatformID > 0)
        {
            var target = "_system";

            if (targetOverride)
                target = targetOverride;

            if (returnYn)
                return cordova.InAppBrowser.open(href, target, 'location=yes,toolbar=yes,enableViewportScale=yes');
            else
                cordova.InAppBrowser.open(href, target, 'location=yes,toolbar=yes,enableViewportScale=yes');
               
                
        }
        if (KioskYn)
        {
            window.location(href);
        }
        else
        {
            if (returnYn)
                return window.open(href);
            else
                window.open(href);
        }
        
            
    }
      
}

//opens the attachment window for the screen object
function showAttachmentWindow(caption) {
    var id, obj, screenId;
    caption = caption || 'Attachments';
    obj = _mgg('vsEmployeeId');

    if (obj)
        id = obj.value;
    else
        id = _mgg('vsRowId').value;

    screenId = getScreenId();

    top.showOverlay('../SysForms/AttachmentManager.aspx?m=&' + (isEditMode() ? 'e=&' : '') + 'oid=' + screenId + '&rid=' + (id || '-1'));

    return false;
}


var holDates = "";

function changeMonthYear(year, month, inst) {
    var filterEmployeeId = parent.getCurNavEmployeeId();
    jQuery.ajaxSetup({ async: false });
    $.get("../SysForms/getCalendarDates.aspx?employeeId=" + escape(filterEmployeeId) + "&month=" + month.toString() + "&year=" + year.toString(), assignHolDates);
}

function assignHolDates(data) { if (data) { holDates = eval("(" + data + ')'); } }

function highlightDate (date) {
    var _class = "";
    var _tip = "";
    var ret;
    if (holDates) {
        $.each(holDates, function (i, item) {
            ret = isInholDates(date, item);
            if (ret[0] == true) { _tip = ret[1]; _class = i.toString();}
        });
    }
    return [true, _class, _tip];
}

function isInholDates(pDate, pHolDates) {
    var dates = pHolDates;
    var date = pDate;
    var dmy = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
    for (var i = 0; i < dates.length; i++) {
        if (dmy.toString() == dates[i].date.toString()) {return [true, dates[i].description];}
    }
    return [false,""];
}

//shows the calendar for the given textbox
function showCalendar(event, textbox, mangled) {
    if (typeof (PeopleGuru._AspNetPrefix) == 'undefined') { PeopleGuru._AspNetPrefix = 'ctl00_'; }
    if (typeof (mangled) == 'undefined') { mangled = true; }
    var tb = document.getElementById(mangled ? (PeopleGuru._AspNetPrefix + 'ScreenPH_' + textbox) : textbox);

    if (tb.readOnly || tb.disabled) {
        if (tb.id.match(/txtFields/)) { alert('You must be in edit mode in order to modify the date!'); }
        else { alert('The date field is not editable!'); }
        return;
    }
    var date;
    if (isDate(tb.value) == true) {date = new Date(tb.value);} else { date = new Date(); }
    var year = date.getFullYear();
    var month = (date.getMonth() + 1);
    jQuery.ajaxSetup({ async: false });

    var filterEmployeeId = parent.getCurNavEmployeeId();
    $.get("../SysForms/getCalendarDates.aspx?employeeId=" + escape(filterEmployeeId) + "&month=" + month.toString() + "&year=" + year.toString(), assignHolDates);
    $(function () {
        $(document).ready(function () {
            $(tb).datepicker('show');
        });
    });

}

//shows the calendar for the given textbox
function showCalendarFiltered(event, textbox, mangled, employeeID, filterType) {
    var filterEmployeeId = employeeID;

    if (typeof (PeopleGuru._AspNetPrefix) == 'undefined') {PeopleGuru._AspNetPrefix = 'ctl00_';}
    if (typeof (mangled) == 'undefined') { mangled = true; }
    var tb = document.getElementById(mangled ? (PeopleGuru._AspNetPrefix + 'ScreenPH_' + textbox) : textbox);

    if (tb.readOnly || tb.disabled) {
        if (tb.id.match(/txtFields/)) { alert('You must be in edit mode in order to modify the date!'); }
        else { alert('The date field is not editable!'); }
        return;
    }

    var date;
    if (isDate(tb.value) == true) {
        date = new Date(tb.value);
        var year = date.getFullYear();
        var month = (date.getMonth() + 1);
        jQuery.ajaxSetup({ async: false });
        $.get("../SysForms/getCalendarDates.aspx?employeeId=" + escape(filterEmployeeId) + " &month=" + month.toString() + "&year=" + year.toString(), assignHolDates);
    }
}

if (typeof (isInteger) == 'undefined') {
    isInteger = function (value) {
        var rs = false;
        try {
            var num = parseInt(value);
            if (isNaN(num))
                rs = false;
            else rs = true;
        } catch (ex) { }
        return rs;
    }
}

if (typeof (isNumeric) == 'undefined') {
    isNumeric = function (value) {
        var rs = false;
        try {
            var num = parseFloat(value);
            if (isNaN(num))
                rs = false;
            else rs = true;
        } catch (ex) { }
        return rs;
    }
}

if (typeof (isDate) == 'undefined') {
    isDate = function (value) {
        var rs = false;
        try {
            var d = Date.parse(value);
            if (isNaN(d))
                rs = false;
            else rs = true;
        } catch (ex) { }
        return rs;
    }
}

function refreshPage() {
    var url = window.location.toString();
    url = url.replace(/now\=[0-9]+\&?/gi, '');
    if (url.indexOf('?') < 0)
        url = url + '?';
    if (url.substr(url.length - 1, 1) == '&')
        window.location = url + 'now=' + (new Date()).getTime().toString();
    else
        window.location = url + '&now=' + (new Date()).getTime().toString();
}


function runCrystalReport(objectID) {
    top.showOverlay('../SysForms/ReportFilter.aspx?m=&r=' + objectID);
}


function $screen(url) {
    top.frames.hr2oScreen.location = url;
}


SecurePage = {};

//global reference for help window
SecurePage.HelpWindow = null;

//help event handler
SecurePage.onHelp = function (helpCode) {
    var helpID = _mg('HelpContextID') ? _mg('HelpContextID').value : '-1';

    if (helpID.length < 1)
        helpID = '-1';

    //if the window exists, try to focus it, if that fails, invoke our create function. If the window doesn't exist, create it!
    if (typeof (SecurePage.HelpWindow) != 'undefined' && SecurePage.HelpWindow != null) {
        try {
            SecurePage.HelpWindow.focus();
        } catch (ex) {
            createHelpWindow();
        }
    } else {
        createHelpWindow();
    }

    return false;
}

//setup browser function reference
window.onhelp = SecurePage.onHelp;

function openHelp(helpCode) {SecurePage.onHelp(helpCode);}

function showAuditActivity(divId,title, trx, ee, contextID, contextString, tableName, msg) {
    trx = trx || '';
    contextID = contextID || '';
    contextString = contextString || '';
    tableName = tableName || '';
    msg = msg || '';
    title = title || '';
    ee = ee || '';

    showFrame(divId, 'TempAuditFrame', '../../System/Admin/ViewActivity.aspx?m=&title=' + encodeURIComponent(title) + '&trx=' + encodeURIComponent(trx) + '&ee=' + encodeURIComponent(ee) + '&ci=' + contextID + '&cs=' + encodeURIComponent(contextString) + '&t=' + encodeURIComponent(tableName) + '&msg=' + encodeURIComponent(msg));
}

function parsePageName() {
    var startIndex = window.location.toString().indexOf('SysForms/');
    var url = window.location.toString().substr(startIndex + 9);
    var aspxIndex = url.indexOf('.aspx');

    url = url.substring(0, aspxIndex);

    return url;
}

//global reference for help window
PeopleGuru.HelpWindow = null;

//help event handler
PeopleGuru.onHelp = function () {

    var helpContextID = parsePageName();


    createHelpWindow();

    return false;
    //if the window exists, try to focus it, if that fails, invoke our create function. If the window doesn't exist, create it!
    if (typeof (PeopleGuru.HelpWindow) != 'undefined' && PeopleGuru.HelpWindow != null) {
        try {
            PeopleGuru.HelpWindow.focus();
        } catch (ex) {
            createHelpWindow();
        }
    } else {
        createHelpWindow();
    }

    return false;
}


window.onhelp = PeopleGuru.onHelp;

window.onkeypress = function (event) {

}

function getDocumentHeight() {
    var d = document;
    return Math.max(
        Math.max(d.body.scrollHeight, d.documentElement.scrollHeight),
        Math.max(d.body.offsetHeight, d.documentElement.offsetHeight),
        Math.max(d.body.clientHeight, d.documentElement.clientHeight)
    );
}

function getDocumentWidth() {
    var d = document;
    return Math.max(
        Math.max(d.body.scrollWidth, d.documentElement.scrollWidth),
        Math.max(d.body.offsetWidth, d.documentElement.offsetWidth),
        Math.max(d.body.clientWidth, d.documentElement.clientWidth)
    );
}

function getQuerystring(key, default_) {
    if (default_ == null) default_ = "";
    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var qs = regex.exec(window.location.href);
    if (qs == null)
        return default_;
    else
        return qs[1];
}

function GetAbsFilePath(catName, pageName)
{
    var path = "";
    switch (catName.toLowerCase()) {
        case "sysimg":
            path = getRootWebSitePath() + "/System/Img/" + pageName;
            break;
        case "scrimg":
            path = getRootWebSitePath() + "/Screens/Img/" + pageName
            break;
        case "admin":
            path = getRootWebSitePath() + "/System/Admin/" + pageName;
            break;
        case "start":
            path = getRootWebSitePath() + "/System/Start/" + pageName;
            break;
        case "global":
            path = getRootWebSitePath() + "/Global/" + pageName;
            break;
        case "logos":
            path =  getRootWebSitePath() + "/Logos/" + pageName;
            break;
        case "social":
            path = getRootWebSitePath() + "/System/Social/" + pageName;
            break;
        case "smicons":
            path =  getRootWebSitePath() + "/smicons/" + pageName;
            break;
        case "tab":
            path = getRootWebSitePath() + "/Screens/tab/" + pageName;
            break;
        case "sav":
            path = getRootWebSitePath() + "/Screens/sav/" + pageName;
            break;
        case "det":
            path = getRootWebSitePath() + "/Screens/det/" + pageName;
            break;
        case "val":
            path =  getRootWebSitePath() + "/Screens/val/" + pageName;
            break;
        case "wiz":
            path =  getRootWebSitePath() + "/Screens/wiz/" + pageName;
            break;
        case "content":
            path = getRootWebSitePath() + "/Content/" + pageName;
            break;
        case "report":
            path = getRootWebSitePath() + "/System/Report/" + pageName;
            break;
        case "system":
            path = getRootWebSitePath() + "/System/" + pageName
            break;
        case "skins":
            path = getRootWebSitePath() + "/skins/" + pageName;
            break;
        case "time":
            path = getRootWebSitePath() + "/System/time/" + pageName;
            break;
        case "screens":
            path = getRootWebSitePath() + "/Screens/" + pageName
            break;
        case "workflows":
            path = getRootWebSitePath() + "/System/Workflows/" + pageName
        case "root":
            path = getRootWebSitePath()  + pageName
            break;
        case "sysforms":
            path = getRootWebSitePath() + "/SysForms/" + pageName
            break;
    }
    return path;
    
}

function getRootWebSitePath()
{
    var _location = document.location.toString();
    var applicationNameIndex = _location.indexOf('/', _location.indexOf('://') + 3);
    var applicationName = _location.substring(0, applicationNameIndex);
    //var webFolderIndex = _location.indexOf('/', _location.indexOf(applicationName) + applicationName.length);
    //var webFolderFullPath = _location.substring(0, webFolderIndex);

    return applicationName;
}

function PeopleGuruError(errorMsg) {
    PeopleGuru.showDialog('<FONT COLOR="ff0033"><b>ERROR</b></FONT>', '<BR> &nbsp &nbsp <b>'+ errorMsg +'</b> &nbsp &nbsp  <BR/><BR><BR/>', OK);
}



function valShowScreen(obj, prefix) {
    showScreen('../../Screens/' + prefix + obj + '.aspx');
}

//function loadReport(url) {
//    showFrame("DivReportNavigator", "TempReportNavigatorHolder", url);
//}

function runReport(objectID, type,entYn,fileName,parent,ScheduleId,shortcutYn) {
    resetSessionTimeout();
  

    var url = '../../System/Report/ReportADMParameters.aspx?m=&r=' + objectID;

    if (ScheduleId)
        url = url + "&ScheduleId=" + ScheduleId;

    if (entYn)
        url = url + "&entYn=" + entYn;

    if (shortcutYn)
        url = url + "&reportShortcutYn=" + shortcutYn;

   if (parent)
      showFrame(parent, "TempDivReportNavigator", url);
    else
        showFrame("DivReportNavigator", "TempDivReportNavigator", url);

   
}

var _OPEN_OVERLAY_CNT = 0;

function getOverlayCnt() {
    return _OPEN_OVERLAY_CNT;
}




_debugEnabled = true;
function _debugMessage(msg) { if (_debugEnabled) { alert(msg); } }


$(document).ready(function () {
    var $loading = $('<img src="../../System/Img/loading.gif" alt="loading">');

    //if (!(secureSignatureVal())) {
    //    PeopleGuru.showDialog('Error Message', 'Session Key has expired or is invalid. Please log in.', OK, login);
    //}
    //else if (($("[id$='hidSessionKey']").val() != secureSignatureVal())) {
    //    $("[id$='hidSessionKey']").val(secureSignatureVal());
    //    $("[id$='Update']").click();
    //}
   
});


//Sets a input limit to a textbox input. textElement is the id of the textbox and charElement is the id of the div that
//displays the number of remaining characters 
//Example: setCharLimit("txtApprovalComment", "charCountMaster", 500);
function setCharLimit(textElement, charElement, limit) {

    if ($("[id$='" + textElement + "']").length == 0) {
        if ($("[id$='" + charElement + "']").length != 0) {
            $("[id$='" + charElement + "']").html("");
        }
    }
    else if ($("[id$='" + charElement + "']").length != 0) {

        var charsCount = $("[id$='" + textElement + "']")[0].value.length;

        $("[id$='" + charElement + "']").html(String(charsCount) + ' of ' + String(limit) + ' characters');

        $("[id$='" + textElement + "']").unbind("keypress");
        $("[id$='" + textElement + "']").keypress(function () {
            var charsCount = $(this)[0].value.length;
            if (charsCount > limit) {
                $(this)[0].value = $(this)[0].value.substr(0, limit);
                charsCount = limit;
            }
            $("[id$='" + charElement + "']").html(String(charsCount) + ' of ' + String(limit) + ' characters');
        });

        $("[id$='" + textElement + "']").off("keyup focus");
        $("[id$='" + textElement + "']").on("keyup focus", function () {
            var charsCount = $(this)[0].value.length;
            if (charsCount > limit) {
                $(this)[0].value = $(this)[0].value.substr(0, limit);
                charsCount = limit;
            }
            $("[id$='" + charElement + "']").html(String(charsCount) + ' of ' + String(limit) + ' characters');
        });
    }
}

String.prototype.toProperCase = function () {
    return this.charAt(0).toUpperCase() + this.substring(1, this.length).toLowerCase();
}



$(document).ready(function () {
    resetSessionTimeout();
});



function sendInvites(MediaTagId) {
    loadContent('../../System/Social/SocialGroupInvite.aspx?groupId=' + escape(MediaTagId));
}


function leaveGroup(RowId, postId) {

    var title = 'Leave Group';
    var msg = 'Are you sure you want to leave this group?';
    type = YES | NO;
    $("#hidGroupId").val(RowId);
    PeopleGuru.showDialog(title, msg, type, leaveGroupCB, postId);
}

function leaveGroupCB(rs, postId) {
    if (rs.yes) {
        __doPostBack(postId, 'Leave');
    }
    else {
        $("#hidGroupId").val(0);
    }
}

function cancelRequest(RowId, postId) {

    var title = 'Leave Group';
    var msg = 'Are you sure you want to leave this group?';
    type = YES | NO;
    $("#hidGroupId").val(RowId);
    PeopleGuru.showDialog(title, msg, type, cancelRequestCB, postId);
}

function cancelRequestCB(rs, postId) {
    if (rs.yes) {
        __doPostBack(postId, 'Leave');
    }
    else {
        $("#hidGroupId").val(0);
    }
}


function sendRequest(RowId, postId) {

    var title = 'Request Membership';
    var msg = 'Are you sure you want to join this group?';
    type = YES | NO;
    $("#hidGroupId").val(RowId);
    PeopleGuru.showDialog(title, msg, type, sendRequestCB, postId);
}

function sendRequestCB(rs, postId) {
    if (rs.yes) {
        __doPostBack(postId, 'Join');
    }
    else {
        $("#hidGroupId").val(0);
    }
}

function editGroupFunction(rowID,postId,parent)
{
    showFrame(parent, parent + "Temp", "../../System/Social/SocialGroupEdit.aspx?rowID=" + rowID, afterEditGroup, postId);
}

function afterEditGroup(params, postId)
{

    if (params)
    {
        if (params.saved)
        {
            __doPostBack( postId,'');
        }
    }

}


function loadSingleWidget(widgetHolderId,url,nodelete,parent)
{
    var holder = $("#" + widgetHolderId);

    holder.html('');

    var widgetId = 1;

    if (!parent)
        parent = "";

    var newDiv = $("<div id='widgetSingleDiv" + parent + widgetId + "' class='widget-loaded'></div>");

    holder.append(newDiv);


    $("#widgetSingleDiv" + parent + widgetId).load_div_frame("SingleWidgetChartContent" + widgetId, url + " .PageContent", function (response, status, xhr) {

        //Custom error
        if (status == "error") {
        }

        var d = new Date();
        var n = d.getTime();

        getElementByFrame(".jarviswidget")[0].id = "singleWidgetTemp" + widgetId + n;

        initWidgetByClass("widgetGrid");

        if (!nodelete)
        {
            $(this).find(".jarviswidget-ctrls").append('<a rel="tooltip" data-original-title="Remove Widget" class="remove-widget button-icon jarviswidget-custom-btn ignore-validation" onclick="javascript:closeSingleWidget(\'' + widgetHolderId + '\')"><i class="fa fa-trash-o fa-lg"></i></a>');
            $(this).find(".jarviswidget header [rel=tooltip]").tooltip();
        }
       
       
    });
}

function closeSingleWidget(widgetHolderId)
{
    var holder = $("#" + widgetHolderId);

    holder.html('');
}


function scrollToElement(id)
{
    $(document).scrollTop($("#" + id).offset().top);
}


PeopleGuruViewWorkflow= function (url,callback) {

    var d = new Date();

    $(".lastParent").addClass("no-show-on-close");

    showFrame($(".lastParent")[0].id, "tempContainerWorkflowDiv" + d.getTime(), url, callback, $(".lastParent")[0].id)

}


function getPeopleGuruMedia(el, url, fileName, MIMEType) {
    $("." + el).attr("targetPeopleGuruMediaUrl", url);
    $("." + el).attr("targetPeopleGuruFileName", fileName);
    $("." + el).attr("targetPeopleGuruMIMEType", MIMEType);
    $("." + el).addClass("openDoc");
    $("." + el).trigger("divFrameIsVisibleChildren");
    return false;
}

function endPayrollOperationWithError() {

}

function endPayrollOperation() {

}

function mgFormatDateTime(mgDateTime)
{
   
    var month = mgDateTime.getMonth() + 1;

    if (mgDateTime.getMonth() + 1 < 10)
        month = '0' + (mgDateTime.getMonth() + 1)

    var day = mgDateTime.getDate();

    if (mgDateTime.getDate() < 10)
        day = '0' + mgDateTime.getDate()

    var hours = mgDateTime.getHours();

    if (mgDateTime.getHours() < 10)
        hours = '0' + mgDateTime.getHours()

    var minutes = mgDateTime.getMinutes();

    if (mgDateTime.getMinutes() < 10)
        minutes = '0' + mgDateTime.getMinutes()

    if (isNaN(month))
        return ""

    return month + '/' + day + '/' + mgDateTime.getFullYear() + ' ' + hours + ':' + minutes;
}

function pmFormatMinutes(pmMinutes) {

    var hours = "";

    if (parseInt(pmMinutes / 60) == 0) {
        if (pmMinutes > 1)
            hours = pmMinutes + " min"
        else
            hours = pmMinutes + " min"
    }
    else {
        var h = parseInt(pmMinutes / 60)

        if (h > 1)
            hours = h + " hrs"
        else
            hours = h + " hr"

        var m = pmMinutes - parseInt(pmMinutes / 60) * 60

        if (m > 0)
            hours = hours + ' ' + m + " min"
    }
        
    return hours;
}
function mgFormatTime(mgTime) {

    var mgDateTime = new Date("1/1/1900 " + mgTime);

    var hours = mgDateTime.getHours();

    if (mgDateTime.getHours() < 10)
        hours = '0' + mgDateTime.getHours()

    var minutes = mgDateTime.getMinutes();

    if (mgDateTime.getMinutes() < 10)
        minutes = '0' + mgDateTime.getMinutes()

    if (isNaN(hours))
        return ""

    return hours + ':' + minutes;
}

function mgFormatDate(mgDate) {

    var month = mgDateTime.getMonth() + 1;

    if (mgDateTime.getMonth() + 1 < 10)
        month = '0' + (mgDateTime.getMonth() + 1)

    var day = mgDateTime.getDate();

    if (mgDateTime.getDate() < 10)
        day = '0' + mgDateTime.getDate()

    if (isNaN(month))
        return ""

    return month + '/' + day + '/' + mgDate.getFullYear();
}

function showEEScreen(divId, url, callback, suppressAnimateScroll) {
    var $link = $($("#" + divId).parents()[0]).find(".addSectionDiv").find(".addSection");

    if ($link.length > 0) {
        showScreen(divId, divId + "Temp", url, callback, null, "slideDown", "col-lg-12", false, suppressAnimateScroll);

        $link.attr("textValue", $link.text());
        $link.addClass("link-oppened");
        $link.text("Close");

        if (!$link.attr("openEEScreen")) {
            $link.attr("openEEScreen", $link.attr("onclick"));
            $link.attr("onclick", "javascript:closeEEScreen('" + divId + "');");
        }


    }
    else
        showScreen(divId, divId + "Temp", url, callback, null, "slideDown", "col-lg-12", false, suppressAnimateScroll);

}


function closeEEScreen(divId) {
    var $link = $($("#" + divId).parents()[0]).find(".addSectionDiv").find(".addSection");

    if ($link.length > 0) {

        if ($("#" + divId).find(".PageContent").length > 0) {
            var frameid = $("#" + divId).find(".PageContent")[0].id;
            closeFrame(frameid);
        }

        $link.removeClass("link-oppened");
        $link.text($link.attr("textValue"));


    }

    if ($link.attr("openEEScreen")) {
        $link.attr("onclick", $link.attr("openEEScreen"));
        $link.removeAttr("openEEScreen");
    }

}

function clickPGButton(id)
{
    $("#" + id).click();
}

createHelpWindow = function () {
    $(".pgHelpInfo").click();
}

function showWorkflowChart(WorkflowId, Type) {
  
    
    $('.workflowChart').remove();
    $.ajax({
        url: '../../api/Helper/WorkflowChart?WorkflowId=' + WorkflowId + "&Type=" + Type,
        cache: false,
        type: "GET",
        dataType: "html",
        async: true
    }).done(function (responseText) {

        $("body").append(responseText);

    });
}


var _ScormWnd;

function openScorm(urlScorm,callback) {
    _ScormWnd = window.open(urlScorm, "_blank");

    if (typeof (callback) === "function") {
        var timer = setInterval(function () {
            if (_ScormWnd.closed || typeof (callback) !== "function") {
                clearInterval(timer);
                if (typeof (callback) === "function") {
                    callback();
                }
            }
        }, 1000); 
    }
  
}

selectTourGuideElement = function () {

    $(".TourGuideDiv *").addClass("TourSelectExclude");

    $("body *:not(.TourSelectExclude)").addClass("TourSelect")

    $('body .TourSelect').on('mouseenter.tourguide,mousemove.tourguide', function (event) {
        var elem = this;
        $("body .tourGuideHover").removeClass("tourGuideHover");
        $(this).addClass("tourGuideHover");
        event.stopPropagation();
        $("body .tourGuideHoverDiv").remove();
        var $div = $("<div class='tourGuideHoverDiv'></div>");

        if (tourGuideTemplate.DesignStep().TypeId() == "ScreenInfo") {
            $div.addClass("tourGuideHoverDivMultiple");
        }

        var left = $(this).offset().left  + 0;
        $div.on('mousemove.tourguide,mouseleave.tourguide', function (event) { $("body .tourGuideHoverDiv").remove(); });

        $div.css("top", $(this).offset().top + "px");
        $div.css("left", left + "px");
        $div.css("width", $(this).outerWidth());
        $div.css("height", $(this).outerHeight());

        $div.on('click.tourguide', function (event) {
            if (tourGuideTemplate) {
                tourGuideTemplate.SelectElement(elem);
            }
        });

        $("body").append($div);
        


        event.stopPropagation();
        event.stopImmediatePropagation();
    });



    $('body .TourSelect').on('mouseleave.tourguide', function (event) {
        $(this).removeClass("tourGuideHover");
    });

}

cancelTourGuideElementSelect = function () {
    $('body .TourSelect').unbind('click.tourguide');
    $('body .TourSelect').unbind('mouseenter.tourguide');
    $('body .TourSelect').unbind('mousemove.tourguide');
    $('body .TourSelect').unbind('mouseleave.tourguide');
    $('body .TourSelect').removeClass("TourSelect");
    $('body .TourSelectExclude').removeClass("TourSelectExclude");
    $("body .tourGuideHoverDiv").remove();
    $("body .tourGuideShowElement").removeClass("tourGuideShowElement");
    $("body .tourGuideShowElementMultiple").removeClass("tourGuideShowElementMultiple");

}

closeTourGuide = function () {
    cancelTourGuideElementSelect();
    $("body .TourGuideDiv").remove();
    $("body .helper-design-template").remove();
    $("body .helper-design-template-multiple").remove();
    $("body .helper-template-multiple").remove();
    $("body").removeClass("body-helper-multiple");
    $("body .tourGuideShowElement").removeClass("tourGuideShowElement");
    $("body .tourGuideShowElementMultiple").removeClass("tourGuideShowElementMultiple");
    closeSchedulePopup("html-editor");
    $('body .tourguideplay').unbind('click.tourguideplay');
}

function TourGuideSetup() {

    $.ajax({
        url: '../../api/Helper/TourGuideSetup',
        cache: false,
        type: "GET",
        dataType: "html",
        async: true
    }).done(function (responseText) {

        closeTourGuide();
        $("body").append(responseText);

    });
}

var helpData = null;
var tourGuideTemplateShow = null;
var helpDataTemplate = null;

function TourGuideTemplate(Data) {
    var self = this;
    self.Data = Data;
    self.SelectedTour = ko.observable(null);
    self.DesignStep = ko.observable(null);
    self.DesignStepNewYn = ko.observable(false);
    self.DesignChangeHighlightYn = ko.observable(false);
    self.DesignChangeSelectionHighlightYn = ko.observable(false);
    self.DesignStepAfter = ko.observable(null);
    self.PlayStepIndex = ko.observable(null);
    self.MultipleStepSelectedIndex = ko.observable(0);
    self.CopyStepsYn = ko.observable(false);
    self.CopyStep = function () {
        self.CopyStepsYn(true);
    };
    self.CancelCopyStep = function () {
        self.CopyStepsYn(false);
    };
    self.CreateNew = function () {
        self.SelectedTour(ko.mapping.fromJS({ RowId: null, ObjectId: null, OrderNumber: 1, ActiveYn: true, AllowedRoles: [], ExcludeRoles: [], TourInfo: { Name: null, Description: null, Steps: [] } }))
    };
    self.PasteStep = function (data) {
        self.SelectedTour().TourInfo.Steps.push(ko.mapping.fromJS(ko.toJS(data)));
    };
    self.SelectTour = function (data) {
        self.DesignChangeHighlightYn(false);
        self.DesignChangeSelectionHighlightYn(false);
        self.AddShowIfYn(false);
        self.SelectedTour(data);
    };
    self.SelectStep = function (data) {
        self.DesignStepNewYn(false);
        self.DesignChangeHighlightYn(false);
        self.DesignChangeSelectionHighlightYn(false);
        self.AddShowIfYn(false);
        self.DesignStep(data);
        self.MultipleStepSelectedIndex(0);

        if (data.TypeId() == "ScreenInfo") {
            for (var i = 0; i < data.Selections().length; i++) {
                var elemfind = $(data.Selections()[i].Element());

                if (elemfind.length == 1 && $(elemfind[0]).is(":visible")) {
                    $(elemfind[0]).addClass("tourGuideShowElement tourGuideShowElementMultiple");
                }
            }
        }

        if (data.Element() != null) {
            var elemfind = $(data.Element());

            if (elemfind.length > 0 && $(elemfind[0]).is(":visible")) {
                $(elemfind[0]).addClass("tourGuideShowElement");

                self.showHelperDialog(elemfind);

            }
            else {
                self.showHelperDialog();
            }
        }
        else {
            self.showHelperDialog();
        }



    };
    self.MoveStepSelect = function (step, data) {

        var index = self.SelectedTour().TourInfo.Steps().indexOf(self.DesignStep());

        self.CancelHighlighElement();

        self.SelectStep(self.SelectedTour().TourInfo.Steps()[index + step]);
    };
    self.DeleteStep = function (data) {
        self.SelectedTour().TourInfo.Steps.remove(data);
    };
    self.DeleteMultiple = function (data) {

        if (self.DesignStep().Selections().length == 1) {
            PeopleGuru.showDialog("Cannot Delete", "Please add more sections before deleting this one", OK);
            return;
        }
        var elemfind = $(self.DesignStep().Selections()[self.MultipleStepSelectedIndex()].Element());

        var index = self.MultipleStepSelectedIndex();

        self.MultipleStepSelectedIndex(0);
        if (elemfind.length > 0)
            elemfind.removeClass("tourGuideShowElementMultiple");

        self.DesignStep().Selections.remove(self.DesignStep().Selections()[index]);
    };
    self.CreateNewStep = function () {
        self.DesignStepNewYn(true);
        self.DesignStep(ko.mapping.fromJS({
            TypeId: null, Element: null, BubbleDirection: 'left', Title: "Hi! I am Guru Helper!", HTMLData: "<div style='padding: 20px; font-size: 1.5em;'>Enter description here.</div>", Width: 300, Height: 300, Left: 0, Top: 0, Selections: [], ShowIf: []
        }))
    };
    self.CreateNewStepAfter = function (data) {
        self.DesignStepAfter(data);
        self.CreateNewStep();
    };
    self.CancelNewTour = function () {
        self.SelectedTour(null);
        self.CopyStepsYn(false);
    };
    self.SaveTour = function () {
        $.ajax({
            url: '../../api/Helper/SaveTour',
            cache: false,
            type: "POST",
            data: JSON.stringify({ RowId: self.SelectedTour().RowId(), OrderNumber: self.SelectedTour().OrderNumber(), ActiveYn: self.SelectedTour().ActiveYn(), ObjectId: self.SelectedTour().ObjectId(), AllowedRoles: ko.toJS(self.SelectedTour().AllowedRoles()), ExcludeRoles: ko.toJS(self.SelectedTour().ExcludeRoles()), TourInfo: ko.toJS(self.SelectedTour().TourInfo) }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true
        }).done(function (jsonData) {
            PeopleGuru.showDialog("Save Tour", "Tour saved.", OK);
        });
    };
    self.SelectType = function (type, data) {
        self.DesignStep().TypeId(type);
        if (["Highlight", "Action", "Wait", "ScreenInfo"].indexOf(type) >= 0) {
            self.SelectHighlighElement();
        }
        else {
            self.DesignStep().BubbleDirection('');
            self.showHelperDialog();
        }
    };
    self.showHelperDialog = function (elemfind) {

        var $div = $("<div class='tourGuideHoverDiv'></div>");

        if (elemfind) {
            var left = $(elemfind[0]).offset().left + 0;

            $div.css("top", $(elemfind[0]).offset().top + "px");
            $div.css("left", left + "px");
            $div.css("width", $(elemfind[0]).outerWidth());
            $div.css("height", $(elemfind[0]).outerHeight());
        }
        else {
            $div.css("top", "30%");
            $div.css("left", "50%");
        }

        if (self.DesignStep().TypeId() != "ScreenInfo") {
            $("body").append($div);
        }

        $("body .helper-design-template-multiple").remove();
        $("body").removeClass("body-helper-multiple");
        $("body .helper-design-template").remove();

        var $div = $("<div class='helper-design-template' style='display: inline-block; height: " + self.DesignStep().Height() + "px; width: " + self.DesignStep().Width() + "px;z-index: 9999998; position: fixed; top: 100px; left: 100px;'><div  data-bind='template: {name: \"helper-design-template\",foreach: $root}' style='height: 100%; width: 100%'></div><div class='ui-resizable-handle ui-resizable-se' id='segrip' style='width: 10px;height: 10px;background-color: #ffffff;border: 1px solid #000000;'></div></div>");

        if (!elemfind) {
            $div.css("top", "30%");
            $div.css("left", "0px");
            $div.css("right", "0px");
            $div.css("bottom", "0px");
            $div.css("margin-left", "auto");
            $div.css("margin-right", "auto");
        }
        else if (!self.DesignStepNewYn()) {
            $div.css("top", ($(elemfind[0]).offset().top - $(window).scrollTop() - self.DesignStep().Top()) + "px");
            $div.css("left", ($(elemfind[0]).offset().left - $(window).scrollLeft() - self.DesignStep().Left()) + "px");
        }

        $("body").append($div);
        $div.resizable({
            handles: {
                'se': '#segrip'
            }
        });
        $div.draggable();

        ko.applyBindings(self, $div[0]);

        if (self.DesignStep().TypeId() == "ScreenInfo") {
            var $divm = $("<div class='helper-design-template-multiple' style='position: absolute; top: 0px; left: 0px;'><div  data-bind='template: {name: \"helper-design-template-multiple\",foreach: $root}'></div></div>");
            $("body").append($divm);
            ko.applyBindings(self, $divm[0]);
            $("body").addClass("body-helper-multiple");
        }

    };
    self.SelectHighlighElement = function () {
        closeSchedulePopup("html-editor");
        $("body .helper-design-template").remove();
        $("body .helper-design-template-multiple").remove();
        cancelTourGuideElementSelect();
        selectTourGuideElement();
    };
    self.CancelHighlighElement = function () {
        self.DesignChangeHighlightYn(false);
        self.DesignChangeSelectionHighlightYn(false);
        self.AddShowIfYn(false);
        cancelTourGuideElementSelect();
        closeSchedulePopup("html-editor");
        $("body .helper-design-template").remove();
        $("body").removeClass("body-helper-multiple");
        $("body .helper-design-template-multiple").remove();
        $("body .tourGuideShowElement").removeClass("tourGuideShowElement");
        $("body .tourGuideShowElementMultiple").removeClass("tourGuideShowElementMultiple");
        self.DesignStep(null);
        self.DesignStepAfter(null);
    };
    self.DoneHighlighElement = function () {

        if (self.DesignStep().Selections().length == 0) {
            PeopleGuru.showDialog("Select Sections", "Please select at least 1 section.", OK);
            return;
        }
        self.MultipleStepSelectedIndex(0);
        self.DesignChangeHighlightYn(false);
        self.DesignChangeSelectionHighlightYn(false);
        self.AddShowIfYn(false);
        cancelTourGuideElementSelect(true);
        closeSchedulePopup("html-editor");
        var elemfind = $(self.DesignStep().Selections()[0].Element());

        if (elemfind.length == 1 && $(elemfind[0]).is(":visible")) {
            self.DesignStep().Element(self.DesignStep().Selections()[0].Element());
            self.showHelperDialog(elemfind);
        }

    };
    self.SelectMultipleEdit = function (index, data) {
        self.MultipleStepSelectedIndex(index);
    };
    self.SelectMultipleMove = function (step, data) {

        if (self.DesignStep().Selections().length - 1 < (self.MultipleStepSelectedIndex() + step)) {
            self.MultipleStepSelectedIndex(0);
        }
        else if ((self.MultipleStepSelectedIndex() + step) < 0) {
            self.MultipleStepSelectedIndex(self.DesignStep().Selections().length - 1);
        }
        else {
            self.MultipleStepSelectedIndex(self.MultipleStepSelectedIndex() + step);
        }

    };
    self.SelectMultiplePlayMove = function (step, data) {

        var sel = self.GetStepSelections(self.SelectedTour().TourInfo.Steps()[self.PlayStepIndex()].Selections);

        if (sel.length - 1 < (self.MultipleStepSelectedIndex() + step)) {
            self.MultipleStepSelectedIndex(0);
        }
        else if ((self.MultipleStepSelectedIndex() + step) < 0) {
            self.MultipleStepSelectedIndex(sel.length - 1);
        }
        else {
            self.MultipleStepSelectedIndex(self.MultipleStepSelectedIndex() + step);
        }

    };
    self.ChangeStepHighlight = function () {
        self.SelectHighlighElement();
        self.DesignChangeHighlightYn(true);
    };
    self.ChangeStepSelectionHighlight = function () {
        self.SelectHighlighElement();
        self.DesignChangeSelectionHighlightYn(true);
    };
    self.AddShowIfYn = ko.observable(false);
    self.AddShowIfConfition = ko.observable('if');
    self.SelectedShowIf = ko.observable(null);
    self.AddShowIf = function () {
        self.AddShowIfConfition('if');
        self.SelectedShowIf(null);
        self.SelectHighlighElement();
        self.AddShowIfYn(true);
    };
    self.DeleteShowIf = function (data) {
        self.DesignStep().ShowIf.remove(data);
    };
    self.EditShowIf = function (index, data) {
        self.AddShowIfConfition(data.Condition())
        self.SelectedShowIf(index());
        self.SelectHighlighElement();
        var elemfind = $(data.Element());

        if (elemfind.length == 1 && $(elemfind[0]).is(":visible")) {
            $(elemfind[0]).addClass("tourGuideShowElement tourGuideShowElementMultiple");
        }
        self.AddShowIfYn(true);
    };
    self.CancelAddShowIf = function () {
        self.AddShowIfYn(false);
        cancelTourGuideElementSelect();
        closeSchedulePopup("html-editor");
        $("body .helper-design-template").remove();
        $("body").removeClass("body-helper-multiple");
        $("body .helper-design-template-multiple").remove();
        $("body .tourGuideShowElement").removeClass("tourGuideShowElement");
        $("body .tourGuideShowElementMultiple").removeClass("tourGuideShowElementMultiple");
        var ss = self.DesignStepNewYn();
        self.SelectStep(self.DesignStep());
        self.DesignStepNewYn(ss);
    };
    self.SetElementManuallyYn = ko.observable(false);
    self.SetElementManuallySelector = ko.observable("");
    self.SetElementManually = function () {

        if (self.AddShowIfYn()) {
            if (self.SelectedShowIf() != null) {
                self.SetElementManuallySelector(self.DesignStep().ShowIf()[self.SelectedShowIf()].Element());
            }
            else {
                self.SetElementManuallySelector("");
            }
            
        }
        else if (self.DesignStep().TypeId() != "ScreenInfo")
            self.SetElementManuallySelector(self.DesignStep().Element());
        else {
            if (self.DesignChangeSelectionHighlightYn()) {
                self.SetElementManuallySelector(self.DesignStep().Selections()[self.MultipleStepSelectedIndex()].Element());
            }
            else {
                self.SetElementManuallySelector("");
            }
        }
            

        self.SetElementManuallyYn(true);
    };
    self.CancelSetElementManually = function () {
        self.SetElementManuallyYn(false);
    };
    self.DoneSetElementManually = function () {

        

        if (self.SetElementManuallySelector() !== "" && self.SetElementManuallySelector() !== null) {
            var elem = $(self.SetElementManuallySelector());

            if (self.AddShowIfYn()) {
                self.SelectElement(null);
            }
            else if (elem.length > 0) {
                self.SelectElement(elem[0]);
            }
            else {
                self.DesignStep().Element(null);
                PeopleGuru.showDialog("Set Selection", "Cannot find selection or multiple matches were found.", OK);
            }
        }

        self.SetElementManuallyYn(false);
       
    };
    self.SelectElement = function (elem) {


        var parentElem = null;
        var elementSelector = null;

        if (self.SetElementManuallyYn()) {
            elementSelector = self.SetElementManuallySelector();
        }
        else {
            parentElem = $(elem).parent();
            elementSelector = elem.tagName;

            if (elem.id)
                elementSelector += "#" + elem.id;
            else if ($(elem).attr("class")) {

                if ($(elem).attr("class").replaceAll("TourSelect", "").replaceAll("tourGuideHover", "").replaceAll(/  +/g, " ").replaceAll(" ", "") != "") {
                    var sel = "." + $(elem).attr("class").replaceAll("TourSelect", "").replaceAll("tourGuideHover", "").replaceAll(/  +/g, " ").replaceAll(" ", ".");

                    if (sel[sel.length - 1] == ".")
                        sel = sel.slice(0, -1);

                    elementSelector += sel;
                }

            }

            var runParent = true;

            while (runParent) {
                if (parentElem.length > 0) {
                    if ($(parentElem[0]).hasClass("PageContent")) {
                        runParent = false;
                    }

                    if (parentElem[0].id)
                        elementSelector = "#" + parentElem[0].id + ' ' + elementSelector;
                    else if ($(parentElem[0]).attr("class")) {
                        if ($(parentElem[0]).attr("class").replaceAll("TourSelect", "").replaceAll("tourGuideHover", "").replaceAll(/  +/g, " ").replaceAll(" ", "") != "") {
                            var sel = "." + $(parentElem[0]).attr("class").replaceAll("TourSelect", "").replaceAll("tourGuideHover", "").replaceAll(/  +/g, " ").replaceAll(" ", ".");

                            if (sel[sel.length - 1] == ".")
                                sel = sel.slice(0, -1);

                            elementSelector = sel + ' ' + elementSelector;
                        }

                    }
                }
                else {
                    runParent = false;
                }

                if (runParent) {
                    parentElem = $(parentElem[0]).parent();
                }
            }

            var elemfind = $(elementSelector);
            if (elemfind.length > 1) {
                elementSelector += ":eq(" + $(elementSelector).index(elem) + ')';
            }
        }
        

        var elemfind = $(elementSelector);

        if ((elemfind.length != 1 || $(elemfind[0]).is(":visible") == false) && !self.AddShowIfYn()) {
            PeopleGuru.showDialog("Cannot Select Element", "Cannot select the element, please try again.", OK);
        }
        else {


            if (!self.AddShowIfYn()) {
                if (self.DesignStep().TypeId() !== "ScreenInfo") {
                    cancelTourGuideElementSelect();
                    $(elemfind[0]).addClass("tourGuideShowElement");
                }
                else {
                    $(elemfind[0]).addClass("tourGuideShowElement tourGuideShowElementMultiple");
                }




                if ($(elemfind[0]).css("position") == "static") {
                    $(elemfind[0]).css("position", "relative");
                }

                if (self.DesignStep().TypeId() != "Wait" && self.DesignStep().TypeId() != "ScreenInfo") {
                    self.showHelperDialog(elemfind);
                }
            }
           

            if (self.AddShowIfYn()) {

                if (!self.DesignStep().ShowIf)
                    self.DesignStep().ShowIf = ko.observableArray([]);

                if (self.SelectedShowIf() != null) {
                    self.DesignStep().ShowIf()[self.SelectedShowIf()].Element(elementSelector);
                    self.DesignStep().ShowIf()[self.SelectedShowIf()].Condition(self.AddShowIfConfition());
                }
                else {
                    self.DesignStep().ShowIf.push(ko.mapping.fromJS({ Element: elementSelector, Condition: self.AddShowIfConfition() }));
                }
              
                self.CancelAddShowIf();
            }else if (self.DesignStep().TypeId() === "ScreenInfo") {


                if (elemfind) {
                    var $div = $("<div class='tourGuideHoverDiv'></div>");
                    var left = $(elemfind[0]).offset().left + 0;

                    $div.css("top", $(elemfind[0]).offset().top + "px");
                    $div.css("left", left + "px");
                    $div.css("width", $(elemfind[0]).outerWidth());
                    $div.css("height", $(elemfind[0]).outerHeight());
                    $("body").append($div);
                }

                if (self.DesignChangeSelectionHighlightYn()) {
                    self.DesignStep().Selections()[self.MultipleStepSelectedIndex()].Element(elementSelector);
                    self.DesignStep().Selections()[self.MultipleStepSelectedIndex()].Width($(elemfind[0]).outerWidth());
                    self.DesignStep().Selections()[self.MultipleStepSelectedIndex()].Height($(elemfind[0]).outerHeight());
                    self.DesignStep().Selections()[self.MultipleStepSelectedIndex()].Top($(elemfind[0]).offset().top);
                    self.DesignStep().Selections()[self.MultipleStepSelectedIndex()].Left($(elemfind[0]).offset().left);

                    self.DesignChangeSelectionHighlightYn(false);
                    self.DoneHighlighElement();
                }
                else {
                    self.DesignStep().Selections.push(ko.mapping.fromJS({ BubbleDirection: 'left', Title: "", HTMLData: "<div style='padding: 20px; font-size: 1.5em;'>Enter section description here.</div>", Width: $(elemfind[0]).outerWidth(), Height: $(elemfind[0]).outerHeight(), Left: $(elemfind[0]).offset().left, Top: $(elemfind[0]).offset().top, Element: elementSelector }));
                }
               


            }
            else {
                self.DesignStep().Element(elementSelector);

                self.DesignChangeHighlightYn(false);
            }

        }

    };
    self.PlayTour = function () {
        self.hasSkip = false;
        self.ManualStepMoveYn = true;
        self.ManualStepMoveDirection = 1;
        self.WaitSeconds = 20;
        self.PlayStepIndex(0);
        self.PlayStep(self.SelectedTour().TourInfo.Steps()[self.PlayStepIndex()]);
    };
    self.PlayFromStep = function (data) {
        self.ManualStepMoveDirection = 1;
        self.WaitSeconds = 20;
        self.PlayStepIndex(self.SelectedTour().TourInfo.Steps().indexOf(data));
        self.PlayStep(self.SelectedTour().TourInfo.Steps()[self.PlayStepIndex()]);
    };
    self.StopTour = function () {
        self.ManualStepMoveDirection = 1;
        self.closePlay();
    };
    self.ManualStepMoveYn = false;
    self.ManualStepMoveDirection = 1;
    self.hasSkip = false;
    self.MoveStep = function (step, data) {

        if (data) {
            self.ManualStepMoveDirection = step;
            self.ManualStepMoveYn = true;
        }
        else {
            self.ManualStepMoveDirection = 1
            self.ManualStepMoveYn = false;
        }

        self.WaitSeconds = 20;
        if (self.PlayStepIndex() + step >= self.SelectedTour().TourInfo.Steps().length || ((self.PlayStepIndex() + step) < 0)) {
            self.StopTour();
        }
        else {
            self.PlayStepIndex(self.PlayStepIndex() + step);
            self.PlayStep(self.SelectedTour().TourInfo.Steps()[self.PlayStepIndex()]);
        }
       
    };
    self.WaitSeconds = 20;
    self.GetStepSelections = function (data) {
        return ko.utils.arrayFilter(data(), function (element) {

            return element.VisibleYn();
        });
    };
    self.PlayStep = function (data) {
        self.PlayStepIndex(self.SelectedTour().TourInfo.Steps().indexOf(data));

        if (data.ShowIf) {
            if (data.ShowIf().length > 0) {
                var showYn = true;

                for (var i = 0; i < data.ShowIf().length; i++) {

                    var elemfind = $(data.ShowIf()[i].Element());

                    if (data.ShowIf()[i].Condition() == 'if') {
                        if (elemfind.length != 1) {
                            showYn = false;
                            break;
                        }
                        else if (!$(elemfind[0]).is(":visible")) {
                            showYn = false;
                            break;
                        }
                    }
                    else {
                        if (elemfind.length > 0 && elemfind.is(":visible")) {
                            showYn = false;
                            break;
                        }
                    }
                   
                }
                if (!showYn) {
                    self.MoveStep(self.ManualStepMoveDirection);
                    return;
                }
            }
        }

        var elemfind = null;
        $('body .tourguideplay').unbind('click.tourguideplay');
        $('body').unbind('DOMSubtreeModified.tourguiderefresh');
        $("body .helper-template-multiple").remove();
        $("body").removeClass("body-helper-multiple");
        $("body .tourGuideShowElement").removeClass("tourGuideShowElement");
        $("body .tourGuideShowElementMultiple").removeClass("tourGuideShowElementMultiple");
        $("body .tourGuideHoverDiv").remove();
        self.MultipleStepSelectedIndex(0);

        if (data.TypeId() == "ScreenInfo") {
            for (var i = 0; i < data.Selections().length; i++) {

                if (!data.Selections()[i].VisibleYn)
                    data.Selections()[i].VisibleYn = ko.observable(false);

                var elemfind = $(data.Selections()[i].Element());

                if (elemfind.length == 1 && $(elemfind[0]).is(":visible")) {
                    data.Selections()[i].VisibleYn(true);
                    data.Selections()[i].Width($(elemfind[0]).outerWidth());
                    data.Selections()[i].Height($(elemfind[0]).outerHeight());
                    data.Selections()[i].Left($(elemfind[0]).offset().left);
                    data.Selections()[i].Top($(elemfind[0]).offset().top);

                    $(elemfind[0]).addClass("tourGuideShowElement tourGuideShowElementMultiple");
                }
            }

            $("body").bind("DOMSubtreeModified.tourguiderefresh", function () {

                if (data) {
                    for (var i = 0; i < data.Selections().length; i++) {

                        var elemfind = $(data.Selections()[i].Element());

                        if (elemfind.length == 1 && $(elemfind[0]).is(":visible")) {
                            data.Selections()[i].VisibleYn(true);
                            data.Selections()[i].Width($(elemfind[0]).outerWidth());
                            data.Selections()[i].Height($(elemfind[0]).outerHeight());
                            data.Selections()[i].Left($(elemfind[0]).offset().left);
                            data.Selections()[i].Top($(elemfind[0]).offset().top);
                            $(elemfind[0]).addClass("tourGuideShowElement tourGuideShowElementMultiple");
                        }
                        else {
                            data.Selections()[i].VisibleYn(false);
                        }
                    }
                }
               
            });
        }

        if (data.Element() != null) {
            elemfind = $(data.Element());
        }

        if (((data.Element() !== null && elemfind.length != 1) || (data.Element() !== null && elemfind.length == 1 && $(elemfind[0]).is(":visible") == false)) || (self.hasSkip && data.Element() == null)) {

            if (self.ManualStepMoveYn) {
                self.hasSkip = true;
                self.MoveStep(self.ManualStepMoveDirection, true);
                return;
            }
            else if (data.TypeId() != "Wait") {
                self.hasSkip = true;
                self.MoveStep(self.ManualStepMoveDirection, true);
                return;
            }
            else if (data.TypeId() == "Wait" && self.WaitSeconds > 0 && self.PlayStepIndex() != null) {
                self.WaitSeconds = self.WaitSeconds - 1;
                setTimeout(function () { self.PlayStep(data) }, 1000);
                self.ManualStepMoveYn = false;
                return;
            }
            else if (data.TypeId() == "Wait" && self.WaitSeconds <= 0) {
                self.StopTour();
                self.ManualStepMoveYn = false;
                return;
            }
        }
        else {

            if (self.hasSkip || !self.ManualStepMoveYn)
                self.hasSkip = false;

            if (data.TypeId() == "Wait") {
                self.MoveStep(self.ManualStepMoveDirection, self.ManualStepMoveYn);
                return;
            }

            var $div = $("<div class='tourGuideHoverDiv tourguideplay'></div>");

            if (elemfind) {

                if (data.TypeId() == "Action") {
                    $(elemfind[0]).addClass("tourguideplay");
                    $(elemfind[0]).on('click.tourguideplay', function (event) {
                        if (self) {
                            self.MoveStep(self.ManualStepMoveDirection);
                        }
                    });
                }

                $(elemfind[0]).addClass("tourGuideShowElement");

                if ($(elemfind[0]).css("position") == "static") {
                    $(elemfind[0]).css("position", "relative");
                }

                var left = $(elemfind[0]).offset().left + 0;

                $div.css("top", $(elemfind[0]).offset().top + "px");
                $div.css("left", left + "px");
                $div.css("width", $(elemfind[0]).outerWidth());
                $div.css("height", $(elemfind[0]).outerHeight());

                if (data.TypeId() != "ScreenInfo") {
                    $div.on('click.tourguideplay', function (event) {
                        $(".tourGuideHoverDiv").remove();
                    });
                    $("body").append($div);
                }

                var cTop = ($(elemfind[0]).offset().top - $(window).scrollTop() - data.Top());
                var cLeft = ($(elemfind[0]).offset().left - $(window).scrollLeft() - data.Left());

                if (cTop < 0)
                    cTop = '30%';
                else
                    cTop = cTop + 'px';

                if (cLeft < 0)
                    cLeft = '50%';
                else
                    cLeft = cLeft + 'px'

                if ($(".helper-play-template").length > 0) {

                    $(".helper-play-template").stop().animate({ width: data.Width() + "px", height: data.Height() + "px", top: cTop, left: cLeft, marginLeft: "" }, 300, function () {

                    });
                }
                else {
                    $("body .helper-play-template").remove();
                    var $div = $("<div class='helper-play-template' style='display: inline-block; height: " + data.Height() + "px; width: " + data.Width() + "px;z-index: 9999998; position: fixed; top: " + cTop + "; left: " + cLeft + ";'><div  data-bind='template: {name: \"helper-play-template\",foreach: $root}' style='height: 100%; width: 100%'></div></div>");
                    $("body").append($div);
                }

            }
            else {

                if ($(".helper-play-template").length > 0) {
                    $(".helper-play-template").stop().animate({ width: data.Width() + "px", height: data.Height() + "px", top: "30%", left: "50%", bottom: "0px", right: "0px", marginLeft: -(data.Width() / 2) + "px" }, 300, function () {

                    });
                }
                else {
                    $("body .helper-play-template").remove();
                    var $div = $("<div class='helper-play-template' style='display: inline-block; height: " + data.Height() + "px; width: " + data.Width() + "px;z-index: 9999998; position: fixed; top: 30%; left: 50%; bottom: 0px; right: 0px; margin-left: " + (-(data.Width() / 2) + "px") + "; margin-right: auto; '><div  data-bind='template: {name: \"helper-play-template\",foreach: $root}' style='height: 100%; width: 100%'></div></div>");
                    $("body").append($div);
                }

            }

            $div.draggable();

            ko.applyBindings(self, $div[0]);

            if (data.TypeId() == "ScreenInfo") {
                var $divm = $("<div class='helper-template-multiple' style='position: absolute; top: 0px; left: 0px;'><div  data-bind='template: {name: \"helper-template-multiple\",foreach: $root}'></div></div>");
                $("body").append($divm);
                ko.applyBindings(self, $divm[0]);
                $("body").addClass("body-helper-multiple");
            }
        }
    };
    self.closePlay = function () {
        $('body').unbind('DOMSubtreeModified.tourguiderefresh');
        $("body .tourGuideShowElement").removeClass("tourGuideShowElement");
        $("body .tourGuideShowElementMultiple").removeClass("tourGuideShowElementMultiple");
        $("body .tourGuideHoverDiv").remove();
        $("body .helper-play-template").remove();
        $("body .helper-template-multiple").remove();
        $("body").removeClass("body-helper-multiple");
        self.PlayStepIndex(null);
        self.hasSkip = false;
        $('body .tourguideplay').unbind('click.tourguideplay');
       
    };
    self.DoNotShow = function (data) {
        if (self.SelectedTour().DoNotShowYn) {
            if (!self.SelectedTour().DoNotShowYn()) {
                PeopleGuru.showDialog("Topic Help", "The introduction for this topic will no longer show automatically. To access it, click on the 'Help' icon.", OK);
            }

            $.ajax({
                url: '../../api/Helper/UpdateHelpPreferences',
                cache: false,
                type: "POST",
                data: JSON.stringify({ TourId: self.SelectedTour().RowId(), DoNotShow: !self.SelectedTour().DoNotShowYn() }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true
            }).done(function (jsonData) {
            });

            self.SelectedTour().DoNotShowYn(!self.SelectedTour().DoNotShowYn());
        }
        return true;
    };
    self.SaveStep = function () {
        var elemfind = $(self.DesignStep().Element());

        if (self.DesignStep().TypeId() !== "Wait") {
            if (elemfind.length > 0) {
                self.DesignStep().Left($(elemfind[0]).offset().left - $(".helper-design-template .guruHelperDiv").offset().left);
                self.DesignStep().Top($(elemfind[0]).offset().top - $(".helper-design-template .guruHelperDiv").offset().top);
                self.DesignStep().Width($(".helper-design-template .guruHelperDiv").outerWidth());
                self.DesignStep().Height($(".helper-design-template .guruHelperDiv").outerHeight());
            }
            else {
                self.DesignStep().Width($(".helper-design-template .guruHelperDiv").outerWidth());
                self.DesignStep().Height($(".helper-design-template .guruHelperDiv").outerHeight());
            }

        }


        if (self.DesignStepNewYn()) {
            if (self.DesignStepAfter() !== null) {
                self.SelectedTour().TourInfo.Steps.splice(self.SelectedTour().TourInfo.Steps().indexOf(self.DesignStepAfter()), 0, ko.mapping.fromJS(ko.toJS(self.DesignStep())));
            }
            else {
                self.SelectedTour().TourInfo.Steps.push(ko.mapping.fromJS(ko.toJS(self.DesignStep())));
            }
        }


        self.CancelHighlighElement();
    };
    self.EditHtml = function () {
        $.ajax({
            url: '../../api/Helper/HtmlEditor',
            cache: false,
            type: "GET",
            dataType: "html",
            async: true
        }).done(function (responseText) {

            closeSchedulePopup("html-editor");

            var $div = $(".schedule-popup-template").clone().removeClass("no-show").removeClass("schedule-popup-template").addClass("html-editor schedule-popup new-popup");

            $div.find(".schedule-popup-main").html(responseText);

            $div.find(".schedule-popup-header-title-text").html("Edit Guide Information");
            $div.find(".schedule-popup-header").css("cursor", "pointer");
            $div.css("z-index", "9999999");
            $("body").append($div);
            popToTop($div[0], true);
            $div.find(".editor").html(self.DesignStep().HTMLData());
            $div.find(".editorPlain").val(self.DesignStep().HTMLData());
            $div.find(".editor").wysiwyg();
            $div.find(".editor").bind('DOMSubtreeModified', function () {
                self.DesignStep().HTMLData($(this).html());
            });

        });
    };
    self.EditHtmlMultiple = function () {
        $.ajax({
            url: '../../api/Helper/HtmlEditor',
            cache: false,
            type: "GET",
            dataType: "html",
            async: true
        }).done(function (responseText) {

            closeSchedulePopup("html-editor");

            var $div = $(".schedule-popup-template").clone().removeClass("no-show").removeClass("schedule-popup-template").addClass("html-editor schedule-popup new-popup");

            $div.find(".schedule-popup-main").html(responseText);

            $div.find(".schedule-popup-header-title-text").html("Edit Guide Information");
            $div.find(".schedule-popup-header").css("cursor", "pointer");
            $div.css("z-index", "9999999");
            $("body").append($div);
            popToTop($div[0], true);
            $div.find(".editor").html(self.DesignStep().Selections()[self.MultipleStepSelectedIndex()].HTMLData());
            $div.find(".editorPlain").val(self.DesignStep().Selections()[self.MultipleStepSelectedIndex()].HTMLData());
            $div.find(".editor").wysiwyg();
            $div.find(".editor").bind('DOMSubtreeModified', function () {
                self.DesignStep().Selections()[self.MultipleStepSelectedIndex()].HTMLData($(this).html());
            });

        });
    };
    self.Filters = ko.mapping.fromJS({
        ObjectId: null,
        SearchText: "",
        ActiveYn: true
    });
    self.pageSize = ko.observable(10);
    self.pageIndex = ko.observable(1);
    self.movePage = function (increment, data) {
        var newPage = parseInt(self.pageIndex()) + parseInt(increment);

        if (newPage < 1)
            newPage = 1;

        if (newPage > self.totalPages())
            newPage = self.totalPages();

        self.pageIndex(newPage);
    };
    self.firstPage = function () {
        self.pageIndex(1);
    };
    self.lastPage = function () {
        self.pageIndex(self.totalPages());
    };
    self.totalPages = ko.computed(function () {

        if (!self.Data) {
            return 0;
        }

        if (self.Data.GuidedTours().length == 0) {
            return 0;
        }
        else {
            var filteredData = ko.utils.arrayFilter(self.Data.GuidedTours(), function (element) {
                return (element.Name().toLowerCase().includes(self.Filters.SearchText().toLowerCase()) && element.ObjectId() == self.Filters.ObjectId() && element.ActiveYn() == self.Filters.ActiveYn());
            });

            return Math.ceil(filteredData.length / self.pageSize());
        }

    }, self);
    self.FilteredData = ko.computed(function () {

        if (!self.Data) {
            return null;
        }

        if (self.Data.GuidedTours().length == 0) {

            return self.Data.GuidedTours();
        }
        else {

            var filteredData = ko.utils.arrayFilter(self.Data.GuidedTours(), function (element) {
                return (element.Name().toLowerCase().includes(self.Filters.SearchText().toLowerCase()) && element.ObjectId() == self.Filters.ObjectId() && element.ActiveYn() == self.Filters.ActiveYn());
            });

            var startIndex = (self.pageIndex() - 1) * self.pageSize();

            return filteredData.slice(startIndex, startIndex + self.pageSize());

        }

    }, self);
    self.PrevTour = function () {
        if (helpDataTemplate) {

        }
        else {
            return null;
        }
    };
    self.NextTour = function () {
        if (self.PlayStepIndex() >= (self.SelectedTour().TourInfo.Steps().length - 1) && helpDataTemplate) {

            var tours = helpDataTemplate.GetTours();

            var j = -1;

            for (var i = 0; i < tours.length; i++) {
                if (tours[i].OrderNumber() > self.SelectedTour().OrderNumber()) {
                    j = i;
                    break;
                }
            }
            if (j  <= tours.length - 1) {
                return tours[j ];
            }
            else
                return null;
        }
        else {
            return null;
        }
    };
    self.PlaySelectedTour = function (data) {
        self.SelectedTour(data);
        self.PlayTour();
    };

}


function showPGHelp() {
    $.ajax({
        url: '../../api/Helper/GuruHelp',
        cache: false,
        type: "GET",
        dataType: "html",
        async: true
    }).done(function (responseText) {

        $(".GuruHelpDiv").remove();
        $("body").append(responseText);

    });

}

function HelpDataTemplate(Data) {
    var self = this;
    self.Data = Data;
    self.Filters = ko.mapping.fromJS({
        SearchText: ""
    });
    self.GetTours = function () {
        var res = ko.utils.arrayFilter(self.Data.GuidedTours(), function (element) {

            var showYn = true;

            if (self.Filters.SearchText() != "") {
                if (!element.Name().toLowerCase().includes(self.Filters.SearchText().toLowerCase())) {
                    showYn = false;
                }
            }

            if (element.TourInfo.Steps().length == 0)
                return false;
            else if (element.TourInfo.Steps()[0].Element() == null)
                return showYn;
            else {
                var elemfind = $(element.TourInfo.Steps()[0].Element());

                if (elemfind.length > 0 && $(elemfind[0]).is(":visible")) {
                    return showYn

                }
                else if (element.TourInfo.Steps()[0].TypeId() !== "Introduction")
                {
                    return self.GetSteps(element.TourInfo.Steps).length> 0;
                }
                else {
                    return false;
                }
            }
        });

        return res;
    };
    self.GetSteps = function (data) {
        var res = ko.utils.arrayFilter(data(), function (element) {

            if (self.Filters.SearchText() != "") {
                var $tempDiv = $("<div></div>")
                $tempDiv.html(element.HTMLData());

                if (!element.Title().toLowerCase().includes(self.Filters.SearchText().toLowerCase()) && !$tempDiv.text().toLowerCase().includes(self.Filters.SearchText().toLowerCase()))
                    return false;
            }
            

            var showYn = true;

            if (element.ShowIf) {
                for (var i = 0; i < element.ShowIf().length; i++) {

                    var elemfind = $(element.ShowIf()[i].Element());

                    if (element.ShowIf()[i].Condition() == 'if') {
                        if (elemfind.length != 1) {
                            showYn = false;
                            break;
                        }
                        else if (!$(elemfind[0]).is(":visible")) {
                            showYn = false;
                            break;
                        }
                    }
                    else {
                        if (elemfind.length > 0 && elemfind.is(":visible")) {
                            showYn = false;
                            break;
                        }
                    }
                }
            }
            

            if (data().indexOf(element) == 0 && element.TypeId() === "Introduction") {
                return true;
            }
            else if (!showYn)
                return false;
            else if (["Message"].indexOf(element.TypeId()) >= 0)
                return false;
            else if (element.Element() == null)
                return true;
            else {
                var elemfind = $(element.Element());

                if (elemfind.length > 0 && $(elemfind[0]).is(":visible")) {
                    return true

                }
                else {
                    return false;
                }
            }
        });

        return res;
    };
}


function checkIntroHelp() {

    if (!TemplatesLoadedYn) {
        setTimeout(function () {
            checkIntroHelp()
        }, 200);

        return;
    }

    helpDataTemplate = null;

    if (helpData == null) {
        helpDataTemplate = new HelpDataTemplate(ko.mapping.fromJS({ HelpContextId: null, GuidedTours: [] }));
    }
    else {
        helpDataTemplate = new HelpDataTemplate(ko.mapping.fromJS(helpData));
    }

    if (helpData) {

        var introTour = null;

        for (var i = 0; i < helpData.GuidedTours.length; i++) {
            if (helpData.GuidedTours[i].TourInfo.Steps.length > 0) {
                if (helpData.GuidedTours[i].TourInfo.Steps[0].TypeId == "Introduction" && !helpData.GuidedTours[i].DoNotShowYn) {
                    introTour = helpData.GuidedTours[i];
                    break;
                }
            }
        }

        if (introTour) {

            if (tourGuideTemplateShow == null)
                tourGuideTemplateShow = new TourGuideTemplate();

            tourGuideTemplateShow.SelectedTour(ko.mapping.fromJS(introTour));

            tourGuideTemplateShow.PlayTour();
        }
    }


}


function ExpandHelpSteps(data) {
    data.ExpandedYn(!data.ExpandedYn());
};

function playHelp(index,parent,data) {

    $(".GuruHelpDiv").remove();

    if (tourGuideTemplateShow == null)
        tourGuideTemplateShow = new TourGuideTemplate();
    tourGuideTemplateShow.SelectedTour(ko.mapping.fromJS(ko.mapping.fromJS(parent)));

    tourGuideTemplateShow.PlayTour();

    if (index) {
        tourGuideTemplateShow.PlayStepIndex(index);
        tourGuideTemplateShow.PlayStep(tourGuideTemplateShow.SelectedTour().TourInfo.Steps()[tourGuideTemplateShow.PlayStepIndex()]);
    }
}
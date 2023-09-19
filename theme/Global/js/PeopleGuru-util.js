
function legacyJQueryYn() {
    return window.jQuery.fn.jquery == "2.1.0";
}

var ajaxComplete = (!legacyJQueryYn() ? "always" : "complete")
var ajaxError = (!legacyJQueryYn() ? "fail" : "error")
var bootstrapDropdownToggle = (!legacyJQueryYn() ? "data-bs-toggle" : "data-toggle")

//constants for the modal dialogs
OK = 1; CANCEL = 2; YES = 4; NO = 8; COPY = 16; APPROVE = 32; DENY = 64;

if (typeof (PeopleGuru) == 'undefined') { PeopleGuru = {} };

PeopleGuru.showDialog = function (title, text, type, callback, jsonData) {
    var ok = (type & OK) ? 'ok=&' : '';
    var yes = (type & YES) ? 'yes=&' : '';
    var no = (type & NO) ? 'no=&' : '';
    var cancel = (type & CANCEL) ? 'cancel=&' : '';
    var copy = (type & COPY) ? 'copy=&' : '';
    var approve = (type & APPROVE) ? 'approve=&' : '';
    var deny = (type & DENY) ? 'deny=&' : '';

    var options = ok + yes + no + cancel + copy + approve + deny;

    text = text.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");

    if (options.length > 0)
        options = '&' + options;
    return top.mgDialog(title, text, options, callback, jsonData);
}



function mgDialog(title, text, type, completionCallback, params) {

    var btns = [];
    var dialogInstance;

    if (type.indexOf("copy") != -1) {
        btns.push({
            label: "Copy",
            action: function () {

                dialogInstance.close();

                var $temp = $("<input>");
                $("body").append($temp);
                $temp.val(dialogInstance.$modalBody.text()).select();
                document.execCommand("copy");
                $temp.remove();

            }
        })
    }

    if (type.indexOf("approve") != -1) {
        btns.push({
            label: "Approve",
            cssClass: "btn-success",
            action: function () {

                dialogInstance.close();

                if (typeof (completionCallback) == "function") {
                    var res = { approve: true };

                    dialogInstance.$modalBody.find("select").each(function () {
                        res[this.id] = this.value;
                    });

                    dialogInstance.$modalBody.find("input").each(function () {

                        if (($(this).is(":radio")) || ($(this).is(":checkbox")))
                            res[this.id] = $(this).prop("checked");
                        else
                            res[this.id] = this.value;
                    });

                    dialogInstance.$modalBody.find("textarea").each(function () {
                        res[this.id] = this.value;
                    });

                    completionCallback(res, params);
                }

            }
        })
    }

    if (type.indexOf("deny") != -1) {
        btns.push({
            label: "Deny",
            cssClass: "btn-danger",
            action: function () {

                dialogInstance.close();

                if (typeof (completionCallback) == "function") {
                    var res = { deny: true };

                    dialogInstance.$modalBody.find("select").each(function () {
                        res[this.id] = this.value;
                    });

                    dialogInstance.$modalBody.find("input").each(function () {
                        if (($(this).is(":radio")) || ($(this).is(":checkbox")))
                            res[this.id] = $(this).prop("checked");
                        else
                            res[this.id] = this.value;
                    });

                    dialogInstance.$modalBody.find("textarea").each(function () {
                        res[this.id] = this.value;
                    });

                    completionCallback(res, params);
                }

            }
        })
    }

    if (type.indexOf("yes") != -1) {
        btns.push({
            label: "Yes",
            action: function () {
                dialogInstance.close();
                if (typeof (completionCallback) == "function")
                {
                    var res = { yes: true };

                    dialogInstance.$modalBody.find("select").each(function () {
                        res[this.id] = this.value;
                    });

                    dialogInstance.$modalBody.find("input").each(function () {
                        if (($(this).is(":radio")) || ($(this).is(":checkbox")))
                            res[this.id] = $(this).prop("checked");
                        else
                            res[this.id] = this.value;
                    });

                    dialogInstance.$modalBody.find("textarea").each(function () {
                        res[this.id] = this.value;
                    });

                    completionCallback(res, params);
                }
                    
            }
        })
    }

    if (type.indexOf("no") != -1) {
        btns.push({
            label: "No",
            action: function () {
                dialogInstance.close();
                if (typeof (completionCallback) == "function")
                    completionCallback({ no: true }, params);
            }
        })
    }

    if (type.indexOf("ok") != -1) {
        btns.push({
            label: "Ok",
            action: function () {
                
                dialogInstance.close();

                if (typeof (completionCallback) == "function")
                {
                    var res = { ok: true };

                    dialogInstance.$modalBody.find("select").each(function () {
                        res[this.id] = this.value;
                    });

                    dialogInstance.$modalBody.find("input").each(function () {
                        if (($(this).is(":radio")) || ($(this).is(":checkbox")))
                            res[this.id] = $(this).prop("checked");
                        else
                            res[this.id] = this.value;
                    });

                    dialogInstance.$modalBody.find("textarea").each(function () {
                        res[this.id] = this.value;
                    });

                    completionCallback(res, params);
                }

                    
            }
        })
    }

    if (type.indexOf("cancel") != -1) {
        btns.push({
            label: "Cancel",
            action: function () {
                dialogInstance.close();
                if (typeof (completionCallback) == "function")
                    completionCallback({ cancel: true }, params);
            }
        })
    }

    dialogInstance = new BootstrapDialog({
        title: title,
        message: text,
        buttons: btns
    });

    dialogInstance.open();

    return dialogInstance;
}

String.prototype.replaceAll = function (search, replace, ignoreCase) {
    if (ignoreCase) {
        var result = [];
        var _string = this.toLowerCase();
        var _search = search.toLowerCase();
        var start = 0, match, length = _search.length;
        while ((match = _string.indexOf(_search, start)) >= 0) {
            result.push(this.slice(start, match));
            start = match + length;
        }
        result.push(this.slice(start));
    } else {
        result = this.split(search);
    }
    return result.join(replace);
};

var ChatTemplatesLoadedYn = false;

if (!ChatTemplatesLoadedYn) {
    $.ajax({
        url: '../../api/Chat/ChatTemplates',
        cache: false,
        type: "GET",
        dataType: "html",
        async: true
    }).done(function (responseText) {

        if (!ChatTemplatesLoadedYn)
            $("body").append(responseText);

        ChatTemplatesLoadedYn = true;
    })[ajaxComplete](function (jqXHR, status) {
    })[ajaxError](function (jqXHR, status, errorThrown) {
    });
}

function FileListItem(a) {
    a = [].slice.call(Array.isArray(a) ? a : arguments)
    for (var c, b = c = a.length, d = !0; b-- && d;) d = a[b] instanceof File
    if (!d) throw new TypeError("expected argument to FileList is File or array of File objects")
    for (b = (new ClipboardEvent("")).clipboardData || new DataTransfer; c--;) b.items.add(a[c])
    return b.files
}

const toBase64 = function (file) {
    return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {  resolve(reader.result) };
        reader.onerror = function (error) { reject(error) };
    })
};

var MsgPersonId = null;
var MsgChatId = null;
var MsgChatContainerClass = null;
var prevName = null;

function MessagesViewModel(Data) {
    var self = this;
    self.MsgRoot = function () { return self};
    self.MsgChatId = null;
    self.AllowBackYn = ko.observable(true);
    self.ContainerClass = ".msger.active";
    self.Data = ko.mapping.fromJS(Data);
    self.ContactEnum = ko.mapping.fromJS(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']);
    self.Contacts = ko.mapping.fromJS([]);
    self.ChatFilter = ko.observable('');
    self.ContactsFilter = ko.observable('');
    self.GroupsFilter = ko.observable('');
    self.Groups = ko.mapping.fromJS([]);
    self.UnreadOnlyYn = ko.observable(false);
    self.SelectedMsg = ko.mapping.fromJS(
        {
            Data: null,
            ShiftSwapInfo: null,
            Msgs: [],
            MsgsIndex: 1,
            TypingYn: false,
            HasMoreMsgsYn: true,
            loading: false,
            showInfo: false,
            showContactsYn: false,
            showGroupsYn: false,
            selectedFiles: [],
            TempPeople: [],
            TempGroups: [],
        });
    self.ClearSelectedMsg = function () {
        self.SelectedMsg.Msgs([]);
        self.SelectedMsg.MsgsIndex(1);
        self.SelectedMsg.Data(null);
        self.SelectedMsg.TypingYn(false);
        self.SelectedMsg.HasMoreMsgsYn(true);
        self.SelectedMsg.loading(false);
        self.SelectedMsg.showInfo(false);
        self.SelectedMsg.showContactsYn(false);
        self.SelectedMsg.showGroupsYn(false);
        self.SelectedMsg.selectedFiles([]);
        self.SelectedMsg.TempPeople([]);
        self.SelectedMsg.TempGroups([]);
    };
    self.FilteredChats = ko.computed(function () {

        const fuse = new Fuse(ko.mapping.toJS(self.Data()),
            {
                keys: [
                    "Name",
                    "People.FirstName",
                    "People.LastName",
                    "Groups.GroupName",
                ]
            });

        return fuse.search(self.ChatFilter());
    }, self);
    self.getFilteredChats = function () {
        return ko.utils.arrayFilter(self.Data(), function (element) {

            var searchMatch = true;

            if (self.ChatFilter().trim() != "") {

                searchMatch = false;

                $.each(self.FilteredChats(), function (key, item) {
                    if (item.item.Id == element.Id()) {
                        searchMatch = true;
                        return;
                    }
                });
            }
            
            return searchMatch && (!element.ReadYn() || !self.UnreadOnlyYn());
        });
    };
    self.getSortedMsgs = function (data) {
        return ko.computed(function () {
            return data().sort(function (left, right) {
                return (new Date(left.CreatedOn) < new Date(right.CreatedOn)) ? -1 : 1;
            });
        });
    };
    self.toggleInfo = function () {
        self.SelectedMsg.showInfo(!self.SelectedMsg.showInfo());
    };
    self.toggleReadUnread = function () {
        self.UnreadOnlyYn(!self.UnreadOnlyYn());
    };
    self.toggleShowGroups = function () {
        self.SelectedMsg.showGroupsYn(!self.SelectedMsg.showGroupsYn());
    };
    self.getContacts = function () {

        $.ajax({
            url: '../../api/Chat/AvailablePeople',
            cache: false,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true
        }).done(function (jsonData) {

            if (jsonData.People)
                self.Contacts(ko.mapping.fromJS(jsonData.People)());

            if (MsgPersonId)
                self.selectDirectChatPerson();

        })[ajaxComplete](function (jqXHR, status) {
        })[ajaxError](function (jqXHR, status, errorThrown) {
            console.log(errorThrown);
        });

        $.ajax({
            url: '../../api/Chat/AvailableGroups',
            cache: false,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true
        }).done(function (jsonData) {

            if (jsonData.Groups)
                self.Groups(ko.mapping.fromJS(jsonData.Groups)());

        })[ajaxComplete](function (jqXHR, status) {
        })[ajaxError](function (jqXHR, status, errorThrown) {
            console.log(errorThrown);
        });
    };
    self.scrollContacts = function (data) {
        var elem = $(".contact-list-data-" + data);

        var cOffset = $(".contact-list-div").offset().top;
        var tOffset = elem.offset().top;
        var height = 0;
        var pScroll = (tOffset - cOffset) - height;

        $(".contact-list-div").stop().animate({ scrollTop: '+=' + pScroll + 'px' });
    };
    self.scrollGroups = function (data) {
        var elem = $(".group-list-data-" + data);

        var cOffset = $(".group-list-div").offset().top;
        var tOffset = elem.offset().top;
        var height = 0;
        var pScroll = (tOffset - cOffset) - height;

        $(".group-list-div").stop().animate({ scrollTop: '+=' + pScroll + 'px' });
    };
    self.getContactsFilter = function (letter) {

        return ko.utils.arrayFilter(self.Contacts(), function (element) {

            var searchMatch = true;

            if (self.ContactsFilter().trim() != "") {
                if ((!(element.FirstName() + " " + element.LastName()).toLowerCase().includes(self.ContactsFilter().toLowerCase().trim())) && (!(element.LastName() + " " + element.FirstName()).toLowerCase().includes(self.ContactsFilter().toLowerCase().trim())))
                    searchMatch = false;
            }
            return searchMatch && (element.LastName().toLowerCase().startsWith(letter.toLowerCase()) || (!element.LastName().toLowerCase().match(/[a-z]/i) && letter == "#"));
        });
    };
    self.getGroupsFilter = function (letter) {

        return ko.utils.arrayFilter(self.Groups(), function (element) {

            var searchMatch = true;

            if (self.GroupsFilter().trim() != "") {
                if (!element.GroupName().toLowerCase().includes(self.GroupsFilter().toLowerCase().trim()))
                    searchMatch = false;
            }
            return searchMatch && (element.GroupName().toLowerCase().startsWith(letter.toLowerCase()) || (!element.GroupName().toLowerCase().match(/[a-z]/i) && letter == "#"));
        });
    };
    self.addPerson = function (data) {

        if (!self.SelectedMsg.Data().People)
            self.SelectedMsg.Data().People = ko.mapping.fromJS([]);

        var match = ko.utils.arrayFirst(self.SelectedMsg.Data().People(), function (element) {
            return element.PersonId() == data.PersonId();
        });

        if (match) {
            if (self.SelectedMsg.Data().Id() == -1)
                self.SelectedMsg.Data().People.remove(match);
            else {
                var match1 = ko.utils.arrayFirst(self.SelectedMsg.TempPeople(), function (element) {
                    return element.PersonId() == data.PersonId();
                });

                if (match1) {
                    self.SelectedMsg.Data().People.remove(match);
                    self.SelectedMsg.TempPeople.remove(match1);
                }
            }
        }
        else {
            self.SelectedMsg.Data().People.push(data);
            self.SelectedMsg.TempPeople.push(data);
        }
           

    };
    self.hasPerson = function (data) {

        var m = false;

        if (self.SelectedMsg.Data().People) {
            var match = ko.utils.arrayFirst(self.SelectedMsg.Data().People(), function (element) {
                return element.PersonId() == data.PersonId();
            });

            if (match)
                m=true
        }
       

        return m;

    };
    self.addGroup = function (data) {

        if (!self.SelectedMsg.Data().Groups)
            self.SelectedMsg.Data().Groups = ko.mapping.fromJS([]);

        var match = ko.utils.arrayFirst(self.SelectedMsg.Data().Groups(), function (element) {
            return element.GroupId() == data.GroupId();
        });

        if (match) {
            if (self.SelectedMsg.Data().Id() == -1)
                self.SelectedMsg.Data().Groups.remove(match);
            else {
                var match1 = ko.utils.arrayFirst(self.SelectedMsg.TempGroups(), function (element) {
                    return element.GroupId() == data.GroupId();
                });

                if (match1) {
                    self.SelectedMsg.Data().Groups.remove(match);
                    self.SelectedMsg.TempGroups.remove(match1);
                }
            }
        }
        else {
            self.SelectedMsg.Data().Groups.push(data);
            self.SelectedMsg.TempGroups.push(data);
        }
            


    };
    self.hasGroup = function (data) {

        var m = false;

        if (self.SelectedMsg.Data().Groups) {
            var match = ko.utils.arrayFirst(self.SelectedMsg.Data().Groups(), function (element) {
                return element.GroupId() == data.GroupId();
            });

            if (match)
                m = true
        }


        return m;
    };
    self.toggleContacts = function () {

        if (self.SelectedMsg.Data().Id() == -1)
            self.cancelChat();
        else {
            if (self.Contacts().length == 0) {
                self.getContacts();
            }

            self.SelectedMsg.showContactsYn(!self.SelectedMsg.showContactsYn());
        }
            
    };
    self.startDirectChat = function () {

        if (self.SelectedMsg.Data())
            self.cancelChat();

        if (self.Contacts().length == 0) {
            self.getContacts();
        }
        else {
            self.selectDirectChatPerson();
        }
    };
    self.openChat = function () {

        if (self.SelectedMsg.Data())
            self.cancelChat();

        if (self.MsgChatId) {
            var findChat = ko.utils.arrayFirst(self.Data(), function (element) {
                return element.Id() == self.MsgChatId;
            });

            self.MsgChatId = null;

            if (findChat)
                self.selectMsg(findChat);
        }
        
    };
    self.selectDirectChatPerson = function () {
      
        var match = ko.utils.arrayFirst(self.Data(), function (element) {

            var ok = false;

            if (element.People().length == 1 && element.Groups().length == 0) {

                if (element.People()[0].PersonId() == MsgPersonId)
                    ok = true;
            }

            return ok;
        });

        if (match) {
            self.selectMsg(match);
        }
        else {
            var match1 = ko.utils.arrayFirst(self.Contacts(), function (element) {
                return element.PersonId() == MsgPersonId;
            });

            if (match1) {
                self.ClearSelectedMsg();
                self.SelectedMsg.Data(ko.mapping.fromJS({ Id: -1, Name: null, EmployeeSwapRequestId: null, EmployeeSwapStatusCd : null, People: [ko.mapping.toJS(match1)], Groups: [] }));
            }
        }
       

        MsgPersonId = null;
    };
    self.cancelContacts = function () {

        if (self.SelectedMsg.Data().Id() != -1) {
            self.SelectedMsg.Data().Name(prevName);
            self.SelectedMsg.showContactsYn(false);
            $.each(self.SelectedMsg.TempPeople(), function (key, item) {

                var match = ko.utils.arrayFirst(self.SelectedMsg.Data().People(), function (element) {
                    return element.PersonId() == item.PersonId();
                });

                if (match)
                    self.SelectedMsg.Data().People.remove(match);
            });

            $.each(self.SelectedMsg.TempGroups(), function (key, item) {

                var match = ko.utils.arrayFirst(self.SelectedMsg.Data().Groups(), function (element) {
                    return element.GroupId() == item.GroupId();
                });

                if (match)
                    self.SelectedMsg.Data().Groups.remove(match);
            });
        }
        else
            self.cancelChat();

    };
    self.hideContacts = function () {

        if (self.SelectedMsg.Data().Id() != -1)
        {
            $.ajax({
                url: '../../api/Chat/Update',
                cache: false,
                type: "POST",
                data: JSON.stringify({ Id: self.SelectedMsg.Data().Id(), Name: self.getNewName(), People: self.getSelectedPeople(), Groups: self.getSelectedGroups() }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true
            }).done(function (jsonData) {

                if (!jsonData.success)
                    PeopleGuru.showDialog("Update Chat Error", jsonData.error_description, OK);
            })[ajaxComplete](function (jqXHR, status) {
            })[ajaxError](function (jqXHR, status, errorThrown) {
                PeopleGuru.showDialog("Update Chat Error", "There was an error trying to update the chat.", OK);
            });

            self.SelectedMsg.TempPeople([]);
            self.SelectedMsg.TempGroups([]);
            prevName = null;
        }

        self.SelectedMsg.showContactsYn(false);

    };
    self.showContacts = function () {

        if (self.Contacts().length == 0) {
            self.getContacts();
        }

        self.SelectedMsg.showContactsYn(true);

    };
    self.getFormattedPeople = function (Name, people, groups, EmployeeSwapRequestId, EmployeeSwapStatusCd) {

        var postFix = "";

        if (EmployeeSwapRequestId) {
            postFix = " <i class='fa fa-exchange fa-lg' style='color: #0099da' ></i> Shift Swap " + EmployeeSwapStatusCd
        }

        var res = "";
        var total = 0;

        if (Name)
            return Name

        if (people != undefined)
            total += people().length;

        if (groups != undefined)
            total += groups().length;

        if (groups != undefined && groups().length > 0) {
            if (total == 1) {
                return groups()[0].GroupName() + postFix;
            }
            else if (groups().length == 2 && total == 2) {
                return groups()[0].GroupName() + ' & ' + groups()[1].GroupName() + postFix;
            }
            else if (groups().length >= 2 && total > 2 ) {
                return groups()[0].GroupName() + ', ' + groups()[1].GroupName() + ' +' + (total - 2).toString() + postFix;
            }
            else if (total == 2) {
                return groups()[0].GroupName() + ', ' + people()[0].FirstName() + postFix;
            }
            else if (total > 2) {
                return groups()[0].GroupName() + ', ' + people()[0].FirstName() + ' +' + (total - 2).toString() + postFix;
            }
        }
        else if (people != undefined && people().length > 0) {
            if (total == 1) {
                return people()[0].FirstName() + ' ' + people()[0].LastName() + postFix;
            }
            else if (people().length == 2 && total == 2) {
                return people()[0].FirstName() + ' & ' + people()[1].FirstName() + postFix;
            }
            else if (people().length >= 2 && total > 2) {
                return people()[0].FirstName() + ', ' + people()[1].FirstName() + ' +' + (total - 2).toString() + postFix;
            }
            else if (total == 2) {
                return groups()[0].GroupName() + ', ' + people()[0].FirstName() + postFix;
            }
            else if (total > 2) {
                return groups()[0].GroupName() + ', ' + people()[0].FirstName() + ' +' + (total - 2).toString() + postFix;
            }
        }

        return "Me";
    };
    self.selectMsg = function (data) {
        self.ClearSelectedMsg();
        self.SelectedMsg.Data(data);
        prevName = self.SelectedMsg.Data().Name();
    };
    self.loadMsgData = function () {
        self.loadShiftSwapInfo();
        self.connectChat();
    };
    self.removeFile = function (data) {
        if ($(self.ContainerClass + ' .chat-files')[0].files.length > data.key) {
            var newFileList = Array.from($(self.ContainerClass + ' .chat-files')[0].files);
            newFileList.splice(data.key, 1);
            newFileList = newFileList.reverse();
            $(self.ContainerClass + ' .chat-files')[0].files = new FileListItem(newFileList);
            $(self.ContainerClass + ' .chat-files').trigger("change");
        }
    };
    self.createMsg = function () {

        if (self.Contacts().length == 0) {
            self.getContacts();
        }

        self.ClearSelectedMsg();
        self.SelectedMsg.Data(ko.mapping.fromJS({ Id: -1, EmployeeSwapRequestId: null, EmployeeSwapStatusCd: null,Name: null,People: [],Groups: []}));
        self.SelectedMsg.showContactsYn(true);
    };
    self.webSocketChat = null;
    self.closeChat = function () {
        try {
            self.webSocketChat.close();
            self.ClearSelectedMsg();
        }
        catch (e) { }

        if (self)
            $(self.ContainerClass).addClass('no-show');
        self = null;
        
    };
    self.cancelChat = function () {
        showMessages(true);
    };
    self.loadMsgs = function (scrollTo) {
        if (!self.SelectedMsg.HasMoreMsgsYn() || self.SelectedMsg.loading())
            return;

        var msgPanel = $(self.ContainerClass + " .msger-chat");
        self.SelectedMsg.loading(true);
        
        $.ajax({
            url: '../../api/Chat/Messages?ChatId=' + self.SelectedMsg.Data().Id() + '&startIndex=' + self.SelectedMsg.MsgsIndex() + '&recordCount=20',
            cache: false,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true
        }).done(function (jsonData) {


            if (jsonData.Messages) {
                self.SelectedMsg.Msgs(self.SelectedMsg.Msgs().concat(jsonData.Messages));

                if (self.SelectedMsg.MsgsIndex() == 1) {

                    msgPanel.scrollTop(msgPanel[0].scrollHeight);
                }
                else {
                    msgPanel.scrollTop(scrollTo);
                }
               

            }
            else {
                self.SelectedMsg.HasMoreMsgsYn(false)
            }

            self.SelectedMsg.MsgsIndex(self.SelectedMsg.MsgsIndex() + 20);
            self.SelectedMsg.loading(false);
        })[ajaxComplete](function (jqXHR, status) {
        })[ajaxError](function (jqXHR, status, errorThrown) {
            console.log(errorThrown);
        });
    };
    self.loadShiftSwapInfo = function () {

        if (!self.SelectedMsg.Data().EmployeeSwapRequestId())
            return;

        $.ajax({
            url: '../../api/Schedule/ShiftSwapInfo?EmployeeSwapRequestId=' + self.SelectedMsg.Data().EmployeeSwapRequestId(),
            cache: false,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true
        }).done(function (jsonData) {

            var totalMine = 0.0;
            var totalNotMine = 0.0;

            $.each(jsonData.MyHours, function (key, day) {
                totalMine += day.Hours.HoursCostCalc.hours;
            });

            $.each(jsonData.NotMyHours, function (key, day) {
                totalNotMine += day.Hours.HoursCostCalc.hours;
            });

            jsonData.totalMine = totalMine;
            jsonData.totalNotMine = totalNotMine;

            self.SelectedMsg.ShiftSwapInfo(jsonData);
        })[ajaxComplete](function (jqXHR, status) {
        })[ajaxError](function (jqXHR, status, errorThrown) {
            console.log(errorThrown);
        });
    };
    self.chatTimeout;
    self.sendChatAlive = function () {
        if (self.webSocketChat) {
            clearTimeout(self.chatTimeout);
            self.webSocketChat.send(JSON.stringify([{ type: "isAlive" }]));
            self.chatTimeout = setTimeout(self.sendChatAlive, 3000);
        }
    };
    self.connectChat = function (sendMsgYn) {

        self.loadMsgs();

        $(self.ContainerClass + " .msg-typing-indicator").addClass("no-show");

        try {
            self.webSocketChat.close();
            self.webSocketChat = null;
        }
        catch (e) { }

        var protocol = "wss";

        if (location.protocol !== 'https:')
            protocol = "ws";

        self.webSocketChat = new WebSocket(protocol + '://' + window.location.host + "/api/Chat/Subscribe?ChatId=" + self.SelectedMsg.Data().Id());

        self.webSocketChat.onerror = function (event) {
            console.log(event)
        };

        self.webSocketChat.onopen = function (event) {
            if (sendMsgYn) {
                setTimeout(function () { self.sendChatMsg(); }, 1000);
            }
            self.sendChatAlive();
            var msgPanel = $(self.ContainerClass + " .msger-chat");
            msgPanel.scrollTop(msgPanel[0].scrollHeight);
        };

        self.webSocketChat.onmessage = function (msg) {

            resetSessionTimeout();

            try {
                var data = JSON.parse(msg.data);

                if (data.TypingYn == true) {
                    $(self.ContainerClass + " .msg-typing-indicator").removeClass("no-show");

                    var msgPanel = $(self.ContainerClass + " .msger-chat");

                    if (msgPanel.scrollTop() > ((msgPanel[0].scrollHeight - msgPanel.height()) - 80))
                        msgPanel.scrollTop(msgPanel[0].scrollHeight - msgPanel.height());
                }
                else if (!$(self.ContainerClass + " .msg-typing-indicator").hasClass("no-show")) {
                    $(self.ContainerClass + " .msg-typing-indicator").addClass("no-show");
                }

                if (data.Messages) {
                    self.SelectedMsg.Msgs(self.SelectedMsg.Msgs().concat(data.Messages));
                    var msgPanel = $(self.ContainerClass + " .msger-chat");

                    if (msgPanel)
                        setTimeout(function() {msgPanel.scrollTop(msgPanel[0].scrollHeight)}, 500);
                }
            } catch (e) {
                console.log(e);
            }

        }; 

        self.webSocketChat.onclose = function (event) {
            if (self.webSocketChat) {
                self.closeChat()
            }
        }

        $(self.ContainerClass + " .msger-input").unbind("keyup");
        $(self.ContainerClass + " .msger-input").on("keyup", function () {
            if (!self.SelectedMsg.TypingYn() && $(self.ContainerClass + " .msger-input").val().trim() != "") {
                self.SelectedMsg.TypingYn(true)
                try {
                    self.webSocketChat.send(JSON.stringify([{ type: "action", typing: true }]));
                } catch (e) {
                    console.log(e);
                }
            }
            else if (self.SelectedMsg.TypingYn() && $(self.ContainerClass + " .msger-input").val().trim() == "") {
                self.SelectedMsg.TypingYn(false)
                try {
                    self.webSocketChat.send(JSON.stringify([{ type: "action", typing: false }]));
                } catch (e) {
                    console.log(e);
                }
            }
        });

    };
    self.scrolled = function(data, event) {
        var elem = event.target;
        if (elem.scrollTop < 3/4*elem.scrollHeight) {
            var msgPanel = $(self.ContainerClass + " .msger-chat");
            var scrollTo = msgPanel.scrollTop();
            self.loadMsgs(scrollTo);
        }
    };
    self.getNewName = function () {
        return self.SelectedMsg.Data().Name()
    }
    self.getSelectedPeople = function () {

        var people = [];

        if (self.SelectedMsg.Data().People)
            $.each(self.SelectedMsg.Data().People(), function (key, item) {
                people.push(item.PersonId());
            });

        return people;
    };
    self.getSelectedGroups = function () {

        var groups = [];

        if (self.SelectedMsg.Data().Groups)
            $.each(self.SelectedMsg.Data().Groups(), function (key, item) {
                groups.push(item.GroupId());
            });

        return groups;
    };
    self.chatUnsubscribeMsg = function (data) {

        self.chatUnsubscribe(data.Data());

    };
    self.chatUnsubscribe = function (data) {

        data.UnsubscribedYn(true);

        $.ajax({
            url: '../../api/Chat/Unsubscribe',
            cache: false,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ChatId: data.Id() }),
            dataType: "json",
            async: true
        }).done(function () {
        })[ajaxComplete](function (jqXHR, status) {
        })[ajaxError](function (jqXHR, status, errorThrown) {
        });

    };
    self.chatSubscribeMsg = function (data) {

        self.chatSubscribe(data.Data());

    };
    self.chatSubscribe = function (data) {

        data.UnsubscribedYn(false);

        $.ajax({
            url: '../../api/Chat/UndoUnsubscribe',
            cache: false,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ChatId: data.Id() }),
            dataType: "json",
            async: true
        }).done(function () {
        })[ajaxComplete](function (jqXHR, status) {
        })[ajaxError](function (jqXHR, status, errorThrown) {
        });

    };
    self.chatDelete = function (data) {

        $.ajax({
            url: '../../api/Chat/Delete',
            cache: false,
            type: "DELETE",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ ChatId: data.Id() }),
            dataType: "json",
            async: true
        }).done(function () {
            self.Data.remove(data);
        })[ajaxComplete](function (jqXHR, status) {
        })[ajaxError](function (jqXHR, status, errorThrown) {
        });

    };
    self.msgs = [];
    self.SendMsg = function (totalWait) {

        $(self.ContainerClass + ' .chat-msg-sending').addClass("no-show");

        if (self.msgs.length >= totalWait) {
            try {
                self.webSocketChat.send(JSON.stringify(self.msgs));
            } catch (e) {
                console.log(e);
            }

            $(self.ContainerClass + " .msger-input").val("");
            $(self.ContainerClass + ' .chat-files')[0].files = new FileListItem([]);
            $(self.ContainerClass + ' .chat-files').trigger("change");
        }
        else if (self.webSocketChat) {

            $(self.ContainerClass + ' .chat-msg-sending').removeClass("no-show");
            setTimeout(self.SendMsg, 1000, totalWait);
        }
        else {

            $(self.ContainerClass + " .msger-input").val("");
            $(self.ContainerClass + ' .chat-files')[0].files = new FileListItem([]);
            $(self.ContainerClass + ' .chat-files').trigger("change");
        }
       
    };
    self.sendChatMsg = function () {

        $(self.ContainerClass + ' .chat-msg-sending').removeClass("no-show");

        if ($(self.ContainerClass + " .msger-input").val().trim() != "" || self.SelectedMsg.selectedFiles().length > 0) {

            if (self.SelectedMsg.Data().Id() != -1) {

                self.msgs = [];
                var totalWait = 0;

                if ($(self.ContainerClass + " .msger-input").val().trim() != "") {
                    totalWait = 1;
                    self.msgs.push({ type: "text", content: $(self.ContainerClass + " .msger-input").val() });
                }

                totalWait = totalWait + self.SelectedMsg.selectedFiles().length;

                $.each(self.SelectedMsg.selectedFiles(), function (key, item) {

                    var filename = $(self.ContainerClass + ' .chat-files')[0].files[item.key].name;

                    toBase64($(self.ContainerClass + ' .chat-files')[0].files[item.key]).then(function(val){

                        var filecontent = val;

                        if (val.split(",").length > 1)
                            filecontent = val.split(",")[1];

                        self.msgs.push(
                            {
                                type: "mms",
                                filename: filename,
                                content: "",
                                filecontent: filecontent
                            }
                        );

                    }
                    )

                });

                self.SendMsg(totalWait);


            }
            else {

                $(self.ContainerClass + ' .chat-msg-sending').addClass("no-show");

                $.ajax({
                    url: '../../api/Chat/Create',
                    cache: false,
                    type: "POST",
                    data: JSON.stringify({ Name: self.getNewName(), People: self.getSelectedPeople(), Groups: self.getSelectedGroups() }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: true
                }).done(function (chatId) {

                    self.SelectedMsg.Data().Id(chatId);
                    self.connectChat(true);

                })[ajaxComplete](function (jqXHR, status) {
                })[ajaxError](function (jqXHR, status, errorThrown) {
                    PeopleGuru.showDialog("Start Chat Error", "There was an error trying to start the chat.", OK);
                });
            }

        }
        else {
            $(self.ContainerClass + ' .chat-msg-sending').addClass("no-show");
        }

       
    };

}

var viewModelChat;

function showMessages() {
    $.ajax({
        url: '../../api/Chat/List',
        cache: false,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true
    }).done(function (jsonData) {

        populateMessagesData(jsonData);
        
    })[ajaxComplete](function (jqXHR, status) {
    })[ajaxError](function (jqXHR, status, errorThrown) {
        console.log(errorThrown)
    });
}

function populateMessagesData(jsonData) {

    if (viewModelChat) { 
        viewModelChat.closeChat();
    }

    if ($(".msger.active").length > 0) {
        ko.cleanNode($(".msger.active")[0]);
        $(".msger.active").remove();
    }

    if (MsgChatContainerClass) {
        $("." + MsgChatContainerClass).append($(".msger").clone().addClass("active"));
    }
    else {
        $("body").append($(".msger:not(.msger-inline)").clone().addClass("active"));
    }
   

    viewModelChat = new MessagesViewModel(jsonData);

    ko.applyBindings(viewModelChat, $(".msger.active")[0]);

    if (MsgPersonId)
        viewModelChat.startDirectChat();

    if (MsgChatId) {
        viewModelChat.MsgChatId = MsgChatId;
        MsgChatId = null;
        viewModelChat.openChat();
    }
        

    $('.msger.active').removeClass('no-show').draggable();
}

function startDirectChat(personId) {

    MsgPersonId = personId;

    if (viewModelChat && viewModelChat.self)
        viewModelChat.startDirectChat();
    else
        showMessages();
}   

function startPhoneCall(CellPhone) {

    PeopleGuru.showDialog("Cell Phone", CellPhone, OK);
}   

function openChat(chatId, msgChatContainerClass) {

    MsgChatId = chatId;
    MsgChatContainerClass = msgChatContainerClass;

    if (viewModelChat && viewModelChat.self)
        viewModelChat.openChat();
    else
        showMessages();
}  

function toggleChatOptions(elem, event) {

    $(elem).closest(".chat-msg-parent").find(".chat-msg-options").toggleClass("no-show");

    event.stopPropagation();
}

var webSocketChatNotifications;

$(document).ready(function () {

    if ($(".total-unread").length > 0) {
        
        var protocol = "wss";
        var TotalUnread = 0;

        if (location.protocol !== 'https:')
            protocol = "ws";

        webSocketChatNotifications = new WebSocket(protocol + '://' + window.location.host + "/api/Chat/Notifications");

        webSocketChatNotifications.onerror = function (event) {
        };

        webSocketChatNotifications.onopen = function (event) {
        };

        webSocketChatNotifications.onmessage = function (msg) {

            try {
                var data = JSON.parse(msg.data);
                if (data.TotalUnread > 0) {
                    $(".total-unread").removeClass("no-show");
                    $(".total-unread").html(data.TotalUnread);

                    if (data.TotalUnread > TotalUnread) {
                        if (viewModelChat && !viewModelChat.self) {
                            if (!viewModelChat.SelectedMsg.Data()) {
                                showMessages();
                            }
                           
                        }
                    }

                    TotalUnread = data.TotalUnread;
                }
                else if (!$(".total-unread").hasClass("no-show")) {
                    $(".total-unread").addClass("no-show");
                    TotalUnread = 0;
                }

                webSocketChatNotifications.send(JSON.stringify({isAlive: true}));
            } catch (e) {
                console.log(e);
            }

        };
    }
   
});


function getProfileImage(PersonId, data) {
    if (data())
        return data()
    else {
        $.ajax({
            url: '../../api/Helper/GetProfileImage?PersonId=' + PersonId,
            cache: false,
            type: "GET",
            dataType: "json",
            async: true
        }).done(function (jsonData) {
            data(jsonData.error_description);
        })[ajaxComplete](function (jqXHR, status) {
        })[ajaxError](function (jqXHR, status, errorThrown) {
        });
    }

    return data()
}

function USPSAddressVerification(callback,params,parentId) {
    closeSchedulePopup("address-helper");

    var $div = $(".schedule-popup-template").clone().removeClass("no-show").removeClass("schedule-popup-template").addClass("address-helper schedule-popup new-popup");


    $div.find(".schedule-popup-header-title-text").html("Address Verification");

    $("body").append($div);
    $div.draggable({ handle: ".schedule-popup-header" });
    popToTop($div[0], true);

    var FullAddress = ".USPSFullAddress", Address1 = ".USPSAddress1", Address2 = ".USPSAddress2", City = ".USPSCity", State = ".USPSState", Zip5 = ".USPSZip"

    if (parentId) {
        FullAddress = "#" + parentId + " .USPSFullAddress";
        Address1 = "#" + parentId + " .USPSAddress1";
        Address2 = "#" + parentId + " .USPSAddress2";
        City = "#" + parentId + " .USPSCity";
        State = "#" + parentId + " .USPSState";
        Zip5 = "#" + parentId + " .USPSZip";
    }

    $.ajax({
        url: '../../api/Helper/AddressHelp',
        cache: false,
        type: "GET",
        data: {
            FullAddress: $(FullAddress).val(),
            Address1: $(Address1).val(),
            Address2: $(Address2).val(),
            City: $(City).val(),
            State: $(State).find(":selected").text().substring(0, 2),
            Zip5: $(Zip5).val(),
            parentId: "#" + parentId
        },
        async: true
    }).done(function (responseText) {

        $div.find(".schedule-popup-main").html(responseText);
        addressTemplate.callback = callback;
        addressTemplate.callback_params = params;
    })[ajaxComplete](function (jqXHR, status) {
    })[ajaxError](function (jqXHR, status, errorThrown) {
    });
}
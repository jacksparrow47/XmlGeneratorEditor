/*<summary>
coded by M.Emin yalçın
.Net Developer
writed for step to step generate xml document 
</summary>*/

(function ($) {

    $.fn.GenerateXmlCreator=function(option)
    {
        var _htmlobject = this;
        var xmlcontent = document.createElement("div");
        xmlcontent.id = "xmlcontent";
        var elementcount = 0;
        var _downimg = "ScriptPlugin/arrow-downright.gif";
        var _rightimg = "ScriptPlugin/arrow-right.gif";
        var _elemimg = "ScriptPlugin/elem.gif";
        option = $.extend({
            rootNode: "root",
            rootValue: "",
            author: "",
            organization: "",
            database:new Array(),
            init: function () {
               
                var child = option.getElement(option.rootNode, option.rootValue);
                xmlcontent.appendChild(option.getProcessMenu());
                xmlcontent.appendChild(child);
                _htmlobject.html(xmlcontent.innerHTML);
            },
            getXmlDocument:function(){
                var xmlnode = $(_htmlobject).find(".xmlnode").eq(0);
                var tagname = $(xmlnode).children(".tagName").eq(0).children("#tagName").eq(0).text().trim();
                var value = $(xmlnode).find(".tagValue").eq(0);
                if (value != undefined) {
                    value = value.attr("id");
                }
                else
                    value = "";
                var comments = $(xmlnode).children("#comments_content").eq(0).children(".comment");
                var str = "<" + tagname;
                var properties = $(xmlnode).children("#attributes_content").eq(0).find("#proattribute");
                for (var i = 0; i < properties.length; i++) {
                    var att = $(properties).eq(i).text().trim().split(":");
                    str += " " + att[0].trim() + "='" + att[1].trim() + "' ";
                }
                str += ">" + value;
                for (var i = 0; i < comments.length; i++) {
                    str += " <!--" + $(comments).eq(i).children(".child").eq(0).text().trim() + "--> ";
                }
                var childs = $(xmlnode).children(".xmlnode");
                for (var i = 0; i < childs.length; i++) {
                    str += option.getDeepchildXmlCode(childs.eq(i));
                }
                str += "</" + tagname.trim() + ">";
                str = '<?xml version="1.0" encoding="UTF-8"?>' + str;
                return str;
                //alert(str);
            },
            getDataSource: function () {
                this.database = new Array();
                var obj = new Object();
                obj.parent = "";
                obj.childs = new Array();
                var xmlnode = $(_htmlobject).find(".xmlnode").eq(0);
                var tagname = $(xmlnode).children(".tagName").eq(0).children("#tagName").eq(0).text().trim();
                obj.nodeName = tagname;
                var value = $(xmlnode).find(".tagValue").eq(0);
                if (value != undefined) {
                    value = value.attr("id");
                }
                else
                    value = "";
                obj.nodeValue = value;
                var comments = $(xmlnode).children("#comments_content").eq(0).children(".comment");
                obj.comments = new Array();
                obj.properties = new Array();
                var properties = $(xmlnode).children("#attributes_content").eq(0).find("#proattribute");
                for (var i = 0; i < properties.length; i++) {
                    var att = $(properties).eq(i).text().split(":");
                    obj.properties.push("" + att[0].trim() + "='" + att[1].trim() + "'");
                }
                for (var i = 0; i < comments.length; i++) {
                    obj.comments.push($(comments).eq(i).children(".child").eq(0).text().trim());
                }
                var childs = $(xmlnode).children(".xmlnode");
                for (var i = 0; i < childs.length; i++) {
                    obj.childs.push(option.getDeepDataSource(childs.eq(i)));
                }
                this.database.push(obj);
            },
            getDeepDataSource: function (pop) {
                var obj = new Object();
                obj.parent = "";
                obj.childs = new Array();
                var xmlnode = $(pop);
                var tagname = $(xmlnode).children(".tagName").eq(0).children("#tagName").eq(0).text().trim();
                obj.nodeName = tagname;
                var value = $(xmlnode).find(".tagValue").eq(0);
                if (value != undefined) {
                    value = value.attr("id");
                }
                else
                    value = "";
                obj.nodeValue = value;
                obj.comments = new Array();
                obj.properties = new Array();
                var comments = $(xmlnode).children("#comments_content").eq(0).children(".comment");
                var properties = $(xmlnode).children("#attributes_content").eq(0).find("#proattribute");
                for (var i = 0; i < properties.length; i++) {
                    var att = $(properties).eq(i).text().split(":");
                    obj.properties.push("" + att[0].trim() + "='" + att[1].trim() + "'");
                }
                for (var i = 0; i < comments.length; i++) {
                    obj.comments.push($(comments).eq(i).children(".child").eq(0).text().trim());
                }
                var childs = $(xmlnode).children(".xmlnode");
                for (var i = 0; i < childs.length; i++) {
                    obj.childs.push(option.getDeepDataSource(childs.eq(i)));
                }
                return obj;
            },
            getElement: function (nodeName, nodeValue, attributes)
            {
                var xnode = document.createElement("div");
                xnode.setAttribute("class", "xmlnode");
                var tag = document.createElement("div");
                tag.setAttribute("class", "tagName");
                tag.innerHTML = "<span style='width:20px;margin-right:5px;'><img src='"+_rightimg+"' class='openclose'/></span><span style='width:20px;'><img id='elem' src='"+_elemimg+"'/>"+option.getMenu(elementcount)+"</span> <span id='tagName'>" + nodeName+"</sapn>";                xnode.appendChild(tag);
                var comments = document.createElement("div");
                comments.id = "comments_content";
                xnode.appendChild(comments);
                if (nodeValue != "")
                {
                    var tagvalue = document.createElement("div");
                    tagvalue.id = nodeValue;
                    tagvalue.innerHTML = "TagValue : " + nodeValue;
                    tagvalue.setAttribute("class", "tagValue");
                    xnode.appendChild(tagvalue);
                }
                var att = document.createElement("div");
                att.id = "attributes_content";
                if (attributes != undefined) {
                    for (var i = 0; i < attributes.length; i++) {
                        var tagvalue = document.createElement("div");
                        tagvalue.id = attributes[i].name;
                        tagvalue.innerHTML = "" + attributes[i].name + " : " + attributes[i].value;
                        tagvalue.setAttribute("class", "attributes");
                        att.appendChild(tagvalue);
                    }
                }
                xnode.appendChild(att);
                elementcount++;
                return xnode;
            },
            getProcessMenu:function(){
                var div = document.createElement("div");
                var bt = document.createElement("input");
                bt.type = "button";
                bt.id = "export";
                bt.value = "Çıktı Al";
                div.appendChild(bt);
                return div;
            },
            getProperty: function (proName, proValue) {
                var tagvalue = document.createElement("div");
                tagvalue.id = proName;
                tagvalue.innerHTML = "<span><img id='propertyOfElement' src='"+_elemimg+"'/>" + option.getPropertyMenu(elementcount) + "</span> <span id='proattribute'>" + proName + " : " + proValue + "<span/>";
                tagvalue.setAttribute("class", "attribute");
                return tagvalue;
            },
            getComment: function (comment) {
                var tagvalue = document.createElement("div");
                tagvalue.id = "commentdl";
                tagvalue.innerHTML = "<span class='child'>"+comment+"</span>"+option.getCommentMenu(elementcount);
                tagvalue.setAttribute("class", "comment");
                return tagvalue;
            },
            getPopup:function(parentId,elementId,requestType,elementIdentity)
            {
                var str = ' <div id="pop" style="width:550px;border:2px solid black;padding-left:10px;">';
                if (elementIdentity != undefined) {

                    if (elementIdentity.Header != undefined)
                        str += " <b><center>" + elementIdentity.Header + "</center></b>";
                    str += " <table>";
                    if (elementIdentity.attributes != undefined) {
                        for (var i = 0; i < elementIdentity.attributes.length; i++) {
                            str += ' <tr>   <td> <span id="popelement"> ' + elementIdentity.attributes[i].attributeName + ' </span>  </td>   <td> ' +
                                    '<input type="text" id="popelementname" />';
                            if (elementIdentity.attributes[i].must != undefined)
                                str += '   <input type="hidden" id="popmust" />';
                            str += ' </td>  </tr>';
                        }
                    }
                }
                str += '<tr><td></td><td>' +
                    '<input type="button" id="popcancel" value="Vazgeç" />' +
                    '<input type="button" id="popok"  value="Kaydet" />' +
                    '<input type="txt" style="display:none" id="'+requestType+'"  class="requestType" />' +
                    '</td></tr></table></div>';

                return str;
            },
            getPopupString: function (elementIdentity) {
                var str = ' <div id="pop" style="width:550px;border:2px solid black;padding-left:10px;">';
                if (elementIdentity != undefined) {

                    if (elementIdentity.Header != undefined)
                        str += " <b><center>" + elementIdentity.Header + "</center></b>";
                    str += " <table>";
                    str += ' <tr>   <td> <span id="poptext"><code> ' + elementIdentity.text.replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</code> </span>  </td>   <td> <td></td></tr>';
                }
                str += '<tr><td></td><td>' +
                    '<input type="button" id="popcancel" value="Kapat" />' +
                    '</td></tr></table></div>';

                return str;
            },
            addElement: function (id) {
                var obj = new Object();
                obj.Header = "Yeni Element Ekleme";
                var attr = new Object();
                attr.attributeName = "Element Adı";
                attr.must = true;
                obj.attributes = new Array();
                obj.attributes.push(attr);
                var attr1 = new Object();
                attr1.attributeName = "Element Değeri";
                obj.attributes.push(attr1);
                return option.getPopup("",id,"",obj);
              
            },
            addProperty: function (id) {
                var obj = new Object();
                obj.Header = "Özelik Ekleme";
                var attr = new Object();
                attr.attributeName = "Özellik Adı";
                attr.must = true;
                obj.attributes = new Array();
                obj.attributes.push(attr);
                var attr1 = new Object();
                attr1.attributeName = "Özellik Değeri";
                obj.attributes.push(attr1);
                return option.getPopup("", id, 1, obj);

            },
            addComment:function(id){
                var obj = new Object();
                obj.Header = "Yorum Ekleme";
                var attr = new Object();
                attr.attributeName = "Yorum";
                attr.must = true;
                obj.attributes = new Array();
                obj.attributes.push(attr);
                return option.getPopup("", id, 2, obj);
            },
            getXmlPath: function (pop,pro) {
                var xmlnode = $(pop).parents(".xmlnode").eq(0);
                var tagname = $(xmlnode).children(".tagName").eq(0).children("#tagName").eq(0).text().trim();
                var parent = $(xmlnode).parent(".xmlnode");
                var str = tagname;
                if (parent != undefined)
                    str = option.getDeepParentPath(parent) + "/" + str;
                if (str.indexOf("/") != 0)
                    str = "/" + str;
                if (pro != undefined)
                {
                    pro = pro.split(":")[1];
                    str.trim() += "@" + pro.trim();
                }
                var obj = new Object();
                obj.Header = "Xml Path";
                obj.text = str;
                return option.getPopupString(obj);
            },
            getDeepParentPath:function(pop)
            {
               
                var xmlnode = $(pop);
                var tagname = $(xmlnode).children(".tagName").eq(0).children("#tagName").eq(0).text().trim();
                var str = tagname;
                var parent = $(xmlnode).parent(".xmlnode");
                if (parent != undefined && parent.length!=0)
                    str = option.getDeepParentPath(parent) + "/" + str;
                return str;
            },
            getXmlCode:function(pop){
                var xmlnode = $(pop).parents(".xmlnode").eq(0);
                var tagname = $(xmlnode).children(".tagName").eq(0).children("#tagName").eq(0).text().trim();
                var value = $(xmlnode).find(".tagValue").eq(0);
                if (value != undefined) {
                    value = value.attr("id");
                }
                else
                    value = "";
                var comments = $(xmlnode).children("#comments_content").eq(0).children(".comment");
                var str = "<" + tagname;
                var properties = $(xmlnode).children("#attributes_content").eq(0).find("#proattribute");
                for (var i = 0; i < properties.length; i++) {
                    var att = $(properties).eq(i).text().split(":");
                    str += " " + att[0].trim() + "='" + att[1].trim() + "' ";
                }
                str += ">" + value;
                for (var i = 0; i < comments.length; i++) {
                    str += " <!--" + $(comments).eq(i).children(".child").eq(0).text().trim() + "--> ";
                }
                var childs = $(xmlnode).children(".xmlnode");
                for (var i = 0; i < childs.length; i++) {
                    str += option.getDeepchildXmlCode(childs.eq(i));
                }
                str += "</" + tagname + ">";
                var obj = new Object();
                obj.Header = "Xml Code";
                obj.text = str;
                return option.getPopupString(obj);
            },
            getDeepchildXmlCode:function(pop)
            {
                var xmlnode = $(pop);
                var tagname = $(xmlnode).children(".tagName").eq(0).children("#tagName").eq(0).text().trim();
                var value = $(xmlnode).find(".tagValue").eq(0);
                if (value != undefined) {
                    value = value.attr("id");
                }
                else
                    value = "";
                var comments = $(xmlnode).children("#comments_content").eq(0).children(".comment");
                var str = "<" + tagname;
                var properties = $(xmlnode).children("#attributes_content").eq(0).find("#proattribute");
                for (var i = 0; i < properties.length; i++) {
                    var att = $(properties).eq(i).text().split(":");
                    str += " " + att[0].trim() + "='" + att[1].trim() + "' ";
                }
                str += ">" + value;
                for (var i = 0; i < comments.length; i++) {
                    str += " <!--" + $(comments).eq(i).children(".child").eq(0).text().trim() + "--> ";
                }
                var childs = $(xmlnode).children(".xmlnode");
                for (var i = 0; i < childs.length; i++) {
                    str += option.getDeepchildXmlCode(childs.eq(i));
                }
                str += "</" + tagname + ">";
                return str;
            },
            getPropertyMenu:function(id)
            {
                var str = '<table class="menutable" id="' + id + '"  >' +
                              
                   '               <tr>' +
                   '                   <td><span id="proxpath">XPath Göster</span>' +
                   '                   </td>' +
                   '               </tr>' +
                   '               <tr>' +
                   '                   <td><span class="popdeleteprop" id="' + id + '">özelliği Sil</span>' +
                   '                   </td>' +
                   '               </tr>' +
                   '               <tr>' +
                   '                   <td><span id="cancel">İptal</span>' +
                   '                   </td>' +
                   '               </tr>' +

                   '           </table>';
                return str;
            },
            getCommentMenu: function (id) {
                var str = '<table class="menutable" id="' + id + '"  >' +

                  '               <tr>' +
                  '                   <td><span id="commentxpath">Xcode Göster</span>' +
                  '                   </td>' +
                  '               </tr>' +
                  '               <tr>' +
                  '                   <td><span class="popdeletecomment" id="' + id + '">Yorumu Sil</span>' +
                  '                   </td>' +
                  '               </tr>' +
                  '               <tr>' +
                  '                   <td><span id="cancel">İptal</span>' +
                  '                   </td>' +
                  '               </tr>' +

                  '           </table>';
                return str;
            },
            getMenu: function (id)
            {
                var str = '<table class="menutable" id="'+id+'"  >' +
                                '<tr>' +
                    '   <td><span id="xmlcode">Xml Kodunu Göster</span>' +
                    '                   </td>' +
                    '               </tr>' +
                    '               <tr>' +
                    '                   <td><span id="xmlpath">XPath Göster</span>' +
                    '                   </td>' +
                    '               </tr>' +
                    '               <tr>' +
                    '                   <td><span class="popdeleteelement" id="' + id + '">Elementi Sil</span>' +
                    '                   </td>' +
                    '               </tr>' +
                    '               <tr>' +
                    '                   <td>Ekle' +
                    '                   </td>' +
                    '                   <td style="width: 22px;">' +
                    '                       <img src="'+_rightimg+'" id="btnrow" />' +
                    '                       <span>' +
                    '                           <table class="menutable child" >' +
                    '                               <tr>' +
                    '                                   <td><span class="addcomment" id="' + id + '">Yorum</span>' +
                    '                                   </td>' +
                    '                               </tr>' +
                    '                               <tr>' +
                    '                                   <td><span class="addproperty" id="' + id + '">Özellik</span>' +
                    '                                   </td>' +
                    '                               </tr>' +
                    '                               <tr>' +
                    '                                   <td><span class="addelement" id="'+id+'">Element</span>' +
                    '                                   </td>' +
                    '                               </tr>' +
                    '                               <tr>' +
                    '                                   <td><span id="cancel">İptal</span>' +
                    '                                   </td>' +
                    '                                </tr>' +
                    '                           </table>' +
                    '                       </span>' +
                    '                   </td>' +
                    '               </tr>' +
                    '               <tr>' +
                    '                   <td><span id="cancel">İptal</span>' +
                    '                   </td>' +
                    '               </tr>' +

                    '           </table>';
                return str;
            }

        }, option);
        
        option.init();
        $("#popok").live("click", function () {
            var requestType = $(this).parent().children(".requestType").attr("id");
            if (requestType == undefined || requestType == 0) {//node ekleme
                var pop = "";
                for (var i = 0; i < $(this).parents().length; i++) {
                    if ($(this).parents().eq(i).attr("id") == "pop")
                        pop = $(this).parents().eq(i);
                    var obj = new Array(); obj.element = new Array();
                    if ($(this).parents().eq(i).hasClass("xmlnode")) {
                        var len = $(pop).find("#popelementname").length;
                        for (var j = 0; j < len ; j++) {
                            var must = $(pop).find("#popelementname").eq(j).parent().children("#popmust");
                            var valel=$(pop).find("#popelementname").eq(j).val();
                            if ((must != undefined && valel != "") || must == undefined)
                                obj.element.push(valel);
                            else
                            {
                                var popelement = $(pop).find("#popelementname").eq(j).parent().parent().find("#popelement").text();
                                alert(popelement + " is required");
                                return;
                            }
                        }
                        
                        $(this).parents().eq(i).append(option.getElement(obj.element[0], obj.element[1]));
                        return;
                    }
                }
            }
            if (requestType == 1 || requestType == "1") {//attribe  ekleme
                var pop = "";
                for (var i = 0; i < $(this).parents().length; i++) {
                    if ($(this).parents().eq(i).attr("id") == "pop")
                        pop = $(this).parents().eq(i);
                    var obj = new Array(); obj.element = new Array();
                    if ($(this).parents().eq(i).hasClass("xmlnode")) {
                        var len = $(pop).find("#popelementname").length;
                        for (var j = 0; j < len ; j++) {
                            var must = $(pop).find("#popelementname").eq(j).parent().children("#popmust");
                            var valel = $(pop).find("#popelementname").eq(j).val();
                            if ((must != undefined && valel != "") || must == undefined)
                                obj.element.push(valel);
                            else {
                                var popelement = $(pop).find("#popelementname").eq(j).parent().parent().find("#popelement").text();
                                alert(popelement + " is required");
                                return;
                            }
                        }
                        var property = option.getProperty(obj.element[0], obj.element[1]);
                        $(this).parents().eq(i).find("#attributes_content").eq(0).append(property);
                        return;
                    }
                }
            }
            if (requestType == 2 || requestType == "2") {//comment ekleme
                var pop = "";
                for (var i = 0; i < $(this).parents().length; i++) {
                    if ($(this).parents().eq(i).attr("id") == "pop")
                        pop = $(this).parents().eq(i);
                    var obj = new Array(); obj.element = new Array();
                    if ($(this).parents().eq(i).hasClass("xmlnode")) {
                        var len = $(pop).find("#popelementname").length;
                        for (var j = 0; j < len ; j++) {
                            var must = $(pop).find("#popelementname").eq(j).parent().children("#popmust");
                            var valel = $(pop).find("#popelementname").eq(j).val();
                            if ((must != undefined && valel != "") || must == undefined)
                                obj.element.push(valel);
                            else {
                                var popelement = $(pop).find("#popelementname").eq(j).parent().parent().find("#popelement").text();
                                alert(popelement + " is required");
                                return;
                            }
                        }
                        var comment = option.getComment(obj.element[0]);
                        $(this).parents().eq(i).find("#comments_content").eq(0).append(comment);
                        return;
                    }
                }
            }
        });
        $("#export").live("click", function () {
            var str = xml.getXmlDocument();
            var csvData = 'data:text/xml;charset=utf-8,' + encodeURIComponent(str);
            var a = document.createElement('a');
            a.href = csvData;
            a.target = '_blank';
            a.download = "download.xml";
            a.click();
            $(a).remove();
        });

        $(".openclose").live("click", function () {
                $(this).parents(".xmlnode").eq(0).children("#comments_content").slideToggle('slow');
                $(this).parents(".xmlnode").eq(0).children("#attributes_content").slideToggle('slow');
                $(this).parents(".xmlnode").eq(0).children(".xmlnode").slideToggle('slow');
                if ($(this).hasClass("close")) {
                    $(this).attr("src", _downimg);
                    $(this).removeClass("close");
                }
                else {
                    $(this).attr("src", _rightimg);
                    $(this).addClass("close");
                }
        });
        $("#commentxpath").live("click", function () {
            var obj=new Object();
            obj.Header="Yorum Xcode";
            obj.text = "<!--" + $(this).parents(".comment").eq(0).children(".child").eq(0).text() + "-->";
            $(this).parent().html($(this).parent().html() + option.getPopupString(obj));
        });
        $(".popdeletecomment").live("click", function () {
            $(this).parents(".comment").eq(0).remove();
        });
        $(".comment").live("dblclick", function () {
            $(this).children(".menutable").css("display","table");
        });
        $("#xmlcode").live("click", function () {
            var str= option.getXmlCode(this);
            $(this).parent().html($(this).parent().html() + str);
        });
        $("#proxpath").live("click", function () {
            var str = option.getXmlPath(this, $(this).parents(".attribute").eq(0).children("#proattribute").text());
            $(this).parent().html($(this).parent().html() + str);
        });
        $("#xmlpath").live("click", function () {
            var str = option.getXmlPath(this);
            $(this).parent().html($(this).parent().html() + str);
        });
        $(".addcomment").live("click", function () {
            $(this).parent().html($(this).parent().html() + option.addComment($(this).attr("id")));
        });
        $(".addproperty").live("click", function () {
            $(this).parent().html($(this).parent().html() + option.addProperty($(this).attr("id")));
        });
        $(".popdeleteelement").live("click", function () {
            $(this).parents(".xmlnode").eq(0).remove();
        });
        $(".popdeleteprop").live("click", function () {
            $(this).parents(".attribute").eq(0).remove();
        });
        $(".addelement").live("click", function () {
            $(this).parent().html($(this).parent().html() + option.addElement($(this).attr("id")));
        });
        $("#popcancel").live("click", function () {
            $(this).parent().parent().parent().parent().parent().remove();
        });
        $(".child").hide();
        $("#btnrow").live("hover", function () {
            $(this).parent().children("span").children(".child").show();
        });
        $("#cancel").live("click", function () {
            $(this).parent().parent().parent().parent().hide();
        });
        $("#elem").live("click", function () {
            $(this).parent().children(".menutable").css("display", "table");
        });
        $("#propertyOfElement").live("click", function () {
            $(this).parent().children(".menutable").css("display", "table");
        });
        return option;
    }

}(jQuery));
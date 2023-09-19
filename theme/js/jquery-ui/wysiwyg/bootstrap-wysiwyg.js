/* http://github.com/mindmup/bootstrap-wysiwyg */
/*global jQuery, $, FileReader*/
/*jslint browser:true*/


var selectedRange;
var localSel, localSelInit;

(function ($) {
	'use strict';
	var readFileIntoDataUrl = function (fileInfo) {
		var loader = $.Deferred(),
			fReader = new FileReader();
		fReader.onload = function (e) {
			loader.resolve(e.target.result);
		};
		fReader.onerror = loader.reject;
		fReader.onprogress = loader.notify;
		fReader.readAsDataURL(fileInfo);
		return loader.promise();
	};
	$.fn.cleanHtml = function () {
		var html = $(this).html();
		return html && html.replace(/(<br>|\s|<div><br><\/div>|&nbsp;)*$/, '');
	};

	function initToolbarBootstrapBindings($editor) {

	    var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier',
              'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
              'Times New Roman', 'Verdana'];

	    var fontTarget = $editor.find('[title=Font]').siblings('.dropdown-menu');

	    $.each(fonts, function (idx, fontName) {
	        fontTarget.append($('<li><a data-edit="fontName ' + fontName + '" style="font-family:\'' + fontName + '\'">' + fontName + '</a></li>'));
	    });

	    $editor.find('.toggle-html').click(function () {

	        if ($(this).hasClass("htmlToogle")) {
	            $(this).removeClass("htmlToogle");
	            var $html = $editor.find(".editor");
	            var $editorPlain = $editor.find(".editorPlain");

	            $html.html($editorPlain.val());
	            $editorPlain.focusout(function () {
	            });
	            $editorPlain.hide();
	            $html.show();
	        }
	        else {
	            $(this).addClass("htmlToogle");
	            var $html = $editor.find(".editor");
	            var $editorPlain = $editor.find(".editorPlain");
	            var $textEditorTextBox = $editor.find(".textEditorTextBox");
	           
	            $editorPlain.val($html.html());
	            $editorPlain.css("width", $html.css("width"));
	            $editorPlain.css("height", $html.css("height"));
	            $editorPlain.focusout(function () {
	                $html.html($editorPlain.val());
	                $textEditorTextBox.val($editorPlain.val());
	            });
	            $editorPlain.show();
	            $html.hide();
	        }
	       
	    });

	    $editor.find('.hide-editor').click(function () {

	        var $editorParent = $editor;
	        var $parent = $($editorParent.parents()[0]);
	        var $contentOnly 
            try
	        {
                $contentOnly = $($editorParent.find(".editor").html());
	        }
	        catch(e)
	        {
	            $contentOnly = $("<div>" + $editorParent.find(".editor").html() + "</div>");
	        }
                
            if ($contentOnly.length <= 0)
                $contentOnly = $("<div>" + $editorParent.find(".editor").html() + "</div>");

	        $contentOnly.insertAfter($editorParent);
	        $editorParent.hide();

	        $contentOnly.find(':input').prop('disabled', true);
	        $contentOnly.find('a').click(function (e) {
	            e.preventDefault();
	        });

	        $contentOnly.click(function (e) {

	            $editorParent.show();
	            $editorParent.addClass("TextEditorOnClickShow");
	            $(this).remove();
	            e.preventDefault();
	        });
	    });

	    $editor.find('.aFileUpload').click(function () {
	        $editor.find('.fileUpload').click();
	    });
	    $editor.find('a[title]').tooltip({ container: 'body' });

	    $editor.find('.dropdown-menu input:not(.pg-custom)').click(function () {
	        return false;
	    }).change(function () {
	        $(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');
	    }).keydown('esc', function () {
	        this.value = ''; $(this).change();
	    });

	    var d = new Date();
	    var uid = d.getTime();

	    $editor.find(".aFileUpload").addClass("aFileUpload" + uid);

	    $editor.find(".aFileUpload").popover({
	        placement: 'bottom',
	        title: '<span class="text-info"><strong>Add Image</strong></span>' +
                   '<button type="button" id="close" class="close" onclick="$(&quot;.aFileUpload&quot;).popover(&quot;hide&quot;);">&times;</button>',
	        html: true,
	        content: $("<div class='mini-image-gallery' id='imageGallery" + uid + "'></div>")
	    });

	    $editor.find(".aFileUpload").click(function (e) {

	        var res = { className: "aFileUpload" + uid }

	        res = { editorId: $editor.find(".editor")[0].id, className: "aFileUpload" + uid }
	        
	        showFrame("imageGallery" + uid, "ImageGallery" + uid, "../../System/Company/CompanyGallery.aspx?m=1", insertEditorImage, res);
	        $(".popover").draggable();
	    });


	    $editor.find(".pg-hyperlink-input").keyup(function (e) {
	        e.stopPropagation();
	    });

	  

	    $editor.find(".pg-hyperlink-input").click(function (e) {
	        $editor.focus();
	        var selection = window.getSelection();
	        localSelInit = false;

	        if (selectedRange) {
	            try {
	                selection.removeAllRanges();
	            } catch (ex) {
	                document.body.createTextRange().select();
	                document.selection.empty();
	            }
	            
	            selection.addRange(selectedRange);

	            var sel = window.getSelection();
	            if (sel.getRangeAt && sel.rangeCount) {
	                var range = sel.getRangeAt(0).cloneRange();
	                localSel = new Object();
	                localSel["startOffset"] = range.startOffset;
	                localSel["endOffset"] = range.endOffset;
	                localSel["startContainer"] = range.startContainer;
	                localSel["endContainer"] = range.endContainer;
	                localSelInit = true;
	            }

	            document.execCommand("hiliteColor", false, "darkgrey");
	        }
	        
	       
	        $(this).focus();
	        e.stopPropagation();
	    });

	    $editor.find(".pg-hyperlink-add").click(function (e) {
	        $editor.focus();
	        var selection = window.getSelection();
	        if ((localSelInit) && (selectedRange)) {
	            try {
	                selection.removeAllRanges();
	            } catch (ex) {
	                document.body.createTextRange().select();
	                document.selection.empty();
	            }
	            selectedRange.setStart(localSel["startContainer"], localSel["startOffset"]);
	            selectedRange.setEnd(localSel["endContainer"], localSel["endOffset"]);
	            selection.addRange(selectedRange);
	            document.execCommand("RemoveFormat", false, null);
	            document.execCommand("createLink", 0, $editor.find(".pg-hyperlink-input").val());
	            document.execCommand("foreColor", false, "#0000FF");
	        }
	       
	       
	        $(".pg-hyperlink-input").val("");
	    });


	    $editor.find(".pg-hyperlink-remove").click(function (e) {
	        $editor.focus();
	        var selection = window.getSelection();
	        if (selectedRange) {
	            try {
	                selection.removeAllRanges();
	            } catch (ex) {
	                document.body.createTextRange().select();
	                document.selection.empty();
	            }

	            selection.addRange(selectedRange);
	        }
	        document.execCommand("RemoveFormat", false, null);
	        document.execCommand("unlink", false, false);
	    });

	};

	function insertEditorImage(rs, res)
	{
	    if (rs)
	    {
	        $("#" + res.editorId).focus();
	        var sel = window.getSelection();
	        if (sel.rangeCount) {
	            var range = sel.getRangeAt(0);
	            range.insertNode($(rs.mediaContent)[0]);
	        }
	        
	    }
	    
	    $("." + res.className).click();
	}

	$.fn.wysiwyg = function (userOptions) {

       
	    var $editor = $(this);

	    if ($editor.hasClass("TextEditorInitialized"))
	        return false;

	    
	    $editor.addClass("TextEditorInitialized");

	    

	    var $editorParent = $editor.closest(".TextEditor");
	    var $textEditorTextBox = $editorParent.find(".textEditorTextBox");
	    var $editorPlain = $editorParent.find(".editorPlain");

	    $editor.html($editorPlain.val());

	  
	    if ($editorParent.find(".btn-toolbar").length == 0)
	        return false;

	    if ($editorParent.hasClass("TextEditorOnClick")) {

	        var $parent = $($editorParent.parents()[0]);
	        var $contentOnly
            try {
                $contentOnly = $($editorParent.find(".editor").html());
            }
            catch (e) {
                $contentOnly = $("<div>" + $editorParent.find(".editor").html() + "</div>");
            }

            if ($contentOnly.length <= 0)
                $contentOnly = $("<div>" + $editorParent.find(".editor").html() + "</div>");

            $contentOnly.insertAfter($editorParent);
	        $editorParent.hide();

	        $contentOnly.find(':input').prop('disabled', true);
	        $contentOnly.find('a').click(function (e) {
	            e.preventDefault();
	        });

	        $contentOnly.click(function (e) {

	            $editorParent.show();
	            $editorParent.addClass("TextEditorOnClickShow");
	            $(this).remove();
	            e.preventDefault();
	        });

	    }

	    initToolbarBootstrapBindings($editorParent);

	    var editor = this,
			options,
			toolbarBtnSelector,
			updateToolbar = function () {

			    $textEditorTextBox.val($editor.html());

				if (options.activeToolbarClass) {
				    $editorParent.find(options.toolbarSelector).find(toolbarBtnSelector).each(function () {
				        var command = $(this).data(options.commandRole).split(' ')[0];
				        
				        try{
				            if (document.queryCommandState(command)) {
				                $(this).addClass(options.activeToolbarClass);
				            } else {
				                $(this).removeClass(options.activeToolbarClass);
				            }
				        }
				        catch (e)
				        {

				        }
						
					});
				}
			},
			execCommand = function (commandWithArgs, valueArg) {
				var commandArr = commandWithArgs.split(' '),
					command = commandArr.shift(),
					args = commandArr.join(' ') + (valueArg || '');
				document.execCommand(command, 0, args);
				updateToolbar();
			},
			getCurrentRange = function () {
				var sel = window.getSelection();
				if (sel.getRangeAt && sel.rangeCount) {
					return sel.getRangeAt(0);
				}
			},
			saveSelection = function () {
				selectedRange = getCurrentRange();
			},
			restoreSelection = function () {
				var selection = window.getSelection();
				if (selectedRange) {
					try {
						selection.removeAllRanges();
					} catch (ex) {
						document.body.createTextRange().select();
						document.selection.empty();
					}

					selection.addRange(selectedRange);
				}
			},
			insertFiles = function (files) {
				editor.focus();
				$.each(files, function (idx, fileInfo) {
					if (/^image\//.test(fileInfo.type)) {
						$.when(readFileIntoDataUrl(fileInfo)).done(function (dataUrl) {
							execCommand('insertimage', dataUrl);
						}).fail(function (e) {
							options.fileUploadError("file-reader", e);
						});
					} else {
						options.fileUploadError("unsupported-file-type", fileInfo.type);
					}
				});
			},
			markSelection = function (input, color) {
				restoreSelection();
				if (document.queryCommandSupported('hiliteColor')) {
					document.execCommand('hiliteColor', 0, color || 'transparent');
				}
				saveSelection();
				input.data(options.selectionMarker, color);
			},
			bindToolbar = function (toolbar, options) {
				toolbar.find(toolbarBtnSelector).click(function () {
					restoreSelection();
					editor.focus();
					execCommand($(this).data(options.commandRole));
					saveSelection();
				});

				toolbar.find('[data-toggle=dropdown]').click(restoreSelection);

				toolbar.find('input[type=text][data-' + options.commandRole + ']').on('webkitspeechchange change', function () {
					var newValue = this.value; /* ugly but prevents fake double-calls due to selection restoration */
					this.value = '';
					restoreSelection();
					if (newValue) {
						editor.focus();
						execCommand($(this).data(options.commandRole), newValue);
					}
					saveSelection();
				}).on('focus', function () {
					var input = $(this);
					if (!input.data(options.selectionMarker)) {
						markSelection(input, options.selectionColor);
						input.focus();
					}
				}).on('blur', function () {
					var input = $(this);
					if (input.data(options.selectionMarker)) {
						markSelection(input, false);
					}
				});
				toolbar.find('input[type=file][data-' + options.commandRole + ']').change(function () {
					restoreSelection();
					if (this.type === 'file' && this.files && this.files.length > 0) {
						insertFiles(this.files);
					}
					saveSelection();
					this.value = '';
				});
			},
			initFileDrops = function () {
				editor.on('dragenter dragover', false)
					.on('drop', function (e) {
						var dataTransfer = e.originalEvent.dataTransfer;
						e.stopPropagation();
						e.preventDefault();
						if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
							insertFiles(dataTransfer.files);
						}
					});
			};
		options = $.extend({}, $.fn.wysiwyg.defaults, userOptions);
		toolbarBtnSelector = 'a[data-' + options.commandRole + '],button[data-' + options.commandRole + '],input[type=button][data-' + options.commandRole + ']';

		if (options.dragAndDropImages) {
			initFileDrops();
		}
		bindToolbar($editorParent.find(options.toolbarSelector), options);

		if (!(editor.attr('Disabled')))
		{
		    editor.attr('contenteditable', true)
                .on('mouseup keyup mouseout', function () {
                    saveSelection();
                    updateToolbar();
        });
		}
	
		$(window).bind('touchend', function (e) {
			var isInside = (editor.is(e.target) || editor.has(e.target).length > 0),
				currentRange = getCurrentRange(),
				clear = currentRange && (currentRange.startContainer === currentRange.endContainer && currentRange.startOffset === currentRange.endOffset);
			if (!clear || isInside) {
				saveSelection();
				updateToolbar();

			}
		});
		return this;
	};
	$.fn.wysiwyg.defaults = {
		toolbarSelector: '[data-role=editor-toolbar]',
		commandRole: 'edit',
		activeToolbarClass: 'btn-info',
		selectionMarker: 'edit-focus-marker',
		selectionColor: 'darkgrey',
		dragAndDropImages: true,
		fileUploadError: function (reason, detail) { console.log("File upload error", reason, detail); }
	};
}(window.jQuery));



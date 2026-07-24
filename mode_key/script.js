if(localStorage.getItem('Site_OK') != "true")
{
	let bur = document.createElement('dialog');
	bur.id="bur";
	bur.style="position:fixed;bottom:0px;left:0px;right:0px;margin:0px;width: 100%;";
	bur.innerHTML=`<iframe width="200" height="300px" src='/license.js.html'><a href='/license.html'>iframe対応してない人はここ</a></iframe><button onclick='localStorage.setItem("Site_OK","true");this.closest("dialog").close();this.closest("dialog").remove();'>同意する</button><button onclick='localStorage.setItem("Site_OK","false");window.location.href="/license.go.html";'>同意しない</button>`;
	document.body.appendChild(bur);
	bur.show();
}
function open_window(open_window_name, open_window_title) {
	console.log('open_window 開始:', open_window_name);

	// 1. テンプレートから要素を探して複製
	var $targetTemplate = $('#' + open_window_name);

	if ($targetTemplate.length === 0) {
		console.error('❌ エラー: クラス名「' + open_window_name + '」を持つテンプレート要素が HTML 内に見つかりません！');
		return;
	}

	var $dialog = $targetTemplate
		.clone()						// 要素を複製
		.removeAttr('id')		// IDが重複しないように削除
		.appendTo('body');	 // 先に画面に追加

	// ダイアログとして初期化
	$dialog.dialog({
		modal: false,
		title: open_window_title,
		closeText: "✕",
		width:400,
		height:400,
		close: function() {
			$(window).off('resize.' + open_window_name);
			$(this).dialog('destroy').remove();
		}
	});

	// 2. タイトルバーを確実に取得
	var $titlebar = $dialog.dialog("widget").find(".ui-dialog-titlebar");

	// 3. 最大化ボタンをタイトルバーに追加
	var $maxBtn = $('<button type="button" class="ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-maximize" title="最大化">' +
										'<span class="ui-button-icon ui-icon ui-icon-extlink"></span>' +
										'<span class="ui-button-icon-space"> </span>最大化' +
									'</button>').appendTo($titlebar);

	// 4. 最大化ボタンのクリックイベント
	$maxBtn.on("click", function() {
		var $uiDialog = $dialog.dialog("widget"); // ダイアログの外枠を取得

		if (!$uiDialog.hasClass("is-maximized")) {
			// --- 最大化処理 ---
			$uiDialog.data("original-state", {
				position: $uiDialog.css("position"),
				top: $uiDialog.css("top"),
				left: $uiDialog.css("left"),
				width: $uiDialog.css("width"),
				height: $uiDialog.css("height"),
				maxWidth: $dialog.dialog("option", "maxWidth")
			});

			$dialog.dialog("option", {
				width: $(window).width(),
				height: $(window).height()
				});

			$uiDialog.addClass("is-maximized").css({
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh"
			});

			$dialog.dialog("option", "height", $(window).height());

			// ⭕ 修正: jQuery UI の正しい無効化処理
			if ($dialog.data("ui-draggable")) { $dialog.draggable("disable"); }
			if ($dialog.data("ui-resizable")) { $dialog.resizable("disable"); }

			$(this).find(".ui-icon").removeClass("ui-icon-extlink").addClass("ui-icon-newwin");

		} else {
			// --- 元に戻す処理 ---
			var orig = $uiDialog.data("original-state");

			$dialog.dialog("option", "maxWidth", orig.maxWidth);

			$uiDialog.removeClass("is-maximized").css({
				position: orig.position,
				top: orig.top,
				left: orig.left,
				width: orig.width,
				height: orig.height
			});

			$dialog.dialog("option", "height", parseFloat(orig.height));

			// ⭕ 修正: jQuery UI の正しい有効化処理
			if ($dialog.data("ui-draggable")) { $dialog.draggable("enable"); }
			if ($dialog.data("ui-resizable")) { $dialog.resizable("enable"); }

			$(this).find(".ui-icon").removeClass("ui-icon-newwin").addClass("ui-icon-extlink");
		}
	});

	// 5. 画面サイズが変わったとき、最大化中なら追従させる
	$(window).on('resize.' + open_window_name, function() {
		var $uiDialog = $dialog.dialog("widget");
		if ($uiDialog.hasClass("is-maximized")) {
			$uiDialog.css({
				width: "100vw",
				height: "100vh"
			});
			$dialog.dialog("option", "height", $(window).height());
		}
	});
}
function maxto()
{
	if(document.fullscreenElement)
	{
		document.exitFullscreen();
		console.log("aho!");
	}
	else
	{
		document.body.requestFullscreen();
	}
}

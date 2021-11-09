module.exports = {
	registerHomebreweryHelper : function(CodeMirror) {
		CodeMirror.registerHelper('fold', 'homebrewery', function(cm, start) {
			const matcher = /^\\page.*/;
			const prevLine = cm.getLine(start.line - 1);

			if(start.line === cm.firstLine() || prevLine.match(matcher)) {
				const lastLineNo = cm.lastLine();
				let end = start.line, nextLine = cm.getLine(start.line + 1);

				while (end < lastLineNo) {
					if(nextLine.match(matcher)) {
						return {
							from : CodeMirror.Pos(start.line, 0),
							to   : CodeMirror.Pos(end, cm.getLine(end).length)
						};
					}
					++end;
					nextLine = cm.getLine(end + 1);
				}

				return {
					from : CodeMirror.Pos(start.line, 0),
					to   : CodeMirror.Pos(end, cm.getLine(end).length)
				};
			}

			return null;
		});
	}
};
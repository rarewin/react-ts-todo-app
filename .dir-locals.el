((web-mode .
	   (
	    (web-mode-markup-indent-offset . 2)
	    (web-mode-css-indent-offset    . 2)
	    (web-mode-code-indent-offset   . 2)
	    (eval add-hook 'before-save-hook #'clang-format-buffer nil t)
	 )))

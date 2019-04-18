run: ## Run local server (with multi-sessions)
	if [ ! -x "$(command -v tmux)" ]; then brew install tmux; fi
	tmux   new-session "(cd uniflow-api && make run-back); read" \;  \
	       split-window -h \; \
	       select-pane -t 0  \; \
	       split-window -v "(cd uniflow-front && yarn dev); read" \; \
	       select-pane -t 2
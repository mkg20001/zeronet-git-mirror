zite="1Nv8Y4Luger3g3Q7rqwtQYJRbhQc6disDM"

push: #push to zeronet
	gulp
	cp -rvp dist/* $(HOME)/ZeroNet/data/$(zite)/
dev:
	gulp dev
	cp -rp dist/* $(HOME)/ZeroNet/data/$(zite)/
watch:
	nodemon -e js,html,css -i dist -x make dev

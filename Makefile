npm-build:
	npm run build

build:
	docker build -t doiboard-image .

run:
	docker run -p 82:80 -d --name doiboard doiboard-image

publish-local: | build run

exec:
	docker exec -it doiboard /bin/sh

rm:
	docker stop doiboard
	docker rm doiboard
	docker rmi doiboard-image:latest

save-image:
	docker save -o doiboard-image.tar doiboard-image

scp-image:
	scp doiboard-image.tar root@apren.upc.edu:/SAN/docker-deploy/doiboard
	rm doiboard-image.tar

publish: | build save-image scp-image

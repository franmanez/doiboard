npm-build:
	npm run build

build:
	docker build -t doiboard-image .

run:
	docker run -p 8080:80 -d --name doiboard doiboard-image

publish: | build run

exec:
	docker exec -it doiboard /bin/sh

rm:
	docker stop doiboard
	docker rm doiboard
	docker rmi doiboard-image:latest
build:
	docker build -t doiboard-image .

run:
	docker run -p 8080:80 -d --name doiboard doiboard-image

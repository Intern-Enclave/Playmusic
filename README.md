# React PlayMusic App

## Docker build command

```bash
docker build -t react-playmusic-app:latest --build-arg REACT_APP_API_URL=http://10.8.0.14:8080/api/ .
```

## Run & build with docker-compose

```bash
docker-compose up -d
```

Notes:

- Open `http://localhost:8081` to access the react app
- I'm using `yarn` to make the build process faster
- `10.8.0.14:8080` is the API URL (VPN IP - you need to connect to the VPN to access the API)
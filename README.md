## For Developers
### Setup Docker
You'll need to install docker https://docs.docker.com/install/

Open a new terminal within the project directory and follow the instructions:

#### Dev Environment
You just need to be in docker folder of this project and have already cloned the all task strategy project in the same folder as this project.

In windows 10 follow the steps in the link below:
https://www.architectryan.com/2018/08/31/how-to-change-environment-variables-on-windows-10/

```
export MYSQL_USERNAME_SWIPEN=swipen
export MYSQL_PASSWORD_SWIPEN=secret
export MYSQL_DATABASE_SWIPEN=application
export MYSQL_HOST_SWIPEN=db
export AWS_SWIPEN_DEV_BUCKET=s3-file-storing-dev
```

***For the profile variables take affect source it by running the following***

```
# Linux
source ~/.profile

# Mac
source ~/.bash_profile
```

***OR Logout/Login (Maybe this is the only way in Windows 10)***

### Necessary STEP to install the dependencies of the Services for dev environment before running `docker-compose up`
```
$ cd ts-development/docker

# <service_name> here are all the services e.g. ts-strategy, ts-producer, ts-email-consumer, ts-email-deliver
$ docker-compose run <service_name> npm i

### Please keep in mind that you need to run it in order for the first run.
$ docker-compose run application npm i

# installing other packages should be through the service as follows:
$ docker-compose run <service_name> npm install --save-dev <package>

```

* To run the containers: `docker-compose up -d` you could run it without -d (detach)

##### Useful docker-compose commands
The followings are docker-compose commands, which is sufficient for the needs of the developers, instead of using docker commands.
```
# create images, containers, and keep containers running in background for the docker-compose.yaml configuration
$ docker-compose up -d

# To monitor the status of containers running for the docker-compose.yaml configuration
$ docker-compose ps

# To remove your containers for the docker-compose.yaml configuration
$ docker-compose down

# Just to remove the local layers of the images created for the docker-compose.yaml configuration
$ docker-compose down -v --rmi "local"

# To remove your containers for the docker-compose.yaml with its volume -v & all images
$ docker-compose down -v --rmi "all"
```

##### Useful commands for debugging your containers:
```
$ docker logs <container-name>
$ docker logs <container-name> --tail 1
$ docker logs <container-name> --follow

# docker-compose flavour -f or --follow [to follow] --tail="all" [or number of lines]
$ docker-compose logs <service-name>
$ docker-compose logs -f <service-name>
```
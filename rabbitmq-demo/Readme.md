# SETUP
#### Run rabbitMQ using docker, so that won't have to go through installation.
##### Docker run example -> docker run --name rabbitmq -p 5672:5672 rabbitmq
###### This will allow you to communicate on port 5672 of your localhost to port 5672 of docker instance (default port of rabbitMQ).

#### Producer example
##### npm run publish message

#### Consmer example
##### npm run consume message

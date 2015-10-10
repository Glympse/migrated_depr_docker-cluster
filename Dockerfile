FROM python:latest

# Install server dependencies
RUN mkdir -p /src/server
COPY ./server/requirements.txt /src/server/
RUN pip install -r /src/server/requirements.txt

# Install client dependencies
RUN curl --silent --location https://deb.nodesource.com/setup_0.12 | bash -
RUN apt-get install -y nodejs
RUN npm install -g bower
RUN mkdir -p /src/client
COPY ./client/bower.json /src/client/
WORKDIR /src/client
RUN bower install --allow-root --force-latest

# Set working directory
WORKDIR /src/server

# Container port
EXPOSE 8080

# Set default container command
ENTRYPOINT ["python3"]

# Bundle app source
COPY . /src

# Run the app
CMD ["/src/server/app.py"]

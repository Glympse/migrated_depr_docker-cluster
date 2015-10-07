FROM python:latest

# Ass and install requirements
RUN mkdir -p /src/server
COPY ./server/requirements.txt /src/server/
RUN pip install -r /src/server/requirements.txt

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

FROM ubuntu:14.04

# Make sure the package repository is up to date
# RUN apt-get update

# Install Python 3 stuff
RUN apt-get install -y python3-setuptools
RUN easy_install3 pip
RUN pip install --upgrade pip

# Bundle app source
COPY . /src

# Add and install Python modules
RUN pip install -r /src/server/requirements.txt

# Container port
EXPOSE 8080

# Set default container command
ENTRYPOINT ["python3"]

# Set working directory
WORKDIR /src/server

# Run the app
CMD ["/src/server/app.py"]

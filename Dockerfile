FROM ubuntu:14.04

# Make sure the package repository is up to date
# RUN apt-get update

# Install Python 3 stuff
RUN apt-get install -y python3-setuptools
RUN easy_install3 pip

# Bundle app source
COPY . /src

# Add and install Python modules
RUN pip install -r /src/requirements.txt

# Container port
EXPOSE 8080

# Set default container command
ENTRYPOINT ["python3"]

# Run the app
CMD ["/src/app.py"]

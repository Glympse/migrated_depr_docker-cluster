# Tutorial

The tutorial walks you through the process of setting up Wordpress application using Docker Cluster.

Corresponding video tutorial ia available here:

[![Docker Cluster - Wordpress Demo](http://img.youtube.com/vi/28yTgcNzwjk/0.jpg)](http://www.youtube.com/watch?v=28yTgcNzwjk)

Here is an accompanying step-by-step guide with required JSON snippets.

- Install MySQL on one of your boxes using the following template.

```json
{
  "Name": "mysql-wordpress",
  "Image": "mysql:latest",
  "Env": [
    "MYSQL_ROOT_PASSWORD=root",
    "MYSQL_DATABASE=wp_db",
    "MYSQL_USER=wp_user",
    "MYSQL_PASSWORD=wp_psw"    
  ],
  "HostConfig": {
    "PortBindings": {
      "3306/tcp": [
        {
          "HostPort": "3306"
        }
      ]
    },
    "RestartPolicy": {
      "Name": "always"
    }
  }
}
```

- Install phpMyAdmin.

Replace ${HOST_IP} with IP address of MySQL host.

```json
{
  "Name": "phpmyadmin",
  "Image": "silintl/phpmyadmin:latest",
  "Env": [
    "MYSQL_HOST=${HOST_IP}"
  ],
  "HostConfig": {
    "PortBindings": {
      "80/tcp": [
        {
          "HostPort": "80"
        }
      ]
    },
    "RestartPolicy": {
      "Name": "always"
    }
  }
}
```

- Install Wordpress itself.

Replace ${HOST_IP} with IP address of MySQL host.

```json
{
  "Name": "wordpress",
  "Image": "wordpress:latest",
  "Env": [
    "WORDPRESS_DB_HOST=${HOST_IP}",
    "WORDPRESS_DB_NAME=wp_db",
    "WORDPRESS_DB_USER=wp_user",
    "WORDPRESS_DB_PASSWORD=wp_psw"
  ],
  "HostConfig": {
    "PortBindings": {
      "80/tcp": [
        {
          "HostPort": "80"
        }
      ]
    },
    "RestartPolicy": {
      "Name": "always"
    }
  }
}
```

- Select "launch (http)" from dropdown menu on a port exposed by Wordpress container to launch
  Wordpress installation wizard.

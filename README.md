# Docker Cluster

Docker Cluster tool is aimed to provide convenient way of experimenting with a cluster of Docker machines.
It uses [Docker Remote API](https://docs.docker.com/reference/api/docker_remote_api/)
to perform routine Docker tasks on those instances.

<div align="center">
  <img width="60%" src="https://drive.google.com/uc?id=0B9NxURKU5b4SZEx6MzR6dm9SSUk&export=view">
</div>

## Features

- Ability to pull images from Docker Hub and private registries.
- Authenticated access to Docker Registries is supported.
- Access to all container properties exposed by Remote API (port bindings, volume mappings, environment variables, etc.).
- Complete control over container lifecycle.

## Documentation

- [Installation](docs/installation.md)
- [Tutorial](docs/tutorial.md)

## Disclaimer

Docker Cluster interacts with Docker daemon via Remote API. Exposing Remote API on production machines is considered
being security vulnerability. It is highly recommended to use Docker Cluster for educational and experimental purposes
only.

From [Docker documentation](https://docs.docker.com/articles/basics/#bind-docker-to-another-hostport-or-a-unix-socket):

> Warning: Changing the default docker daemon binding to a TCP port or Unix docker user group will increase your
> security risks by allowing non-root users to gain root access on the host. Make sure you control access to docker.
> If you are binding to a TCP port, anyone with access to that port has full Docker access; so it is not advisable
> on an open network.

## License

Code is licensed under the [The MIT License](http://opensource.org/licenses/MIT). <br>
Documentation is licensed under [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

## Author

Docker Cluster is developed by Egor Pushkin. My recent efforts are targeted towards designing connected systems (mostly in mobile space) with focus on cross-platform development methodologies, modern communication paradigms and highly automated workflows.

LinkedIn - [https://www.linkedin.com/in/egorpushkin](https://www.linkedin.com/in/egorpushkin) <br>
Twitter - [https://twitter.com/egorpushkin](https://twitter.com/egorpushkin)

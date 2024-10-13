FROM ubuntu:latest

# Install necessary packages
RUN apt-get update && apt-get install -y \
    git \
    sudo \
    curl \
    jq \
    && rm -rf /var/lib/apt/lists/*

# Clone the Postal installation helper repository
RUN git clone https://github.com/postalserver/install /opt/postal/install \
    && ln -s /opt/postal/install/bin/postal /usr/bin/postal

# Set up the working directory
WORKDIR /opt/postal

# Bootstrap Postal configuration
RUN postal bootstrap localhost

# Create a script to start Postal
RUN echo '#!/bin/bash\n\
sed -i "s/localhost/$HOSTNAME/g" /opt/postal/config/postal.yml\n\
exec "$@"' > /entrypoint.sh \
    && chmod +x /entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# Default command (can be overridden)
CMD ["postal", "start"]
FROM jasonrivers/nagios:latest

# Install additional plugins
RUN apt-get update && \
    apt-get install -y \
    nagios-plugins-contrib \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy ONLY our custom service definitions
COPY etc/objects/devtinder-services.cfg /opt/nagios/etc/objects/

# Add our custom config to the main nagios.cfg
RUN echo "cfg_file=/opt/nagios/etc/objects/devtinder-services.cfg" >> /opt/nagios/etc/nagios.cfg

# Copy custom htpasswd
COPY etc/htpasswd.users /opt/nagios/etc/htpasswd.users

# Expose Nagios web interface
EXPOSE 80

# Set permissions
RUN chown -R nagios:nagios /opt/nagios/etc/

CMD ["/usr/local/bin/start_nagios"]

package ec.edu.monster.util;

import jakarta.annotation.Resource;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Produces;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Logger;
import java.util.logging.Level;

@ApplicationScoped
public class DataSourceProducer {

    private static final Logger LOGGER = Logger.getLogger(DataSourceProducer.class.getName());

    @Resource(lookup = "jdbc/BanquitoDB")
    private DataSource dataSource;

    @Produces
    @ApplicationScoped
    public DataSource createDataSource() {
        if (dataSource != null) {
            LOGGER.info("Using JNDI DataSource: jdbc/BanquitoDB");
            return dataSource;
        } else {
            LOGGER.warning("JNDI DataSource not available, returning null");
            return null;
        }
    }
}

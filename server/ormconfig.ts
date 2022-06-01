import { ConfigModule } from '@nestjs/config';
import dbConfiguration, {
  connectionSource,
} from './src/config/database.config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [dbConfiguration],
});

export default connectionSource;

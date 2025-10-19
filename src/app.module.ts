import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalysisModule } from './infraestructure/http/analysis/analysis/analysis.module';
import { CategoryModule } from './infraestructure/http/category/category/category.module';
import { ChannelModule } from './infraestructure/http/channel/channel/channel.module';
import { DataSetModule } from './infraestructure/http/dataSet/data-set/data-set.module';
import { DataSetKickModule } from './infraestructure/http/dataSetKick/data-set-kick/data-set-kick.module';
import { LivestreamModule } from './infraestructure/http/livestream/livestream/livestream.module';
import { PlatformModule } from './infraestructure/http/platform/platform/platform.module';
import { UserModule } from './infraestructure/http/user/user/user.module';
import { VideoOnDemandModule } from './infraestructure/http/videoOnDemand/video-on-demand/video-on-demand.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './infraestructure/http/auth/auth/auth.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    AnalysisModule,
    CategoryModule,
    ChannelModule,
    DataSetModule,
    DataSetKickModule,
    LivestreamModule,
    PlatformModule,
    UserModule,
    VideoOnDemandModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

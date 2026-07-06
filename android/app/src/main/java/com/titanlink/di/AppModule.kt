package com.titanlink.di

import android.content.Context
import com.titanlink.TitanLinkApplication
import com.titanlink.data.repository.DeviceRepository
import com.titanlink.websocket.SocketManager
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object AppModule {

    @Provides
    @Singleton
    fun provideApplicationContext(): Context {
        return TitanLinkApplication.applicationContext()
    }

    @Provides
    @Singleton
    fun provideDeviceRepository(
        @ApplicationContext context: Context
    ): DeviceRepository {
        return DeviceRepository(context)
    }

    @Provides
    @Singleton
    fun provideSocketManager(
        deviceRepository: DeviceRepository
    ): SocketManager {
        return SocketManager(deviceRepository)
    }
}

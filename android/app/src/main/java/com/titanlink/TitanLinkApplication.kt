package com.titanlink

import android.app.Application
import com.titanlink.di.appModule
import org.koin.android.ext.koin.androidContext
import org.koin.core.context.startKoin

class TitanLinkApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        
        // Initialize Koin DI
        startKoin {
            androidContext(this@TitanLinkApplication)
            modules(appModule)
        }
    }
}

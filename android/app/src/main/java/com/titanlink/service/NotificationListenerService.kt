package com.titanlink.service

import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import com.titanlink.websocket.SocketManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import org.koin.android.ext.android.inject

class NotificationListenerService : NotificationListenerService() {
    private val serviceScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
    private val socketManager: SocketManager by inject()

    override fun onNotificationPosted(sbn: StatusBarNotification) {
        super.onNotificationPosted(sbn)
        
        val notification = sbn.notification
        val packageName = sbn.packageName
        val title = notification.extras.getCharSequence("android.title")?.toString()
        val text = notification.extras.getCharSequence("android.text")?.toString()

        val notificationData = mapOf(
            "packageName" to packageName,
            "title" to title,
            "text" to text,
            "timestamp" to System.currentTimeMillis()
        )

        serviceScope.launch {
            socketManager.emit("notification", notificationData)
        }
    }

    override fun onNotificationRemoved(sbn: StatusBarNotification) {
        super.onNotificationRemoved(sbn)
    }
}

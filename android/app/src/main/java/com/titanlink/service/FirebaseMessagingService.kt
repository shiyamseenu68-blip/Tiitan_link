package com.titanlink.service

import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.titanlink.websocket.SocketManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import org.koin.android.ext.android.inject

class FirebaseMessagingService : FirebaseMessagingService() {
    private val serviceScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
    private val socketManager: SocketManager by inject()

    override fun onMessageReceived(message: RemoteMessage) {
        super.onMessageReceived(message)
        
        val command = message.data["command"]
        serviceScope.launch {
            when (command) {
                "ring" -> handleRingCommand()
                "locate" -> handleLocateCommand()
                else -> handleGenericCommand(message.data)
            }
        }
    }

    override fun onNewToken(token: String) {
        super.onNewToken(token)
        // Send new FCM token to server
    }

    private fun handleRingCommand() {
        // Implement ring device logic
    }

    private fun handleLocateCommand() {
        // Implement locate device logic
    }

    private fun handleGenericCommand(data: Map<String, String>) {
        // Handle other commands
    }
}

package com.titanlink.websocket

import android.util.Log
import com.titanlink.data.repository.DeviceRepository
import io.socket.client.IO
import io.socket.client.Socket
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import org.json.JSONObject
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class SocketManager @Inject constructor(
    private val deviceRepository: DeviceRepository
) {
    private var socket: Socket? = null
    private val _connectionState = MutableStateFlow<ConnectionState>(ConnectionState.Disconnected)
    val connectionState: StateFlow<ConnectionState> = _connectionState

    companion object {
        private const val TAG = "SocketManager"
        private const val SERVER_URL = "http://localhost:5001"
    }

    suspend fun connect() {
        try {
            _connectionState.value = ConnectionState.Connecting
            
            val deviceToken = deviceRepository.getDeviceToken()
            val options = IO.Options().apply {
                auth = JSONObject().apply {
                    put("token", deviceToken)
                }
                transports = arrayOf("websocket")
            }

            socket = IO.socket(SERVER_URL, options)
            
            socket?.apply {
                on(Socket.EVENT_CONNECT) {
                    Log.d(TAG, "Connected to server")
                    _connectionState.value = ConnectionState.Connected
                }
                
                on(Socket.EVENT_DISCONNECT) {
                    Log.d(TAG, "Disconnected from server")
                    _connectionState.value = ConnectionState.Disconnected
                }
                
                on(Socket.EVENT_CONNECT_ERROR) { error ->
                    Log.e(TAG, "Connection error: ${error.message}")
                    _connectionState.value = ConnectionState.Disconnected
                }
                
                on("device_command") { data ->
                    Log.d(TAG, "Received command: $data")
                    handleCommand(data)
                }
            }
            
            socket?.connect()
        } catch (e: Exception) {
            Log.e(TAG, "Connection failed", e)
            _connectionState.value = ConnectionState.Disconnected
        }
    }

    suspend fun disconnect() {
        socket?.disconnect()
        socket = null
        _connectionState.value = ConnectionState.Disconnected
    }

    private fun handleCommand(data: Any) {
        // Handle incoming commands from server
        // e.g., ring device, locate device, etc.
    }

    fun emit(event: String, data: Any) {
        socket?.emit(event, data)
    }
}

enum class ConnectionState {
    Connected,
    Disconnected,
    Connecting
}

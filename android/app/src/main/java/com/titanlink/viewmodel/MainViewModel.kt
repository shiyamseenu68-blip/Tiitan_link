package com.titanlink.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.titanlink.websocket.ConnectionState
import com.titanlink.websocket.SocketManager
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class MainViewModel @Inject constructor(
    private val socketManager: SocketManager
) : ViewModel() {
    
    val connectionState: StateFlow<ConnectionState> = socketManager.connectionState
    
    private val _deviceInfo = kotlinx.coroutines.flow.MutableStateFlow("Device Info Loading...")
    val deviceInfo: kotlinx.coroutines.flow.StateFlow<String> = _deviceInfo

    init {
        loadDeviceInfo()
    }

    fun connectToServer() {
        viewModelScope.launch {
            socketManager.connect()
        }
    }

    fun disconnectFromServer() {
        viewModelScope.launch {
            socketManager.disconnect()
        }
    }

    private fun loadDeviceInfo() {
        viewModelScope.launch {
            // Load device information
            _deviceInfo.value = """
                Manufacturer: ${android.os.Build.MANUFACTURER}
                Model: ${android.os.Build.MODEL}
                Android Version: ${android.os.Build.VERSION.RELEASE}
                API Level: ${android.os.Build.VERSION.SDK_INT}
            """.trimIndent()
        }
    }
}

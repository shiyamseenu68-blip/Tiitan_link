package com.titanlink.ui

import android.Manifest
import android.content.Intent
import android.os.Bundle
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.titanlink.databinding.ActivityMainBinding
import com.titanlink.service.TitanLinkService
import com.titanlink.viewmodel.MainViewModel
import kotlinx.coroutines.launch
import org.koin.androidx.viewmodel.ext.android.viewModel

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private val viewModel: MainViewModel by viewModel()

    private val requestPermissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        val allGranted = permissions.values.all { it }
        if (allGranted) {
            startForegroundService()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupUI()
        observeViewModel()
        requestPermissions()
    }

    private fun setupUI() {
        binding.connectButton.setOnClickListener {
            viewModel.connectToServer()
        }

        binding.disconnectButton.setOnClickListener {
            viewModel.disconnectFromServer()
        }
    }

    private fun observeViewModel() {
        lifecycleScope.launch {
            viewModel.connectionState.collect { state ->
                updateConnectionUI(state)
            }
        }

        lifecycleScope.launch {
            viewModel.deviceInfo.collect { info ->
                binding.deviceInfoText.text = info
            }
        }
    }

    private fun updateConnectionUI(state: ConnectionState) {
        when (state) {
            ConnectionState.Connected -> {
                binding.statusText.text = "Connected"
                binding.statusIndicator.setImageResource(R.drawable.ic_connected)
                binding.connectButton.isEnabled = false
                binding.disconnectButton.isEnabled = true
            }
            ConnectionState.Disconnected -> {
                binding.statusText.text = "Disconnected"
                binding.statusIndicator.setImageResource(R.drawable.ic_disconnected)
                binding.connectButton.isEnabled = true
                binding.disconnectButton.isEnabled = false
            }
            ConnectionState.Connecting -> {
                binding.statusText.text = "Connecting..."
                binding.statusIndicator.setImageResource(R.drawable.ic_connecting)
                binding.connectButton.isEnabled = false
                binding.disconnectButton.isEnabled = false
            }
        }
    }

    private fun requestPermissions() {
        val permissions = arrayOf(
            Manifest.permission.FOREGROUND_SERVICE,
            Manifest.permission.POST_NOTIFICATIONS,
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION,
        )
        requestPermissionLauncher.launch(permissions)
    }

    private fun startForegroundService() {
        val serviceIntent = Intent(this, TitanLinkService::class.java)
        startForegroundService(serviceIntent)
    }
}

enum class ConnectionState {
    Connected,
    Disconnected,
    Connecting
}

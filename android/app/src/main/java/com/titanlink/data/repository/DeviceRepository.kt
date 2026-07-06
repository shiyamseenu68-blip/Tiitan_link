package com.titanlink.data.repository

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.first
import javax.inject.Inject
import javax.inject.Singleton

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "device_settings")

@Singleton
class DeviceRepository @Inject constructor(
    private val context: Context
) {
    private object PreferencesKeys {
        val DEVICE_TOKEN = stringPreferencesKey("device_token")
        val PAIRING_CODE = stringPreferencesKey("pairing_code")
        val DEVICE_ID = stringPreferencesKey("device_id")
    }

    suspend fun saveDeviceToken(token: String) {
        context.dataStore.edit { preferences ->
            preferences[PreferencesKeys.DEVICE_TOKEN] = token
        }
    }

    suspend fun getDeviceToken(): String {
        val preferences = context.dataStore.data.first()
        return preferences[PreferencesKeys.DEVICE_TOKEN] ?: ""
    }

    suspend fun savePairingCode(code: String) {
        context.dataStore.edit { preferences ->
            preferences[PreferencesKeys.PAIRING_CODE] = code
        }
    }

    suspend fun getPairingCode(): String {
        val preferences = context.dataStore.data.first()
        return preferences[PreferencesKeys.PAIRING_CODE] ?: ""
    }

    suspend fun saveDeviceId(deviceId: String) {
        context.dataStore.edit { preferences ->
            preferences[PreferencesKeys.DEVICE_ID] = deviceId
        }
    }

    suspend fun getDeviceId(): String {
        val preferences = context.dataStore.data.first()
        return preferences[PreferencesKeys.DEVICE_ID] ?: ""
    }

    suspend fun clearAll() {
        context.dataStore.edit { preferences ->
            preferences.clear()
        }
    }
}

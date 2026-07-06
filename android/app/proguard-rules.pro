# Add project specific ProGuard rules here.
-keep class com.titanlink.** { *; }
-keepattributes Signature
-keepattributes *Annotation*
-dontwarn io.socket.**
-keep class io.socket.** { *; }

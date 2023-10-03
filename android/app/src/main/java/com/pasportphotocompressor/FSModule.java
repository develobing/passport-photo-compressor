package com.pasportphotocompressor;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class FSModule extends ReactContextBaseJavaModule {
    FileOutputStream fos;
    Context context;

    public FSModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "fsModule";
    }

    @ReactMethod
    public void justGreetMe(String name, Promise promise) {
        promise.resolve("Hi, " + name);
    }

    @ReactMethod
    public void getSize(String uri, Promise promise) {
        File file = new File(uri);
        int size = (int) file.length();
        promise.resolve(size);
    }

    // Resizing Image
    @ReactMethod
    public void compressImage(String imageUri, int compressValue, Promise promise) {
        // Create new bitmap and save it as cache file.
        try {
            File outputDir = context.getCacheDir();
            File outputFile = File.createTempFile("passport", ".jpg", outputDir);
            fos = new FileOutputStream(outputFile);

            Bitmap bitmap = BitmapFactory.decodeFile(new File(imageUri).getAbsolutePath());
            bitmap.compress(Bitmap.CompressFormat.JPEG, compressValue, fos);

            File file = new File(outputFile.getAbsolutePath());
            int size = (int) file.length();

            // Return format for Promise
            // { size: size, uri: outputFile }
            WritableMap result = Arguments.createMap();
            result.putString("uri", String.valueOf(outputFile));
            result.putInt("size", size);

            promise.resolve(result);

            fos.close();
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void saveImageToDevice(String uri, String imageName, int compressValue, Promise promise) {
        try {
            // get the user public directory for images
            File publicImageDirectory = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);

            // creating new folder
            publicImageDirectory = new File(publicImageDirectory + "/PassportPhotoCompressor");
            if (!publicImageDirectory.exists()) {
                publicImageDirectory.mkdir();
            }

            fos = new FileOutputStream(publicImageDirectory + "/" + imageName + ".jpg");

            Bitmap bitmap = BitmapFactory.decodeFile(new File(uri).getAbsolutePath());
            bitmap.compress(Bitmap.CompressFormat.JPEG, compressValue, fos);

            fos.close();
            promise.resolve("Done");

        } catch (Exception e) {
            promise.reject(e);
        }
    }
}

---
layout: post
title: Difference between Odexed ROM and Deodexed ROM
---

##What is Odexed rom and Deodexed rom?
####Odexed Rom 
Those apps are divided into two parts, one is `.apk` and other is `.odex`.This apps can't be installed normally or by just copying they needed to be flashed via recovery.The cache for each APK is contained separately in a .odex file,which loads into the virtual machine at the time of boot.

####Deodexed Rom
Those apps only one file which is `.apk`.They can be installed normall or by copying.The cache for each APK is contained with the APK itself as a `classes.dex` file.
>
> NOTE 1: Odex means a part of the app is already compiled and it is written into Dalvik Virtual Machine. 
>
> NOTE 2: Deodexing means the odex part of the file put back into the apk/jar.
>
> NOTE 3: In a odexed ROM, the `.odex` files for each /system partition APKs are written into the Dalvik Virtual Machine when the OS boots up.As opposed to the above, in a deodexed ROM, there is no cache information within the Dalvik Virtual Machine at the time of boot.So Deodexed ROM is slower.

## Who are the better?
The benefits of having a Odexed ROM:
- First boot is faster.
- More secure.

The benefits of having a Deodexed ROM:
- More modification freedom. 

## To know weather your phone is Deodexed or Odex
You just open `Root Explorer` app and navigate to */sysytem/app* and check if there are files with ".odex"extension.If yes then your ROM is Odexed.Otherwise, your ROM is Deodexed. 

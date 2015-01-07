---
title: Difference between Parcelable and Serializable
layout: post
---

> In Android we know that we cannot just pass objects to Activity.We have two ways to do this, the objects must be either implements Pacelable or Serializable interface.So what are their different?

**Serializable**

* Serializable is a standard Java interface. You simply mark a class Serializable by implement inteface, and Java will automatically serializable it.
* Serializable will create a lot of temporary objects and cause a bit of garbage collection.
* Serializable is easier to implement than Pacelable.

**Parcelable**

* Parcelable is a Android special interface when you implement the serializable in Android.It is more efficient than Serializable.
* Parcelable take more time for implement serialization than Serialization.
* Parcelable array can be pass via Intent in Android.

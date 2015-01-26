---
layout: post
title: The Socket Function 
---

###SYNOPSIS

```
#include <sys/types.h>
#include <sys/socket.h>

int socket(int domain, int type, int protocol);
```


###DESCRIPTION
`socket()` creates an endpoint for communition  and return a descriptor.

_domain_

The _domain_ argument specifies a communition domain; This selects the protocol family which will be used for communication.These family are defined in `<sys/socket.h>`.The formats include:

* AF_UNIX,AF_LOCAL: Local communication
* AF_INET: IPv4 Internet protocol
* AF_INET6: IPv6 Internet protocol

_type_

The _type_ argument specifies the communication semantics; Currently defined types are:

* SOCK_STREAM: Provides sequenced, reliable, two-way, connection-based byte streams. An out-of-band data transmission mechanism may be supported.
* SOCK_DGRAM: Support datagrams(connectionless, unreliable of a fixed maximum length).
* SOCK_RAW: Provides raw network protocol access.

Since Linux 2.6.27, the type argument serves a second purpose: in addition to sepecifying a socket type.

* SOCK_NONBLOCK: Set the `O_NONBLOCK` file status flag on the new open file description. Using this flag saves extra calls to `fcntl` to achieve the same result.
* SOCK_CLOEXEC: Set the close-on-exec(FD_CLOEXEC) flag on the new file description.

_protocol_

The _protocol_ argument specifies a particular protocol to be used with socket.Normally only a single protocol exists to support a particular socket type within a given protocol family, in which case protocol can be specified as 0. However, it is possible that many protocols may exist, in which case a particular protocol must be specified in this manner.

###RETURN VALUE
On success, a file descriptor for the new socket is returned.
On error, -1 is returned, and `errno` is set appropriately.

###ERRORS

* EACCES: Permission to create a socket of the specified type and/or protocol is denied.
* EAFNOSUPPORT: The implementation does not support the specified address family.
* EINVAL: Unknow protocol, or protocol family not available.
* EINVAL: Invalid flags in type.
* EMFILE: Process file table overflow.
* ENOBUFS: Insufficient memory is available. The socket cannot be create until sufficient resources are freed
* EPROTNOSUPPORT: The protocol type or the specified protocol is not supported within this domain.

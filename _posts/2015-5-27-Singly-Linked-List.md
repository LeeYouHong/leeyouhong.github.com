---
layout: post
title: Singly-Linked-List
---

##Singly-Linked-Lists

早就听说了`libevent`这个开源网络库的大名，刚好最近时间比较闲，所以就拜读一下。计划是从0.1版本（最早版）开始看起，因为我想看一下`libevent`成长历史和网络通信方面的相关技术发展。在`libevent0.1`版本中，核心就是`event`这个结构体了。而这个结构体中又用了`sys/queue.h`中的`TAIL QUEUES`。因此打算先学习一下`sys/queue.h`中提到的几个`queue`。本文将会讲解一下`sys/queue.h`中的`Singly-Linked-Lists`。

> singly-linked list有一个SLIST_HEAD宏定义的结构作为链表头。这个结构包含一个指向该单向链表第一个元素的指针。单向链接的元素具有最小的空间，移除任意元素的指针操作开销为O(n)。新元素可以加在链表中已存在元素的后面或者在链表的头部。

###单向链表的宏定义
```c++
/*
 * Singly-linked List definitions.
 */
#define SLIST_HEAD(name, type)						\
struct name {								\
	struct type *slh_first;	/* first element */			\
}
 
#define	SLIST_HEAD_INITIALIZER(head)					\
	{ NULL }
 
#define SLIST_ENTRY(type)						\
struct {								\
	struct type *sle_next;	/* next element */			\
}
 
/*
 * Singly-linked List access methods.
 */
#define	SLIST_FIRST(head)	((head)->slh_first)
#define	SLIST_END(head)		NULL
#define	SLIST_EMPTY(head)	(SLIST_FIRST(head) == SLIST_END(head))
#define	SLIST_NEXT(elm, field)	((elm)->field.sle_next)

#define	SLIST_FOREACH(var, head, field)					\
	for((var) = SLIST_FIRST(head);					\
	    (var) != SLIST_END(head);					\
	    (var) = SLIST_NEXT(var, field))

/*
 * Singly-linked List functions.
 */
#define	SLIST_INIT(head) {						\
	SLIST_FIRST(head) = SLIST_END(head);				\
}

#define	SLIST_INSERT_AFTER(slistelm, elm, field) do {			\
	(elm)->field.sle_next = (slistelm)->field.sle_next;		\
	(slistelm)->field.sle_next = (elm);				\
} while (0)

#define	SLIST_INSERT_HEAD(head, elm, field) do {			\
	(elm)->field.sle_next = (head)->slh_first;			\
	(head)->slh_first = (elm);					\
} while (0)

#define	SLIST_REMOVE_HEAD(head, field) do {				\
	(head)->slh_first = (head)->slh_first->field.sle_next;		\
} while (0)
```

`SLIST_HEAD` 结构定义如下：
```c++
SLIST_HEAD(HEADNAME, TYPE) head;
```
`HEADNAME`是要定义的单链表头结构体的名字，`TYPE`是链表中的元素类型。下面就是定义了一个单链表头的指针：
```c++
struct HEADNAME *headp;
```
`SLIST_ENTRY`宏声明了一个连接单链表内元素的结构体
`SLIST_INIT`宏通过参数`head`初始化单链表
`SLIT_INSERT_HEAD`宏在单链表的头部插入一个元素`elm`
`SLIST_INSERT_AFTER`宏插入一个新元素`elm`
`SLIST_REMOVE_HEAD`宏从单链表头部移除元素`elm`
`SLIST_REMOVE`宏从单链表中移除`elm`



##单向链表的例子
```c++
LIST_HEAD(slisthead, entry) head;
struct slisthead *headp;		/* 单向链表头部 */
struct entry {
	SLIST_ENTRY(entry) entries;		/* 单向链表 */
	int data;
} *n1, *n2, *n3, *np;

SLIST_INIT(&head);		/* 初始化链表 */

n1 = malloc(sizeof(struct entry));		/* 插入到头部 */
SLIST_INSERT_HEAD(&head, n1, entries);

n2 = malloc(sizeof(struct entry));		/* 插入n1后面 */
SLIST_INSERT_AFTER(n1, n2, entries);

SLIST_REMOVE(&head, n2, entry, entries);		/* 移除n2 */
free(n2);

n3 = head.slh_first;		/* 移除头部元素 */
SLIST_REMOVE_HEAD(&head, entries);
free(n3);

for (np = head.slh_first; np != NULL; np = np->entries.sle_next)		/* 遍历 */
	np->data = 1;
	
while (head.slh_first != NULL) {
	n1 = head.slh_first;
	SLIST_REMOVE_HEAD(&head, entries);
	free(n1);
}
```

###参考资料
[GNO:queue(3)](http://www.gno.org/gno/man/man3/queue.3.html)
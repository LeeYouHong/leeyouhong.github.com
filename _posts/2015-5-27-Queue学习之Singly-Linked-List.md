---
layout: post
title: Queueѧϰ֮Singly-Linked-List
---

##Singly-Linked-Lists

�����˵��`libevent`�����Դ�����Ĵ������պ����ʱ��Ƚ��У����ԾͰݶ�һ�¡��ƻ��Ǵ�0.1�汾������棩��ʼ������Ϊ���뿴һ��`libevent`�ɳ���ʷ������ͨ�ŷ������ؼ�����չ����`libevent0.1`�汾�У����ľ���`event`����ṹ���ˡ�������ṹ����������`sys/queue.h`�е�`TAIL QUEUES`����˴�����ѧϰһ��`sys/queue.h`���ᵽ�ļ���`queue`�����Ľ��ὲ��һ��`sys/queue.h`�е�`Singly-Linked-Lists`��

> singly-linked list��һ��SLIST_HEAD�궨��Ľṹ��Ϊ����ͷ������ṹ����һ��ָ��õ��������һ��Ԫ�ص�ָ�롣�������ӵ�Ԫ�ؾ�����С�Ŀռ䣬�Ƴ�����Ԫ�ص�ָ���������ΪO(n)����Ԫ�ؿ��Լ����������Ѵ���Ԫ�صĺ�������������ͷ����

###��������ĺ궨��
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

`SLIST_HEAD` �ṹ�������£�
```c++
SLIST_HEAD(HEADNAME, TYPE) head;
```
`HEADNAME`��Ҫ����ĵ�����ͷ�ṹ������֣�`TYPE`�������е�Ԫ�����͡�������Ƕ�����һ��������ͷ��ָ�룺
```c++
struct HEADNAME *headp;
```
`SLIST_ENTRY`��������һ�����ӵ�������Ԫ�صĽṹ��
`SLIST_INIT`��ͨ������`head`��ʼ��������
`SLIT_INSERT_HEAD`���ڵ������ͷ������һ��Ԫ��`elm`
`SLIST_INSERT_AFTER`�����һ����Ԫ��`elm`
`SLIST_REMOVE_HEAD`��ӵ�����ͷ���Ƴ�Ԫ��`elm`
`SLIST_REMOVE`��ӵ��������Ƴ�`elm`



##�������������
```c++
LIST_HEAD(slisthead, entry) head;
struct slisthead *headp;		/* ��������ͷ�� */
struct entry {
	SLIST_ENTRY(entry) entries;		/* �������� */
	int data;
} *n1, *n2, *n3, *np;

SLIST_INIT(&head);		/* ��ʼ������ */

n1 = malloc(sizeof(struct entry));		/* ���뵽ͷ�� */
SLIST_INSERT_HEAD(&head, n1, entries);

n2 = malloc(sizeof(struct entry));		/* ����n1���� */
SLIST_INSERT_AFTER(n1, n2, entries);

SLIST_REMOVE(&head, n2, entry, entries);		/* �Ƴ�n2 */
free(n2);

n3 = head.slh_first;		/* �Ƴ�ͷ��Ԫ�� */
SLIST_REMOVE_HEAD(&head, entries);
free(n3);

for (np = head.slh_first; np != NULL; np = np->entries.sle_next)		/* ���� */
	np->data = 1;
	
while (head.slh_first != NULL) {
	n1 = head.slh_first;
	SLIST_REMOVE_HEAD(&head, entries);
	free(n1);
}
```

###�ο�����
[GNO:queue(3)](http://www.gno.org/gno/man/man3/queue.3.html)
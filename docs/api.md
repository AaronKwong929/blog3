# blog_next 的接口文档

## 归档页文章获取

/common/archieveAcquire

```json
{
    "pageIndex": 2,
    "pageSize": 10
}
```

成功返回：

```json
{
    "totalCount": 16,
    "currentPageCount": 6,
    "resultList": [
        {
            "title": "新建文章5",
            "type": "code",
            "tag": "css",
            "content": "",
            "published": true,
            "updatedAt": "2019-10-01 00:52:32",
            "_id": "5d923272bab4223ad4be50d9",
            "comments": [],
            "__v": 0
        }
    ]
}
```

失败返回：

```json
{
    "status": -1,
    "message": "参数错误"
}
```

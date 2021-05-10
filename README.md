# YouTube Clone Application

## Desciption

By using YouTube APIs, it dynamically retrieves the most popular vidoes and functions to search videos.

## YouTube APIs

```python
   async mostPopular(){

        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${this.key}`,
            this.getRequestOptions
        );
        const result_1 = await response.json();
        return result_1.items;
    }

    async search(query) {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxresults=25&q=${query}&type=video&key=${this.key}`, this.getRequestOptions);
        const result_1 = await response.json();
        const items = result_1.items.map(item => ({ ...item, id: item.id.videoId }));
        return items;
    }
```

## [View a demo](https://alsdn9342.github.io/YouTube_Project/)

![1](https://user-images.githubusercontent.com/65743649/117616837-9f494a00-b1a6-11eb-9824-12bada5c2119.JPG)

![2](https://user-images.githubusercontent.com/65743649/117617631-c9e7d280-b1a7-11eb-9424-26d1e5828086.JPG)

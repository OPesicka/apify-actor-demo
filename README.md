This actor counts files in your Figma team and stores the result in a dataset.

# Input

## Figma Personal access token

To find your personal access token, head over to Figma, click on your avatar, and select Settings. After that, find the `Personal access tokens` section, create a token, and copy it.

For increased security, your token will be encrypted on the Apify platform and no one will have access to it.

## Figma team ID

Finding your team ID is as simple as opening your Figma team in a browser and copying the numbers between `/team/` and `/team name`

Example:

```
 https://www.figma.com/files/team/{Your team ID will be here}/MyTeamName?fuid=123456789
```

# Output

The actor will store data from all runs in one named dataset in your Apify Storage. To find your file count, head over to the link provided in the Log tab or next to the green `Succeeded` chip. You can also find the dataset in [Storage](https://console.apify.com/storage?tab=datasets).

```json
[
    {
        "result": 277,
        "timestamp": "2022-11-07T06:22:43.177Z"
    },
    {
        "result": 278,
        "timestamp": "2022-11-08T06:33:44.985Z"
    },
    {
        "result": 280,
        "timestamp": "2022-11-09T06:33:44.985Z"
    },
    {
        "result": 283,
        "timestamp": "2022-11-10T06:33:44.985Z"
    },
    {
        "result": 287,
        "timestamp": "2022-11-11T06:33:44.985Z"
    },
    {
        "result": 294,
        "timestamp": "2022-11-12T06:33:44.985Z"
    }
]
```

# Schedule

To get the most out of this actor, use the Schedule to count files every day or hour.

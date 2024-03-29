# FediCrawl

Collect feeds to follow on Fediverse nodes.

App crawls from node to node (starting from the seed node) and searches for feeds (accounts or channels) and for other peered nodes.

Discovered nodes are added to database and are queued for next search.
New nodes are processed preferentially. If there is no new node, data of oldest node are refreshed.

Node data are retrieved using node info api.

Node's public feeds and peering nodes are retrieved only on several supported softwares using thier's public APIs.

## Supported Fediverse software
For now only two fediverse apps are supported:
* [Mastodon](https://joinmastodon.org/)
* [Pleroma](https://pleroma.social/#featured-instances) (hopefully after release of version 4.2)
* [Peertube](https://joinpeertube.org/)
* [Misskey](https://join.misskey.page/)

Data providers for more apps will be probably added soon (Pull requests are welcomed)

## Config

Configuration is done using environmental variables:

| Variable                       | Description                                                                                         | Default value / Example value             |
|--------------------------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------|
 | `ELASTIC_URL`                  | Url address of ElasticSearch server                                                                 | `http://elastic:9200`                     |
| `ELASTIC_USER`                 | Username for EalsticSearch server                                                                   | `elastic`                                 |
| `ELASTIC_PASSWORD`             | Username for EalsticSearch server                                                                   | empty                                     |
| `SEED_NODE_DOMAIN`             | Domain of the first node to search users and other nodes on                                         | `mastodon.social,mastodon.online`         |
| `REATTEMPT_MINUTES`            | _Optional_, How many minutes should be waited for next node refresh attempt if the refresh fails    | `60 `                                     | 
| `REFRESH_HOURS`                | _Optional_, How often (in hours) should be node info refreshed                                      | `120`                                     |
| `WAIT_FOR_JOB_MINUTES`         | _Optional_, How many minutes should the thread sleep if there are no nodes to refresh               | `60`                                      |
| `DEFAULT_TIMEOUT_MILLISECONDS` | _Optional_, How many milliseconds should http wait for node api response on refresh                 | `10000`                                   |
| `SEED_TIMEOUT_MILLISECONDS`    | _Optional_, How many milliseconds should http wait for node api response on refresh of seed domains | _value of `DEFAULT_TIMEOUT_MILLISECONDS`_ |
| `BANNED_DOMAINS`               | _Optional_, Domains not to index (even with subdomains)                                             | _empty_                                   |
| `CRAWLING_VERSION`             | _Optional_, Increasing this number can enforce recrawling of the whole index                        | 0                                         |
| `MAX_CRAWLING_DEPTH`           | _Optional_, Limits how far is fediverse indexed from seed nodes                                     | _empty_                                   |
| `TZ`                           | _Optional_, Timezone                                                                                | `UTC`                                     |
## Deploy
App is designed to be run in docker container and deployed using docker-compose. 
More info can be found in [FediSearch example docker-compose](https://github.com/Stopka/fedisearch-compose) project

For searching in collected feeds there is a companion server app [FediSearch](https://github.com/Stopka/fedisearch)

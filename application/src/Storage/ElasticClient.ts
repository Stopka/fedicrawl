import { Client } from '@elastic/elasticsearch'

const elasticClient = new Client({
  node: {
    url: new URL(process.env.ELASTIC_URL ?? 'http://elastic:9200')
  },
  auth: {
    username: process.env.ELASTIC_USER ?? 'elastic',
    password: process.env.ELASTIC_PASSWORD
  }
})

export type ElasticClient = typeof elasticClient

export default elasticClient

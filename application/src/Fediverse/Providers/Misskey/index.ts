import { Provider } from '../Provider'
import { NodeProvider } from '../NodeProvider'
import { FeedProvider } from '../FeedProvider'
import { retrieveInstancesPage } from './retrieveInstancesPage'
import { retrieveUsersPage } from './retrieveUsersPage'

const MisskeyProvider: Provider = {
  getKey: () => 'misskey',
  getNodeProviders: (): NodeProvider[] => [
    {
      getKey: () => 'federation-instances',
      retrieveNodes: retrieveInstancesPage
    }
  ],
  getFeedProviders: (): FeedProvider[] => [
    {
      getKey: () => 'users',
      retrieveFeeds: retrieveUsersPage
    }
  ]
}

export default MisskeyProvider

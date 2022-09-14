import { MappingProperty } from '@elastic/elasticsearch/lib/api/types'

const dateProperty:MappingProperty = { type: 'date', format: 'epoch_millis' }

export default dateProperty

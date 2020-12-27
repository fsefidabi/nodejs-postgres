const columns = [
  {
    name: 'launchCount',
    type: 'INT',
    constraints: 'NOT NULL'
  },
  {
    name: 'launchTime',
    type: 'TIMESTAMPTZ',
    constraints: 'NOT NULL'
  },
  {
    name: 'installDate',
    type: 'TIMESTAMPTZ',
    constraints: 'NOT NULL'
  },
  {
    name: 'osVersion',
    type: 'TEXT',
    constraints: 'NOT NULL'
  },
  {
    name: 'deviceModel',
    type: 'TEXT',
    constraints: 'NOT NULL'
  },
  {
    name: 'deviceToken',
    type: 'TEXT',
    constraints: 'NOT NULL'
  },
  {
    name: 'deviceType',
    type: 'TEXT',
    constraints: 'NOT NULL'
  },
  {
    name: 'userId',
    type: 'TEXT',
    constraints: 'NOT NULL'
  },
  {
    name: 'tokenStatus',
    type: 'TEXT',
    constraints: 'NOT NULL'
  },
  {
    name: 'appId',
    type: 'TEXT',
    constraints: 'NOT NULL'
  },
  {
    name: 'ip',
    type: 'TEXT',
    constraints: 'NOT NULL'
  },
  {
    name: 'connection',
    type: 'TEXT',
    constraints: 'NOT NULL'
  },
  {
    name: 'appVersion',
    type: 'TEXT',
    constraints: 'NOT NULL'
  },
  {
    name: 'created',
    type: 'TIMESTAMPTZ',
    constraints: 'NOT NULL'
  },
  {
    name: 'modified',
    type: 'TIMESTAMPTZ',
    constraints: 'NOT NULL'
  },
  {
    name: 'status',
    type: 'TEXT',
    constraints: 'NOT NULL'
  },
  {
    name: 'subscriptions',
    type: 'TEXT',
    constraints: 'NOT NULL'
  },
  {
    name: 'timeZone',
    type: 'TEXT',
    constraints: 'NOT NULL'
  },
  {
    name: 'adId',
    type: 'TEXT',
    constraints: 'NOT NULL'
  },
  {
    name: 'tags',
    type: 'TEXT[]',
    constraints: 'NOT NULL'
  },
  {
    name: 'event_purchase_firstOccurrence',
    type: 'TIMESTAMPTZ',
    constraints: 'NOT NULL'
  },
  {
    name: 'event_purchase_lastOccurrence',
    type: 'TIMESTAMPTZ',
    constraints: 'NOT NULL'
  },
  {
    name: 'event_purchase_count',
    type: 'INT',
    constraints: 'NOT NULL'
  },
  {
    name: 'userInfo_name',
    type: 'TEXT',
    constraints: 'NOT NULL'
  },
  {
    name: 'userInfo_birthday',
    type: 'TIMESTAMPTZ',
    constraints: 'NOT NULL'
  },
  {
    name: 'userInfo_categories',
    type: 'TEXT[]',
    constraints: 'NOT NULL'
  }
]

module.exports = { columns }

const columns = [
  {
    name: 'launchCount',
    pgType: 'INT',
    chType: 'Int64',
    constraints: 'NOT NULL'
  },
  {
    name: 'launchTime',
    pgType: 'TIMESTAMPTZ',
    chType: 'DateTime',
    constraints: 'NOT NULL'
  },
  {
    name: 'installDate',
    pgType: 'TIMESTAMPTZ',
    chType: 'DateTime',
    constraints: 'NOT NULL'
  },
  {
    name: 'osVersion',
    pgType: 'TEXT',
    chType: 'String',
    constraints: 'NOT NULL'
  },
  {
    name: 'deviceModel',
    pgType: 'TEXT',
    chType: 'String',
    constraints: 'NOT NULL'
  },
  {
    name: 'deviceToken',
    pgType: 'TEXT',
    chType: 'String',
    constraints: 'NOT NULL'
  },
  {
    name: 'deviceType',
    pgType: 'TEXT',
    chType: 'String',
    constraints: 'NOT NULL'
  },
  {
    name: 'userId',
    pgType: 'TEXT',
    chType: 'String',
    constraints: 'NOT NULL'
  },
  {
    name: 'tokenStatus',
    pgType: 'TEXT',
    chType: 'String',
    constraints: 'NOT NULL'
  },
  {
    name: 'appId',
    pgType: 'TEXT',
    chType: 'String',
    constraints: 'NOT NULL'
  },
  {
    name: 'ip',
    pgType: 'TEXT',
    chType: 'String',
    constraints: 'NOT NULL'
  },
  {
    name: 'connection',
    pgType: 'TEXT',
    chType: 'String',
    constraints: 'NOT NULL'
  },
  {
    name: 'appVersion',
    pgType: 'TEXT',
    chType: 'String',
    constraints: 'NOT NULL'
  },
  {
    name: 'created',
    pgType: 'TIMESTAMPTZ',
    chType: 'DateTime',
    constraints: 'NOT NULL'
  },
  {
    name: 'modified',
    pgType: 'TIMESTAMPTZ',
    chType: 'DateTime',
    constraints: 'NOT NULL'
  },
  {
    name: 'status',
    pgType: 'TEXT',
    chType: 'String',
    constraints: 'NOT NULL'
  },
  {
    name: 'subscriptions',
    pgType: 'TEXT',
    chType: 'String',
    constraints: 'NOT NULL'
  },
  {
    name: 'timeZone',
    pgType: 'TEXT',
    chType: 'String',
    constraints: 'NOT NULL'
  },
  {
    name: 'adId',
    pgType: 'TEXT',
    chType: 'String',
    constraints: 'NOT NULL'
  },
  {
    name: 'tags',
    pgType: 'TEXT[]',
    chType: 'Array(String)',
    constraints: 'NOT NULL'
  },
  {
    name: 'event_purchase_firstOccurrence',
    pgType: 'TIMESTAMPTZ',
    chType: 'DateTime',
    constraints: 'NOT NULL'
  },
  {
    name: 'event_purchase_lastOccurrence',
    pgType: 'TIMESTAMPTZ',
    chType: 'DateTime',
    constraints: 'NOT NULL'
  },
  {
    name: 'event_purchase_count',
    pgType: 'INT',
    chType: 'Int64',
    constraints: 'NOT NULL'
  },
  {
    name: 'userInfo_name',
    pgType: 'TEXT',
    chType: 'String',
    constraints: 'NOT NULL'
  },
  {
    name: 'userInfo_birthday',
    pgType: 'TIMESTAMPTZ',
    chType: 'DateTime',
    constraints: 'NOT NULL'
  },
  {
    name: 'userInfo_categories',
    pgType: 'TEXT[]',
    chType: 'String',
    constraints: 'NOT NULL'
  }
]

module.exports = { columns }

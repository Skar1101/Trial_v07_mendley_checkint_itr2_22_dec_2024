import Ajv from 'ajv';

const ajv = new Ajv();

export function validateSchema(data: any, schema: object): boolean {
  const validate = ajv.compile(schema);
  return validate(data) as boolean;
}

export const chatHistorySchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      content: { type: 'string' },
      timestamp: { type: 'string' },
      sender: { type: 'string', enum: ['user', 'ai'] },
    },
    required: ['id', 'content', 'timestamp', 'sender'],
  },
};

export const journalEntrySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    content: { type: 'string' },
    timestamp: { type: 'string' },
    mood: { type: 'string' },
  },
  required: ['id', 'content', 'timestamp'],
};


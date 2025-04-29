
import { autonomousAgent } from './agents';
import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { reactComponentWorkflow } from './workflows';


export const mastra = new Mastra({
  workflows: { reactComponentWorkflow },
  agents: { autonomousAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});

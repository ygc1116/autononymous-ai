
import { autonomousAgent } from './agents';
import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
<<<<<<< HEAD

import { weatherAgent } from './agents';
=======
import { reactComponentWorkflow } from './workflows';

>>>>>>> ab1c25df57fc773247ca47bbe2a4d7ce01759395

export const mastra = new Mastra({
  workflows: { reactComponentWorkflow },
  agents: { autonomousAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});

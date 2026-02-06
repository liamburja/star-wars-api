import { Container } from 'typedi';
import logger from './shared/logger';

/**
 * Register all injectable classes
 */
export function setupContainer() {
  // Logger (singleton)
  Container.set('logger', logger);

}

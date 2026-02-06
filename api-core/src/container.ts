import { Container } from 'typedi';
import logger from './shared/logger';

export function setupContainer() {
  Container.set('logger', logger);
}

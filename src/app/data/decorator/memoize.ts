import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as memoryCache from 'memory-cache';

/**
 * In computing, memoization is an optimization technique used
 * primarily to speed up computer programs by storing the results of expensive
 * function calls and returning the cached result when the same inputs occur
 * again. - https://en.wikipedia.org/wiki/Memoization
 */
export function Memoize(): MethodDecorator {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const oldFunction = descriptor.value;

    const newFunction = function() {
      // Create a unique cache key based on class name, function name, and args
      const cacheKey =
        this.constructor.name
          + '_'
          + propertyKey
          + '_'
          + JSON.stringify(arguments)
          ;

      const cachedResults = memoryCache.get(cacheKey);
      // Cache hit
      if (cachedResults) {
        return of(cachedResults);
      }

      // Cache miss; call original function to get result then cache
      return oldFunction.apply(this, arguments).pipe(
        map(results => {
          return memoryCache.put(cacheKey, results, environment.cacheLength);
        })
      );
    };

    // Assign new function to value to create decorator
    descriptor.value = function() {
      return newFunction.apply(this, arguments);
    };
  };
}

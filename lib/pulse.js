// in this example, we'll get posts from an API and save them in a group to be accessed by a component
import Pulse from 'pulse-framework/dist/pulse.min';
import React from 'react';

const pulseConfig = {
  request: {
    baseURL: 'https://jsonplaceholder.typicode.com'
  },
  collections: {
    posts: {
      groups: ['homepage', 'group1', 'group2'],
      routes: {
        getPosts: request => request.get('posts'),
        getUser: (request, id) =>
          request.get(`users/${id}`)
      },
      actions: {
        getPosts({ routes, collect }) {
          routes.getUser(1).then(res => {
            res.dab = (new Date).getTime();
            // use the collect method to collect posts into a group called "homepage", defined above
            collect(res, ['homepage', 'group1', 'group2']);
          });
        }
      }
    }
  },
  config: {
    framework: React,
    ssr: !process.browser
  }
}

const isServer = typeof window === 'undefined'
const __NEXT_PULSE_STORE__ = '__NEXT_PULSE_STORE__'

function getOrCreateStore (initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return new Pulse(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_PULSE_STORE__]) {
    window[__NEXT_PULSE_STORE__] = new Pulse(initialState)
  }

  return window[__NEXT_PULSE_STORE__]
}


const store = getOrCreateStore(pulseConfig);

// Money patch Pulse to handle getInitialProps
import NextWithPulse from './NextWithPulse';
store.wrapped = function wrapped(ReactComponent, mapData){
    const config = this._private.global.config;
    if (config.framework === 'react' && config.frameworkConstructor) {
        return NextWithPulse(
            this,
            config.frameworkConstructor,
            ReactComponent,
            mapData
        );
    } else return false;
}.bind(store);

// Export store as default
export default store;
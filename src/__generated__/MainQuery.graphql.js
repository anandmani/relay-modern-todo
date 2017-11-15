/**
 * @flow
 * @relayHash 42df9c6b3bd9a1a1b0014a5fb6422f18
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type MainQueryResponse = {|
  +app: ?{| |};
|};
*/


/*
query MainQuery {
  app {
    ...App
  }
}

fragment App on App {
  todos {
    id
    title
    status
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MainQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "App",
        "name": "app",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "App",
            "args": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "MainQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "MainQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "App",
        "name": "app",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Todo",
            "name": "todos",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "title",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "status",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query MainQuery {\n  app {\n    ...App\n  }\n}\n\nfragment App on App {\n  todos {\n    id\n    title\n    status\n  }\n}\n"
};

module.exports = batch;

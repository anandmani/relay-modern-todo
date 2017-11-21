/**
 * @flow
 * @relayHash 76e74f9780c4c414ac6dc8eaba2ce5a6
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type AppRefetchQueryResponse = {|
  +app: ?{| |};
|};
*/


/*
query AppRefetchQuery(
  $status: String
) {
  app {
    ...App_lg5YC
  }
}

fragment App_lg5YC on App {
  todos(status: $status) {
    ...Todo
  }
}

fragment Todo on Todo {
  id
  title
  status
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "status",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppRefetchQuery",
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
            "args": [
              {
                "kind": "Variable",
                "name": "status",
                "variableName": "status",
                "type": null
              }
            ]
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
  "name": "AppRefetchQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "status",
        "type": "String",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "AppRefetchQuery",
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
            "args": [
              {
                "kind": "Variable",
                "name": "status",
                "variableName": "status",
                "type": "String"
              }
            ],
            "concreteType": "Todo",
            "name": "todos",
            "plural": true,
            "selections": [
              {
                "kind": "InlineFragment",
                "type": "Todo",
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
                ]
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query AppRefetchQuery(\n  $status: String\n) {\n  app {\n    ...App_lg5YC\n  }\n}\n\nfragment App_lg5YC on App {\n  todos(status: $status) {\n    ...Todo\n  }\n}\n\nfragment Todo on Todo {\n  id\n  title\n  status\n}\n"
};

module.exports = batch;

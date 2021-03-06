/**
 * @flow
 * @relayHash d0cf57f506bb89a58c511f044da93093
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
  todos(status: "") {
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
            "args": [
              {
                "kind": "Literal",
                "name": "status",
                "value": "",
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
            "storageKey": "todos{\"status\":\"\"}"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query MainQuery {\n  app {\n    ...App\n  }\n}\n\nfragment App on App {\n  todos(status: \"\") {\n    ...Todo\n  }\n}\n\nfragment Todo on Todo {\n  id\n  title\n  status\n}\n"
};

module.exports = batch;

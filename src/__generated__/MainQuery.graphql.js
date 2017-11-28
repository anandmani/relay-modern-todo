/**
 * @flow
 * @relayHash 22cf7610d1fbd3020c101f32205381aa
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
    edges {
      node {
        ...Todo
        id
      }
    }
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
            "concreteType": "TodoConnection",
            "name": "todos",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "TodoEdge",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "Todo",
                    "name": "node",
                    "plural": false,
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
            ],
            "storageKey": "todos{\"status\":\"\"}"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query MainQuery {\n  app {\n    ...App\n  }\n}\n\nfragment App on App {\n  todos(status: \"\") {\n    edges {\n      node {\n        ...Todo\n        id\n      }\n    }\n  }\n}\n\nfragment Todo on Todo {\n  id\n  title\n  status\n}\n"
};

module.exports = batch;

/**
 * @flow
 * @relayHash e9214e7c99ab0f6f8ebec33e92501c99
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type UpdateTodoMutationVariables = {|
  input?: ?{
    id: string;
    status: string;
  };
|};
export type UpdateTodoMutationResponse = {|
  +updateTodo: ?{|
    +id: string;
    +title: string;
    +status: string;
  |};
|};
*/


/*
mutation UpdateTodoMutation(
  $input: UpdateTodoInput
) {
  updateTodo(input: $input) {
    id
    title
    status
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UpdateTodoInput",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdateTodoMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UpdateTodoInput"
          }
        ],
        "concreteType": "Todo",
        "name": "updateTodo",
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
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "UpdateTodoMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UpdateTodoInput",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "UpdateTodoMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UpdateTodoInput"
          }
        ],
        "concreteType": "Todo",
        "name": "updateTodo",
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
    ]
  },
  "text": "mutation UpdateTodoMutation(\n  $input: UpdateTodoInput\n) {\n  updateTodo(input: $input) {\n    id\n    title\n    status\n  }\n}\n"
};

module.exports = batch;

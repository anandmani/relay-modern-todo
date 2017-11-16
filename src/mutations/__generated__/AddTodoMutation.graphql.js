/**
 * @flow
 * @relayHash c52825046f440f3a4198f6581185baa2
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type AddTodoMutationVariables = {|
  input?: ?{
    title: string;
    status?: ?string;
  };
|};
export type AddTodoMutationResponse = {|
  +addTodo: ?{|
    +id: string;
    +title: string;
    +status: string;
  |};
|};
*/


/*
mutation AddTodoMutation(
  $input: TodoInput
) {
  addTodo(input: $input) {
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
        "type": "TodoInput",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AddTodoMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "TodoInput"
          }
        ],
        "concreteType": "Todo",
        "name": "addTodo",
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
  "name": "AddTodoMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "TodoInput",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "AddTodoMutation",
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
            "type": "TodoInput"
          }
        ],
        "concreteType": "Todo",
        "name": "addTodo",
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
  "text": "mutation AddTodoMutation(\n  $input: TodoInput\n) {\n  addTodo(input: $input) {\n    id\n    title\n    status\n  }\n}\n"
};

module.exports = batch;

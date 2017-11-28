/**
 * @flow
 * @relayHash 9a3c07f128d8fe29575ce8a901354257
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type DeleteTodoMutationVariables = {|
  input: {
    id?: ?string;
    clientMutationId?: ?string;
  };
|};
export type DeleteTodoMutationResponse = {|
  +deleteTodo: ?{|
    +todo: ?string;
  |};
|};
*/


/*
mutation DeleteTodoMutation(
  $input: DeleteTodoInput!
) {
  deleteTodo(input: $input) {
    todo
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "DeleteTodoInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteTodoMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "DeleteTodoInput!"
          }
        ],
        "concreteType": "DeleteTodoPayload",
        "name": "deleteTodo",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "todo",
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
  "name": "DeleteTodoMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "DeleteTodoInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "DeleteTodoMutation",
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
            "type": "DeleteTodoInput!"
          }
        ],
        "concreteType": "DeleteTodoPayload",
        "name": "deleteTodo",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "todo",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation DeleteTodoMutation(\n  $input: DeleteTodoInput!\n) {\n  deleteTodo(input: $input) {\n    todo\n  }\n}\n"
};

module.exports = batch;

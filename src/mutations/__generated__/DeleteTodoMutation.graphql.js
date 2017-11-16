/**
 * @flow
 * @relayHash 5bffee26f76b1b25c38be9625e7d0f69
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type DeleteTodoMutationVariables = {|
  input?: ?{
    id: string;
  };
|};
export type DeleteTodoMutationResponse = {|
  +deleteTodo: ?string;
|};
*/


/*
mutation DeleteTodoMutation(
  $input: DeleteTodoInput
) {
  deleteTodo(input: $input)
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "DeleteTodoInput",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteTodoMutation",
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "DeleteTodoInput"
          }
        ],
        "name": "deleteTodo",
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
        "type": "DeleteTodoInput",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "DeleteTodoMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "DeleteTodoInput"
          }
        ],
        "name": "deleteTodo",
        "storageKey": null
      }
    ]
  },
  "text": "mutation DeleteTodoMutation(\n  $input: DeleteTodoInput\n) {\n  deleteTodo(input: $input)\n}\n"
};

module.exports = batch;
